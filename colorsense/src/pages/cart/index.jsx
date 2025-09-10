import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const applyPromoCode = () => {
    const validCodes = {
      'FIRST10': 10,
      'SAVE20': 20,
      'WELCOME': 15,
      'FESTIVE25': 25
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = subtotal > 2000 ? 0 : 99;
  const total = subtotal - discountAmount + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      navigate('/orders');
      // Clear cart after successful checkout
      setCartItems([]);
      localStorage.removeItem('cart');
      alert('Order placed successfully! ₹' + total.toLocaleString('en-IN'));
    }, 2000);
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
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Shopping Cart ({cartItems.length} items)
            </h1>
            <p className="font-body text-muted-foreground">
              Review your items and proceed to checkout
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                Your cart is empty
              </h3>
              <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Discover our curated Indian fashion collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/catalog')} iconName="Search">
                  Browse Catalog
                </Button>
                <Button variant="outline" onClick={() => navigate('/ai-chat')} iconName="Bot">
                  Get AI Recommendations
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Cart Items
                  </h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-3xl">{item.image || '👗'}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-heading font-medium text-foreground mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Brand: {item.brand}
                          </p>
                          <p className="font-heading font-semibold text-lg text-primary">
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="font-medium text-foreground w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-heading font-semibold text-lg text-foreground mb-2">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={() => navigate('/catalog')}>
                        Continue Shopping
                      </Button>
                      <Button variant="ghost" onClick={() => setCartItems([])}>
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <Button onClick={applyPromoCode} size="sm">
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-success mt-1">
                        {discount}% discount applied!
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount ({discount}%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium">
                        {deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                    
                    {deliveryFee > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free delivery on orders above ₹2,000
                      </p>
                    )}
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-heading font-semibold text-lg">Total</span>
                        <span className="font-heading font-bold text-xl text-primary">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    loading={loading}
                    className="w-full"
                    size="lg"
                    iconName="CreditCard"
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>

                  {/* Payment Info */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      We accept
                    </p>
                    <div className="flex justify-center space-x-3">
                      <div className="px-3 py-2 bg-muted rounded">UPI</div>
                      <div className="px-3 py-2 bg-muted rounded">Card</div>
                      <div className="px-3 py-2 bg-muted rounded">Wallet</div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Shield" size={16} />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
