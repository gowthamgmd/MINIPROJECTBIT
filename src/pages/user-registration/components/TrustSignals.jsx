import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information'
    },
    {
      icon: 'Award',
      title: 'Trusted Platform',
      description: 'Used by thousands of fashion enthusiasts'
    }
  ];

  const certifications = [
    {
      name: 'SSL Certificate',
      icon: 'Shield',
      verified: true
    },
    {
      name: 'Privacy Compliant',
      icon: 'Lock',
      verified: true
    },
    {
      name: 'Secure Payments',
      icon: 'CreditCard',
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="font-body font-medium text-sm text-foreground">
                {feature?.title}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4 border-t border-border">
        {certifications?.map((cert, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="relative">
              <Icon name={cert?.icon} size={20} className="text-success" />
              {cert?.verified && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={8} color="white" />
                </div>
              )}
            </div>
            <span className="font-caption text-xs text-muted-foreground">
              {cert?.name}
            </span>
          </div>
        ))}
      </div>
      {/* Legal Links */}
      <div className="text-center space-y-2">
        <p className="font-caption text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline transition-smooth">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 underline transition-smooth">
            Privacy Policy
          </button>
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} />
            <span>Global Service</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>10K+ Users</span>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="font-body font-medium text-sm text-primary mb-1">
              Your Security Matters
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              We use industry-standard security measures to protect your account. 
              Your style preferences and personal data are encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;