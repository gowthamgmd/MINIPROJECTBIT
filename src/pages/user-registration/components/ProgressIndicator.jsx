import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="absolute -top-1 transition-all duration-500 ease-out" 
             style={{ left: `calc(${progressPercentage}% - 8px)` }}>
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-soft" />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center space-y-2 flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${isCompleted 
                  ? 'bg-primary text-primary-foreground' 
                  : isCurrent 
                    ? 'bg-primary/20 text-primary border-2 border-primary' :'bg-muted text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="font-body font-medium text-xs">{stepNumber}</span>
                )}
              </div>
              <div className="text-center max-w-20">
                <p className={`
                  font-caption text-xs font-medium transition-colors duration-300
                  ${isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step?.title}
                </p>
                {step?.description && (
                  <p className="font-caption text-xs text-muted-foreground mt-1 hidden sm:block">
                    {step?.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Current Step Info */}
      <div className="text-center py-2">
        <p className="font-body text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]?.title}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;