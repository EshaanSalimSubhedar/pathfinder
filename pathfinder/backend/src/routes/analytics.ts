import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Analytics routes
router.get('/dashboard', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/user-stats', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/internship-stats', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/application-stats', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));
router.get('/matching-stats', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));

export default router;

