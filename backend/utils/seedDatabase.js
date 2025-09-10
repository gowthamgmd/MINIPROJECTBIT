import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/colorsense';
    await mongoose.connect(mongoUri);
    console.log('📅 MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Sample users
const users = [
  {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@example.com',
    password: 'password123',
    role: 'user',
    phone: '9876543210',
    address: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001'
    },
    stylePreferences: {
      favoriteColors: ['blue', 'pink', 'white'],
      sizePreferences: { 
        top: 'M',
        bottom: 'M',
        footwear: 7
      },
      budgetRange: 'medium',
      occasionPreferences: ['casual', 'work', 'social']
    }
  },
  {
    firstName: 'Rahul',
    lastName: 'Kumar',
    email: 'rahul.kumar@example.com',
    password: 'password123',
    role: 'user',
    phone: '9876543211',
    address: {
      street: '456 Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001'
    },
    stylePreferences: {
      favoriteColors: ['black', 'navy', 'gray'],
      sizePreferences: { 
        top: 'L',
        bottom: 'L',
        footwear: 9
      },
      budgetRange: 'high',
      occasionPreferences: ['formal', 'casual', 'work']
    }
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@colorsense.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543212'
  }
];

// Sample Indian fashion products
const products = [
  {
    name: 'Cotton Anarkali Kurta Set',
    description: 'Beautiful hand-embroidered cotton Anarkali kurta with matching dupatta and palazzo pants. Perfect for festive occasions.',
    price: 2999,
    originalPrice: 4499,
    category: 'Ethnic Wear',
    brand: 'Fabindia',
    colors: ['Royal Blue', 'Maroon', 'Emerald Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
    ],
    stock: 25,
    tags: ['ethnic', 'kurta', 'anarkali', 'festive', 'cotton'],
    isFeatured: true,
    rating: 4.5,
    reviewCount: 45
  },
  {
    name: 'Silk Saree with Blouse',
    description: 'Elegant Kanjivaram silk saree with intricate gold border and matching blouse piece. Traditional South Indian craftsmanship.',
    price: 8999,
    originalPrice: 12999,
    category: 'Sarees',
    brand: 'Nalli',
    colors: ['Deep Red', 'Golden Yellow', 'Peacock Blue'],
    sizes: ['Free Size'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78e990cdfb?w=400',
      'https://images.unsplash.com/photo-1583391733956-6c78e990cdfb?w=400'
    ],
    stock: 15,
    tags: ['saree', 'silk', 'kanjivaram', 'traditional', 'wedding'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 32
  },
  {
    name: 'Denim Jacket - Vintage Style',
    description: 'Classic blue denim jacket with vintage wash and comfortable fit. Perfect for casual outings and layering.',
    price: 1899,
    originalPrice: 2499,
    category: 'Western Wear',
    brand: 'Levi\'s',
    colors: ['Blue', 'Black', 'Light Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400'
    ],
    stock: 40,
    tags: ['denim', 'jacket', 'casual', 'western', 'vintage'],
    isFeatured: false,
    rating: 4.2,
    reviewCount: 28
  },
  {
    name: 'Nehru Jacket - Silk Brocade',
    description: 'Handwoven silk brocade Nehru jacket with intricate patterns. Ideal for weddings and formal occasions.',
    price: 3999,
    originalPrice: 5999,
    category: 'Men\'s Ethnic',
    brand: 'Manyavar',
    colors: ['Gold', 'Maroon', 'Navy Blue'],
    sizes: ['38', '40', '42', '44', '46'],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    ],
    stock: 20,
    tags: ['nehru jacket', 'silk', 'brocade', 'formal', 'wedding'],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 18
  },
  {
    name: 'Block Print Cotton Dress',
    description: 'Hand block printed cotton dress in traditional Indian motifs. Comfortable and stylish for everyday wear.',
    price: 1599,
    originalPrice: 2199,
    category: 'Dresses',
    brand: 'Global Desi',
    colors: ['Indigo', 'Mustard', 'Coral'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'
    ],
    stock: 30,
    tags: ['dress', 'block print', 'cotton', 'casual', 'traditional'],
    isFeatured: false,
    rating: 4.3,
    reviewCount: 25
  },
  {
    name: 'Leather Kolhapuris',
    description: 'Authentic handcrafted Kolhapuri chappals made from genuine leather. Traditional Indian footwear.',
    price: 899,
    originalPrice: 1299,
    category: 'Footwear',
    brand: 'Kolhapuri Chappal',
    colors: ['Brown', 'Tan', 'Black'],
    sizes: ['6', '7', '8', '9', '10'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
    ],
    stock: 50,
    tags: ['kolhapuri', 'leather', 'footwear', 'traditional', 'handmade'],
    isFeatured: false,
    rating: 4.4,
    reviewCount: 67
  },
  {
    name: 'Chanderi Suit Set',
    description: 'Elegant Chanderi silk suit set with delicate embroidery and matching dupatta. Perfect for office and casual events.',
    price: 3499,
    originalPrice: 4999,
    category: 'Ethnic Wear',
    brand: 'W for Woman',
    colors: ['Peach', 'Mint Green', 'Lavender'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
    ],
    stock: 22,
    tags: ['chanderi', 'suit set', 'silk', 'embroidery', 'elegant'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 38
  },
  {
    name: 'Printed Palazzo Pants',
    description: 'Comfortable printed palazzo pants in breathable cotton fabric. Perfect for summer and casual wear.',
    price: 799,
    originalPrice: 1199,
    category: 'Bottoms',
    brand: 'Biba',
    colors: ['Floral Blue', 'Geometric Black', 'Paisley Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
    ],
    stock: 35,
    tags: ['palazzo', 'printed', 'cotton', 'comfortable', 'summer'],
    isFeatured: false,
    rating: 4.1,
    reviewCount: 52
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create users one by one (password hashing handled by User model pre-save middleware)
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`✅ Created ${createdUsers.length} users`);

    // Add createdBy field to products
    const adminUser = createdUsers.find(user => user.role === 'admin');
    const productsWithCreator = products.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));

    // Create products
    console.log('🛍️ Creating products...');
    const createdProducts = await Product.insertMany(productsWithCreator);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('User: priya.sharma@example.com / password123');
    console.log('User: rahul.kumar@example.com / password123');
    console.log('Admin: admin@colorsense.com / admin123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
