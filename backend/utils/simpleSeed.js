import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/colorsense_fresh';
    await mongoose.connect(mongoUri);
    console.log('📅 MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create a simple admin user first
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@colorsense.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created');

    // Create a simple regular user
    console.log('👤 Creating test user...');
    await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('✅ Test user created');

    // Create sample products
    console.log('🛍️ Creating products...');
    const products = [
      {
        name: 'Cotton Anarkali Kurta Set',
        description: 'Beautiful hand-embroidered cotton Anarkali kurta with matching dupatta and palazzo pants.',
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
        reviewCount: 45,
        createdBy: adminUser._id
      },
      {
        name: 'Silk Saree with Blouse',
        description: 'Elegant Kanjivaram silk saree with intricate gold border and matching blouse piece.',
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
        reviewCount: 32,
        createdBy: adminUser._id
      },
      {
        name: 'Block Print Cotton Dress',
        description: 'Hand block printed cotton dress in traditional Indian motifs. Comfortable and stylish.',
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
        reviewCount: 25,
        createdBy: adminUser._id
      }
    ];

    await Product.insertMany(products);
    console.log(`✅ Created ${products.length} products`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@colorsense.com / admin123');
    console.log('User: test@example.com / password123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
