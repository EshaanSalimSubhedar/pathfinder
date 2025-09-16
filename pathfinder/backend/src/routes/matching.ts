import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.get('/recommendations', authorize(UserRole.STUDENT));
router.post('/generate-matches', authorize(UserRole.STUDENT));

// Company routes
router.get('/candidate-recommendations/:internshipId', authorize(UserRole.EMPLOYER));

// Admin routes
router.get('/admin/analytics', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.post('/admin/batch-matching', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));

export default router;

