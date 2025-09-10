@echo off
echo 🚀 Creating ColorSense Deployment Package...
echo.

cd colorsense

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building production version...
call npm run build

echo ✅ Build complete! 

echo.
echo 🌐 TO GET LIVE LINK:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag and drop the 'build' folder
echo 3. Get instant live URL!
echo.
echo 📁 Build folder location: %CD%\build
echo.

explorer build

pause
