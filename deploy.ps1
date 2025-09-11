# ColorSense Deployment Script
Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "   ColorSense Deployment Script" -ForegroundColor Green  
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Change to the frontend directory
Set-Location -Path "$PSScriptRoot\colorsense"

Write-Host "[1/4] Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/4] Building for production..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[3/4] Verifying build output..." -ForegroundColor Yellow

if (-not (Test-Path "build\index.html")) {
    Write-Host "ERROR: Build files not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "build\_redirects")) {
    Write-Host "ERROR: _redirects file missing" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[4/4] Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "   DEPLOYMENT READY!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

$buildPath = Resolve-Path "build"
Write-Host "Your build folder is at:" -ForegroundColor Cyan
Write-Host "$buildPath" -ForegroundColor White
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://app.netlify.com/drop" -ForegroundColor White
Write-Host "2. Drag the entire 'build' folder to Netlify" -ForegroundColor White
Write-Host "3. Wait for deployment to complete" -ForegroundColor White
Write-Host ""

Write-Host "Or use GitHub integration:" -ForegroundColor Cyan
Write-Host "1. Go to https://app.netlify.com" -ForegroundColor White
Write-Host "2. New site from Git" -ForegroundColor White
Write-Host "3. Select MINIPROJECTBIT repository" -ForegroundColor White
Write-Host "4. Set base directory to: colorsense/" -ForegroundColor White
Write-Host "5. Deploy!" -ForegroundColor White
Write-Host ""

Write-Host "Opening Netlify in your browser..." -ForegroundColor Yellow
Start-Process "https://app.netlify.com/drop"

Write-Host ""
Write-Host "Build size info:" -ForegroundColor Cyan
$jsSize = (Get-ChildItem "build\assets\*.js" | Measure-Object -Property Length -Sum).Sum
$cssSize = (Get-ChildItem "build\assets\*.css" | Measure-Object -Property Length -Sum).Sum
Write-Host "JavaScript: $([math]::Round($jsSize/1MB,2)) MB" -ForegroundColor White
Write-Host "CSS: $([math]::Round($cssSize/1KB,2)) KB" -ForegroundColor White

Read-Host "`nPress Enter to exit"
