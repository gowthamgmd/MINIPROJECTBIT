import express from 'express';
import { 
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticate);

// Cart operations
router.get('/', asyncHandler(getCart));
router.post('/add', asyncHandler(addToCart));
router.put('/item/:itemId', asyncHandler(updateCartItem));
router.delete('/item/:itemId', asyncHandler(removeFromCart));
router.delete('/clear', asyncHandler(clearCart));

export default router;
