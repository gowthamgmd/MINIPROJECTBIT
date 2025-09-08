import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationHistory = ({ onViewOutfit, onSaveOutfit }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const historyData = [
    {
      id: 1,
      date: new Date(Date.now() - 86400000), // Yesterday
      title: "Professional Chic",
      mood: "Confident",
      weather: "Sunny, 72°F",
      colors: ["#2C3E50", "#E74C3C", "#ECF0F1"],
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
      isFavorite: true,
      rating: 5,
      worn: true
    },
    {
      id: 2,
      date: new Date(Date.now() - 172800000), // 2 days ago
      title: "Casual Weekend",
      mood: "Relaxed",
      weather: "Cloudy, 65°F",
      colors: ["#3498DB", "#2ECC71", "#F39C12"],
      thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
      isFavorite: false,
      rating: 4,
      worn: false
    },
    {
      id: 3,
      date: new Date(Date.now() - 259200000), // 3 days ago
      title: "Evening Elegance",
      mood: "Sophisticated",
      weather: "Clear, 68°F",
      colors: ["#8E44AD", "#34495E", "#BDC3C7"],
      thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop",
      isFavorite: true,
      rating: 5,
      worn: true
    },
    {
      id: 4,
      date: new Date(Date.now() - 345600000), // 4 days ago
      title: "Sporty Comfort",
      mood: "Energetic",
      weather: "Rainy, 60°F",
      colors: ["#E67E22", "#27AE60", "#95A5A6"],
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
      isFavorite: false,
      rating: 3,
      worn: false
    },
    {
      id: 5,
      date: new Date(Date.now() - 432000000), // 5 days ago
      title: "Boho Vibes",
      mood: "Creative",
      weather: "Partly Cloudy, 70°F",
      colors: ["#D35400", "#16A085", "#F4D03F"],
      thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop",
      isFavorite: true,
      rating: 4,
      worn: true
    }
  ];

  const filters = [
    { key: 'all', label: 'All', count: historyData?.length },
    { key: 'favorites', label: 'Favorites', count: historyData?.filter(item => item?.isFavorite)?.length },
    { key: 'worn', label: 'Worn', count: historyData?.filter(item => item?.worn)?.length },
    { key: 'saved', label: 'Saved', count: historyData?.filter(item => !item?.worn)?.length }
  ];

  const filteredHistory = historyData?.filter(item => {
    switch (activeFilter) {
      case 'favorites':
        return item?.isFavorite;
      case 'worn':
        return item?.worn;
      case 'saved':
        return !item?.worn;
      default:
        return true;
    }
  });

  const handleToggleFavorite = (id) => {
    // In real app, update the favorite status
    console.log('Toggle favorite for outfit:', id);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Recommendation History
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Your past outfit recommendations
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
        >
        </Button>
      </div>
      {/* Filters */}
      <div className="flex items-center space-x-1 mb-6 overflow-x-auto">
        {filters?.map((filter) => (
          <button
            key={filter?.key}
            onClick={() => setActiveFilter(filter?.key)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg font-body font-medium text-sm
              whitespace-nowrap transition-smooth
              ${activeFilter === filter?.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <span>{filter?.label}</span>
            <span className={`
              px-1.5 py-0.5 rounded-full text-xs font-medium
              ${activeFilter === filter?.key
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted-foreground/20 text-muted-foreground'
              }
            `}>
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
      {/* History List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredHistory?.length > 0 ? (
          filteredHistory?.map((outfit) => (
            <div
              key={outfit?.id}
              className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth cursor-pointer"
              onClick={() => onViewOutfit(outfit)}
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={outfit?.thumbnail}
                    alt={outfit?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-body font-medium text-foreground truncate">
                    {outfit?.title}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {renderStars(outfit?.rating)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} className="text-accent" />
                    <span className="font-caption text-xs text-muted-foreground">
                      {outfit?.mood}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Cloud" size={12} className="text-primary" />
                    <span className="font-caption text-xs text-muted-foreground">
                      {outfit?.weather}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {outfit?.colors?.slice(0, 3)?.map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <span className="font-caption text-xs text-muted-foreground">
                      {formatDate(outfit?.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {outfit?.worn && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Check" size={12} className="text-success" />
                        <span className="font-caption text-xs text-success">Worn</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleToggleFavorite(outfit?.id);
                      }}
                      className="p-1 rounded hover:bg-background transition-smooth"
                    >
                      <Icon
                        name="Heart"
                        size={14}
                        className={outfit?.isFavorite ? 'text-accent fill-current' : 'text-muted-foreground'}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={24} className="text-muted-foreground" />
            </div>
            <p className="font-body text-muted-foreground mb-2">
              No outfits found
            </p>
            <p className="font-caption text-sm text-muted-foreground">
              Try adjusting your filter or create a new outfit recommendation
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredHistory?.length > 0 && (
        <div className="border-t border-border pt-4 mt-4">
          <Button
            variant="ghost"
            className="w-full"
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All History
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendationHistory;