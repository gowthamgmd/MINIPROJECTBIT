import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SavedLocationsTab = ({ user, onUpdateProfile }) => {
  const [locations, setLocations] = useState(user?.savedLocations || [
    {
      id: 1,
      name: 'Home',
      address: 'New York, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      isPrimary: true,
      weatherUnit: 'fahrenheit'
    },
    {
      id: 2,
      name: 'Work',
      address: 'Manhattan, NY 10016',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      isPrimary: false,
      weatherUnit: 'fahrenheit'
    }
  ]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    weatherUnit: 'fahrenheit'
  });
  const [isSearching, setIsSearching] = useState(false);

  const weatherUnitOptions = [
    { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
    { value: 'celsius', label: 'Celsius (°C)' }
  ];

  const handleAddLocation = async () => {
    if (!newLocation?.name?.trim() || !newLocation?.address?.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      // Simulate geocoding API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const location = {
        id: Date.now(),
        name: newLocation?.name?.trim(),
        address: newLocation?.address?.trim(),
        coordinates: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: -74.0060 + (Math.random() - 0.5) * 0.1
        },
        isPrimary: false,
        weatherUnit: newLocation?.weatherUnit
      };

      const updatedLocations = [...locations, location];
      setLocations(updatedLocations);
      onUpdateProfile({ savedLocations: updatedLocations });
      
      setNewLocation({ name: '', address: '', weatherUnit: 'fahrenheit' });
      setIsAddingLocation(false);
    } catch (error) {
      console.error('Failed to add location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteLocation = (locationId) => {
    const locationToDelete = locations?.find(loc => loc?.id === locationId);
    
    if (locationToDelete?.isPrimary) {
      alert('Cannot delete primary location. Set another location as primary first.');
      return;
    }

    if (confirm('Are you sure you want to delete this location?')) {
      const updatedLocations = locations?.filter(loc => loc?.id !== locationId);
      setLocations(updatedLocations);
      onUpdateProfile({ savedLocations: updatedLocations });
    }
  };

  const handleSetPrimary = (locationId) => {
    const updatedLocations = locations?.map(loc => ({
      ...loc,
      isPrimary: loc?.id === locationId
    }));
    setLocations(updatedLocations);
    onUpdateProfile({ savedLocations: updatedLocations });
  };

  const handleUpdateWeatherUnit = (locationId, unit) => {
    const updatedLocations = locations?.map(loc =>
      loc?.id === locationId ? { ...loc, weatherUnit: unit } : loc
    );
    setLocations(updatedLocations);
    onUpdateProfile({ savedLocations: updatedLocations });
  };

  const getCurrentWeather = async (location) => {
    // Simulate weather API call
    const weatherConditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'partly-cloudy'];
    const condition = weatherConditions?.[Math.floor(Math.random() * weatherConditions?.length)];
    const temp = Math.floor(Math.random() * 40) + 40; // 40-80°F
    
    return {
      condition,
      temperature: location?.weatherUnit === 'celsius' ? Math.round((temp - 32) * 5/9) : temp,
      unit: location?.weatherUnit === 'celsius' ? '°C' : '°F'
    };
  };

  const [weatherData, setWeatherData] = useState({});

  React.useEffect(() => {
    // Load weather data for all locations
    locations?.forEach(async (location) => {
      const weather = await getCurrentWeather(location);
      setWeatherData(prev => ({
        ...prev,
        [location?.id]: weather
      }));
    });
  }, [locations]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Saved Locations
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Manage locations for weather-based outfit recommendations
          </p>
        </div>
        <Button
          onClick={() => setIsAddingLocation(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Location
        </Button>
      </div>
      {/* Add Location Form */}
      {isAddingLocation && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-medium text-foreground mb-4">
            Add New Location
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location Name"
                type="text"
                placeholder="e.g., Home, Work, Gym"
                value={newLocation?.name}
                onChange={(e) => setNewLocation(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />
              <Select
                label="Weather Unit"
                options={weatherUnitOptions}
                value={newLocation?.weatherUnit}
                onChange={(value) => setNewLocation(prev => ({ ...prev, weatherUnit: value }))}
              />
            </div>
            <Input
              label="Address"
              type="text"
              placeholder="Enter city, state, or zip code"
              value={newLocation?.address}
              onChange={(e) => setNewLocation(prev => ({ ...prev, address: e?.target?.value }))}
              description="We'll use this to get accurate weather data"
              required
            />
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingLocation(false);
                  setNewLocation({ name: '', address: '', weatherUnit: 'fahrenheit' });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddLocation}
                loading={isSearching}
                iconName="MapPin"
                iconPosition="left"
              >
                Add Location
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Locations List */}
      <div className="space-y-4">
        {locations?.map(location => {
          const weather = weatherData?.[location?.id];
          return (
            <div key={location?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-heading font-medium text-foreground">
                        {location?.name}
                      </h3>
                      {location?.isPrimary && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      {location?.address}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
                    </p>
                  </div>
                </div>
                
                {/* Weather Info */}
                {weather && (
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={weather?.condition === 'sunny' ? 'Sun' : 
                              weather?.condition === 'rainy' ? 'CloudRain' :
                              weather?.condition === 'snowy' ? 'Snowflake' : 'Cloud'} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                      <span className="font-heading text-lg font-semibold text-foreground">
                        {weather?.temperature}{weather?.unit}
                      </span>
                    </div>
                    <p className="font-caption text-xs text-muted-foreground capitalize">
                      {weather?.condition?.replace('-', ' ')}
                    </p>
                  </div>
                )}
              </div>
              {/* Location Settings */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <Select
                    options={weatherUnitOptions}
                    value={location?.weatherUnit}
                    onChange={(value) => handleUpdateWeatherUnit(location?.id, value)}
                    className="w-40"
                  />
                  {!location?.isPrimary && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetPrimary(location?.id)}
                      iconName="Star"
                      iconPosition="left"
                    >
                      Set as Primary
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      // Open map view
                      const mapUrl = `https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}&z=14`;
                      window.open(mapUrl, '_blank');
                    }}
                    iconName="ExternalLink"
                  />
                  {!location?.isPrimary && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLocation(location?.id)}
                      iconName="Trash2"
                    />
                  )}
                </div>
              </div>
              {/* Map Preview */}
              <div className="mt-4 h-48 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={location?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}&z=14&output=embed`}
                  className="border-0"
                />
              </div>
            </div>
          );
        })}
      </div>
      {locations?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-foreground mb-2">
            No locations saved
          </h3>
          <p className="font-body text-muted-foreground mb-4">
            Add locations to get weather-based outfit recommendations for different places.
          </p>
          <Button
            onClick={() => setIsAddingLocation(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Location
          </Button>
        </div>
      )}
      {/* Location Tips */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-foreground mb-1">
              Location Tips
            </h4>
            <ul className="font-caption text-sm text-muted-foreground space-y-1">
              <li>• Set your most frequently used location as primary</li>
              <li>• Add work, home, and travel destinations for better recommendations</li>
              <li>• Weather units can be customized per location</li>
              <li>• Location data is used only for weather forecasting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedLocationsTab;