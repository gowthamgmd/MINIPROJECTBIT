import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConversationHistory = ({ history, onAskFollowUp }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const groupHistoryByDate = (history) => {
    const groups = {};
    history?.forEach(item => {
      const date = formatDate(item?.timestamp);
      if (!groups?.[date]) {
        groups[date] = [];
      }
      groups?.[date]?.push(item);
    });
    return groups;
  };

  const historyGroups = groupHistoryByDate(history || []);
  const displayedHistory = isExpanded ? history : history?.slice(-3);

  if (!history || history?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
              <Icon name="History" size={20} className="text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Conversation History
            </h3>
            <span className="ml-2 px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
              {history?.length}
            </span>
          </div>
          {history?.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(historyGroups)?.map(([date, items]) => (
          <div key={date}>
            <h4 className="font-medium text-sm text-muted-foreground mb-2 sticky top-0 bg-card py-1">
              {date}
            </h4>
            <div className="space-y-3">
              {items?.map((item) => (
                <div key={item?.id} className="space-y-2">
                  {item?.type === 'recommendation' && (
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <Icon name="Sparkles" size={16} className="text-primary mr-2" />
                          <span className="font-medium text-sm text-foreground">
                            AI Recommendation
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(item?.timestamp)}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        <p>Mood: {item?.data?.context?.mood?.label}</p>
                        <p>Weather: {item?.data?.context?.weather?.temperature}°F, {item?.data?.context?.weather?.condition}</p>
                        <p>Occasion: {item?.data?.context?.preferences?.occasion}</p>
                      </div>

                      <div className="space-y-2">
                        {item?.data?.outfits?.map((outfit) => (
                          <div 
                            key={outfit?.id}
                            className={cn(
                              "p-3 border rounded-md cursor-pointer transition-colors",
                              selectedHistoryItem?.id === `${item?.id}-${outfit?.id}`
                                ? "border-primary bg-primary/5" :"border-border hover:border-primary/50"
                            )}
                            onClick={() => setSelectedHistoryItem(
                              selectedHistoryItem?.id === `${item?.id}-${outfit?.id}` 
                                ? null 
                                : { id: `${item?.id}-${outfit?.id}`, outfit, item }
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-sm text-foreground">
                                  {outfit?.name}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  {Math.round(outfit?.confidence * 100)}% match
                                </p>
                              </div>
                              <Icon 
                                name={selectedHistoryItem?.id === `${item?.id}-${outfit?.id}` ? "ChevronUp" : "ChevronDown"} 
                                size={16} 
                                className="text-muted-foreground" 
                              />
                            </div>
                            
                            {selectedHistoryItem?.id === `${item?.id}-${outfit?.id}` && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                  {outfit?.items?.map((item, index) => (
                                    <div key={index} className="text-xs text-muted-foreground">
                                      • {item}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    iconName="MessageCircle"
                                    onClick={() => onAskFollowUp?.(`Can you recreate the ${outfit?.name} outfit with current weather conditions?`)}
                                  >
                                    Recreate
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    iconName="RefreshCw"
                                    onClick={() => onAskFollowUp?.(`Give me variations of the ${outfit?.name} outfit`)}
                                  >
                                    Variations
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item?.type === 'question' && (
                    <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="User" size={12} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-foreground">You asked</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(item?.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item?.question}</p>
                      </div>
                    </div>
                  )}

                  {item?.type === 'answer' && (
                    <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="Bot" size={12} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-foreground">AI Response</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(item?.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{item?.answer}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MessageCircle"
                          onClick={() => onAskFollowUp?.('Can you tell me more about this?')}
                          className="mt-2 text-xs"
                        >
                          Follow up
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && history?.length > 3 && (
        <div className="p-3 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            iconName="MoreHorizontal"
          >
            View {history?.length - 3} more items
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;