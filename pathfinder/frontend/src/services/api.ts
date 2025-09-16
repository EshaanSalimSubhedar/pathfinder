import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response

          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              window.location.href = '/login'
              break
            case 403:
              toast.error('Access denied. Insufficient permissions.')
              break
            case 404:
              toast.error('Resource not found.')
              break
            case 422:
              // Validation errors
              if (data.errors) {
                data.errors.forEach((error: any) => {
                  toast.error(error.msg || error.message)
                })
              } else {
                toast.error(data.message || 'Validation failed.')
              }
              break
            case 500:
              toast.error('Server error. Please try again later.')
              break
            default:
              toast.error(data.message || 'An error occurred.')
          }
        } else if (error.request) {
          toast.error('Network error. Please check your connection.')
        } else {
          toast.error('An unexpected error occurred.')
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.patch<T>(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  // File upload method
  async uploadFile<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    const response = await this.api.post<T>(url, formData, config)
    return response.data
  }

  // Set auth token
  setAuthToken(token: string) {
    localStorage.setItem('token', token)
    this.api.defaults.headers.Authorization = `Bearer ${token}`
  }

  // Remove auth token
  removeAuthToken() {
    localStorage.removeItem('token')
    delete this.api.defaults.headers.Authorization
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem('token')
  }
}

export const apiService = new ApiService()
export default apiService


