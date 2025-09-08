import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ 
  onMoodAssessment, 
  onWeatherUpdate, 
  onBrowseCatalog, 
  onViewProfile 
}) => {
  const quickActionItems = [
    {
      id: 'mood',
      title: 'Mood Check',
      description: 'Update your current mood',
      icon: 'Heart',
      color: 'bg-accent/10 text-accent',
      action: onMoodAssessment,
      shortcut: 'M'
    },
    {
      id: 'weather',
      title: 'Weather Update',
      description: 'Refresh weather data',
      icon: 'Cloud',
      color: 'bg-primary/10 text-primary',
      action: onWeatherUpdate,
      shortcut: 'W'
    },
    {
      id: 'catalog',
      title: 'Browse Catalog',
      description: 'Explore outfit options',
      icon: 'ShoppingBag',
      color: 'bg-secondary/10 text-secondary',
      action: onBrowseCatalog,
      shortcut: 'B'
    },
    {
      id: 'profile',
      title: 'Style Profile',
      description: 'Manage preferences',
      icon: 'User',
      color: 'bg-success/10 text-success',
      action: onViewProfile,
      shortcut: 'P'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Mood Assessment',
      time: '2 hours ago',
      icon: 'Heart',
      result: 'Happy & Creative'
    },
    {
      id: 2,
      action: 'Weather Check',
      time: '3 hours ago',
      icon: 'Cloud',
      result: 'Partly Cloudy, 68°F'
    },
    {
      id: 3,
      action: 'Outfit Saved',
      time: '1 day ago',
      icon: 'Bookmark',
      result: 'Professional Chic'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Quick Actions
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Fast access to key features
            </p>
          </div>
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quickActionItems?.map((item) => (
          <button
            key={item?.id}
            onClick={item?.action}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item?.color} group-hover:scale-110 transition-transform`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-body font-medium text-foreground group-hover:text-primary transition-colors">
                    {item?.title}
                  </h4>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground">
                    {item?.shortcut}
                  </kbd>
                </div>
              </div>
            </div>
            <p className="font-caption text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {item?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="mb-4">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">
          Recent Activity
        </h4>
        <div className="space-y-2">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <Icon name={activity?.icon} size={12} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground truncate">
                    {activity?.action}
                  </span>
                  <span className="font-caption text-xs text-muted-foreground">
                    {activity?.time}
                  </span>
                </div>
                <p className="font-caption text-xs text-muted-foreground truncate">
                  {activity?.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Actions */}
      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            iconName="Settings"
            iconPosition="left"
            onClick={onViewProfile}
          >
            Customize Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            iconName="HelpCircle"
            iconPosition="left"
          >
            Help & Support
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Send Feedback
          </Button>
        </div>
      </div>
      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Keyboard" size={14} className="text-muted-foreground" />
          <span className="font-caption text-xs text-muted-foreground">
            Keyboard Shortcuts
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {quickActionItems?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between">
              <span className="font-caption text-muted-foreground">
                {item?.title}
              </span>
              <kbd className="px-1.5 py-0.5 bg-background rounded text-xs font-mono">
                {item?.shortcut}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;