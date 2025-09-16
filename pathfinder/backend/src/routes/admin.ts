import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Admin routes
router.get('/dashboard', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/users', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.put('/users/:id/status', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/analytics', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));

// Government Admin specific routes
router.get('/government/schemes', authorize(UserRole.GOVERNMENT_ADMIN));
router.post('/government/reports', authorize(UserRole.GOVERNMENT_ADMIN));

export default router;

