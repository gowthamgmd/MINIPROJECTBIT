import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const MoodTracker = ({ onNewMoodAssessment }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock mood tracking data
  const moodData = {
    week: [
      { day: 'Mon', mood: 7, colors: ['#3498DB', '#E74C3C'], dominant: 'Confident' },
      { day: 'Tue', mood: 6, colors: ['#2ECC71', '#F39C12'], dominant: 'Energetic' },
      { day: 'Wed', mood: 8, colors: ['#9B59B6', '#E67E22'], dominant: 'Creative' },
      { day: 'Thu', mood: 5, colors: ['#34495E', '#95A5A6'], dominant: 'Calm' },
      { day: 'Fri', mood: 9, colors: ['#E74C3C', '#F1C40F'], dominant: 'Excited' },
      { day: 'Sat', mood: 7, colors: ['#16A085', '#D35400'], dominant: 'Relaxed' },
      { day: 'Sun', mood: 8, colors: ['#8E44AD', '#27AE60'], dominant: 'Happy' }
    ],
    month: [
      { day: 'Week 1', mood: 7.2, colors: ['#3498DB', '#E74C3C'], dominant: 'Confident' },
      { day: 'Week 2', mood: 6.8, colors: ['#2ECC71', '#F39C12'], dominant: 'Energetic' },
      { day: 'Week 3', mood: 8.1, colors: ['#9B59B6', '#E67E22'], dominant: 'Creative' },
      { day: 'Week 4', mood: 7.5, colors: ['#E74C3C', '#F1C40F'], dominant: 'Excited' }
    ]
  };

  const currentMood = {
    level: 8,
    description: "Happy & Creative",
    colors: ["#9B59B6", "#E67E22", "#3498DB"],
    colorNames: ["Purple", "Orange", "Blue"],
    lastUpdated: new Date(Date.now() - 3600000) // 1 hour ago
  };

  const moodInsights = [
    {
      icon: "TrendingUp",
      title: "Mood Trend",
      value: "+12%",
      description: "Your mood has improved this week",
      color: "text-success"
    },
    {
      icon: "Palette",
      title: "Favorite Colors",
      value: "Purple & Blue",
      description: "Most chosen colors this month",
      color: "text-primary"
    },
    {
      icon: "Calendar",
      title: "Best Days",
      value: "Fri & Sun",
      description: "Highest mood ratings",
      color: "text-accent"
    }
  ];

  const periods = [
    { key: 'week', label: '7 Days' },
    { key: 'month', label: '4 Weeks' }
  ];

  const getMoodEmoji = (level) => {
    if (level >= 8) return "😊";
    if (level >= 6) return "🙂";
    if (level >= 4) return "😐";
    return "😔";
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Mood Tracker
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Your emotional color journey
            </p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={onNewMoodAssessment}
          iconName="Plus"
          iconPosition="left"
        >
          New Assessment
        </Button>
      </div>
      {/* Current Mood */}
      <div className="bg-accent/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getMoodEmoji(currentMood?.level)}</span>
            <div>
              <h4 className="font-body font-medium text-foreground">
                Current Mood: {currentMood?.description}
              </h4>
              <p className="font-caption text-sm text-muted-foreground">
                Updated {formatTime(currentMood?.lastUpdated)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-heading font-bold text-2xl text-accent">
              {currentMood?.level}/10
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="font-caption text-sm text-muted-foreground">
            Today's Colors:
          </span>
          {currentMood?.colors?.map((color, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div 
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
              ></div>
              <span className="font-caption text-xs text-muted-foreground">
                {currentMood?.colorNames?.[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Period Selector */}
      <div className="flex items-center space-x-1 mb-4">
        {periods?.map((period) => (
          <button
            key={period?.key}
            onClick={() => setSelectedPeriod(period?.key)}
            className={`
              px-3 py-2 rounded-lg font-body font-medium text-sm transition-smooth
              ${selectedPeriod === period?.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            {period?.label}
          </button>
        ))}
      </div>
      {/* Mood Chart */}
      <div className="mb-6">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData?.[selectedPeriod]}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis 
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => [
                  `${value}/10`,
                  'Mood Level'
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--color-accent)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Insights */}
      <div className="space-y-3 mb-4">
        <h4 className="font-body font-medium text-sm text-foreground">
          Mood Insights
        </h4>
        {moodInsights?.map((insight, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
            <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
              <Icon name={insight?.icon} size={16} className={insight?.color} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-body font-medium text-sm text-foreground">
                  {insight?.title}
                </span>
                <span className={`font-body font-semibold text-sm ${insight?.color}`}>
                  {insight?.value}
                </span>
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                {insight?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart3"
            iconPosition="left"
          >
            View Analytics
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;