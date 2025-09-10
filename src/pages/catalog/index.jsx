import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const Catalog = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load wishlist and cart from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'ethnic', label: 'Ethnic Wear' },
    { value: 'western', label: 'Western Wear' },
    { value: 'formal', label: 'Formal Wear' },
    { value: 'casual', label: 'Casual Wear' },
    { value: 'party', label: 'Party Wear' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'footwear', label: 'Footwear' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-1000', label: 'Under ₹1,000' },
    { value: '1000-3000', label: '₹1,000 - ₹3,000' },
    { value: '3000-8000', label: '₹3,000 - ₹8,000' },
    { value: '8000-20000', label: '₹8,000 - ₹20,000' },
    { value: 'above-20000', label: 'Above ₹20,000' }
  ];

  const brands = [
    { value: 'all', label: 'All Brands' },
    { value: 'fabindia', label: 'FabIndia' },
    { value: 'w', label: 'W for Woman' },
    { value: 'biba', label: 'Biba' },
    { value: 'global-desi', label: 'Global Desi' },
    { value: 'zara', label: 'Zara' },
    { value: 'h&m', label: 'H&M' },
    { value: 'max', label: 'Max Fashion' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  // Mock product data with Indian fashion items and pricing
  const products = [
    {
      id: 1,
      name: 'Designer Anarkali Suit',
      brand: 'Biba',
      category: 'ethnic',
      price: 2499,
      originalPrice: 3999,
      discount: 37,
      rating: 4.5,
      reviews: 156,
      image: '👗',
      colors: ['Navy', 'Maroon', 'Teal'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Elegant Anarkali suit perfect for festivals and celebrations'
    },
    {
      id: 2,
      name: 'Cotton Kurti with Palazzo',
      brand: 'W for Woman',
      category: 'casual',
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      rating: 4.3,
      reviews: 89,
      image: '👔',
      colors: ['White', 'Pink', 'Yellow'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Comfortable cotton kurti with matching palazzo pants'
    },
    {
      id: 3,
      name: 'Formal Blazer Set',
      brand: 'Zara',
      category: 'formal',
      price: 4999,
      originalPrice: 6999,
      discount: 28,
      rating: 4.7,
      reviews: 234,
      image: '🧥',
      colors: ['Black', 'Navy', 'Grey'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Professional blazer set for office and business meetings'
    },
    {
      id: 4,
      name: 'Handwoven Silk Saree',
      brand: 'FabIndia',
      category: 'ethnic',
      price: 8999,
      originalPrice: 12999,
      discount: 30,
      rating: 4.8,
      reviews: 67,
      image: '👘',
      colors: ['Red', 'Blue', 'Green'],
      sizes: ['One Size'],
      description: 'Beautiful handwoven silk saree with traditional motifs'
    },
    {
      id: 5,
      name: 'Party Dress',
      brand: 'H&M',
      category: 'party',
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      rating: 4.4,
      reviews: 112,
      image: '💃',
      colors: ['Black', 'Red', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L'],
      description: 'Stylish party dress for special occasions'
    },
    {
      id: 6,
      name: 'Leather Handbag',
      brand: 'Global Desi',
      category: 'accessories',
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      rating: 4.2,
      reviews: 78,
      image: '👜',
      colors: ['Brown', 'Black', 'Tan'],
      sizes: ['One Size'],
      description: 'Premium leather handbag with multiple compartments'
    },
    {
      id: 7,
      name: 'Casual Sneakers',
      brand: 'Max Fashion',
      category: 'footwear',
      price: 1599,
      originalPrice: 2299,
      discount: 30,
      rating: 4.1,
      reviews: 203,
      image: '👟',
      colors: ['White', 'Black', 'Pink'],
      sizes: ['5', '6', '7', '8', '9', '10'],
      description: 'Comfortable sneakers for daily wear'
    },
    {
      id: 8,
      name: 'Designer Lehenga',
      brand: 'Biba',
      category: 'ethnic',
      price: 15999,
      originalPrice: 22999,
      discount: 30,
      rating: 4.9,
      reviews: 45,
      image: '👗',
      colors: ['Pink', 'Blue', 'Gold'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Exquisite designer lehenga for weddings and special occasions'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === selectedBrand;
    
    let matchesPrice = true;
    if (selectedPriceRange !== 'all') {
      switch (selectedPriceRange) {
        case 'under-1000':
          matchesPrice = product.price < 1000;
          break;
        case '1000-3000':
          matchesPrice = product.price >= 1000 && product.price <= 3000;
          break;
        case '3000-8000':
          matchesPrice = product.price >= 3000 && product.price <= 8000;
          break;
        case '8000-20000':
          matchesPrice = product.price >= 8000 && product.price <= 20000;
          break;
        case 'above-20000':
          matchesPrice = product.price > 20000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const toggleWishlist = (productId) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Fashion Catalog
                </h1>
                <p className="font-body text-muted-foreground">
                  Discover the latest trends in Indian and Western fashion
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/wishlist')}
                  iconName="Heart"
                  className="relative"
                >
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
                <Button 
                  onClick={() => navigate('/cart')}
                  iconName="ShoppingBag"
                  className="relative"
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  iconName="Search"
                />
              </div>
              
              <Select
                label=""
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
                placeholder="Category"
              />
              
              <Select
                label=""
                value={selectedPriceRange}
                onChange={setSelectedPriceRange}
                options={priceRanges}
                placeholder="Price Range"
              />
              
              <Select
                label=""
                value={selectedBrand}
                onChange={setSelectedBrand}
                options={brands}
                placeholder="Brand"
              />
              
              <Select
                label=""
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                placeholder="Sort By"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Grid3X3">
                Grid
              </Button>
              <Button variant="ghost" size="sm" iconName="List">
                List
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Product Image */}
                <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl">{product.image}</div>
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      wishlist.includes(product.id)
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-white/90 text-muted-foreground hover:bg-white'
                    }`}
                  >
                    <Icon name="Heart" size={16} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {product.brand}
                    </p>
                    <h3 className="font-heading font-semibold text-foreground truncate">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-warning fill-current'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-heading font-bold text-lg text-foreground">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="flex items-center space-x-1 mb-3">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{
                          backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                         color.toLowerCase() === 'black' ? '#000000' :
                                         color.toLowerCase() === 'red' ? '#ef4444' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                         color.toLowerCase() === 'pink' ? '#ec4899' :
                                         color.toLowerCase() === 'yellow' ? '#eab308' :
                                         color.toLowerCase() === 'green' ? '#22c55e' :
                                         color.toLowerCase() === 'brown' ? '#a3745b' :
                                         color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#6b7280' :
                                         color.toLowerCase() === 'maroon' ? '#7f1d1d' :
                                         color.toLowerCase() === 'teal' ? '#14b8a6' :
                                         color.toLowerCase() === 'gold' ? '#d4af37' :
                                         color.toLowerCase() === 'tan' ? '#d2b48c' :
                                         '#9ca3af'
                        }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{product.colors.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => addToCart(product)}
                      iconName="ShoppingBag"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/product/${product.id}`)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                No products found
              </h3>
              <p className="font-body text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPriceRange('all');
                  setSelectedBrand('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="text-center pt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
