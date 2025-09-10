import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
          <Icon name="Palette" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-2">
        Welcome Back to ColorSense
      </h1>
      
      <p className="font-body text-muted-foreground max-w-md mx-auto">
        Sign in to access your personalized outfit recommendations and discover the perfect colors for your mood and weather.
      </p>
    </div>
  );
};

export default WelcomeHeader;