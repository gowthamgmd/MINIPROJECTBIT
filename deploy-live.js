#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying ColorSense to Live Hosting...\n');

// Deploy Frontend to Vercel
console.log('📱 Deploying Frontend to Vercel...');
try {
  // Change to frontend directory
  process.chdir('./colorsense');
  
  // Install Vercel CLI globally if not installed
  try {
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (e) {
    console.log('Installing Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }
  
  // Build the project
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to Vercel
  console.log('Deploying to Vercel...');
  const deployOutput = execSync('vercel --prod --yes', { encoding: 'utf8' });
  
  // Extract URL from output
  const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
  const vercelUrl = urlMatch ? urlMatch[0] : 'Deployment successful but URL not found';
  
  console.log('\n🎉 Frontend Deployment Complete!');
  console.log('🌐 Live URL:', vercelUrl);
  
} catch (error) {
  console.error('❌ Frontend deployment failed:', error.message);
}

// Deploy Backend to Railway
console.log('\n⚡ Backend Deployment Instructions:');
console.log('1. Go to https://railway.app');
console.log('2. Sign up with GitHub');
console.log('3. Create new project');
console.log('4. Connect your GitHub repository');
console.log('5. Select backend folder');
console.log('6. Add environment variables:');
console.log('   - NODE_ENV=production');
console.log('   - MONGO_URI=your_mongodb_connection_string');
console.log('   - JWT_SECRET=your_jwt_secret');

console.log('\n✅ Deployment process initiated!');
