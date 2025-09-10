import express from 'express';
import { 
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  removeFromWishlistByProduct,
  clearWishlist,
  checkWishlistStatus
} from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// All wishlist routes require authentication
router.use(authenticate);

// Wishlist operations
router.get('/', asyncHandler(getWishlist));
router.post('/add', asyncHandler(addToWishlist));
router.delete('/item/:itemId', asyncHandler(removeFromWishlist));
router.delete('/product/:productId', asyncHandler(removeFromWishlistByProduct));
router.delete('/clear', asyncHandler(clearWishlist));
router.get('/check/:productId', asyncHandler(checkWishlistStatus));

export default router;
