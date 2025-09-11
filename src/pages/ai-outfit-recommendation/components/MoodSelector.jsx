import React from 'react';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    {
      id: 'energetic',
      label: 'Energetic',
      emoji: '⚡',
      description: 'Ready to take on the world',
      color: 'bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200',
      activeColor: 'bg-yellow-200 border-yellow-300'
    },
    {
      id: 'confident',
      label: 'Confident',
      emoji: '💪',
      description: 'Feeling bold and powerful',
      color: 'bg-red-100 border-red-200 text-red-800 hover:bg-red-200',
      activeColor: 'bg-red-200 border-red-300'
    },
    {
      id: 'creative',
      label: 'Creative',
      emoji: '🎨',
      description: 'Inspired and artistic',
      color: 'bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200',
      activeColor: 'bg-purple-200 border-purple-300'
    },
    {
      id: 'professional',
      label: 'Professional',
      emoji: '💼',
      description: 'Business-focused mindset',
      color: 'bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200',
      activeColor: 'bg-blue-200 border-blue-300'
    },
    {
      id: 'relaxed',
      label: 'Relaxed',
      emoji: '😌',
      description: 'Calm and comfortable',
      color: 'bg-green-100 border-green-200 text-green-800 hover:bg-green-200',
      activeColor: 'bg-green-200 border-green-300'
    },
    {
      id: 'romantic',
      label: 'Romantic',
      emoji: '💕',
      description: 'Soft and dreamy',
      color: 'bg-pink-100 border-pink-200 text-pink-800 hover:bg-pink-200',
      activeColor: 'bg-pink-200 border-pink-300'
    },
    {
      id: 'adventurous',
      label: 'Adventurous',
      emoji: '🗺️',
      description: 'Ready for new experiences',
      color: 'bg-orange-100 border-orange-200 text-orange-800 hover:bg-orange-200',
      activeColor: 'bg-orange-200 border-orange-300'
    },
    {
      id: 'minimalist',
      label: 'Minimalist',
      emoji: '⚪',
      description: 'Simple and clean',
      color: 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200',
      activeColor: 'bg-gray-200 border-gray-300'
    }
  ];

  return (
    <div data-mood-selector className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {moods?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => onMoodSelect?.(mood)}
            className={cn(
              'p-4 border-2 rounded-lg transition-all duration-200 text-left hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              selectedMood?.id === mood?.id 
                ? `${mood?.activeColor} shadow-md transform scale-105` 
                : mood?.color
            )}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{mood?.emoji}</span>
              <h4 className="font-heading font-semibold text-sm">
                {mood?.label}
              </h4>
              {selectedMood?.id === mood?.id && (
                <Icon name="Check" size={16} className="ml-auto" />
              )}
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              {mood?.description}
            </p>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center">
            <span className="text-lg mr-2">{selectedMood?.emoji}</span>
            <div>
              <p className="font-medium text-sm text-foreground">
                Selected mood: <span className="text-primary">{selectedMood?.label}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedMood?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;