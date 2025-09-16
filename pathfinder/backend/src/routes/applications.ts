import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';
import { validateApplicationSubmission } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.post('/', authorize(UserRole.STUDENT), validateApplicationSubmission);
router.get('/my-applications', authorize(UserRole.STUDENT));
router.get('/:id', authorize(UserRole.STUDENT));
router.put('/:id/withdraw', authorize(UserRole.STUDENT));

// Company routes
router.get('/company/received', authorize(UserRole.EMPLOYER));
router.put('/:id/status', authorize(UserRole.EMPLOYER));
router.post('/:id/evaluate', authorize(UserRole.EMPLOYER));

// Admin routes
router.get('/admin/all', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));

export default router;

