import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import MoodSelector from './components/MoodSelector';
import WeatherInput from './components/WeatherInput';
import PreferencesPanel from './components/PreferencesPanel';
import AIResponseArea from './components/AIResponseArea';
import ConversationHistory from './components/ConversationHistory';
import QuickStartGuide from './components/QuickStartGuide';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIOutfitRecommendation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentRecommendations, setCurrentRecommendations] = useState(null);
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  // Input states
  const [selectedMood, setSelectedMood] = useState(null);
  const [weatherConditions, setWeatherConditions] = useState({
    temperature: null,
    condition: '',
    humidity: null,
    windSpeed: null,
    location: ''
  });
  const [preferences, setPreferences] = useState({
    occasion: '',
    formalityLevel: 5,
    comfortPriority: 5,
    colorPreferences: [],
    excludedItems: [],
    budgetRange: '',
    styleGoal: ''
  });

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load conversation history
    const savedHistory = localStorage.getItem('aiOutfitHistory');
    if (savedHistory) {
      setConversationHistory(JSON.parse(savedHistory));
    }

    // Check if first visit
    const hasVisited = localStorage.getItem('aiOutfitVisited');
    if (!hasVisited) {
      setShowQuickStart(true);
      localStorage.setItem('aiOutfitVisited', 'true');
    }

    // Auto-load weather if location is available
    loadCurrentWeather();
  }, []);

  const loadCurrentWeather = () => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const locationData = JSON.parse(savedLocation);
      // Simulate weather data - in real app, fetch from weather API
      setWeatherConditions({
        temperature: 72,
        condition: 'partly-cloudy',
        humidity: 65,
        windSpeed: 8,
        location: locationData?.location || 'Current Location'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/user-login');
  };

  const generateOutfitRecommendation = async () => {
    if (!selectedMood || !weatherConditions?.temperature) {
      alert('Please select your mood and ensure weather information is available.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create conversation context
      const context = {
        mood: selectedMood,
        weather: weatherConditions,
        preferences,
        user: user?.stylePreferences || {},
        timestamp: new Date()?.toISOString()
      };

      // Simulate AI processing (replace with actual OpenAI call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRecommendation = {
        id: Date.now(),
        outfits: [
          {
            id: 1,
            name: 'Casual Comfort',
            items: ['Light Blue Jeans', 'White Cotton T-Shirt', 'Navy Blazer', 'White Sneakers'],
            confidence: 0.92,
            moodAlignment: 'Perfect for your current energetic mood',
            weatherAppropriate: `Ideal for ${weatherConditions?.temperature}°F weather`,
            reasonings: [
              'Light colors reflect your positive energy',
              'Breathable fabrics for comfort',
              'Blazer adds versatility for different occasions'
            ],
            alternatives: ['Switch blazer for cardigan', 'Add colorful accessories']
          },
          {
            id: 2,
            name: 'Professional Chic',
            items: ['Black Dress Pants', 'Silk Blouse', 'Statement Necklace', 'Low Heels'],
            confidence: 0.87,
            moodAlignment: 'Boosts confidence while maintaining comfort',
            weatherAppropriate: 'Perfect indoor temperature regulation',
            reasonings: [
              'Professional appearance enhances mood',
              'Comfortable fit for all-day wear',
              'Versatile pieces for multiple occasions'
            ],
            alternatives: ['Switch to flats for more comfort', 'Add a light jacket']
          }
        ],
        insights: [
          'Your mood suggests you\'re ready for social interactions',
          'Weather conditions favor layered outfits',
          'Consider adding a pop of color to enhance your energy'
        ],
        context
      };

      setCurrentRecommendations(mockRecommendation);
      
      // Add to conversation history
      const newHistory = [
        ...conversationHistory,
        {
          id: Date.now(),
          type: 'recommendation',
          data: mockRecommendation,
          timestamp: new Date()?.toISOString()
        }
      ];
      setConversationHistory(newHistory);
      localStorage.setItem('aiOutfitHistory', JSON.stringify(newHistory));

    } catch (error) {
      console.error('Error generating recommendations:', error);
      alert('Failed to generate recommendations. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveRecommendation = (outfitId) => {
    // Save to favorites
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    const outfit = currentRecommendations?.outfits?.find(o => o?.id === outfitId);
    if (outfit) {
      savedOutfits?.push({
        ...outfit,
        savedAt: new Date()?.toISOString()
      });
      localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
      alert('Outfit saved to favorites!');
    }
  };

  const handleAskFollowUp = (question) => {
    // Add follow-up question to conversation
    const newHistory = [
      ...conversationHistory,
      {
        id: Date.now(),
        type: 'question',
        question,
        timestamp: new Date()?.toISOString()
      }
    ];
    setConversationHistory(newHistory);
    localStorage.setItem('aiOutfitHistory', JSON.stringify(newHistory));
    
    // Process follow-up (simulate AI response)
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        type: 'answer',
        answer: `Great question! Based on your style preferences, I'd suggest ${question?.includes('color') ? 'incorporating more blues and greens' : 'focusing on versatile pieces that can transition from day to night'}.`,
        timestamp: new Date()?.toISOString()
      };
      
      const updatedHistory = [...newHistory, response];
      setConversationHistory(updatedHistory);
      localStorage.setItem('aiOutfitHistory', JSON.stringify(updatedHistory));
    }, 1000);
  };

  const clearHistory = () => {
    setConversationHistory([]);
    setCurrentRecommendations(null);
    localStorage.removeItem('aiOutfitHistory');
  };

  const hasInputs = selectedMood && weatherConditions?.temperature && preferences?.occasion;

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  AI Outfit Recommendations ✨
                </h1>
                <p className="font-body text-muted-foreground max-w-2xl">
                  Tell me about your mood, check the weather, and set your preferences to get personalized outfit suggestions 
                  powered by AI. Let's create the perfect look for your day!
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  onClick={() => setShowQuickStart(true)}
                  className="hidden lg:flex"
                >
                  Quick Guide
                </Button>
                {conversationHistory?.length > 0 && (
                  <Button
                    variant="ghost"
                    iconName="Trash2"
                    onClick={clearHistory}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear History
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Panel - Left Side */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mood Selection */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <Icon name="Smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    How are you feeling today?
                  </h3>
                </div>
                <MoodSelector
                  selectedMood={selectedMood}
                  onMoodSelect={setSelectedMood}
                />
              </div>

              {/* Weather Conditions */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                    <Icon name="CloudSun" size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Weather Conditions
                  </h3>
                </div>
                <WeatherInput
                  weather={weatherConditions}
                  onWeatherChange={setWeatherConditions}
                />
              </div>

              {/* Preferences Panel */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                    <Icon name="Settings" size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Style Preferences
                  </h3>
                </div>
                <PreferencesPanel
                  preferences={preferences}
                  onPreferencesChange={setPreferences}
                />
              </div>

              {/* Generate Button */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 p-6">
                <Button
                  onClick={generateOutfitRecommendation}
                  disabled={!hasInputs || isProcessing}
                  loading={isProcessing}
                  size="lg"
                  className="w-full font-semibold"
                  iconName="Sparkles"
                >
                  {isProcessing ? 'Creating Your Perfect Look...' : 'Get AI Recommendations'}
                </Button>
                
                {!hasInputs && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Please fill in mood, weather, and occasion to continue
                  </p>
                )}
                
                {hasInputs && (
                  <p className="text-sm text-success mt-3 text-center flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="mr-1" />
                    Ready to generate recommendations
                  </p>
                )}
              </div>
            </div>

            {/* AI Response Area - Right Side */}
            <div className="lg:col-span-7 space-y-6">
              {currentRecommendations ? (
                <AIResponseArea
                  recommendations={currentRecommendations}
                  onSaveOutfit={handleSaveRecommendation}
                  onAskFollowUp={handleAskFollowUp}
                  isProcessing={isProcessing}
                />
              ) : (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Bot" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    Ready to help you look amazing!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Fill in your mood, weather conditions, and preferences on the left, 
                    then click the button to get personalized outfit recommendations.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="Zap" size={16} className="mr-1" />
                      AI-Powered
                    </div>
                    <div className="flex items-center">
                      <Icon name="Heart" size={16} className="mr-1" />
                      Personalized
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={16} className="mr-1" />
                      Instant Results
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation History */}
              {conversationHistory?.length > 0 && (
                <ConversationHistory
                  history={conversationHistory}
                  onAskFollowUp={handleAskFollowUp}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quick Start Guide Modal */}
      <QuickStartGuide
        isOpen={showQuickStart}
        onClose={() => setShowQuickStart(false)}
        onGetStarted={() => {
          setShowQuickStart(false);
          // Auto-scroll to mood selector
          document.querySelector('[data-mood-selector]')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }}
      />
    </div>
  );
};

export default AIOutfitRecommendation;