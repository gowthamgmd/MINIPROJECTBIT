// Validation middleware for request data
export const validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = [];

  // Name validation
  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  
  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { name, description, price, category, brand } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Product name must be at least 2 characters long');
  }

  if (!description || description.trim().length < 10) {
    errors.push('Product description must be at least 10 characters long');
  }

  if (!price || isNaN(price) || price <= 0) {
    errors.push('Price must be a positive number');
  }

  if (!category || category.trim().length < 2) {
    errors.push('Category is required');
  }

  if (!brand || brand.trim().length < 2) {
    errors.push('Brand is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateOrder = (req, res, next) => {
  const { items, shippingAddress } = req.body;
  const errors = [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (items && Array.isArray(items)) {
    items.forEach((item, index) => {
      if (!item.product || !item.quantity || item.quantity <= 0) {
        errors.push(`Item ${index + 1} must have a valid product and quantity`);
      }
    });
  }

  if (!shippingAddress) {
    errors.push('Shipping address is required');
  } else {
    const { street, city, state, pincode, phone } = shippingAddress;
    
    if (!street || street.trim().length < 5) {
      errors.push('Street address must be at least 5 characters long');
    }
    
    if (!city || city.trim().length < 2) {
      errors.push('City is required');
    }
    
    if (!state || state.trim().length < 2) {
      errors.push('State is required');
    }
    
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      errors.push('Pincode must be a valid 6-digit number');
    }
    
    if (!phone || !/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      errors.push('Phone number must be a valid 10-digit number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateProfileUpdate = (req, res, next) => {
  const { name, phone, preferences } = req.body;
  const errors = [];

  if (name && name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (phone && !/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
    errors.push('Phone number must be a valid 10-digit number');
  }

  if (preferences) {
    const { colorPreferences, stylePreferences, sizePreferences } = preferences;
    
    if (colorPreferences && (!Array.isArray(colorPreferences) || colorPreferences.length === 0)) {
      errors.push('Color preferences must be a non-empty array');
    }
    
    if (stylePreferences && (!Array.isArray(stylePreferences) || stylePreferences.length === 0)) {
      errors.push('Style preferences must be a non-empty array');
    }
    
    if (sizePreferences && typeof sizePreferences !== 'object') {
      errors.push('Size preferences must be an object');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const errors = [];

  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    errors.push('Rating must be a number between 1 and 5');
  }

  if (comment && comment.trim().length > 500) {
    errors.push('Comment must be less than 500 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export default {
  validateRegistration,
  validateLogin,
  validateProduct,
  validateOrder,
  validateProfileUpdate,
  validateReview
};
