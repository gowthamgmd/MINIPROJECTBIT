import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import StylePreferences from './components/StylePreferences';
import ProgressIndicator from './components/ProgressIndicator';
import TrustSignals from './components/TrustSignals';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    personalInfo: {},
    stylePreferences: {}
  });

  const steps = [
    {
      id: 'account',
      title: 'Account',
      description: 'Basic information'
    },
    {
      id: 'preferences',
      title: 'Style',
      description: 'Your preferences'
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'All set!'
    }
  ];

  // Mock credentials for testing
  const mockCredentials = {
    email: 'demo@colorsense.com',
    password: 'Demo123!',
    note: 'Use these credentials to test the registration flow'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Registration failed.');
        setIsLoading(false);
        return;
      }
      setRegistrationData(prev => ({
        ...prev,
        personalInfo: formData
      }));
      
      setCurrentStep(2);
    } catch (error) {
      alert('Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const mockUserData = {
        id: Date.now(),
        name: 'Social User',
        email: `user@${provider?.id}.com`,
        provider: provider?.id,
        weatherUnit: 'fahrenheit',
        registeredAt: new Date()?.toISOString()
      };

      // Store auth data
      localStorage.setItem('authToken', 'mock-social-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUserData));
      
      // Redirect to dashboard
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStylePreferences = (preferences) => {
    setRegistrationData(prev => ({
      ...prev,
      stylePreferences: preferences
    }));
  };

  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    
    try {
      // Simulate final registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create complete user profile
      const userData = {
        id: Date.now(),
        name: `${registrationData?.personalInfo?.firstName} ${registrationData?.personalInfo?.lastName}`,
        email: registrationData?.personalInfo?.email,
        weatherUnit: registrationData?.personalInfo?.weatherUnit,
        stylePreferences: registrationData?.stylePreferences,
        registeredAt: new Date()?.toISOString(),
        onboardingCompleted: true
      };

      // Store auth data
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setCurrentStep(3);
      
      // Redirect after showing success
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Registration completion failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <SocialRegistration 
              onSocialRegister={handleSocialRegister}
              isLoading={isLoading}
            />
            <RegistrationForm 
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <StylePreferences 
              onPreferencesChange={handleStylePreferences}
              initialPreferences={registrationData?.stylePreferences}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={handleBackStep}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleCompleteRegistration}
                loading={isLoading}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                {isLoading ? 'Creating Profile...' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">
                Welcome to ColorSense!
              </h3>
              <p className="font-body text-muted-foreground">
                Your account has been created successfully. You'll be redirected to your dashboard shortly.
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="font-body text-sm text-primary">
                Get ready to discover personalized outfit recommendations based on weather and your mood!
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/user-login" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Palette" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl text-foreground">
                ColorSense
              </span>
            </Link>
            <Link 
              to="/user-login"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Progress Indicator */}
          {currentStep < 3 && (
            <div className="mb-8">
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={steps?.length}
                steps={steps}
              />
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              {currentStep === 1 ? 'Create Your Account' :
               currentStep === 2 ? 'Personalize Your Style': 'Registration Complete'}
            </h1>
            <p className="font-body text-muted-foreground">
              {currentStep === 1 ? 'Join thousands of users getting personalized outfit recommendations' :
               currentStep === 2 ? 'Help us understand your fashion preferences for better recommendations': 'Welcome to your personalized fashion journey'}
            </p>
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-lg shadow-soft border border-border p-6 mb-8">
            {renderStepContent()}
          </div>

          {/* Trust Signals */}
          {currentStep === 1 && (
            <div className="mb-8">
              <TrustSignals />
            </div>
          )}

          {/* Mock Credentials Notice */}
          {currentStep === 1 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="font-body font-medium text-sm text-warning mb-2">
                    Demo Credentials Available
                  </p>
                  <div className="space-y-1 font-caption text-xs text-muted-foreground">
                    <p><span className="font-medium">Email:</span> {mockCredentials?.email}</p>
                    <p><span className="font-medium">Password:</span> {mockCredentials?.password}</p>
                    <p className="text-warning/80 mt-2">{mockCredentials?.note}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Links */}
          <div className="text-center space-y-4">
            {currentStep === 1 && (
              <p className="font-body text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/user-login" 
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  Sign in here
                </Link>
              </p>
            )}
            
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-smooth">
                Help Center
              </button>
              <button className="hover:text-foreground transition-smooth">
                Contact Support
              </button>
              <button className="hover:text-foreground transition-smooth">
                Terms & Privacy
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="font-caption text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} ColorSense. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;