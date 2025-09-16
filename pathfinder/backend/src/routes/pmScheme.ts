import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.post('/apply', authorize(UserRole.STUDENT));
router.get('/my-applications', authorize(UserRole.STUDENT));
router.get('/eligibility-check', authorize(UserRole.STUDENT));

// Government Admin routes
router.get('/admin/applications', authorize(UserRole.GOVERNMENT_ADMIN));
router.put('/admin/verify/:applicationId', authorize(UserRole.GOVERNMENT_ADMIN));
router.get('/admin/analytics', authorize(UserRole.GOVERNMENT_ADMIN));

export default router;

