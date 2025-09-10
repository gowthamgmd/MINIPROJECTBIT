# ColorSense - AI-Powered Fashion Styling Platform for India 🇮🇳

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

ColorSense is a comprehensive AI-powered fashion styling platform designed specifically for the Indian market. It provides personalized outfit recommendations based on mood, weather, occasions, and personal preferences, featuring Indian brands, currency (₹), and cultural preferences.

## 🚀 Features

### Core Features
- **AI-Powered Styling**: Get personalized outfit recommendations powered by advanced AI
- **Weather Integration**: Weather-based outfit suggestions with Indian cities and Celsius temperatures
- **Mood-Based Fashion**: Clothing recommendations that match your current mood and energy
- **Indian Market Focus**: Currency in ₹, Indian brands, sizes, and cultural preferences
- **Multi-Page Platform**: Complete e-commerce experience with catalog, cart, wishlist

### User Features
- **User Authentication**: Secure JWT-based authentication system
- **Personal Dashboard**: Track style evolution and preferences
- **Fashion Catalog**: Browse curated Indian fashion with advanced filters
- **AI Chat Assistant**: Interactive styling advice and recommendations
- **Order Management**: Complete order lifecycle with history tracking
- **Wishlist & Cart**: Save favorites and manage purchases

### Business Features
- **Admin Dashboard**: Manage products, users, and orders
- **Analytics**: User behavior and sales insights
- **Multi-Office Support**: Indian offices in Mumbai, Bangalore, Delhi
- **Customer Support**: Multi-channel support system

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive design
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests
- **Express Validator** for input validation

### Development Tools
- **Vite** for fast frontend builds
- **Nodemon** for backend hot reloading
- **Concurrently** for running both servers
- **ESLint** and **Prettier** for code quality

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB (local or cloud)
- Git

### One-Command Setup
```bash
# Clone and install everything
git clone <your-repo-url>
cd colorsense
npm run install:all
```

### Manual Setup
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../colorsense
npm install
```

## 🚀 Quick Start

### Development Mode (Recommended)
```bash
# Start both frontend and backend servers
npm run dev
```

### Individual Servers
```bash
# Backend only (port 5000)
npm run server

# Frontend only (port 4028)
npm run client
```

### Access URLs
- **Frontend**: http://localhost:4028
- **Backend API**: http://localhost:5000
- **AI Chat**: http://localhost:4028/ai-chat
- **Admin Dashboard**: http://localhost:4028/admin (admin login required)

## 📁 Project Structure

```
colorsense/
├── backend/                 # Express.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── middleware/        # Auth & validation middleware
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── seeds/            # Database seeders
│   └── server.js         # Main server file
├── colorsense/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── utils/        # Helper functions
│   │   └── App.jsx       # Main app component
│   ├── public/           # Static assets
│   └── index.html        # HTML template
├── package.json            # Root package.json with scripts
└── README.md              # This file
```

## 🔐 Environment Variables

### Backend (.env)
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/colorsense

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=1d

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (.env)
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# AI Services (optional - will use mocks if not provided)
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_ANTHROPIC_API_KEY=your-anthropic-api-key

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

## 📊 Database Setup

### Seed Sample Data
```bash
# Populate database with sample data
npm run seed
```

### Sample Data Includes
- **Users**: Admin and customer accounts
- **Products**: Indian fashion items across categories
- **Categories**: Ethnic wear, western wear, accessories
- **Brands**: Indian and international brands

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

### AI Services
- `POST /api/ai/chat` - AI fashion advice
- `POST /api/ai/recommendations` - Get outfit recommendations
- `POST /api/ai/analyze` - Analyze style preferences

### Cart & Wishlist
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add to wishlist

## 🎨 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with pricing and features
- **Catalog** (`/catalog`) - Product browsing with filters
- **Contact** (`/contact`) - Multi-office contact information
- **About** (`/about`) - Company information
- **Privacy Policy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms and conditions

### User Pages
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Account creation
- **Dashboard** (`/dashboard`) - User home with recommendations
- **Profile** (`/profile`) - Account management
- **Orders** (`/orders`) - Order history
- **Wishlist** (`/wishlist`) - Saved items
- **Cart** (`/cart`) - Shopping cart

### AI Features
- **AI Chat** (`/ai-chat`) - Interactive styling assistant
- **Style Quiz** (`/style-quiz`) - Personalization quiz
- **Outfit Generator** (`/outfit-generator`) - Custom outfit creation

### Admin Pages (Role-based)
- **Admin Dashboard** (`/admin`) - Admin overview
- **Product Management** (`/admin/products`) - CRUD operations
- **User Management** (`/admin/users`) - User administration
- **Order Management** (`/admin/orders`) - Order processing

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd colorsense && npm test
```

## 🏗️ Building for Production

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. **Frontend**: Deploy `colorsense/build` to static hosting (Netlify, Vercel)
2. **Backend**: Deploy to Node.js hosting (Railway, Render, Heroku)
3. **Database**: Use MongoDB Atlas for production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

### Development Support
- Create an issue in the repository
- Email: dev@colorsense.in

### Business Inquiries
- **Mumbai Office**: +91 22-4567-8901
- **Bangalore Office**: +91 80-4567-8900
- **Delhi Office**: +91 11-4567-8902

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI integration capabilities
- Indian fashion brands for inspiration
- React and Node.js communities
- Contributors and beta testers

---

**Made with ❤️ in India for the Indian fashion community**

For more detailed documentation, visit our [Wiki](link-to-wiki) or check individual component documentation in the codebase.
