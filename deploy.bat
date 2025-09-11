@echo off
echo.
echo ====================================
echo   ColorSense Deployment Script
echo ====================================
echo.

cd /d "%~dp0colorsense"

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [2/4] Building for production...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/4] Verifying build output...
if not exist "build\index.html" (
    echo ERROR: Build files not found
    pause
    exit /b 1
)

if not exist "build\_redirects" (
    echo ERROR: _redirects file missing
    pause
    exit /b 1
)

echo.
echo [4/4] Build completed successfully!
echo.
echo ====================================
echo   DEPLOYMENT READY!
echo ====================================
echo.
echo Your build folder is at:
echo %CD%\build
echo.
echo Next steps:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag the entire 'build' folder to Netlify
echo 3. Wait for deployment to complete
echo.
echo Or use GitHub integration:
echo 1. Go to https://app.netlify.com
echo 2. New site from Git
echo 3. Select MINIPROJECTBIT repository
echo 4. Set base directory to: colorsense/
echo 5. Deploy!
echo.

start "" "https://app.netlify.com/drop"

echo Opening Netlify in your browser...
echo.
pause
