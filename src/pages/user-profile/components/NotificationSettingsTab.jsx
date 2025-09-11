import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettingsTab = ({ user, onUpdateProfile }) => {
  const [settings, setSettings] = useState({
    weatherAlerts: user?.notificationSettings?.weatherAlerts !== false,
    outfitRecommendations: user?.notificationSettings?.outfitRecommendations !== false,
    moodReminders: user?.notificationSettings?.moodReminders !== false,
    weeklyDigest: user?.notificationSettings?.weeklyDigest !== false,
    promotionalEmails: user?.notificationSettings?.promotionalEmails || false,
    pushNotifications: user?.notificationSettings?.pushNotifications !== false,
    emailNotifications: user?.notificationSettings?.emailNotifications !== false,
    smsNotifications: user?.notificationSettings?.smsNotifications || false,
    weatherAlertTime: user?.notificationSettings?.weatherAlertTime || '07:00',
    moodReminderTime: user?.notificationSettings?.moodReminderTime || '20:00',
    digestDay: user?.notificationSettings?.digestDay || 'sunday'
  });
  const [isSaving, setIsSaving] = useState(false);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i?.toString()?.padStart(2, '0');
    return {
      value: `${hour}:00`,
      label: `${i === 0 ? 12 : i > 12 ? i - 12 : i}:00 ${i < 12 ? 'AM' : 'PM'}`
    };
  });

  const dayOptions = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' }
  ];

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  const handleTimeChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateProfile({ notificationSettings: settings });
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const notificationCategories = [
    {
      title: 'Weather & Outfit Alerts',
      description: 'Get notified about weather changes and daily outfit recommendations',
      settings: [
        {
          key: 'weatherAlerts',
          label: 'Weather Change Alerts',
          description: 'Notify me when weather conditions change significantly',
          hasTime: true,
          timeKey: 'weatherAlertTime'
        },
        {
          key: 'outfitRecommendations',
          label: 'Daily Outfit Recommendations',
          description: 'Receive personalized outfit suggestions each morning'
        }
      ]
    },
    {
      title: 'Mood & Wellness',
      description: 'Reminders and insights about your mood tracking',
      settings: [
        {
          key: 'moodReminders',
          label: 'Mood Check-in Reminders',
          description: 'Gentle reminders to log your daily mood',
          hasTime: true,
          timeKey: 'moodReminderTime'
        },
        {
          key: 'weeklyDigest',
          label: 'Weekly Mood Digest',
          description: 'Summary of your mood patterns and insights',
          hasDay: true,
          dayKey: 'digestDay'
        }
      ]
    },
    {
      title: 'Marketing & Promotions',
      description: 'Stay updated with deals and new features',
      settings: [
        {
          key: 'promotionalEmails',
          label: 'Promotional Emails',
          description: 'Receive emails about sales, new features, and partner offers'
        }
      ]
    }
  ];

  const deliveryMethods = [
    {
      key: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive notifications directly in your browser or mobile app',
      icon: 'Bell'
    },
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Get notifications sent to your email address',
      icon: 'Mail'
    },
    {
      key: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive text messages for important alerts (carrier charges may apply)',
      icon: 'MessageSquare'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Notification Settings
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Customize how and when you receive notifications
        </p>
      </div>
      {/* Delivery Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Delivery Methods
        </h3>
        <div className="space-y-4">
          {deliveryMethods?.map(method => (
            <div key={method?.key} className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <Checkbox
                  checked={settings?.[method?.key]}
                  onChange={() => handleToggle(method?.key)}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name={method?.icon} size={16} className="text-muted-foreground" />
                  <label className="font-body font-medium text-foreground">
                    {method?.label}
                  </label>
                </div>
                <p className="font-caption text-sm text-muted-foreground mt-1">
                  {method?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Notification Categories */}
      {notificationCategories?.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
          <div className="mb-4">
            <h3 className="font-heading font-medium text-foreground">
              {category?.title}
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              {category?.description}
            </p>
          </div>
          
          <div className="space-y-6">
            {category?.settings?.map(setting => (
              <div key={setting?.key} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <Checkbox
                      checked={settings?.[setting?.key]}
                      onChange={() => handleToggle(setting?.key)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-body font-medium text-foreground">
                      {setting?.label}
                    </label>
                    <p className="font-caption text-sm text-muted-foreground mt-1">
                      {setting?.description}
                    </p>
                  </div>
                </div>
                
                {/* Time Selector */}
                {setting?.hasTime && settings?.[setting?.key] && (
                  <div className="ml-8">
                    <Select
                      label="Notification Time"
                      options={timeOptions}
                      value={settings?.[setting?.timeKey]}
                      onChange={(value) => handleTimeChange(setting?.timeKey, value)}
                      className="w-48"
                    />
                  </div>
                )}
                
                {/* Day Selector */}
                {setting?.hasDay && settings?.[setting?.key] && (
                  <div className="ml-8">
                    <Select
                      label="Delivery Day"
                      options={dayOptions}
                      value={settings?.[setting?.dayKey]}
                      onChange={(value) => handleTimeChange(setting?.dayKey, value)}
                      className="w-48"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Privacy Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-foreground mb-1">
              Privacy & Data Usage
            </h4>
            <p className="font-caption text-sm text-muted-foreground">
              We respect your privacy. Notification preferences are stored securely and never shared with third parties. 
              You can update these settings at any time. SMS notifications may incur carrier charges.
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
        >
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettingsTab;