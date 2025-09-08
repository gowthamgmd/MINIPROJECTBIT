import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import WeatherLocationPrompt from '../../components/ui/WeatherLocationPrompt';
import TodayOutfitCard from './components/TodayOutfitCard';
import WeatherWidget from './components/WeatherWidget';
import RecommendationHistory from './components/RecommendationHistory';
import MoodTracker from './components/MoodTracker';
import QuickActions from './components/QuickActions';
import PersonalizedInsights from './components/PersonalizedInsights';
import Icon from '../../components/AppIcon';


const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    lastLogin: new Date(),
    totalOutfits: 47,
    favoriteColors: ['Blue', 'Purple', 'Orange'],
    styleScore: 8.4
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check for location permission
    checkLocationStatus();
  }, []);

  const checkLocationStatus = () => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    } else {
      // Show location prompt after a brief delay
      setTimeout(() => {
        setShowLocationPrompt(true);
      }, 1000);
    }
  };

  const handleLocationGranted = (locationData) => {
    setUserLocation(locationData);
    localStorage.setItem('userLocation', JSON.stringify(locationData));
    setShowLocationPrompt(false);
  };

  const handleLocationDenied = () => {
    setShowLocationPrompt(false);
    // Use default location
    const defaultLocation = {
      location: 'New York, NY',
      source: 'default'
    };
    setUserLocation(defaultLocation);
    localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userLocation');
    setUser(null);
    navigate('/user-login');
  };

  const handleRefreshOutfit = () => {
    // In real app, this would trigger new outfit generation
    console.log('Refreshing outfit recommendations...');
  };

  const handleViewAlternatives = () => {
    // Navigate to outfit alternatives or show modal
    console.log('Viewing outfit alternatives...');
  };

  const handleViewOutfit = (outfit) => {
    // Navigate to outfit details or show modal
    console.log('Viewing outfit:', outfit);
  };

  const handleSaveOutfit = (outfit) => {
    // Save outfit to favorites
    console.log('Saving outfit:', outfit);
  };

  const handleNewMoodAssessment = () => {
    // Navigate to mood assessment or show modal
    console.log('Starting new mood assessment...');
  };

  const handleLocationChange = () => {
    setShowLocationPrompt(true);
  };

  const handleMoodAssessment = () => {
    console.log('Opening mood assessment...');
  };

  const handleWeatherUpdate = () => {
    console.log('Updating weather data...');
  };

  const handleBrowseCatalog = () => {
    console.log('Browsing catalog...');
  };

  const handleViewProfile = () => {
    navigate('/user-profile');
  };

  const handleViewInsightDetails = () => {
    console.log('Viewing detailed insights...');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="font-body text-muted-foreground">
                  Ready to discover your perfect outfit for today? Let's make you look amazing.
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-caption text-sm text-muted-foreground">
                    Last login
                  </p>
                  <p className="font-body font-medium text-foreground">
                    {dashboardData?.lastLogin?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Today's Outfit */}
              <TodayOutfitCard
                weatherData={userLocation}
                moodData={null}
                onRefresh={handleRefreshOutfit}
                onViewAlternatives={handleViewAlternatives}
              />

              {/* Recommendation History */}
              <RecommendationHistory
                onViewOutfit={handleViewOutfit}
                onSaveOutfit={handleSaveOutfit}
              />

              {/* Personalized Insights */}
              <PersonalizedInsights
                onViewDetails={handleViewInsightDetails}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Weather Widget */}
              <WeatherWidget
                location={userLocation?.location}
                onLocationChange={handleLocationChange}
              />

              {/* Mood Tracker */}
              <MoodTracker
                onNewMoodAssessment={handleNewMoodAssessment}
              />

              {/* Quick Actions */}
              <QuickActions
                onMoodAssessment={handleMoodAssessment}
                onWeatherUpdate={handleWeatherUpdate}
                onBrowseCatalog={handleBrowseCatalog}
                onViewProfile={handleViewProfile}
              />
            </div>
          </div>

          {/* Bottom Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Shirt" size={20} className="text-primary" />
              </div>
              <p className="font-heading font-bold text-2xl text-foreground">
                {dashboardData?.totalOutfits}
              </p>
              <p className="font-caption text-sm text-muted-foreground">
                Outfits Created
              </p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Palette" size={20} className="text-accent" />
              </div>
              <p className="font-heading font-bold text-2xl text-foreground">
                {dashboardData?.favoriteColors?.length}
              </p>
              <p className="font-caption text-sm text-muted-foreground">
                Favorite Colors
              </p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Star" size={20} className="text-secondary" />
              </div>
              <p className="font-heading font-bold text-2xl text-foreground">
                {dashboardData?.styleScore}
              </p>
              <p className="font-caption text-sm text-muted-foreground">
                Style Score
              </p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <p className="font-heading font-bold text-2xl text-foreground">
                91%
              </p>
              <p className="font-caption text-sm text-muted-foreground">
                Mood Match
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Location Permission Prompt */}
      <WeatherLocationPrompt
        isOpen={showLocationPrompt}
        onLocationGranted={handleLocationGranted}
        onLocationDenied={handleLocationDenied}
        onClose={() => setShowLocationPrompt(false)}
      />
    </div>
  );
};

export default UserDashboard;