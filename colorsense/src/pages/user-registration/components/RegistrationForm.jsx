import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    weatherUnit: 'fahrenheit'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
  };

  const getPasswordStrength = (password) => {
    const checks = validatePassword(password);
    const score = Object.values(checks)?.filter(Boolean)?.length;
    
    if (score < 2) return { strength: 'weak', color: 'text-error', bg: 'bg-error' };
    if (score < 4) return { strength: 'medium', color: 'text-warning', bg: 'bg-warning' };
    return { strength: 'strong', color: 'text-success', bg: 'bg-success' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordChecks = validatePassword(formData?.password);
      if (!passwordChecks?.length || !passwordChecks?.uppercase || !passwordChecks?.lowercase || !passwordChecks?.number) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isFormValid = () => {
    return formData?.firstName?.trim() && 
           formData?.lastName?.trim() && 
           formData?.email?.trim() && 
           validateEmail(formData?.email) && 
           formData?.password && 
           formData?.confirmPassword && 
           formData?.password === formData?.confirmPassword &&
           Object.values(validatePassword(formData?.password))?.every(Boolean);
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="We'll use this to send you personalized outfit recommendations"
        required
      />
      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData?.password && passwordStrength && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bg}`}
                  style={{ 
                    width: passwordStrength?.strength === 'weak' ? '33%' : 
                           passwordStrength?.strength === 'medium' ? '66%' : '100%' 
                  }}
                />
              </div>
              <span className={`font-caption text-xs font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.strength?.charAt(0)?.toUpperCase() + passwordStrength?.strength?.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(validatePassword(formData?.password))?.map(([key, valid]) => (
                <div key={key} className={`flex items-center space-x-1 ${valid ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={valid ? "Check" : "X"} size={12} />
                  <span className="font-caption">
                    {key === 'length' ? '8+ characters' :
                     key === 'uppercase' ? 'Uppercase' :
                     key === 'lowercase' ? 'Lowercase' :
                     key === 'number'? 'Number' : 'Special char'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password Field */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      {/* Weather Unit Preference */}
      <div className="space-y-3">
        <label className="font-body font-medium text-sm text-foreground">
          Preferred Weather Unit
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange('weatherUnit', 'fahrenheit')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-smooth ${
              formData?.weatherUnit === 'fahrenheit' ?'border-primary bg-primary/10 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name="Thermometer" size={16} />
            <span className="font-body text-sm">Fahrenheit (°F)</span>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('weatherUnit', 'celsius')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-smooth ${
              formData?.weatherUnit === 'celsius' ?'border-primary bg-primary/10 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name="Thermometer" size={16} />
            <span className="font-body text-sm">Celsius (°C)</span>
          </button>
        </div>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={isLoading}
        disabled={!isFormValid() || isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="w-full"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;