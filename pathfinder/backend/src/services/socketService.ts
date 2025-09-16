import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export const setupSocketIO = (io: Server) => {
  // Authentication middleware for Socket.IO
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, role: true, isActive: true }
      });

      if (!user || !user.isActive) {
        return next(new Error('Authentication error: Invalid user'));
      }

      socket.userId = user.id;
      socket.userRole = user.role;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected`);

    // Join user-specific room
    socket.join(`user:${socket.userId}`);

    // Join role-specific room
    socket.join(`role:${socket.userRole}`);

    // Handle real-time chat
    socket.on('join-chat', (data: { applicationId: string }) => {
      socket.join(`chat:${data.applicationId}`);
    });

    socket.on('send-message', async (data: { applicationId: string, content: string, messageType?: string }) => {
      try {
        // Save message to database
        const message = await prisma.message.create({
          data: {
            senderId: socket.userId!,
            receiverId: data.applicationId, // This should be the other party's ID
            content: data.content,
            messageType: data.messageType || 'text'
          }
        });

        // Broadcast message to chat room
        io.to(`chat:${data.applicationId}`).emit('new-message', message);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle application status updates
    socket.on('application-status-update', async (data: { applicationId: string, status: string }) => {
      try {
        const application = await prisma.application.update({
          where: { id: data.applicationId },
          data: { 
            status: data.status as any,
            statusChangedAt: new Date()
          },
          include: {
            student: {
              select: { id: true, firstName: true, lastName: true }
            },
            internship: {
              select: { title: true, company: { select: { firstName: true, lastName: true } } }
            }
          }
        });

        // Notify student about status change
        io.to(`user:${application.studentId}`).emit('application-status-changed', {
          applicationId: data.applicationId,
          status: data.status,
          application
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: application.studentId,
            type: 'APPLICATION_STATUS_CHANGED',
            title: 'Application Status Updated',
            message: `Your application for ${application.internship.title} has been ${data.status.toLowerCase()}`,
            data: {
              applicationId: data.applicationId,
              status: data.status
            }
          }
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to update application status' });
      }
    });

    // Handle interview scheduling
    socket.on('schedule-interview', async (data: { 
      applicationId: string, 
      scheduledAt: string, 
      meetingLink?: string,
      notes?: string 
    }) => {
      try {
        const application = await prisma.application.update({
          where: { id: data.applicationId },
          data: { 
            status: 'INTERVIEW_SCHEDULED',
            statusChangedAt: new Date()
          },
          include: {
            student: {
              select: { id: true, firstName: true, lastName: true }
            }
          }
        });

        // Notify student about interview
        io.to(`user:${application.studentId}`).emit('interview-scheduled', {
          applicationId: data.applicationId,
          scheduledAt: data.scheduledAt,
          meetingLink: data.meetingLink,
          notes: data.notes
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: application.studentId,
            type: 'INTERVIEW_SCHEDULED',
            title: 'Interview Scheduled',
            message: `Your interview has been scheduled for ${new Date(data.scheduledAt).toLocaleDateString()}`,
            data: {
              applicationId: data.applicationId,
              scheduledAt: data.scheduledAt,
              meetingLink: data.meetingLink
            }
          }
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to schedule interview' });
      }
    });

    // Handle new internship notifications
    socket.on('new-internship-match', async (data: { studentId: string, internshipId: string }) => {
      try {
        // Notify student about new match
        io.to(`user:${data.studentId}`).emit('new-internship-match', {
          internshipId: data.internshipId
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: data.studentId,
            type: 'NEW_INTERNSHIP_MATCH',
            title: 'New Internship Match',
            message: 'We found a new internship that matches your profile!',
            data: {
              internshipId: data.internshipId
            }
          }
        });
      } catch (error) {
        console.error('Failed to send new internship match notification:', error);
      }
    });

    // Handle typing indicators
    socket.on('typing-start', (data: { applicationId: string }) => {
      socket.to(`chat:${data.applicationId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: true
      });
    });

    socket.on('typing-stop', (data: { applicationId: string }) => {
      socket.to(`chat:${data.applicationId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: false
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
};
