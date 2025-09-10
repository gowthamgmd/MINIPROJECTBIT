import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword, 
  deactivateAccount 
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { 
  validateRegistration, 
  validateLogin, 
  validateProfileUpdate 
} from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateLogin, asyncHandler(login));

// Protected routes
router.get('/profile', authenticate, asyncHandler(getProfile));
router.put('/profile', authenticate, validateProfileUpdate, asyncHandler(updateProfile));
router.put('/change-password', authenticate, asyncHandler(changePassword));
router.put('/deactivate', authenticate, asyncHandler(deactivateAccount));

export default router;
