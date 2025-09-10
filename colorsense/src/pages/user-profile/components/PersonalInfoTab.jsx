import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInfoTab = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    weatherUnit: user?.weatherUnit || 'fahrenheit',
    timezone: user?.timezone || 'America/New_York'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const weatherUnitOptions = [
    { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
    { value: 'celsius', label: 'Celsius (°C)' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      weatherUnit: user?.weatherUnit || 'fahrenheit',
      timezone: user?.timezone || 'America/New_York'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Personal Information
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Update your personal details and preferences
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>
      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          placeholder="(555) 123-4567"
        />

        <Input
          label="Location"
          type="text"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          disabled={!isEditing}
          placeholder="City, State or Zip Code"
          description="Used for weather-based recommendations"
        />

        <Select
          label="Weather Unit"
          options={weatherUnitOptions}
          value={formData?.weatherUnit}
          onChange={(value) => handleInputChange('weatherUnit', value)}
          disabled={!isEditing}
        />

        <div className="md:col-span-2">
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={!isEditing}
            searchable
          />
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      )}
      {/* Account Stats */}
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h3 className="font-heading font-medium text-foreground mb-3">
          Account Activity
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="font-heading text-xl font-semibold text-primary">
              {user?.totalRecommendations || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Total Recommendations
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-xl font-semibold text-secondary">
              {user?.favoriteOutfits || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Saved Outfits
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-xl font-semibold text-accent">
              {user?.moodEntries || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Mood Entries
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-xl font-semibold text-success">
              {user?.daysActive || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Days Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;