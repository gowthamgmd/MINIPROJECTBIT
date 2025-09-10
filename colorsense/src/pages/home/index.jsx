import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const features = [
    {
      icon: 'Bot',
      title: 'AI-Powered Recommendations',
      description: 'Get personalized outfit suggestions powered by advanced AI technology',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: 'Palette',
      title: 'Color Matching',
      description: 'Perfect color combinations that complement your skin tone and style',
      color: 'bg-accent/10 text-accent'
    },
    {
      icon: 'CloudSun',
      title: 'Weather-Based Styling',
      description: 'Outfits tailored to weather conditions across Indian cities',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      icon: 'Heart',
      title: 'Mood-Based Fashion',
      description: 'Clothing suggestions that match your current mood and energy',
      color: 'bg-success/10 text-success'
    },
    {
      icon: 'TrendingUp',
      title: 'Style Analytics',
      description: 'Track your style evolution and discover new fashion trends',
      color: 'bg-warning/10 text-warning'
    },
    {
      icon: 'Users',
      title: 'Community Styling',
      description: 'Connect with fashion enthusiasts and share style inspiration',
      color: 'bg-destructive/10 text-destructive'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹0',
      period: 'Forever Free',
      description: 'Perfect for getting started',
      features: [
        '5 AI recommendations per day',
        'Basic color matching',
        'Weather-based suggestions',
        'Mobile app access'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      price: '₹299',
      period: 'per month',
      description: 'Most popular for fashion enthusiasts',
      features: [
        'Unlimited AI recommendations',
        'Advanced color analysis',
        'Mood-based styling',
        'Style analytics',
        'Priority support',
        'Exclusive fashion tips'
      ],
      buttonText: 'Start Premium',
      popular: true
    },
    {
      name: 'Pro',
      price: '₹599',
      period: 'per month',
      description: 'For fashion professionals',
      features: [
        'Everything in Premium',
        'Brand collaboration tools',
        'Advanced style insights',
        'Personal stylist chat',
        'Custom style guides',
        'API access'
      ],
      buttonText: 'Go Pro',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'ColorSense completely transformed my wardrobe! The AI suggestions are spot-on and perfect for Mumbai\'s weather.',
      avatar: '👩‍💼'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      rating: 5,
      text: 'As someone who struggles with color coordination, this app is a lifesaver. My confidence has skyrocketed!',
      avatar: '👨‍💻'
    },
    {
      name: 'Anita Patel',
      location: 'Delhi',
      rating: 5,
      text: 'The mood-based recommendations are amazing. It\'s like having a personal stylist in my pocket!',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Palette" size={24} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">ColorSense</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="font-body text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="font-body text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#about" className="font-body text-muted-foreground hover:text-foreground transition-colors">About</a>
              <Link to="/contact" className="font-body text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-3">
              {currentUser ? (
                <Button onClick={() => navigate('/user-dashboard')}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/user-login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/user-registration')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6">
            Your AI-Powered
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Style Companion</span>
          </h1>
          <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover perfect outfits with AI that understands your style, mood, and India's diverse weather. 
            Look amazing every day with personalized fashion recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/user-registration')}
              className="text-lg px-8 py-4"
              iconName="Sparkles"
            >
              Start Styling for Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/ai-chat')}
              className="text-lg px-8 py-4"
              iconName="Play"
            >
              See AI in Action
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-accent mb-2">1M+</div>
              <div className="text-muted-foreground">Outfit Recommendations</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why Choose ColorSense?
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets Indian fashion sensibilities to give you the perfect styling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Choose Your Style Journey
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Flexible plans designed for every fashion enthusiast in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-card p-8 rounded-lg border ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Icon name="Check" size={16} className="text-success mr-3" />
                      <span className="font-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/user-registration')}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Loved by Fashion Enthusiasts
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              See what our users across India are saying about ColorSense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                
                <p className="font-body text-muted-foreground italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
            Ready to Transform Your Style?
          </h2>
          <p className="font-body text-xl text-white/90 mb-8">
            Join thousands of fashion-forward Indians who trust ColorSense for their daily style decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/user-registration')}
              className="text-lg px-8 py-4"
              iconName="ArrowRight"
            >
              Start Your Style Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/ai-chat')}
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary"
              iconName="MessageSquare"
            >
              Chat with AI Stylist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={20} className="text-white" />
                </div>
                <span className="font-heading font-bold text-lg text-foreground">ColorSense</span>
              </div>
              <p className="font-body text-muted-foreground">
                AI-powered fashion styling for the modern Indian wardrobe.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/ai-chat" className="font-body text-muted-foreground hover:text-foreground transition-colors">AI Styling</Link></li>
                <li><Link to="/catalog" className="font-body text-muted-foreground hover:text-foreground transition-colors">Browse Catalog</Link></li>
                <li><Link to="/size-guide" className="font-body text-muted-foreground hover:text-foreground transition-colors">Size Guide</Link></li>
                <li><Link to="/color-guide" className="font-body text-muted-foreground hover:text-foreground transition-colors">Color Guide</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="font-body text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="font-body text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/feedback" className="font-body text-muted-foreground hover:text-foreground transition-colors">Feedback</Link></li>
                <li><Link to="/privacy" className="font-body text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="font-body text-muted-foreground">
              © 2025 ColorSense. All rights reserved. Made with ❤️ in India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
