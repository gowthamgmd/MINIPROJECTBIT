import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TodayOutfitCard = ({ weatherData, moodData, onRefresh, onViewAlternatives }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const todayOutfit = {
    id: 1,
    title: "Cozy Autumn Vibes",
    description: "Perfect for today\'s cool weather and your calm mood",
    colors: ["#8B4513", "#D2691E", "#F4A460"],
    colorNames: ["Saddle Brown", "Chocolate", "Sandy Brown"],
    items: [
      {
        id: 1,
        name: "Wool Blend Sweater",
        category: "Top",
        color: "#8B4513",
        price: 2499,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
        affiliateLink: "#"
      },
      {
        id: 2,
        name: "Dark Wash Jeans",
        category: "Bottom",
        color: "#2F4F4F",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
        affiliateLink: "#"
      },
      {
        id: 3,
        name: "Leather Ankle Boots",
        category: "Shoes",
        color: "#8B4513",
        price: 3999,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
        affiliateLink: "#"
      }
    ],
    totalPrice: 8397,
    moodMatch: 92,
    weatherMatch: 88
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    onRefresh();
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shirt" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Today's Outfit
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          loading={isRefreshing}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      {/* Outfit Preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-lg text-foreground">
            {todayOutfit?.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} className="text-accent" />
              <span className="font-caption text-sm text-muted-foreground">
                {todayOutfit?.moodMatch}% mood match
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Cloud" size={16} className="text-primary" />
              <span className="font-caption text-sm text-muted-foreground">
                {todayOutfit?.weatherMatch}% weather match
              </span>
            </div>
          </div>
        </div>

        <p className="font-body text-muted-foreground mb-4">
          {todayOutfit?.description}
        </p>

        {/* Color Palette */}
        <div className="mb-4">
          <h4 className="font-body font-medium text-sm text-foreground mb-2">
            Today's Color Palette
          </h4>
          <div className="flex items-center space-x-3">
            {todayOutfit?.colors?.map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-border"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="font-caption text-xs text-muted-foreground">
                  {todayOutfit?.colorNames?.[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Outfit Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {todayOutfit?.items?.map((item) => (
            <div key={item?.id} className="bg-muted rounded-lg p-4">
              <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-xs text-muted-foreground uppercase tracking-wide">
                    {item?.category}
                  </span>
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: item?.color }}
                  ></div>
                </div>
                <h5 className="font-body font-medium text-sm text-foreground">
                  {item?.name}
                </h5>
                <div className="flex items-center justify-between">
                  <span className="font-body font-semibold text-primary">
                    ₹{item?.price.toLocaleString('en-IN')}
                  </span>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => window.open(item?.affiliateLink, '_blank')}
                  >
                    Shop
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="bg-primary/5 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-body font-medium text-foreground">
              Complete Outfit Total
            </span>
            <span className="font-heading font-semibold text-xl text-primary">
              ₹{todayOutfit?.totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="font-caption text-sm text-muted-foreground mt-1">
            Save 15% when you buy the complete outfit
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            className="flex-1"
            iconName="ShoppingBag"
            iconPosition="left"
          >
            Shop Complete Outfit
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onViewAlternatives}
            iconName="Shuffle"
            iconPosition="left"
          >
            View Alternatives
          </Button>
          <Button
            variant="ghost"
            size="default"
            iconName="Heart"
            iconPosition="left"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodayOutfitCard;