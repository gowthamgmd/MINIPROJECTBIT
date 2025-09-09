import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const WeatherInput = ({ weather, onWeatherChange }) => {
  const [isEditingManually, setIsEditingManually] = useState(false);

  const weatherConditions = [
    { value: 'sunny', label: '☀️ Sunny', icon: 'Sun' },
    { value: 'partly-cloudy', label: '⛅ Partly Cloudy', icon: 'CloudSun' },
    { value: 'cloudy', label: '☁️ Cloudy', icon: 'Cloud' },
    { value: 'rainy', label: '🌧️ Rainy', icon: 'CloudRain' },
    { value: 'stormy', label: '⛈️ Stormy', icon: 'CloudLightning' },
    { value: 'snowy', label: '❄️ Snowy', icon: 'Snowflake' },
    { value: 'windy', label: '💨 Windy', icon: 'Wind' },
    { value: 'foggy', label: '🌫️ Foggy', icon: 'CloudFog' }
  ];

  const getWeatherIcon = (condition) => {
    const weatherItem = weatherConditions?.find(w => w?.value === condition);
    return weatherItem?.icon || 'Cloud';
  };

  const handleAutoDetect = async () => {
    if (navigator?.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you would call a weather API here
            // For now, we'll simulate the response
            const mockWeatherData = {
              temperature: 72,
              condition: 'partly-cloudy',
              humidity: 65,
              windSpeed: 8,
              location: 'Current Location'
            };
            
            onWeatherChange?.(mockWeatherData);
          } catch (error) {
            console.error('Error fetching weather:', error);
            alert('Failed to fetch weather data. Please enter manually.');
            setIsEditingManually(true);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Location access denied. Please enter weather manually.');
          setIsEditingManually(true);
        }
      );
    } else {
      alert('Geolocation not supported. Please enter weather manually.');
      setIsEditingManually(true);
    }
  };

  const handleInputChange = (field, value) => {
    onWeatherChange?.({
      ...weather,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Current Weather Display */}
      {weather?.temperature && !isEditingManually && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Icon 
                name={getWeatherIcon(weather?.condition)} 
                size={24} 
                className="text-blue-600 mr-3" 
              />
              <div>
                <h4 className="font-semibold text-blue-900">
                  {weather?.temperature}°F
                </h4>
                <p className="text-sm text-blue-700 capitalize">
                  {weather?.condition?.replace('-', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit2"
              onClick={() => setIsEditingManually(true)}
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              Edit
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="flex items-center">
              <Icon name="Droplets" size={16} className="mr-2" />
              <span>{weather?.humidity}% humidity</span>
            </div>
            <div className="flex items-center">
              <Icon name="Wind" size={16} className="mr-2" />
              <span>{weather?.windSpeed} mph</span>
            </div>
          </div>
          
          {weather?.location && (
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <Icon name="MapPin" size={16} className="mr-2" />
              <span>{weather?.location}</span>
            </div>
          )}
        </div>
      )}

      {/* Manual Input or No Weather Data */}
      {(!weather?.temperature || isEditingManually) && (
        <div className="space-y-4">
          {/* Auto-detect button */}
          {!weather?.temperature && (
            <div className="text-center">
              <Button
                onClick={handleAutoDetect}
                iconName="MapPin"
                className="mb-3"
              >
                Auto-Detect Weather
              </Button>
              <p className="text-sm text-muted-foreground mb-4">
                Or enter weather information manually below
              </p>
            </div>
          )}

          {/* Manual inputs */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Temperature (°F)"
              value={weather?.temperature || ''}
              onChange={(e) => handleInputChange('temperature', parseInt(e?.target?.value))}
              placeholder="72"
            />
            
            <Select
              label="Weather Condition"
              value={weather?.condition || ''}
              onChange={(value) => handleInputChange('condition', value)}
              options={weatherConditions}
              placeholder="Select condition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Humidity (%)"
              value={weather?.humidity || ''}
              onChange={(e) => handleInputChange('humidity', parseInt(e?.target?.value))}
              placeholder="65"
            />
            
            <Input
              type="number"
              label="Wind Speed (mph)"
              value={weather?.windSpeed || ''}
              onChange={(e) => handleInputChange('windSpeed', parseInt(e?.target?.value))}
              placeholder="5"
            />
          </div>

          <Input
            label="Location (optional)"
            value={weather?.location || ''}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            placeholder="New York, NY"
          />

          {isEditingManually && (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsEditingManually(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsEditingManually(false)}
                className="flex-1"
                disabled={!weather?.temperature || !weather?.condition}
              >
                Save Weather
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Weather tips */}
      {weather?.condition && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground flex items-start">
            <Icon name="Lightbulb" size={16} className="mr-2 mt-0.5 text-yellow-500" />
            <span>
              {weather?.condition === 'rainy' && 'Consider waterproof materials and layers.'}
              {weather?.condition === 'sunny' && 'Light colors and breathable fabrics work well.'}
              {weather?.condition === 'windy' && 'Avoid loose-fitting items that might blow around.'}
              {weather?.condition === 'snowy' && 'Warm layers and waterproof boots are essential.'}
              {weather?.condition === 'cloudy' && 'Perfect weather for any outfit style.'}
              {weather?.condition === 'partly-cloudy' && 'Great conditions - layer for flexibility.'}
              {weather?.condition === 'stormy' && 'Stay indoors or choose weather-resistant gear.'}
              {weather?.condition === 'foggy' && 'Bright colors help you stay visible.'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherInput;