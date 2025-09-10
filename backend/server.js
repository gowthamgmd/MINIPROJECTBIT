import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import wishlistRoutes from './routes/wishlist.js';
// import userRoutes from './routes/users.js';
// import orderRoutes from './routes/orders.js';
// import aiRoutes from './routes/ai.js';
// import adminRoutes from './routes/admin.js';

// Middleware imports
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Get dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:4028', 'http://localhost:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Apply rate limiting to API routes
app.use('/api/', limiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/admin', adminRoutes);

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'ColorSense Backend API is running! 🎨',
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Temporary AI Chat endpoints (will be moved to routes)
app.get('/api/ai', (req, res) => {
  res.json({ 
    message: 'AI Chat endpoint is working!',
    features: ['outfit-recommendations', 'style-advice', 'color-matching']
  });
});

app.post('/api/ai/chat', (req, res) => {
  const { message, context } = req.body;
  
  const responses = [
    "That's a great color choice! It would look amazing with your skin tone.",
    "I recommend pairing that with a complementary color like navy blue or cream.",
    "For that occasion, I'd suggest a more formal approach with structured pieces.",
    "That style really suits your preferences! Here are some similar options...",
    "Based on the weather, I'd recommend layering with a light cardigan."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  res.json({
    response: randomResponse,
    timestamp: new Date().toISOString(),
    context: context || {}
  });
});

// User endpoints
app.get('/api/user/profile', (req, res) => {
  res.json({
    id: 1,
    name: 'Fashion Enthusiast',
    email: 'user@colorsense.app',
    preferences: {
      favoriteColors: ['Blue', 'Purple', 'Green'],
      style: 'Casual Chic',
      size: 'M'
    }
  });
});

// Outfit endpoints
app.get('/api/outfits', (req, res) => {
  res.json({
    outfits: [
      {
        id: 1,
        name: 'Summer Casual',
        items: ['Light Blue Jeans', 'White T-Shirt', 'Sneakers'],
        weather: 'sunny',
        mood: 'casual'
      },
      {
        id: 2,
        name: 'Business Casual',
        items: ['Navy Blazer', 'White Shirt', 'Khaki Pants', 'Loafers'],
        weather: 'any',
        mood: 'professional'
      }
    ]
  });
});

app.post('/api/outfits/generate', (req, res) => {
  const { mood, weather, occasion } = req.body;
  
  res.json({
    id: Date.now(),
    recommendation: `Perfect outfit for ${mood} mood in ${weather} weather for ${occasion}`,
    items: ['Curated Item 1', 'Curated Item 2', 'Curated Item 3'],
    confidence: 0.92,
    reasoning: 'This combination works well because...'
  });
});

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/colorsense';
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`📅 MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('⚠️  Continuing without database in development mode');
    console.log('📝 Note: Database-dependent features will not work');
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log('🚀 ColorSense Backend Server Started!');
    console.log('=====================================');
    console.log(`🌐 Server running on port ${PORT}`);
    console.log(`📱 API Base URL: http://localhost:${PORT}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🎨 Frontend URL: http://localhost:4028`);
    console.log(`📖 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('=====================================');
  });
};

startServer();
