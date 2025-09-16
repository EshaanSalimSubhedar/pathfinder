import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { User, UserRole } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    const { email, password, firstName, lastName, role, phone } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone
      },
      include: {
        studentProfile: true,
        companyProfile: true,
        adminProfile: true
      }
    });

    // Generate JWT token
    const token = this.generateToken(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const { email, password } = data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        companyProfile: true,
        adminProfile: true
      }
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Generate JWT token
    const token = this.generateToken(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  static async refreshToken(userId: string): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, isActive: true }
    });

    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401);
    }

    const token = this.generateToken(user.id);

    return { token };
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });
  }

  static async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists or not
      return;
    }

    // Generate reset token (in a real app, you'd send this via email)
    const resetToken = jwt.sign(
      { userId: user.id, type: 'password_reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // TODO: Send email with reset token
    console.log(`Password reset token for ${email}: ${resetToken}`);
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      if (decoded.type !== 'password_reset') {
        throw new AppError('Invalid reset token', 400);
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid or expired reset token', 400);
      }
      throw error;
    }
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        companyProfile: true,
        adminProfile: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async updateProfile(userId: string, updateData: any) {
    const allowedFields = ['firstName', 'lastName', 'phone'];
    const filteredData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {} as any);

    const user = await prisma.user.update({
      where: { id: userId },
      data: filteredData,
      include: {
        studentProfile: true,
        companyProfile: true,
        adminProfile: true
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private static generateToken(userId: string): string {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }
}
