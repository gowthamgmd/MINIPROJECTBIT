import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Share2, ArrowLeft } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Sample product data
  useEffect(() => {
    // Simulate API call
    setProduct({
      id: '1',
      name: 'Cotton Anarkali Kurta Set with Dupatta',
      brand: 'Fabindia',
      price: 2999,
      originalPrice: 4499,
      rating: 4.5,
      reviewCount: 145,
      description: 'Beautiful hand-embroidered cotton Anarkali kurta with matching dupatta and palazzo pants. Perfect for festive occasions and celebrations. Made from premium cotton with intricate traditional Indian embroidery work.',
      features: [
        'Premium quality cotton fabric',
        'Hand-embroidered traditional motifs',
        'Matching dupatta and palazzo pants included',
        'Comfortable fit for all-day wear',
        'Machine washable',
        'Made in India'
      ],
      colors: [
        { name: 'Royal Blue', value: '#4169E1', available: true },
        { name: 'Maroon', value: '#800000', available: true },
        { name: 'Emerald Green', value: '#50C878', available: false },
        { name: 'Golden Yellow', value: '#FFD700', available: true }
      ],
      sizes: [
        { name: 'XS', available: true },
        { name: 'S', available: true },
        { name: 'M', available: true },
        { name: 'L', available: true },
        { name: 'XL', available: false },
        { name: 'XXL', available: true }
      ],
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1583391733956-6c78e990cdfb?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop'
      ],
      category: 'Ethnic Wear',
      stock: 25,
      deliveryInfo: {
        standard: '3-5 business days',
        express: '1-2 business days'
      },
      sizeGuide: {
        XS: { bust: '32"', waist: '26"', hip: '36"' },
        S: { bust: '34"', waist: '28"', hip: '38"' },
        M: { bust: '36"', waist: '30"', hip: '40"' },
        L: { bust: '38"', waist: '32"', hip: '42"' },
        XL: { bust: '40"', waist: '34"', hip: '44"' },
        XXL: { bust: '42"', waist: '36"', hip: '46"' }
      },
      reviews: [
        {
          id: 1,
          user: 'Priya S.',
          rating: 5,
          comment: 'Absolutely beautiful kurta set! The embroidery work is exquisite and the fabric quality is excellent.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          user: 'Anjali M.',
          rating: 4,
          comment: 'Good quality and comfortable fit. Perfect for festivals. Delivery was also quick.',
          date: '2024-01-10',
          verified: true
        },
        {
          id: 3,
          user: 'Meera K.',
          rating: 5,
          comment: 'Love the traditional design! Got so many compliments when I wore this for Diwali.',
          date: '2024-01-08',
          verified: false
        }
      ]
    });

    // Set default selections
    setSelectedColor('Royal Blue');
    setSelectedSize('M');
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Added to cart successfully!');
    }, 1000);
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
    alert(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.brand}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-4 aspect-h-5 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                    activeImageIndex === index ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {discount}% OFF
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name
                        ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-800'
                        : 'border-gray-300'
                    } ${
                      !color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size: {selectedSize}</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`py-2 px-3 border text-sm font-medium rounded-md ${
                      selectedSize === size.name
                        ? 'border-gray-800 bg-gray-800 text-white'
                        : 'border-gray-300 text-gray-900 bg-white hover:bg-gray-50'
                    } ${
                      !size.available ? 'opacity-50 cursor-not-allowed line-through' : ''
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="text-sm text-gray-600">
                  ({product.stock} in stock)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  disabled={loading || !selectedColor || !selectedSize}
                  className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-3 border rounded-lg font-semibold transition-colors ${
                    inWishlist
                      ? 'border-pink-500 text-pink-500 bg-pink-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={shareProduct}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Product
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Features & Benefits</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Shipping</p>
                  <p className="text-xs text-gray-600">Above ₹2000</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                  <p className="text-xs text-gray-600">15 days</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Authentic</p>
                  <p className="text-xs text-gray-600">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-orange-500 py-2 px-1 text-sm font-medium text-orange-600">
                Description
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Size Guide
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          {/* Description Tab */}
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <h4 className="text-md font-medium text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Care Instructions</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Machine wash cold with similar colors</li>
                    <li>• Do not bleach or use harsh detergents</li>
                    <li>• Tumble dry on low heat or air dry</li>
                    <li>• Iron on medium heat if needed</li>
                    <li>• Professional dry cleaning recommended for best results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Customer Reviews</h3>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{review.user}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
