import { Router } from 'express';
import { authenticate, authorize, UserRole } from '../middleware/auth';
import {
  getStudentProfile,
  updateStudentProfile,
  getCompanyProfile,
  updateCompanyProfile,
  uploadDocument,
  deleteDocument
} from '../controllers/userController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Student profile routes
router.get('/student/profile', authorize(UserRole.STUDENT), getStudentProfile);
router.put('/student/profile', authorize(UserRole.STUDENT), updateStudentProfile);
router.post('/student/upload-document', authorize(UserRole.STUDENT), uploadDocument);
router.delete('/student/document/:documentId', authorize(UserRole.STUDENT), deleteDocument);

// Company profile routes
router.get('/company/profile', authorize(UserRole.EMPLOYER), getCompanyProfile);
router.put('/company/profile', authorize(UserRole.EMPLOYER), updateCompanyProfile);
router.post('/company/upload-document', authorize(UserRole.EMPLOYER), uploadDocument);
router.delete('/company/document/:documentId', authorize(UserRole.EMPLOYER), deleteDocument);

// Admin routes
router.get('/admin/users', authorize(UserRole.ADMIN, UserRole.GOVERNMENT_ADMIN), getStudentProfile);

export default router;

