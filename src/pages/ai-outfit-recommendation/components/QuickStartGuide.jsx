import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickStartGuide = ({ isOpen, onClose, onGetStarted }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Outfit Recommendations! 👋",
      content: "Get personalized outfit suggestions based on your mood, weather, and style preferences. Let me show you how it works!",
      icon: "Sparkles",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Step 1: Express Your Mood 😊",
      content: "Start by selecting how you're feeling today. Whether you're energetic, professional, or relaxed - your mood influences the perfect outfit choice.",
      icon: "Smile",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Step 2: Check the Weather 🌤️",
      content: "We'll automatically detect your weather, or you can input conditions manually. This ensures your outfit is comfortable and weather-appropriate.",
      icon: "CloudSun",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Step 3: Set Your Preferences ⚙️",
      content: "Choose your occasion (work, date, casual), formality level, and any specific color preferences or items you want to avoid.",
      icon: "Settings",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Step 4: Get AI Recommendations ✨",
      content: "Our AI will analyze everything and suggest personalized outfits with explanations, confidence scores, and styling tips.",
      icon: "Bot",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Step 5: Interact & Refine 💬",
      content: "Ask follow-up questions, request color alternatives, or save your favorite outfits. The conversation continues until you find your perfect look!",
      icon: "MessageCircle",
      color: "bg-pink-100 text-pink-800"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onGetStarted?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  const currentStepData = steps?.[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mr-3", currentStepData?.color)}>
                <Icon name={currentStepData?.icon} size={24} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Quick Start Guide
                </h2>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps?.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            {currentStepData?.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {currentStepData?.content}
          </p>

          {/* Visual Examples based on step */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['⚡ Energetic', '💼 Professional', '😌 Relaxed', '🎨 Creative']?.map((mood) => (
                <div key={mood} className="p-2 bg-muted/50 rounded-lg text-center text-sm">
                  {mood}
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="CloudSun" size={20} className="text-blue-600 mr-2" />
                  <span className="text-blue-900 font-medium">72°F</span>
                </div>
                <span className="text-blue-700 text-sm">Partly Cloudy</span>
              </div>
              <p className="text-blue-600 text-xs mt-2">Perfect weather for layered outfits!</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Occasion:</span>
                <span className="text-sm font-medium">💼 Work</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Formality:</span>
                <span className="text-sm font-medium">Business Casual</span>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Professional Chic</h4>
                <span className="text-green-600 text-sm font-medium">92% match</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Navy blazer, white blouse, dark jeans, loafers
              </p>
              <p className="text-xs text-blue-700">
                Perfect for your professional mood and current weather!
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-2 mb-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  "Can you suggest color alternatives?"
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm text-foreground">
                  "Absolutely! Try burgundy instead of navy, or add a pop of emerald green..."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Skip Guide
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                iconName={currentStep === steps?.length - 1 ? "CheckCircle" : "ChevronRight"}
                iconPosition="right"
              >
                {currentStep === steps?.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="px-6 pb-4">
          <div className="flex justify-center space-x-2">
            {steps?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentStep 
                    ? "bg-primary" 
                    : index < currentStep
                    ? "bg-primary/50" :"bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;