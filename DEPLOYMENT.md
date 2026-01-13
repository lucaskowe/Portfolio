# GitHub Pages Deployment Guide

## 🚀 Quick Setup

Your React portfolio is now configured for GitHub Pages deployment. Follow these steps:

### Step 1: Update package.json Homepage
Edit the `homepage` field in `package.json` with your GitHub details:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME"
```

**Example:**
```json
"homepage": "https://lucaskowe.github.io/Portfolio"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like "Portfolio" or "portfolio-website"
3. Keep it public (required for free GitHub Pages)
4. Don't initialize with README since you already have files

### Step 3: Connect Local Repository to GitHub
Open PowerShell in your portfolio folder and run:
```powershell
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

### Step 4: Deploy to GitHub Pages
**Option A: Use the deployment script**
```powershell
.\deploy.ps1
```

**Option B: Manual deployment**
```powershell
npm run deploy
```

### Step 5: Configure GitHub Repository Settings
1. Go to your GitHub repository
2. Click "Settings" tab
3. Scroll to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch and "/ (root)" folder
6. Click "Save"

## ✅ Verification

Your portfolio will be available at:
`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME`

**Note:** It may take 5-10 minutes for the site to become available after first deployment.

## 🔄 Future Updates

After making changes to your portfolio:
1. Commit changes to main branch:
   ```powershell
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
2. Deploy updates:
   ```powershell
   npm run deploy
   ```

## 🎯 Special Features

### EPR Mode
Your portfolio includes an EPR (Extended Portfolio Review) mode that shows additional sections:
- Cover Letter
- Reflections

**To access:** Add `/EPR` to your URL path
- Standard: `https://username.github.io/Portfolio`
- EPR Mode: `https://username.github.io/Portfolio/EPR`

### Assets Configured
✅ All image paths are properly configured with `process.env.PUBLIC_URL`
✅ CV download link works correctly
✅ Circuit background assets are properly linked
✅ Company logos in Experience section
✅ Project images in Projects section

## 🛠️ Troubleshooting

### Common Issues:
1. **Blank page:** Check browser console for errors, verify homepage URL
2. **Images not loading:** Ensure all images exist in `/public/images/` folder
3. **404 errors:** Verify repository name matches homepage URL exactly
4. **Build fails:** Check for syntax errors in your React components

### GitHub Pages Requirements:
- Repository must be public (for free accounts)
- Files must be in `gh-pages` branch (automatically created by deployment)
- Homepage URL must exactly match repository URL

## 📁 Project Structure
```
Portfolio/
├── public/
│   ├── images/
│   │   ├── projects/        # Project images
│   │   └── *.jpeg          # Company logos & headshot
│   ├── circuit-background.* # Circuit animation files
│   ├── LucasKoweCV2026.pdf # Your CV
│   └── index.html
├── src/
│   ├── components/         # React components
│   └── App.js             # Main application
├── package.json           # Configured with gh-pages
└── DEPLOYMENT.md          # This guide
```

## 🔧 Configuration Details

**Packages Added:**
- `gh-pages`: Handles deployment to GitHub Pages

**Scripts Added to package.json:**
- `predeploy`: Builds the app before deployment
- `deploy`: Deploys to gh-pages branch

**Path Fixes Applied:**
- All asset paths use `${process.env.PUBLIC_URL}` for proper GitHub Pages routing
- Works for both root domain and subdirectory hosting