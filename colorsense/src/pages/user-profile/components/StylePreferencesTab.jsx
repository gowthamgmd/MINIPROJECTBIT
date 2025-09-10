import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const StylePreferencesTab = ({ user, onUpdateProfile }) => {
  const [preferences, setPreferences] = useState({
    clothingCategories: user?.stylePreferences?.clothingCategories || [],
    preferredBrands: user?.stylePreferences?.preferredBrands || [],
    sizes: user?.stylePreferences?.sizes || {},
    colorPreferences: user?.stylePreferences?.colorPreferences || [],
    avoidColors: user?.stylePreferences?.avoidColors || [],
    stylePersonality: user?.stylePreferences?.stylePersonality || 'balanced',
    budgetRange: user?.stylePreferences?.budgetRange || 'moderate'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const clothingCategoryOptions = [
    { value: 'casual', label: 'Casual Wear' },
    { value: 'business', label: 'Business Attire' },
    { value: 'formal', label: 'Formal Wear' },
    { value: 'athletic', label: 'Athletic Wear' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const brandOptions = [
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'zara', label: 'Zara' },
    { value: 'hm', label: 'H&M' },
    { value: 'uniqlo', label: 'Uniqlo' },
    { value: 'gap', label: 'Gap' },
    { value: 'levis', label: "Levi\'s" },
    { value: 'northface', label: 'The North Face' }
  ];

  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
    { value: 'orange', label: 'Orange' },
    { value: 'pink', label: 'Pink' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'gray', label: 'Gray' },
    { value: 'brown', label: 'Brown' },
    { value: 'navy', label: 'Navy' }
  ];

  const stylePersonalityOptions = [
    { value: 'bold', label: 'Bold & Vibrant' },
    { value: 'classic', label: 'Classic & Timeless' },
    { value: 'trendy', label: 'Trendy & Fashion-Forward' },
    { value: 'minimalist', label: 'Minimalist & Clean' },
    { value: 'balanced', label: 'Balanced & Versatile' }
  ];

  const budgetRangeOptions = [
    { value: 'budget', label: 'Budget-Friendly ($0-$50)' },
    { value: 'moderate', label: 'Moderate ($50-$150)' },
    { value: 'premium', label: 'Premium ($150-$300)' },
    { value: 'luxury', label: 'Luxury ($300+)' }
  ];

  const handleArrayChange = (field, value, checked) => {
    setPreferences(prev => ({
      ...prev,
      [field]: checked
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const handleSizeChange = (category, size) => {
    setPreferences(prev => ({
      ...prev,
      sizes: {
        ...prev?.sizes,
        [category]: size
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateProfile({ stylePreferences: preferences });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setPreferences({
      clothingCategories: user?.stylePreferences?.clothingCategories || [],
      preferredBrands: user?.stylePreferences?.preferredBrands || [],
      sizes: user?.stylePreferences?.sizes || {},
      colorPreferences: user?.stylePreferences?.colorPreferences || [],
      avoidColors: user?.stylePreferences?.avoidColors || [],
      stylePersonality: user?.stylePreferences?.stylePersonality || 'balanced',
      budgetRange: user?.stylePreferences?.budgetRange || 'moderate'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Style Preferences
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Customize your style preferences for better recommendations
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>
      {/* Clothing Categories */}
      <div className="space-y-4">
        <h3 className="font-heading font-medium text-foreground">
          Clothing Categories
        </h3>
        <CheckboxGroup>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {clothingCategoryOptions?.map(option => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={preferences?.clothingCategories?.includes(option?.value)}
                onChange={(e) => handleArrayChange('clothingCategories', option?.value, e?.target?.checked)}
                disabled={!isEditing}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
      {/* Size Information */}
      <div className="space-y-4">
        <h3 className="font-heading font-medium text-foreground">
          Size Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Top Size"
            type="text"
            value={preferences?.sizes?.top || ''}
            onChange={(e) => handleSizeChange('top', e?.target?.value)}
            disabled={!isEditing}
            placeholder="e.g., M, L, XL"
          />
          <Input
            label="Bottom Size"
            type="text"
            value={preferences?.sizes?.bottom || ''}
            onChange={(e) => handleSizeChange('bottom', e?.target?.value)}
            disabled={!isEditing}
            placeholder="e.g., 32, 34, L"
          />
          <Input
            label="Shoe Size"
            type="text"
            value={preferences?.sizes?.shoe || ''}
            onChange={(e) => handleSizeChange('shoe', e?.target?.value)}
            disabled={!isEditing}
            placeholder="e.g., 9, 10.5, 42"
          />
        </div>
      </div>
      {/* Color Preferences */}
      <div className="space-y-4">
        <h3 className="font-heading font-medium text-foreground">
          Color Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">
              Favorite Colors
            </h4>
            <CheckboxGroup>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions?.map(color => (
                  <Checkbox
                    key={color?.value}
                    label={color?.label}
                    checked={preferences?.colorPreferences?.includes(color?.value)}
                    onChange={(e) => handleArrayChange('colorPreferences', color?.value, e?.target?.checked)}
                    disabled={!isEditing}
                    size="sm"
                  />
                ))}
              </div>
            </CheckboxGroup>
          </div>
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">
              Colors to Avoid
            </h4>
            <CheckboxGroup>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions?.map(color => (
                  <Checkbox
                    key={color?.value}
                    label={color?.label}
                    checked={preferences?.avoidColors?.includes(color?.value)}
                    onChange={(e) => handleArrayChange('avoidColors', color?.value, e?.target?.checked)}
                    disabled={!isEditing}
                    size="sm"
                  />
                ))}
              </div>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      {/* Style Personality & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Style Personality"
          options={stylePersonalityOptions}
          value={preferences?.stylePersonality}
          onChange={(value) => setPreferences(prev => ({ ...prev, stylePersonality: value }))}
          disabled={!isEditing}
          description="How would you describe your style?"
        />

        <Select
          label="Budget Range"
          options={budgetRangeOptions}
          value={preferences?.budgetRange}
          onChange={(value) => setPreferences(prev => ({ ...prev, budgetRange: value }))}
          disabled={!isEditing}
          description="Preferred price range per item"
        />
      </div>
      {/* Preferred Brands */}
      <div className="space-y-4">
        <h3 className="font-heading font-medium text-foreground">
          Preferred Brands
        </h3>
        <CheckboxGroup>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brandOptions?.map(brand => (
              <Checkbox
                key={brand?.value}
                label={brand?.label}
                checked={preferences?.preferredBrands?.includes(brand?.value)}
                onChange={(e) => handleArrayChange('preferredBrands', brand?.value, e?.target?.checked)}
                disabled={!isEditing}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default StylePreferencesTab;