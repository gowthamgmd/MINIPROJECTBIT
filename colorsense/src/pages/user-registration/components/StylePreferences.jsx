import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StylePreferences = ({ onPreferencesChange, initialPreferences = {} }) => {
  const [preferences, setPreferences] = useState({
    clothingCategories: initialPreferences?.clothingCategories || [],
    colorPreferences: initialPreferences?.colorPreferences || [],
    styleTypes: initialPreferences?.styleTypes || []
  });

  const clothingCategories = [
    { id: 'casual', name: 'Casual', icon: 'Shirt', description: 'Everyday comfort wear' },
    { id: 'business', name: 'Business', icon: 'Briefcase', description: 'Professional attire' },
    { id: 'formal', name: 'Formal', icon: 'Crown', description: 'Special occasions' },
    { id: 'athletic', name: 'Athletic', icon: 'Zap', description: 'Workout & sports' },
    { id: 'outdoor', name: 'Outdoor', icon: 'Mountain', description: 'Adventure ready' },
    { id: 'evening', name: 'Evening', icon: 'Moon', description: 'Night out looks' }
  ];

  const colorPreferences = [
    { id: 'warm', name: 'Warm Tones', colors: ['#FF6B6B', '#FF8E53', '#FF6B9D'], description: 'Reds, oranges, pinks' },
    { id: 'cool', name: 'Cool Tones', colors: ['#4ECDC4', '#45B7D1', '#96CEB4'], description: 'Blues, greens, purples' },
    { id: 'neutral', name: 'Neutrals', colors: ['#8B7355', '#A0A0A0', '#D4C5B9'], description: 'Beiges, grays, browns' },
    { id: 'bold', name: 'Bold Colors', colors: ['#FF1744', '#00E676', '#FFD600'], description: 'Vibrant & striking' },
    { id: 'pastel', name: 'Pastels', colors: ['#FFB3BA', '#BAFFC9', '#BAE1FF'], description: 'Soft & gentle' },
    { id: 'monochrome', name: 'Monochrome', colors: ['#000000', '#FFFFFF', '#808080'], description: 'Black, white, gray' }
  ];

  const styleTypes = [
    { id: 'minimalist', name: 'Minimalist', icon: 'Minus', description: 'Clean & simple' },
    { id: 'bohemian', name: 'Bohemian', icon: 'Flower', description: 'Free-spirited & artistic' },
    { id: 'classic', name: 'Classic', icon: 'Award', description: 'Timeless & elegant' },
    { id: 'trendy', name: 'Trendy', icon: 'TrendingUp', description: 'Latest fashion' },
    { id: 'edgy', name: 'Edgy', icon: 'Zap', description: 'Bold & unconventional' },
    { id: 'romantic', name: 'Romantic', icon: 'Heart', description: 'Feminine & soft' }
  ];

  const toggleSelection = (category, itemId) => {
    setPreferences(prev => {
      const currentSelection = prev?.[category];
      const newSelection = currentSelection?.includes(itemId)
        ? currentSelection?.filter(id => id !== itemId)
        : [...currentSelection, itemId];
      
      const newPreferences = { ...prev, [category]: newSelection };
      onPreferencesChange(newPreferences);
      return newPreferences;
    });
  };

  const isSelected = (category, itemId) => {
    return preferences?.[category]?.includes(itemId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          Tell Us Your Style
        </h3>
        <p className="font-body text-muted-foreground">
          Help us personalize your outfit recommendations by sharing your preferences
        </p>
      </div>
      {/* Clothing Categories */}
      <div className="space-y-4">
        <div>
          <h4 className="font-heading font-medium text-lg text-foreground mb-2">
            Clothing Categories
          </h4>
          <p className="font-caption text-sm text-muted-foreground mb-4">
            Select the types of clothing you wear most often
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {clothingCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => toggleSelection('clothingCategories', category?.id)}
              className={`
                p-4 rounded-lg border transition-smooth text-left
                ${isSelected('clothingCategories', category?.id)
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={category?.icon} size={20} />
                <span className="font-body font-medium text-sm">{category?.name}</span>
              </div>
              <p className="font-caption text-xs opacity-80">
                {category?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Color Preferences */}
      <div className="space-y-4">
        <div>
          <h4 className="font-heading font-medium text-lg text-foreground mb-2">
            Color Preferences
          </h4>
          <p className="font-caption text-sm text-muted-foreground mb-4">
            Choose color palettes that match your style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {colorPreferences?.map((colorGroup) => (
            <button
              key={colorGroup?.id}
              onClick={() => toggleSelection('colorPreferences', colorGroup?.id)}
              className={`
                p-4 rounded-lg border transition-smooth text-left
                ${isSelected('colorPreferences', colorGroup?.id)
                  ? 'border-primary bg-primary/10' :'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`font-body font-medium text-sm ${
                  isSelected('colorPreferences', colorGroup?.id) ? 'text-primary' : 'text-foreground'
                }`}>
                  {colorGroup?.name}
                </span>
                <div className="flex space-x-1">
                  {colorGroup?.colors?.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <p className={`font-caption text-xs ${
                isSelected('colorPreferences', colorGroup?.id) ? 'text-primary/80' : 'text-muted-foreground'
              }`}>
                {colorGroup?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Style Types */}
      <div className="space-y-4">
        <div>
          <h4 className="font-heading font-medium text-lg text-foreground mb-2">
            Style Personality
          </h4>
          <p className="font-caption text-sm text-muted-foreground mb-4">
            Select styles that represent your fashion personality
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {styleTypes?.map((style) => (
            <button
              key={style?.id}
              onClick={() => toggleSelection('styleTypes', style?.id)}
              className={`
                p-4 rounded-lg border transition-smooth text-left
                ${isSelected('styleTypes', style?.id)
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={style?.icon} size={20} />
                <span className="font-body font-medium text-sm">{style?.name}</span>
              </div>
              <p className="font-caption text-xs opacity-80">
                {style?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Selection Summary */}
      {(preferences?.clothingCategories?.length > 0 || 
        preferences?.colorPreferences?.length > 0 || 
        preferences?.styleTypes?.length > 0) && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Palette" size={16} className="text-primary" />
            <span className="font-body font-medium text-sm text-primary">
              Your Style Profile
            </span>
          </div>
          <div className="space-y-2 text-sm">
            {preferences?.clothingCategories?.length > 0 && (
              <p className="font-caption text-muted-foreground">
                <span className="font-medium">Categories:</span> {preferences?.clothingCategories?.length} selected
              </p>
            )}
            {preferences?.colorPreferences?.length > 0 && (
              <p className="font-caption text-muted-foreground">
                <span className="font-medium">Colors:</span> {preferences?.colorPreferences?.length} palettes selected
              </p>
            )}
            {preferences?.styleTypes?.length > 0 && (
              <p className="font-caption text-muted-foreground">
                <span className="font-medium">Styles:</span> {preferences?.styleTypes?.length} personalities selected
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StylePreferences;