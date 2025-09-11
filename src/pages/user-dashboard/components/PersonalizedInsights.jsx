import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedInsights = ({ onViewDetails }) => {
  const [activeInsight, setActiveInsight] = useState(0);

  const insights = [
    {
      id: 1,
      type: 'style_pattern',
      title: 'Your Style Evolution',
      description: 'You\'ve been gravitating towards warmer colors this month, showing a 35% increase in orange and red selections.',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      data: {
        metric: '+35%',
        period: 'This Month',
        details: 'Warm color preferences'
      },
      actionLabel: 'View Color Trends',
      priority: 'high'
    },
    {
      id: 2,
      type: 'seasonal',
      title: 'Seasonal Transition',
      description: 'As autumn approaches, consider adding more layered pieces and earth tones to your wardrobe.',
      icon: 'Leaf',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      data: {
        metric: '3 weeks',
        period: 'Until Fall',
        details: 'Seasonal recommendations ready'
      },
      actionLabel: 'See Fall Collection',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'mood_correlation',
      title: 'Mood & Color Connection',
      description: 'Your happiest days correlate with wearing blue and purple combinations. Consider these for important events.',
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      data: {
        metric: '92%',
        period: 'Correlation',
        details: 'Blue & purple combinations'
      },
      actionLabel: 'Explore Combinations',
      priority: 'high'
    },
    {
      id: 4,
      type: 'weather_adaptation',
      title: 'Weather Readiness',
      description: 'Based on your location\'s weather patterns, you might want to invest in transitional pieces for unpredictable days.',
      icon: 'CloudRain',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      data: {
        metric: '67%',
        period: 'Match Rate',
        details: 'Weather-appropriate choices'
      },
      actionLabel: 'Weather Wardrobe',
      priority: 'medium'
    }
  ];

  const styleStats = [
    {
      label: 'Outfits Created',
      value: '47',
      change: '+12',
      changeType: 'increase',
      icon: 'Shirt'
    },
    {
      label: 'Favorite Colors',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: 'Palette'
    },
    {
      label: 'Style Score',
      value: '8.4',
      change: '+0.7',
      changeType: 'increase',
      icon: 'Star'
    },
    {
      label: 'Mood Alignment',
      value: '91%',
      change: '+5%',
      changeType: 'increase',
      icon: 'Target'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Try Monochromatic Looks',
      description: 'Based on your color preferences, monochromatic outfits in blue tones would suit you perfectly.',
      confidence: 94,
      tags: ['Color Theory', 'Personal Style']
    },
    {
      id: 2,
      title: 'Invest in Quality Basics',
      description: 'Your outfit history shows you prefer classic pieces. Consider upgrading your basic wardrobe.',
      confidence: 87,
      tags: ['Wardrobe Building', 'Investment']
    },
    {
      id: 3,
      title: 'Experiment with Textures',
      description: 'You tend to stick to similar fabrics. Adding varied textures could enhance your style.',
      confidence: 78,
      tags: ['Style Growth', 'Experimentation']
    }
  ];

  const nextInsight = () => {
    setActiveInsight((prev) => (prev + 1) % insights?.length);
  };

  const prevInsight = () => {
    setActiveInsight((prev) => (prev - 1 + insights?.length) % insights?.length);
  };

  const currentInsight = insights?.[activeInsight];

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Personalized Insights
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              AI-powered style recommendations
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewDetails}
          iconName="ExternalLink"
        >
        </Button>
      </div>
      {/* Featured Insight */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${currentInsight?.bgColor}`}>
                <Icon name={currentInsight?.icon} size={24} className={currentInsight?.color} />
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-foreground mb-1">
                  {currentInsight?.title}
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="font-body font-bold text-lg text-primary">
                      {currentInsight?.data?.metric}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {currentInsight?.data?.period}
                    </span>
                  </div>
                  {currentInsight?.priority === 'high' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="AlertCircle" size={12} className="text-accent" />
                      <span className="font-caption text-xs text-accent">High Priority</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-1">
              <button
                onClick={prevInsight}
                className="p-1 rounded hover:bg-background/50 transition-smooth"
              >
                <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
              </button>
              <span className="font-caption text-xs text-muted-foreground px-2">
                {activeInsight + 1} of {insights?.length}
              </span>
              <button
                onClick={nextInsight}
                className="p-1 rounded hover:bg-background/50 transition-smooth"
              >
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <p className="font-body text-foreground mb-4">
            {currentInsight?.description}
          </p>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
          >
            {currentInsight?.actionLabel}
          </Button>
        </div>
      </div>
      {/* Style Statistics */}
      <div className="mb-6">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">
          Your Style Statistics
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {styleStats?.map((stat, index) => (
            <div key={index} className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                  <Icon name={stat?.icon} size={12} className="text-primary" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat?.changeType === 'increase' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={10} 
                  />
                  <span className="font-caption text-xs">{stat?.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-heading font-bold text-lg text-foreground">
                  {stat?.value}
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  {stat?.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div className="mb-4">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">
          Recommended Actions
        </h4>
        <div className="space-y-3">
          {recommendations?.map((rec) => (
            <div key={rec?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-body font-medium text-sm text-foreground">
                    {rec?.title}
                  </h5>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={12} className="text-warning" />
                    <span className="font-caption text-xs text-muted-foreground">
                      {rec?.confidence}%
                    </span>
                  </div>
                </div>
                <p className="font-caption text-sm text-muted-foreground mb-2">
                  {rec?.description}
                </p>
                <div className="flex items-center space-x-2">
                  {rec?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full font-caption text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Sparkles" size={14} />
            <span className="font-caption text-xs">
              Insights updated daily based on your activity
            </span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            iconName="RefreshCw"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedInsights;