import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const Contact = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name || '',
        email: parsedUser.email || ''
      }));
    }
  }, []);

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'press', label: 'Press & Media' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const contactInfo = [
    {
      icon: 'Mail',
      title: 'Email Us',
      info: 'support@colorsense.in',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'mailto:support@colorsense.in'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      info: '+91 80-4567-8900',
      description: 'Mon-Fri: 9AM-6PM IST, Sat: 10AM-4PM IST',
      action: 'tel:+91-80-4567-8900'
    },
    {
      icon: 'MessageSquare',
      title: 'Live Chat',
      info: 'Chat with us',
      description: 'Available 24/7 for premium users, 9AM-6PM for free users',
      action: () => navigate('/ai-chat')
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      info: 'ColorSense Technologies Pvt Ltd',
      description: 'Bangalore, Karnataka, India',
      action: 'https://maps.google.com'
    }
  ];

  const offices = [
    {
      city: 'Bangalore',
      address: 'Koramangala, 5th Block\nBangalore, Karnataka 560095',
      phone: '+91 80-4567-8900',
      email: 'bangalore@colorsense.in',
      hours: 'Mon-Fri: 9AM-6PM IST'
    },
    {
      city: 'Mumbai',
      address: 'Bandra Kurla Complex\nMumbai, Maharashtra 400051',
      phone: '+91 22-4567-8901',
      email: 'mumbai@colorsense.in',
      hours: 'Mon-Fri: 9AM-6PM IST'
    },
    {
      city: 'Delhi',
      address: 'Connaught Place\nNew Delhi, Delhi 110001',
      phone: '+91 11-4567-8902',
      email: 'delhi@colorsense.in',
      hours: 'Mon-Fri: 9AM-6PM IST'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the AI recommendations?',
      answer: 'Our AI has a 95% accuracy rate based on user satisfaction. It continuously learns from your preferences and feedback to improve recommendations.'
    },
    {
      question: 'Is ColorSense available outside India?',
      answer: 'Currently, we\'re focused on the Indian market. However, we have plans to expand to other countries in South Asia by 2025.'
    },
    {
      question: 'How do I cancel my premium subscription?',
      answer: 'You can cancel your subscription anytime from your profile settings. Your premium features will remain active until the end of your billing cycle.'
    },
    {
      question: 'Can I use ColorSense offline?',
      answer: 'Basic features like viewing saved outfits work offline, but AI recommendations require an internet connection for real-time processing.'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you'd send the form data to your backend
      console.log('Contact form submitted:', formData);
      
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: '',
          subject: '',
          category: '',
          message: '',
          priority: 'medium'
        });
        setSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              We're here to help you look your best. Reach out to us for support, feedback, or just to say hello!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/ai-chat')}
                iconName="MessageSquare"
              >
                Chat with AI Assistant
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                iconName="Mail"
              >
                Send us a Message
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Contact Options */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
                Multiple Ways to Reach Us
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Choose the most convenient way to connect with our team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={contact.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {contact.title}
                  </h3>
                  <p className="font-body font-medium text-foreground mb-2">
                    {contact.info}
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {contact.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={typeof contact.action === 'function' ? contact.action : () => window.open(contact.action, '_blank')}
                    className="w-full"
                  >
                    {contact.title.includes('Email') ? 'Send Email' :
                     contact.title.includes('Call') ? 'Call Now' :
                     contact.title.includes('Chat') ? 'Start Chat' : 'View Location'}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <section id="contact-form">
              <div className="bg-card p-8 rounded-lg border border-border">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Send us a Message
                </h3>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={32} className="text-success" />
                    </div>
                    <h4 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="font-body text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name *"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                      <Input
                        label="Email Address *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      <Select
                        label="Category *"
                        value={formData.category}
                        onChange={(value) => handleInputChange('category', value)}
                        options={categories}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Subject *"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief subject line"
                        required
                      />
                      <Select
                        label="Priority"
                        value={formData.priority}
                        onChange={(value) => handleInputChange('priority', value)}
                        options={priorityOptions}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="w-full"
                      iconName="Send"
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </section>

            {/* Office Locations & FAQs */}
            <div className="space-y-8">
              {/* Office Locations */}
              <section>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-card p-6 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                            {office.city}
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-start space-x-2">
                              <Icon name="MapPin" size={16} className="mt-0.5" />
                              <span className="whitespace-pre-line">{office.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Phone" size={16} />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Mail" size={16} />
                              <span>{office.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Clock" size={16} />
                              <span>{office.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-card p-6 rounded-lg border border-border">
                      <h4 className="font-heading font-semibold text-foreground mb-3">
                        {faq.question}
                      </h4>
                      <p className="font-body text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/help')}
                    iconName="HelpCircle"
                  >
                    View All FAQs
                  </Button>
                </div>
              </section>
            </div>
          </div>

          {/* Social Media */}
          <section className="mt-16 text-center">
            <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
              Follow Us on Social Media
            </h3>
            <p className="font-body text-muted-foreground mb-8">
              Stay updated with the latest fashion trends and ColorSense news
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="lg" className="p-4">
                <Icon name="Facebook" size={24} />
              </Button>
              <Button variant="outline" size="lg" className="p-4">
                <Icon name="Twitter" size={24} />
              </Button>
              <Button variant="outline" size="lg" className="p-4">
                <Icon name="Instagram" size={24} />
              </Button>
              <Button variant="outline" size="lg" className="p-4">
                <Icon name="Linkedin" size={24} />
              </Button>
              <Button variant="outline" size="lg" className="p-4">
                <Icon name="Youtube" size={24} />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
