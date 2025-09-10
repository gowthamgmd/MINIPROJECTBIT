#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building ColorSense for Production Deployment...\n');

// Check if we're in the right directory
const currentDir = process.cwd();
const packageJsonPath = path.join(currentDir, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Please run this from the frontend directory.');
  process.exit(1);
}

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build for production
  console.log('🔨 Building for production...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ Build completed successfully!');
  console.log('📁 Build files are in the "dist" directory');
  console.log('\n🌐 Ready for deployment to:');
  console.log('   - Vercel: npx vercel --prod');
  console.log('   - Netlify: npx netlify deploy --prod --dir=dist');
  console.log('   - GitHub Pages: Upload dist/ contents');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
