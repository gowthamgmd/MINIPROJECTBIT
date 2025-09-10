import React from 'react';
import Icon from '../../../components/AppIcon';


const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'bg-white border-border text-foreground hover:bg-muted',
      description: 'Continue with Google'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
      description: 'Continue with Facebook'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black border-black text-white hover:bg-gray-900',
      description: 'Continue with Apple'
    }
  ];

  const handleSocialClick = (provider) => {
    if (isLoading) return;
    onSocialRegister(provider);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Quick Sign Up
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Get started instantly with your existing account
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialClick(provider)}
            disabled={isLoading}
            className={`
              flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border
              font-body font-medium text-sm transition-smooth
              disabled:opacity-50 disabled:cursor-not-allowed
              ${provider?.color}
            `}
          >
            <Icon name={provider?.icon} size={20} />
            <span>{provider?.description}</span>
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-body">
            Or sign up with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;