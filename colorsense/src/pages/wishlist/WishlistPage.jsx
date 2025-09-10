import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Eye, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sample wishlist data
  useEffect(() => {
    setWishlistItems([
      {
        id: '1',
        productId: 'prod1',
        name: 'Chanderi Suit Set',
        brand: 'W for Woman',
        price: 3499,
        originalPrice: 4999,
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop',
        colors: ['Peach', 'Mint Green', 'Lavender'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7,
        reviews: 38,
        inStock: true,
        addedDate: '2024-01-15'
      },
      {
        id: '2',
        productId: 'prod2',
        name: 'Banarasi Silk Lehenga',
        brand: 'Sabyasachi',
        price: 15999,
        originalPrice: 22999,
        image: 'https://images.unsplash.com/photo-1583391733956-6c78e990cdfb?w=300&h=400&fit=crop',
        colors: ['Gold', 'Maroon', 'Navy Blue'],
        sizes: ['XS', 'S', 'M', 'L'],
        rating: 4.9,
        reviews: 125,
        inStock: true,
        addedDate: '2024-01-10'
      },
      {
        id: '3',
        productId: 'prod3',
        name: 'Khadi Cotton Kurta',
        brand: 'Fabindia',
        price: 1299,
        originalPrice: 1899,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
        colors: ['White', 'Beige', 'Light Blue'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        rating: 4.3,
        reviews: 67,
        inStock: false,
        addedDate: '2024-01-08'
      },
      {
        id: '4',
        productId: 'prod4',
        name: 'Embroidered Palazzo Set',
        brand: 'Biba',
        price: 2199,
        originalPrice: 3199,
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop',
        colors: ['Pink', 'Yellow', 'Turquoise'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.4,
        reviews: 89,
        inStock: true,
        addedDate: '2024-01-05'
      }
    ]);
  }, []);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // Add to cart logic
    alert(`${item.name} added to cart!`);
  };

  const shareItem = (item) => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this amazing ${item.name} from ${item.brand}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }

    return stars;
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Heart className="mx-auto h-48 w-48 text-gray-300" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Save your favorite Indian fashion items and never lose track of them!
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors inline-flex items-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Start Adding Favorites
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="mr-3 h-8 w-8 text-pink-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">{wishlistItems.length} items saved for later</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <button
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="View Product"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareItem(item)}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Share"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Out of Stock
                  </div>
                )}

                {/* Discount Badge */}
                {item.originalPrice > item.price && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-sm hover:bg-red-50 transition-colors group-hover:hidden"
                  title="Remove from Wishlist"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600">by {item.brand}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-sm">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Available Options */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {item.colors.length > 3 && (
                      <span className="text-xs text-gray-600">+{item.colors.length - 3}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    Sizes: {item.sizes.join(', ')}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </button>
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-500 mt-3">
                  Added on {new Date(item.addedDate).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Love everything?</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Add all available items to your cart at once
            </p>
            <button
              onClick={() => {
                const availableItems = wishlistItems.filter(item => item.inStock);
                if (availableItems.length > 0) {
                  alert(`${availableItems.length} items added to cart!`);
                }
              }}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/catalog')}
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
