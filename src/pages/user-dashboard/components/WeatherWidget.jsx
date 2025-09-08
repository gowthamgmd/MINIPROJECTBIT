import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherWidget = ({ location, onLocationChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState('F'); // F or C

  // Mock weather data
  const mockWeatherData = {
    current: {
      temperature: 68,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8,
      uvIndex: 4,
      icon: "CloudSun"
    },
    forecast: [
      {
        time: "12 PM",
        temperature: 72,
        condition: "Sunny",
        icon: "Sun"
      },
      {
        time: "3 PM",
        temperature: 75,
        condition: "Sunny",
        icon: "Sun"
      },
      {
        time: "6 PM",
        temperature: 70,
        condition: "Partly Cloudy",
        icon: "CloudSun"
      },
      {
        time: "9 PM",
        temperature: 65,
        condition: "Clear",
        icon: "Moon"
      }
    ],
    location: location || "New York, NY",
    lastUpdated: new Date()
  };

  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [location]);

  const convertTemperature = (temp) => {
    if (temperatureUnit === 'C') {
      return Math.round((temp - 32) * 5/9);
    }
    return temp;
  };

  const getOutfitSuggestion = (temp) => {
    if (temp >= 75) return "Light fabrics, breathable colors";
    if (temp >= 65) return "Layered look, medium weight fabrics";
    if (temp >= 50) return "Warm layers, darker colors";
    return "Heavy fabrics, insulating layers";
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded mb-4"></div>
          <div className="h-16 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Current Weather
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              {weatherData?.location}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLocationChange}
          iconName="Settings"
        >
        </Button>
      </div>
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={weatherData?.current?.icon} size={32} className="text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-3xl text-foreground">
                  {convertTemperature(weatherData?.current?.temperature)}°{temperatureUnit}
                </span>
                <button
                  onClick={() => setTemperatureUnit(temperatureUnit === 'F' ? 'C' : 'F')}
                  className="font-caption text-xs text-muted-foreground hover:text-foreground transition-smooth"
                >
                  °{temperatureUnit === 'F' ? 'C' : 'F'}
                </button>
              </div>
              <p className="font-body text-muted-foreground">
                {weatherData?.current?.condition}
              </p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Droplets" size={16} className="text-primary" />
            </div>
            <p className="font-caption text-xs text-muted-foreground">Humidity</p>
            <p className="font-body font-medium text-sm text-foreground">
              {weatherData?.current?.humidity}%
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Wind" size={16} className="text-primary" />
            </div>
            <p className="font-caption text-xs text-muted-foreground">Wind</p>
            <p className="font-body font-medium text-sm text-foreground">
              {weatherData?.current?.windSpeed} mph
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Sun" size={16} className="text-primary" />
            </div>
            <p className="font-caption text-xs text-muted-foreground">UV Index</p>
            <p className="font-body font-medium text-sm text-foreground">
              {weatherData?.current?.uvIndex}
            </p>
          </div>
        </div>

        {/* Outfit Suggestion */}
        <div className="bg-accent/10 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Shirt" size={16} className="text-accent" />
            <span className="font-body font-medium text-sm text-foreground">
              Weather Recommendation
            </span>
          </div>
          <p className="font-caption text-sm text-muted-foreground">
            {getOutfitSuggestion(weatherData?.current?.temperature)}
          </p>
        </div>
      </div>
      {/* Hourly Forecast */}
      <div className="mb-4">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">
          Today's Forecast
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {weatherData?.forecast?.map((hour, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-muted">
              <p className="font-caption text-xs text-muted-foreground mb-1">
                {hour?.time}
              </p>
              <div className="flex items-center justify-center mb-1">
                <Icon name={hour?.icon} size={16} className="text-primary" />
              </div>
              <p className="font-body font-medium text-sm text-foreground">
                {convertTemperature(hour?.temperature)}°
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Last Updated */}
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span className="font-caption text-xs">
            Updated {weatherData?.lastUpdated?.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="RefreshCw"
          onClick={() => window.location?.reload()}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default WeatherWidget;