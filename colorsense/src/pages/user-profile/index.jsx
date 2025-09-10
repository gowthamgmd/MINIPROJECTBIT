import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoTab from './components/PersonalInfoTab';
import StylePreferencesTab from './components/StylePreferencesTab';
import MoodTrackingTab from './components/MoodTrackingTab';
import NotificationSettingsTab from './components/NotificationSettingsTab';
import SecurityTab from './components/SecurityTab';
import SavedLocationsTab from './components/SavedLocationsTab';
import Icon from '../../components/AppIcon';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY 10001',
    weatherUnit: 'fahrenheit',
    timezone: 'America/New_York',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2024-03-15T10:30:00Z',
    totalRecommendations: 247,
    favoriteOutfits: 18,
    moodEntries: 156,
    daysActive: 89,
    stylePreferences: {
      clothingCategories: ['casual', 'business', 'formal'],
      preferredBrands: ['zara', 'hm', 'uniqlo'],
      sizes: {
        top: 'M',
        bottom: '8',
        shoe: '7.5'
      },
      colorPreferences: ['blue', 'black', 'white', 'gray'],
      avoidColors: ['yellow', 'orange'],
      stylePersonality: 'balanced',
      budgetRange: 'moderate'
    },
    notificationSettings: {
      weatherAlerts: true,
      outfitRecommendations: true,
      moodReminders: true,
      weeklyDigest: true,
      promotionalEmails: false,
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      weatherAlertTime: '07:00',
      moodReminderTime: '20:00',
      digestDay: 'sunday'
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2024-12-01T10:30:00Z'
    },
    moodSettings: {
      frequency: 'daily',
      enableRecommendations: true
    },
    savedLocations: [
      {
        id: 1,
        name: 'Home',
        address: 'New York, NY 10001',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        isPrimary: true,
        weatherUnit: 'fahrenheit'
      }
    ]
  };

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      component: PersonalInfoTab
    },
    {
      id: 'style',
      label: 'Style Preferences',
      icon: 'Palette',
      component: StylePreferencesTab
    },
    {
      id: 'mood',
      label: 'Mood Tracking',
      icon: 'Heart',
      component: MoodTrackingTab
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationSettingsTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecurityTab
    },
    {
      id: 'locations',
      label: 'Saved Locations',
      icon: 'MapPin',
      component: SavedLocationsTab
    }
  ];

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, fetch from API
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser({ ...mockUser, ...parsedUser });
      } else {
        setUser(mockUser);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    // In a real app, make API call to update profile
    console.log('Profile updated:', updates);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/user-login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation user={user} onLogout={handleLogout} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-body text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const ActiveTabComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <AuthenticationGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <HeaderNavigation user={user} onLogout={handleLogout} />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <ProfileHeader user={user} onUpdateProfile={handleUpdateProfile} />

            {/* Tab Navigation */}
            <div className="bg-card rounded-lg border border-border mb-6">
              {/* Desktop Tabs */}
              <div className="hidden md:flex border-b border-border">
                {tabs?.map(tab => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 px-6 py-4 font-body font-medium text-sm
                      border-b-2 transition-smooth
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Tab Selector */}
              <div className="md:hidden border-b border-border p-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e?.target?.value)}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 font-body text-foreground"
                >
                  {tabs?.map(tab => (
                    <option key={tab?.id} value={tab?.id}>
                      {tab?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {ActiveTabComponent && (
                  <ActiveTabComponent 
                    user={user} 
                    onUpdateProfile={handleUpdateProfile}
                  />
                )}
              </div>
            </div>

            {/* Data Export Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading font-medium text-foreground mb-4">
                Data & Privacy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <Icon name="Download" size={24} className="text-primary mx-auto mb-2" />
                  <h4 className="font-body font-medium text-foreground mb-1">
                    Export Data
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground mb-3">
                    Download all your profile data
                  </p>
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(user, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'colorsense-profile-data.json';
                      link?.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="font-caption text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    Download JSON
                  </button>
                </div>
                
                <div className="text-center p-4 border border-border rounded-lg">
                  <Icon name="Shield" size={24} className="text-secondary mx-auto mb-2" />
                  <h4 className="font-body font-medium text-foreground mb-1">
                    Privacy Policy
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground mb-3">
                    Learn how we protect your data
                  </p>
                  <button
                    onClick={() => window.open('/privacy-policy', '_blank')}
                    className="font-caption text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    Read Policy
                  </button>
                </div>
                
                <div className="text-center p-4 border border-border rounded-lg">
                  <Icon name="HelpCircle" size={24} className="text-accent mx-auto mb-2" />
                  <h4 className="font-body font-medium text-foreground mb-1">
                    Get Help
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground mb-3">
                    Contact support team
                  </p>
                  <button
                    onClick={() => window.open('mailto:support@colorsense.app', '_blank')}
                    className="font-caption text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationGuard>
  );
};

export default UserProfile;