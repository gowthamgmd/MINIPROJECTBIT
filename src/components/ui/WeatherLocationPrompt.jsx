import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const WeatherLocationPrompt = ({ 
  isOpen = false, 
  onLocationGranted = () => {}, 
  onLocationDenied = () => {}, 
  onClose = () => {} 
}) => {
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [isLoading, setIsLoading] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      checkExistingPermission();
    }
  }, [isOpen]);

  const checkExistingPermission = async () => {
    if ('geolocation' in navigator && 'permissions' in navigator) {
      try {
        const permission = await navigator.permissions?.query({ name: 'geolocation' });
        setPermissionState(permission?.state);
        
        if (permission?.state === 'granted') {
          getCurrentLocation();
        }
      } catch (error) {
        console.error('Permission check failed:', error);
        setPermissionState('prompt');
      }
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setShowManualInput(true);
      setIsLoading(false);
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        setIsLoading(false);
        onLocationGranted({
          latitude,
          longitude,
          source: 'gps'
        });
      },
      (error) => {
        setIsLoading(false);
        let errorMessage = 'Unable to get your location';
        
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = 'Location access denied';
            setPermissionState('denied');
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error?.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        setError(errorMessage);
        setShowManualInput(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleManualLocationSubmit = async () => {
    if (!manualLocation?.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real app, you would geocode the location using a service like Google Maps API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLocationGranted({
        location: manualLocation?.trim(),
        source: 'manual'
      });
      setIsLoading(false);
    } catch (error) {
      setError('Unable to find location. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDeny = () => {
    setPermissionState('denied');
    onLocationDenied();
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-300">
      <div className="bg-card rounded-lg shadow-elevated max-w-md w-full animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Location Access
                </h3>
                <p className="font-caption text-sm text-muted-foreground">
                  For weather-based recommendations
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {!showManualInput ? (
              <>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Cloud" size={32} className="text-primary" />
                  </div>
                  <p className="font-body text-foreground mb-2">
                    Get personalized outfit recommendations based on your local weather conditions.
                  </p>
                  <p className="font-caption text-sm text-muted-foreground">
                    We'll use your location to provide accurate weather data for better styling suggestions.
                  </p>
                </div>

                {error && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <p className="font-caption text-sm text-error">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={getCurrentLocation}
                    loading={isLoading}
                    iconName="MapPin"
                    iconPosition="left"
                    className="w-full"
                  >
                    {isLoading ? 'Getting Location...' : 'Allow Location Access'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowManualInput(true)}
                    iconName="Search"
                    iconPosition="left"
                    className="w-full"
                  >
                    Enter Location Manually
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-2">
                      Enter Your Location
                    </h4>
                    <p className="font-caption text-sm text-muted-foreground mb-4">
                      Type your city name or zip code to get weather-based outfit recommendations.
                    </p>
                  </div>

                  <Input
                    label="Location"
                    type="text"
                    placeholder="e.g., New York, NY or 10001"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e?.target?.value)}
                    error={error}
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        handleManualLocationSubmit();
                      }
                    }}
                  />

                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={handleManualLocationSubmit}
                      loading={isLoading}
                      iconName="Check"
                      iconPosition="left"
                      className="w-full"
                    >
                      {isLoading ? 'Finding Location...' : 'Use This Location'}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowManualInput(false);
                        setError('');
                        setManualLocation('');
                      }}
                      className="w-full"
                    >
                      Back to GPS Option
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Footer Actions */}
            <div className="border-t border-border pt-4 mt-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSkip}
                  className="font-caption text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Skip for now
                </button>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Shield" size={14} />
                  <span className="font-caption text-xs">
                    Location data stays private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLocationPrompt;