import apiService from './api'
import { User, AuthResponse, ApiResponse } from '../types'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'STUDENT' | 'EMPLOYER'
  phone?: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  phone?: string
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/login', data)
    
    if (response.success && response.data) {
      const { user, token } = response.data
      this.setAuthData(user, token)
      return response.data
    }
    
    throw new Error(response.message || 'Login failed')
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/register', data)
    
    if (response.success && response.data) {
      const { user, token } = response.data
      this.setAuthData(user, token)
      return response.data
    }
    
    throw new Error(response.message || 'Registration failed')
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      // Ignore logout errors
    } finally {
      this.clearAuthData()
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>('/auth/profile')
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to get profile')
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiService.put<ApiResponse<User>>('/auth/profile', data)
    
    if (response.success && response.data) {
      // Update stored user data
      const currentUser = this.getCurrentUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      return response.data
    }
    
    throw new Error(response.message || 'Profile update failed')
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    const response = await apiService.post<ApiResponse>('/auth/change-password', data)
    
    if (!response.success) {
      throw new Error(response.message || 'Password change failed')
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    const response = await apiService.post<ApiResponse>('/auth/forgot-password', data)
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email')
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    const response = await apiService.post<ApiResponse>('/auth/reset-password', data)
    
    if (!response.success) {
      throw new Error(response.message || 'Password reset failed')
    }
  }

  async refreshToken(): Promise<string> {
    const response = await apiService.post<ApiResponse<{ token: string }>>('/auth/refresh-token')
    
    if (response.success && response.data) {
      const { token } = response.data
      apiService.setAuthToken(token)
      return token
    }
    
    throw new Error(response.message || 'Token refresh failed')
  }

  // Helper methods
  private setAuthData(user: User, token: string): void {
    localStorage.setItem('user', JSON.stringify(user))
    apiService.setAuthToken(token)
  }

  private clearAuthData(): void {
    localStorage.removeItem('user')
    apiService.removeAuthToken()
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser()
  }

  getToken(): string | null {
    return apiService.getToken()
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser()
    return user ? user.role === role : false
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser()
    return user ? roles.includes(user.role) : false
  }
}

export const authService = new AuthService()
export default authService


