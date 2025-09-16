import { Request, Response } from 'express';
import { AuthService, RegisterData, LoginData } from '../services/authService';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const registerData: RegisterData = req.body;

  const result = await AuthService.register(registerData);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const loginData: LoginData = req.body;

  const result = await AuthService.login(loginData);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const user = await AuthService.getProfile(userId);

  res.status(200).json({
    success: true,
    data: user
  });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const updateData = req.body;

  const user = await AuthService.updateProfile(userId, updateData);

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { currentPassword, newPassword } = req.body;

  await AuthService.changePassword(userId, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  await AuthService.forgotPassword(email);

  res.status(200).json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent.'
  });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  await AuthService.resetPassword(token, newPassword);

  res.status(200).json({
    success: true,
    message: 'Password reset successfully'
  });
});

export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const result = await AuthService.refreshToken(userId);

  res.status(200).json({
    success: true,
    data: result
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  // In a JWT-based system, logout is typically handled client-side
  // by removing the token. For enhanced security, you might want to
  // maintain a blacklist of tokens on the server side.
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

