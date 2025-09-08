import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform',
      description: 'Trusted by 50K+ users'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="font-caption text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-2">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="font-caption text-xs font-medium text-foreground">
                {feature?.text}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;