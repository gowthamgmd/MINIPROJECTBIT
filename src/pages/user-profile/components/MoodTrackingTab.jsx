import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MoodTrackingTab = ({ user, onUpdateProfile }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [trackingFrequency, setTrackingFrequency] = useState(user?.moodSettings?.frequency || 'daily');

  // Mock mood data
  const moodData = [
    { date: '2025-01-01', mood: 'happy', energy: 8, confidence: 7, creativity: 6 },
    { date: '2025-01-02', mood: 'calm', energy: 6, confidence: 8, creativity: 7 },
    { date: '2025-01-03', mood: 'energetic', energy: 9, confidence: 9, creativity: 8 },
    { date: '2025-01-04', mood: 'focused', energy: 7, confidence: 8, creativity: 9 },
    { date: '2025-01-05', mood: 'relaxed', energy: 5, confidence: 6, creativity: 5 },
    { date: '2025-01-06', mood: 'confident', energy: 8, confidence: 9, creativity: 7 },
    { date: '2025-01-07', mood: 'creative', energy: 7, confidence: 7, creativity: 9 }
  ];

  const moodStats = {
    totalEntries: 156,
    averageEnergy: 7.2,
    averageConfidence: 7.8,
    averageCreativity: 7.1,
    mostCommonMood: 'Happy',
    streakDays: 12
  };

  const periodOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'custom', label: 'Custom Reminders' }
  ];

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/JSON file
    const dataStr = JSON.stringify(moodData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mood-tracking-data.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleFrequencyChange = (frequency) => {
    setTrackingFrequency(frequency);
    onUpdateProfile({
      moodSettings: {
        ...user?.moodSettings,
        frequency
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Mood Tracking History
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            View your mood patterns and their impact on outfit recommendations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={handleExportData}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Mood Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={16} className="text-primary" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.totalEntries}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Total Entries
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Zap" size={16} className="text-secondary" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.averageEnergy}/10
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Avg Energy
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Star" size={16} className="text-accent" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.averageConfidence}/10
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Avg Confidence
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Palette" size={16} className="text-success" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.averageCreativity}/10
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Avg Creativity
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Smile" size={16} className="text-warning" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.mostCommonMood}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Most Common
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Flame" size={16} className="text-error" />
          </div>
          <div className="font-heading text-lg font-semibold text-foreground">
            {moodStats?.streakDays}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Day Streak
          </div>
        </div>
      </div>
      {/* Mood Trends Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Mood Trends Over Time
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Energy"
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="Confidence"
              />
              <Line 
                type="monotone" 
                dataKey="creativity" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="Creativity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Tracking Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Tracking Settings
        </h3>
        <div className="space-y-4">
          <Select
            label="Tracking Frequency"
            description="How often would you like to be reminded to log your mood?"
            options={frequencyOptions}
            value={trackingFrequency}
            onChange={handleFrequencyChange}
          />

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <h4 className="font-body font-medium text-foreground">
                Mood-Based Recommendations
              </h4>
              <p className="font-caption text-sm text-muted-foreground">
                Allow mood data to influence outfit color suggestions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={user?.moodSettings?.enableRecommendations !== false}
                onChange={(e) => onUpdateProfile({
                  moodSettings: {
                    ...user?.moodSettings,
                    enableRecommendations: e?.target?.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      {/* Recent Mood Entries */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Recent Entries
        </h3>
        <div className="space-y-3">
          {moodData?.slice(-5)?.reverse()?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Smile" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-body font-medium text-foreground capitalize">
                    {entry?.mood}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    {new Date(entry.date)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-foreground">{entry?.energy}</div>
                  <div className="font-caption text-xs text-muted-foreground">Energy</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">{entry?.confidence}</div>
                  <div className="font-caption text-xs text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">{entry?.creativity}</div>
                  <div className="font-caption text-xs text-muted-foreground">Creativity</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTrackingTab;