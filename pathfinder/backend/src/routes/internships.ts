import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';
import { validateInternshipCreation } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Public internship routes (with optional auth)
router.get('/', /* optionalAuth middleware */);
router.get('/search', /* optionalAuth middleware */);
router.get('/:id', /* optionalAuth middleware */);

// Company routes
router.post('/', authorize(UserRole.EMPLOYER), validateInternshipCreation);
router.put('/:id', authorize(UserRole.EMPLOYER));
router.delete('/:id', authorize(UserRole.EMPLOYER));
router.get('/company/my-internships', authorize(UserRole.EMPLOYER));

// Admin routes
router.get('/admin/all', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN));

export default router;

