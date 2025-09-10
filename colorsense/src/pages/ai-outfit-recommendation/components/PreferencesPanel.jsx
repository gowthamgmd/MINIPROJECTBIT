import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PreferencesPanel = ({ preferences, onPreferencesChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const occasionOptions = [
    { value: 'work', label: '💼 Work/Office' },
    { value: 'casual', label: '👕 Casual Day' },
    { value: 'date', label: '💕 Date Night' },
    { value: 'social', label: '🎉 Social Event' },
    { value: 'formal', label: '🎭 Formal Event' },
    { value: 'workout', label: '💪 Workout/Gym' },
    { value: 'travel', label: '✈️ Travel' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'outdoor', label: '🌳 Outdoor Activity' },
    { value: 'home', label: '🏠 Stay at Home' }
  ];

  const budgetOptions = [
    { value: 'low', label: '₹ Budget-Friendly (₹1,000-3,000)' },
    { value: 'medium', label: '₹₹ Moderate (₹3,000-8,000)' },
    { value: 'high', label: '₹₹₹ Premium (₹8,000-20,000)' },
    { value: 'luxury', label: '₹₹₹₹ Luxury (₹20,000+)' }
  ];

  const colorPreferenceOptions = [
    { value: 'red', label: '🔴 Red' },
    { value: 'blue', label: '🔵 Blue' },
    { value: 'green', label: '🟢 Green' },
    { value: 'yellow', label: '🟡 Yellow' },
    { value: 'purple', label: '🟣 Purple' },
    { value: 'pink', label: '🩷 Pink' },
    { value: 'orange', label: '🟠 Orange' },
    { value: 'black', label: '⚫ Black' },
    { value: 'white', label: '⚪ White' },
    { value: 'gray', label: '⚫ Gray' },
    { value: 'brown', label: '🤎 Brown' },
    { value: 'navy', label: '🔷 Navy' }
  ];

  const excludedItemOptions = [
    { value: 'dresses', label: 'Dresses' },
    { value: 'skirts', label: 'Skirts' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'heels', label: 'High Heels' },
    { value: 'ties', label: 'Ties' },
    { value: 'suits', label: 'Formal Suits' },
    { value: 'bright-colors', label: 'Bright Colors' },
    { value: 'patterns', label: 'Patterns/Prints' },
    { value: 'accessories', label: 'Heavy Accessories' }
  ];

  const handlePreferenceChange = (field, value) => {
    onPreferencesChange?.({
      ...preferences,
      [field]: value
    });
  };

  const handleSliderChange = (field, value) => {
    handlePreferenceChange(field, parseInt(value));
  };

  const getSliderLabel = (field, value) => {
    if (field === 'formalityLevel') {
      const labels = ['Very Casual', 'Casual', 'Smart Casual', 'Business', 'Formal'];
      return labels?.[Math.floor(value / 2)] || 'Moderate';
    }
    if (field === 'comfortPriority') {
      const labels = ['Style Focus', 'Balanced', 'Comfort Focus'];
      return labels?.[Math.floor(value / 3.33)] || 'Balanced';
    }
    return value;
  };

  return (
    <div className="space-y-4">
      {/* Essential Preferences */}
      <div className="space-y-4">
        <Select
          label="Occasion *"
          value={preferences?.occasion || ''}
          onChange={(value) => handlePreferenceChange('occasion', value)}
          options={occasionOptions}
          placeholder="What's the occasion?"
          required
        />

        {/* Formality Level Slider */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Formality Level: {getSliderLabel('formalityLevel', preferences?.formalityLevel || 5)}
          </label>
          <div className="px-3">
            <input
              type="range"
              min="1"
              max="10"
              value={preferences?.formalityLevel || 5}
              onChange={(e) => handleSliderChange('formalityLevel', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Casual</span>
              <span>Formal</span>
            </div>
          </div>
        </div>

        {/* Comfort vs Style Slider */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Priority: {getSliderLabel('comfortPriority', preferences?.comfortPriority || 5)}
          </label>
          <div className="px-3">
            <input
              type="range"
              min="1"
              max="10"
              value={preferences?.comfortPriority || 5}
              onChange={(e) => handleSliderChange('comfortPriority', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Style</span>
              <span>Comfort</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div>
        <Button
          variant="ghost"
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-center"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </Button>
      </div>

      {/* Advanced Preferences */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
          <Select
            label="Color Preferences"
            value={preferences?.colorPreferences || []}
            onChange={(value) => handlePreferenceChange('colorPreferences', value)}
            options={colorPreferenceOptions}
            placeholder="Select preferred colors"
            multiple
            searchable
          />

          <Select
            label="Items to Avoid"
            value={preferences?.excludedItems || []}
            onChange={(value) => handlePreferenceChange('excludedItems', value)}
            options={excludedItemOptions}
            placeholder="Select items to exclude"
            multiple
            searchable
          />

          <Select
            label="Budget Range"
            value={preferences?.budgetRange || ''}
            onChange={(value) => handlePreferenceChange('budgetRange', value)}
            options={budgetOptions}
            placeholder="Select budget range"
          />

          <Input
            label="Style Goal"
            value={preferences?.styleGoal || ''}
            onChange={(e) => handlePreferenceChange('styleGoal', e?.target?.value)}
            placeholder="e.g., Look professional yet approachable"
          />
        </div>
      )}

      {/* Preferences Summary */}
      {preferences?.occasion && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <h4 className="font-medium text-sm text-foreground mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
            Preferences Summary
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Occasion: {occasionOptions?.find(o => o?.value === preferences?.occasion)?.label}</p>
            <p>Formality: {getSliderLabel('formalityLevel', preferences?.formalityLevel || 5)}</p>
            <p>Priority: {getSliderLabel('comfortPriority', preferences?.comfortPriority || 5)}</p>
            {preferences?.colorPreferences?.length > 0 && (
              <p>Colors: {preferences?.colorPreferences?.join(', ')}</p>
            )}
            {preferences?.excludedItems?.length > 0 && (
              <p>Avoiding: {preferences?.excludedItems?.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesPanel;