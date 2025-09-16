import { Application } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import internshipRoutes from './internships';
import applicationRoutes from './applications';
import matchingRoutes from './matching';
import pmSchemeRoutes from './pmScheme';
import adminRoutes from './admin';
import analyticsRoutes from './analytics';

export const setupRoutes = (app: Application) => {
  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/internships', internshipRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/matching', matchingRoutes);
  app.use('/api/pm-scheme', pmSchemeRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/analytics', analyticsRoutes);

  // API documentation endpoint
  app.get('/api/docs', (req, res) => {
    res.json({
      message: 'Pathfinder API Documentation',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        internships: '/api/internships',
        applications: '/api/applications',
        matching: '/api/matching',
        pmScheme: '/api/pm-scheme',
        admin: '/api/admin',
        analytics: '/api/analytics'
      }
    });
  });
};

