import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleNameSave = () => {
    if (editedName?.trim()) {
      onUpdateProfile({ name: editedName?.trim() });
      setIsEditingName(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // In a real app, you would upload to a service
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateProfile({ profileImage: e?.target?.result });
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
            {user?.profileImage ? (
              <Image
                src={user?.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <Icon name="User" size={32} color="white" />
              </div>
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-smooth">
            <Icon name="Camera" size={16} color="white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          {isEditingName ? (
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e?.target?.value)}
                className="font-heading text-xl font-semibold bg-input border border-border rounded-lg px-3 py-1 text-foreground"
                onKeyPress={(e) => e?.key === 'Enter' && handleNameSave()}
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNameSave}
                iconName="Check"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditingName(false);
                  setEditedName(user?.name || '');
                }}
                iconName="X"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
              <h1 className="font-heading text-xl font-semibold text-foreground">
                {user?.name || 'User'}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingName(true)}
                iconName="Edit2"
              />
            </div>
          )}
          
          <p className="font-body text-muted-foreground mb-2">{user?.email}</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{user?.location || 'Location not set'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>Joined {new Date(user.joinedDate)?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex space-x-6 text-center">
          <div>
            <div className="font-heading text-lg font-semibold text-foreground">
              {user?.totalRecommendations || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Recommendations
            </div>
          </div>
          <div>
            <div className="font-heading text-lg font-semibold text-foreground">
              {user?.favoriteOutfits || 0}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Favorites
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;