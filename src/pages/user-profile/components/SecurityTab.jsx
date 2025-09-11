import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityTab = ({ user, onUpdateProfile }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.security?.twoFactorEnabled || false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState({});

  // Mock active sessions
  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2025-01-08 10:30 AM',
      current: true,
      ip: '192.168.1.100'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '2025-01-07 08:15 PM',
      current: false,
      ip: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Firefox on MacBook',
      location: 'Brooklyn, NY',
      lastActive: '2025-01-06 02:45 PM',
      current: false,
      ip: '192.168.1.102'
    }
  ];

  const validatePassword = (password) => {
    const errors = {};
    if (password?.length < 8) {
      errors.length = 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/?.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/?.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/?.test(password)) {
      errors.number = 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/?.test(password)) {
      errors.special = 'Password must contain at least one special character';
    }
    return errors;
  };

  const handlePasswordChange = async () => {
    const errors = {};
    
    if (!passwordForm?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      errors.newPassword = 'New password is required';
    } else {
      const passwordValidation = validatePassword(passwordForm?.newPassword);
      if (Object.keys(passwordValidation)?.length > 0) {
        errors.newPassword = Object.values(passwordValidation)?.[0];
      }
    }
    
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);

    if (Object.keys(errors)?.length === 0) {
      setIsChangingPassword(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock validation - in real app, verify current password with backend
        if (passwordForm?.currentPassword !== 'currentpass123') {
          setPasswordErrors({ currentPassword: 'Current password is incorrect' });
          return;
        }
        
        onUpdateProfile({ 
          security: { 
            ...user?.security, 
            lastPasswordChange: new Date()?.toISOString() 
          } 
        });
        
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        alert('Password changed successfully!');
      } catch (error) {
        console.error('Password change failed:', error);
      } finally {
        setIsChangingPassword(false);
      }
    }
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    try {
      // Simulate 2FA setup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock backup codes
      const codes = Array.from({ length: 8 }, () => 
        Math.random()?.toString(36)?.substring(2, 8)?.toUpperCase()
      );
      setBackupCodes(codes);
      setShow2FASetup(true);
    } catch (error) {
      console.error('2FA setup failed:', error);
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const complete2FASetup = () => {
    setTwoFactorEnabled(true);
    setShow2FASetup(false);
    onUpdateProfile({
      security: {
        ...user?.security,
        twoFactorEnabled: true,
        twoFactorSetupDate: new Date()?.toISOString()
      }
    });
  };

  const disable2FA = async () => {
    if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTwoFactorEnabled(false);
        onUpdateProfile({
          security: {
            ...user?.security,
            twoFactorEnabled: false
          }
        });
      } catch (error) {
        console.error('Failed to disable 2FA:', error);
      }
    }
  };

  const terminateSession = async (sessionId) => {
    if (confirm('Are you sure you want to terminate this session?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app, make API call to terminate session
        alert('Session terminated successfully');
      } catch (error) {
        console.error('Failed to terminate session:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Security Settings
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Manage your account security and authentication settings
        </p>
      </div>
      {/* Password Change */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Change Password
        </h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm?.currentPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e?.target?.value }))}
            error={passwordErrors?.currentPassword}
            required
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordForm?.newPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e?.target?.value }))}
            error={passwordErrors?.newPassword}
            description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm?.confirmPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
            error={passwordErrors?.confirmPassword}
            required
          />
          
          <Button
            onClick={handlePasswordChange}
            loading={isChangingPassword}
            iconName="Lock"
            iconPosition="left"
          >
            Change Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-medium text-foreground">
              Two-Factor Authentication
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {twoFactorEnabled ? (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Shield" size={16} />
                <span className="font-body text-sm font-medium">Enabled</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="ShieldAlert" size={16} />
                <span className="font-body text-sm font-medium">Disabled</span>
              </div>
            )}
          </div>
        </div>

        {!twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-body font-medium text-foreground mb-1">
                    Why enable 2FA?
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground">
                    Two-factor authentication significantly improves your account security by requiring 
                    a second form of verification when signing in.
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleEnable2FA}
              loading={isEnabling2FA}
              iconName="Shield"
              iconPosition="left"
            >
              Enable Two-Factor Authentication
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <div className="font-body font-medium text-foreground">
                    Two-factor authentication is active
                  </div>
                  <div className="font-caption text-sm text-muted-foreground">
                    Enabled on {new Date(user.security?.twoFactorSetupDate || Date.now())?.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={disable2FA}
                iconName="ShieldOff"
                iconPosition="left"
              >
                Disable
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-300">
          <div className="bg-card rounded-lg shadow-elevated max-w-md w-full p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Complete 2FA Setup
            </h3>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-body font-medium text-foreground mb-2">
                  Backup Codes
                </h4>
                <p className="font-caption text-sm text-muted-foreground mb-3">
                  Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {backupCodes?.map((code, index) => (
                    <div key={index} className="bg-card border border-border rounded px-2 py-1 text-center">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="backup-codes-saved"
                  required
                />
                <label htmlFor="backup-codes-saved" className="font-caption text-sm text-foreground">
                  I have saved my backup codes in a safe place
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShow2FASetup(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={complete2FASetup}
                  iconName="Check"
                  iconPosition="left"
                >
                  Complete Setup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Active Sessions
        </h3>
        <div className="space-y-4">
          {activeSessions?.map(session => (
            <div key={session?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Monitor" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-body font-medium text-foreground">
                      {session?.device}
                    </span>
                    {session?.current && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="font-caption text-sm text-muted-foreground">
                    {session?.location} • Last active {session?.lastActive}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    IP: {session?.ip}
                  </div>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => terminateSession(session?.id)}
                  iconName="X"
                  iconPosition="left"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('This will sign you out of all devices except this one. Continue?')) {
                alert('All other sessions have been terminated.');
              }
            }}
            iconName="LogOut"
            iconPosition="left"
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-6">
        <h3 className="font-heading font-medium text-error mb-2">
          Delete Account
        </h3>
        <p className="font-caption text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm('Are you absolutely sure? This will permanently delete your account and all data.')) {
              alert('Account deletion initiated. You will receive a confirmation email.');
            }
          }}
          iconName="Trash2"
          iconPosition="left"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;