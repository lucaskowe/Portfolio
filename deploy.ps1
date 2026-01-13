# GitHub Pages Deployment Script for Portfolio
# Run this script after setting up your GitHub repository

Write-Host "Starting GitHub Pages deployment..." -ForegroundColor Green

# Check if package.json has the correct homepage URL
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.homepage -eq "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME") {
    Write-Host "WARNING: Please update the homepage URL in package.json first!" -ForegroundColor Red
    Write-Host "Change YOUR_GITHUB_USERNAME and YOUR_REPOSITORY_NAME to your actual values." -ForegroundColor Yellow
    exit 1
}

# Build the project
Write-Host "Building React application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    
    # Deploy to GitHub Pages
    Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
    npm run deploy
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Deployment successful!" -ForegroundColor Green
        Write-Host "Your portfolio should be available at: $($packageJson.homepage)" -ForegroundColor Cyan
        Write-Host "Note: It may take a few minutes for GitHub Pages to update." -ForegroundColor Yellow
    } else {
        Write-Host "Deployment failed. Please check the error messages above." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}