import express from 'express';
import { 
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands,
  getFeaturedProducts
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Public routes
router.get('/', asyncHandler(getProducts));
router.get('/featured', asyncHandler(getFeaturedProducts));
router.get('/categories', asyncHandler(getCategories));
router.get('/brands', asyncHandler(getBrands));
router.get('/:id', asyncHandler(getProduct));

// Admin routes
router.post('/', authenticate, authorize('admin'), validateProduct, asyncHandler(createProduct));
router.put('/:id', authenticate, authorize('admin'), validateProduct, asyncHandler(updateProduct));
router.delete('/:id', authenticate, authorize('admin'), asyncHandler(deleteProduct));

export default router;
