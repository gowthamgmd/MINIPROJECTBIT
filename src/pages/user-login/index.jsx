import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@colorsense.com',
    password: 'demo123'
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.');
        setIsLoading(false);
        return;
      }
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      if (formData?.rememberMe) {
        localStorage.setItem('rememberUser', 'true');
      }
      navigate('/user-dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      const mockSocialUser = {
        id: 'social_user_456',
        name: provider === 'google' ? 'Sarah Wilson' : 'Mike Chen',
        email: provider === 'google' ? 'sarah@gmail.com' : 'mike@facebook.com',
        avatar: provider === 'google' ?'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' :'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        preferences: {
          style: 'trendy',
          colors: ['pink', 'purple', 'black'],
          weatherSensitive: true
        },
        joinedDate: new Date()?.toISOString()?.split('T')?.[0]
      };

      // Store auth data
      localStorage.setItem('authToken', `${provider}_token_` + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockSocialUser));

      // Navigate to dashboard
      navigate('/user-dashboard');
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <Icon name="Palette" size={40} color="white" />
              </div>
              <h2 className="font-heading font-bold text-3xl mb-4">
                Your Style, Perfected
              </h2>
              <p className="font-body text-lg text-white/90 mb-8">
                Discover personalized outfit recommendations that match your mood and the weather, powered by color psychology and AI.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Cloud" size={16} />
                  <span>Weather-based suggestions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} />
                  <span>Mood-driven colors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={16} />
                  <span>AI-powered styling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="ShoppingBag" size={16} />
                  <span>Shop recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <WelcomeHeader />
            
            <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
              <SocialLoginButtons 
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />
              
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground font-caption">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              <LoginForm 
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />

              <div className="mt-6 text-center">
                <p className="font-caption text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/user-registration" 
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>

              <SecurityBadges />
            </div>

            {/* Mobile Branding */}
            <div className="lg:hidden mt-8 text-center">
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Cloud" size={16} className="text-primary" />
                  <span>Weather-based</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Heart" size={16} className="text-primary" />
                  <span>Mood-driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;