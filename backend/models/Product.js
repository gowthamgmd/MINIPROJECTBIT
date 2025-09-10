import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Basic Product Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  
  // Pricing (in Indian Rupees)
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than 0']
  },
  originalPrice: {
    type: Number,
    min: [1, 'Original price must be greater than 0']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [90, 'Discount cannot exceed 90%']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  
  // Product Classification
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'ethnic-wear',
      'western-wear', 
      'formal-wear',
      'casual-wear',
      'party-wear',
      'accessories',
      'footwear',
      'bags',
      'jewelry'
    ]
  },
  subcategory: {
    type: String,
    enum: [
      // Ethnic wear
      'saree', 'lehenga', 'anarkali', 'kurti', 'palazzo', 'dupatta',
      // Western wear
      'dress', 'top', 'blouse', 'jeans', 'trousers', 'skirt', 'shorts',
      // Formal wear
      'blazer', 'suit', 'shirt', 'formal-pants',
      // Accessories
      'handbag', 'clutch', 'scarf', 'belt', 'sunglasses',
      // Footwear
      'heels', 'flats', 'sandals', 'sneakers', 'boots',
      // Jewelry
      'earrings', 'necklace', 'bracelet', 'ring'
    ]
  },
  
  // Brand & Vendor
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    enum: [
      'FabIndia',
      'Biba',
      'W for Woman',
      'Global Desi',
      'Zara',
      'H&M',
      'Max Fashion',
      'Mango',
      'Forever 21',
      'Vero Moda',
      'Only',
      'AND',
      'Aurelia',
      'Jaipur Kurti',
      'Indya',
      'Libas',
      'Rangriti'
    ]
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Product Attributes
  colors: [{
    name: {
      type: String,
      enum: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Black', 'White', 'Gray', 'Brown', 'Navy', 'Maroon', 'Teal', 'Gold', 'Silver', 'Beige', 'Cream']
    },
    hexCode: String,
    available: {
      type: Boolean,
      default: true
    }
  }],
  sizes: [{
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '28', '30', '32', '34', '36', '38', '40', '42', '5', '6', '7', '8', '9', '10', 'One Size']
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  }],
  material: {
    type: String,
    enum: ['Cotton', 'Silk', 'Linen', 'Polyester', 'Chiffon', 'Georgette', 'Crepe', 'Denim', 'Leather', 'Wool', 'Lycra', 'Net', 'Velvet', 'Satin']
  },
  occasion: [{
    type: String,
    enum: ['Casual', 'Formal', 'Party', 'Wedding', 'Festival', 'Work', 'Date', 'Travel', 'Beach', 'Sports']
  }],
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Product Status
  isActive: {
    type: Boolean,
    default: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  totalStock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  
  // SEO
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  
  // Reviews & Ratings
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  
  // Sales Data
  salesCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  
  // Fashion AI Data
  styleProfile: {
    bodyTypes: [{
      type: String,
      enum: ['petite', 'tall', 'plus-size', 'athletic', 'pear', 'apple', 'hourglass', 'rectangle']
    }],
    ageGroups: [{
      type: String,
      enum: ['teen', 'young-adult', 'adult', 'mature']
    }],
    seasons: [{
      type: String,
      enum: ['spring', 'summer', 'monsoon', 'winter', 'all-season']
    }],
    moodTags: [{
      type: String,
      enum: ['confident', 'elegant', 'casual', 'bold', 'romantic', 'professional', 'trendy', 'comfortable']
    }]
  },
  
  // Delivery Information
  deliveryInfo: {
    estimatedDays: {
      type: Number,
      default: 7
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    freeShippingThreshold: {
      type: Number,
      default: 2000
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ salesCount: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1, inStock: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.price < this.originalPrice) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return this.discount || 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.totalStock === 0) return 'Out of Stock';
  if (this.totalStock < 5) return 'Limited Stock';
  return 'In Stock';
});

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Calculate total stock from sizes
  if (this.isModified('sizes')) {
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
    this.inStock = this.totalStock > 0;
  }
  
  // Set original price if not provided
  if (!this.originalPrice) {
    this.originalPrice = this.price;
  }
  
  next();
});

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true, inStock: true });
};

// Static method to find products in price range
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice },
    isActive: true,
    inStock: true
  });
};

// Instance method to update stock
productSchema.methods.updateStock = function(sizeRequested, quantity) {
  const sizeIndex = this.sizes.findIndex(s => s.size === sizeRequested);
  if (sizeIndex !== -1 && this.sizes[sizeIndex].stock >= quantity) {
    this.sizes[sizeIndex].stock -= quantity;
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
    this.inStock = this.totalStock > 0;
    this.salesCount += 1;
    return this.save();
  }
  throw new Error('Insufficient stock');
};

const Product = mongoose.model('Product', productSchema);

export default Product;
