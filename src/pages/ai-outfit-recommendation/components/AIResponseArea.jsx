import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AIResponseArea = ({ 
  recommendations, 
  onSaveOutfit, 
  onAskFollowUp, 
  isProcessing 
}) => {
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const handleFollowUpSubmit = (e) => {
    e?.preventDefault();
    if (followUpQuestion?.trim()) {
      onAskFollowUp?.(followUpQuestion);
      setFollowUpQuestion('');
    }
  };

  const commonQuestions = [
    "Can you suggest color alternatives?",
    "What accessories would work with this?",
    "How can I make this more casual?",
    "What shoes would complete this look?",
    "Can you suggest a more budget-friendly version?"
  ];

  if (isProcessing) {
    return (
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Sparkles" size={32} className="text-primary animate-spin" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            AI is crafting your perfect look...
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="animate-pulse">🧠 Analyzing your mood and preferences</p>
            <p className="animate-pulse">🌤️ Considering weather conditions</p>
            <p className="animate-pulse">✨ Creating personalized recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      {recommendations?.insights && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              AI Insights
            </h3>
          </div>
          <div className="space-y-2">
            {recommendations?.insights?.map((insight, index) => (
              <div key={index} className="flex items-start">
                <Icon name="Lightbulb" size={16} className="text-accent mr-2 mt-1" />
                <p className="text-sm text-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outfit Recommendations */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center">
          <Icon name="Shirt" size={20} className="mr-2" />
          Recommended Outfits
        </h3>
        
        <div className="grid gap-6">
          {recommendations?.outfits?.map((outfit) => (
            <div 
              key={outfit?.id} 
              className={cn(
                "bg-card rounded-lg border transition-all duration-200 hover:shadow-lg",
                selectedOutfit?.id === outfit?.id 
                  ? "border-primary shadow-md" 
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="p-6">
                {/* Outfit Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {outfit?.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-green-600">
                        <Icon name="Target" size={16} className="mr-1" />
                        <span>{Math.round(outfit?.confidence * 100)}% match</span>
                      </div>
                      <div className="flex items-center text-primary">
                        <Icon name="Heart" size={16} className="mr-1" />
                        <span>AI Recommended</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Bookmark"
                    onClick={() => onSaveOutfit?.(outfit?.id)}
                  >
                    Save
                  </Button>
                </div>

                {/* Outfit Items */}
                <div className="mb-4">
                  <h5 className="font-medium text-sm text-foreground mb-2">
                    Outfit Pieces:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {outfit?.items?.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-2 bg-muted/50 rounded-lg"
                      >
                        <Icon name="Shirt" size={16} className="text-muted-foreground mr-2" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning */}
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <Icon name="Smile" size={16} className="text-blue-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm text-blue-900 mb-1">
                          Mood Alignment
                        </p>
                        <p className="text-sm text-blue-700">
                          {outfit?.moodAlignment}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <div className="flex items-start">
                      <Icon name="CloudSun" size={16} className="text-cyan-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm text-cyan-900 mb-1">
                          Weather Consideration
                        </p>
                        <p className="text-sm text-cyan-700">
                          {outfit?.weatherAppropriate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning Points */}
                {outfit?.reasonings && (
                  <div className="mb-4">
                    <h5 className="font-medium text-sm text-foreground mb-2">
                      Why this works:
                    </h5>
                    <ul className="space-y-1">
                      {outfit?.reasonings?.map((reason, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Icon name="Check" size={14} className="text-green-500 mr-2 mt-0.5" />
                          <span className="text-muted-foreground">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Alternatives */}
                {outfit?.alternatives && (
                  <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                    <h5 className="font-medium text-sm text-foreground mb-2 flex items-center">
                      <Icon name="RefreshCw" size={16} className="mr-1" />
                      Quick alternatives:
                    </h5>
                    <ul className="space-y-1">
                      {outfit?.alternatives?.map((alt, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {alt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Button
                    variant={selectedOutfit?.id === outfit?.id ? "default" : "ghost"}
                    size="sm"
                    iconName="Eye"
                    onClick={() => setSelectedOutfit(
                      selectedOutfit?.id === outfit?.id ? null : outfit
                    )}
                  >
                    {selectedOutfit?.id === outfit?.id ? 'Selected' : 'View Details'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Palette"
                    onClick={() => onAskFollowUp?.(`Can you suggest color alternatives for the ${outfit?.name} outfit?`)}
                  >
                    Color Options
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Package"
                    onClick={() => onAskFollowUp?.(`What accessories would work with the ${outfit?.name} outfit?`)}
                  >
                    Add Accessories
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up Questions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="MessageCircle" size={20} className="text-accent" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Ask Follow-up Questions
          </h3>
        </div>

        {/* Quick Questions */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-3">
            Quick questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {commonQuestions?.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onAskFollowUp?.(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Question */}
        <form onSubmit={handleFollowUpSubmit} className="space-y-3">
          <Input
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e?.target?.value)}
            placeholder="Ask anything about these outfits..."
          />
          <Button
            type="submit"
            disabled={!followUpQuestion?.trim()}
            iconName="Send"
            className="w-full"
          >
            Ask AI
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIResponseArea;