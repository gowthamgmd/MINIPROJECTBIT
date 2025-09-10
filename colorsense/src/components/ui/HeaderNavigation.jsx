import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const HeaderNavigation = ({ user = null, onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: "Today\'s Outfit",
      path: '/user-dashboard',
      icon: 'Home',
      tooltip: "Get today\'s weather-based recommendations"
    },
    {
      label: 'My Style',
      path: '/user-profile',
      icon: 'User',
      tooltip: "Manage your style preferences"
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    navigate('/user-login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.mobile-menu') && !event?.target?.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
      if (!event?.target?.closest('.user-menu') && !event?.target?.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Palette" size={20} color="white" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground">
              ColorSense
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium text-sm
                transition-smooth relative group
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="user-menu-button flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="user-menu absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-body font-medium text-sm text-foreground">
                      {user?.name || 'User'}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavigation('/user-profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name="Settings" size={16} />
                    <span className="font-body text-sm">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-muted transition-smooth text-error"
                  >
                    <Icon name="LogOut" size={16} />
                    <span className="font-body text-sm">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/user-login')}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/user-registration')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="mobile-menu-button md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-left
                  transition-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {user ? (
              <>
                <div className="border-t border-border my-4"></div>
                <div className="px-4 py-2">
                  <p className="font-body font-medium text-sm text-foreground">
                    {user?.name || 'User'}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleNavigation('/user-profile');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-left text-error hover:bg-error/10 transition-smooth"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-border my-4"></div>
                <button
                  onClick={() => handleNavigation('/user-login')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="LogIn" size={20} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavigation('/user-registration')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-left bg-primary text-primary-foreground"
                >
                  <Icon name="UserPlus" size={20} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNavigation;