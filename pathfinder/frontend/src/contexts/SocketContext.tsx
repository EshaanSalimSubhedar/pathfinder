import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './AuthContext'
import { Message } from '../types'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  sendMessage: (data: SendMessageData) => void
  joinChat: (applicationId: string) => void
  leaveChat: (applicationId: string) => void
  scheduleInterview: (data: ScheduleInterviewData) => void
  updateApplicationStatus: (data: UpdateApplicationStatusData) => void
}

interface SendMessageData {
  applicationId: string
  content: string
  messageType?: string
}

interface ScheduleInterviewData {
  applicationId: string
  scheduledAt: string
  meetingLink?: string
  notes?: string
}

interface UpdateApplicationStatusData {
  applicationId: string
  status: string
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user && !socket) {
      const token = localStorage.getItem('token')
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: {
          token,
        },
      })

      newSocket.on('connect', () => {
        console.log('Socket connected')
        setIsConnected(true)
      })

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected')
        setIsConnected(false)
      })

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        setIsConnected(false)
      })

      setSocket(newSocket)
    }

    return () => {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
    }
  }, [user])

  const sendMessage = (data: SendMessageData) => {
    if (socket && isConnected) {
      socket.emit('send-message', data)
    }
  }

  const joinChat = (applicationId: string) => {
    if (socket && isConnected) {
      socket.emit('join-chat', { applicationId })
    }
  }

  const leaveChat = (applicationId: string) => {
    if (socket && isConnected) {
      socket.leave(`chat:${applicationId}`)
    }
  }

  const scheduleInterview = (data: ScheduleInterviewData) => {
    if (socket && isConnected) {
      socket.emit('schedule-interview', data)
    }
  }

  const updateApplicationStatus = (data: UpdateApplicationStatusData) => {
    if (socket && isConnected) {
      socket.emit('application-status-update', data)
    }
  }

  const value: SocketContextType = {
    socket,
    isConnected,
    sendMessage,
    joinChat,
    leaveChat,
    scheduleInterview,
    updateApplicationStatus,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}


