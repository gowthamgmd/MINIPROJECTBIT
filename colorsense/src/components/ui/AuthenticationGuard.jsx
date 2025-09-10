import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ children, requireAuth = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Protected routes that require authentication
  const protectedRoutes = ['/user-dashboard', '/user-profile'];
  
  // Public routes that redirect authenticated users
  const publicRoutes = ['/user-login', '/user-registration'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check localStorage for auth token
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userData');
      
      if (token && user) {
        // Validate token (in real app, make API call to verify)
        const userData = JSON.parse(user);
        if (userData && userData?.id) {
          setIsAuthenticated(true);
        } else {
          // Invalid user data, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear potentially corrupted data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-body text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const currentPath = location?.pathname;
  const isProtectedRoute = protectedRoutes?.includes(currentPath);
  const isPublicRoute = publicRoutes?.includes(currentPath);

  // Redirect logic
  if (isProtectedRoute && !isAuthenticated) {
    // User trying to access protected route without authentication
    return <Navigate to="/user-login" state={{ from: currentPath }} replace />;
  }

  if (isPublicRoute && isAuthenticated) {
    // Authenticated user trying to access login/register pages
    const redirectTo = location?.state?.from || '/user-dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  // Default redirect for root path
  if (currentPath === '/') {
    if (isAuthenticated) {
      return <Navigate to="/user-dashboard" replace />;
    } else {
      return <Navigate to="/user-login" replace />;
    }
  }

  return children;
};

export default AuthenticationGuard;