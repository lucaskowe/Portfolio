# Portfolio Website

A modern, responsive portfolio website built with React.js featuring a dark theme, smooth animations, and card-based layout.

## Features

- 🚀 **Modern React.js** - Built with React 18 and modern JavaScript
- 🌙 **Dark Mode Theme** - Beautiful dark color scheme with CSS variables
- 📱 **Responsive Design** - Works perfectly on all devices
- ✨ **Smooth Animations** - CSS animations and transitions throughout
- 🎯 **Tag-based Navigation** - Smooth scrolling between sections
- 📧 **Contact Form** - Interactive contact form with validation
- 🔗 **Card Components** - Reusable card components with hover effects
- 🎨 **Modern UI** - Clean, professional design with gradients and shadows

## Sections

1. **Home** - Hero section with profile photo and call-to-action links
2. **About** - Personal background and philosophy
3. **Projects** - Showcase of your work with project cards
4. **Skills** - Technical skills organized by category
5. **Experience** - Professional work history
6. **Contacts** - Contact form and contact information

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. **Install Node.js**
   - Go to https://nodejs.org/
   - Download and install the LTS version
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   cd Portfolio
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - The app will automatically open at http://localhost:3000
   - If it doesn't open automatically, navigate to http://localhost:3000

## Customization

### Personal Information

Edit the following files to customize with your information:

- **Home Section**: `src/components/Home.js`
  - Replace profile image path
  - Update hero text and description
  - Update LinkedIn, GitHub, and CV links

- **About Section**: `src/components/About.js`
  - Customize the about cards with your background

- **Projects Section**: `src/components/Projects.js`
  - Replace with your actual projects
  - Update project images, descriptions, and links

- **Skills Section**: `src/components/Skills.js`
  - Update skill categories and technologies

- **Experience Section**: `src/components/Experience.js`
  - Replace with your work experience
  - Update job titles, companies, and achievements

- **Contacts Section**: `src/components/Contacts.js`
  - Update contact information
  - Customize email, phone, location, and social links

### Styling

- **Colors & Theme**: Edit CSS variables in `src/App.css` (`:root` section)
- **Animations**: Modify keyframes and transitions in `src/App.css`
- **Layout**: Adjust grid layouts and spacing in component styles

### Images

Place your images in the `public` folder and reference them with `/path-to-image.jpg`

Example:
```jsx
<img src="/profile-photo.jpg" alt="Profile" />
```

## Project Structure

```
Portfolio/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── robots.txt         # SEO robots file
├── src/
│   ├── components/
│   │   ├── Navigation.js   # Navigation bar
│   │   ├── Home.js        # Hero section
│   │   ├── About.js       # About section
│   │   ├── Projects.js    # Projects showcase
│   │   ├── Skills.js      # Skills section
│   │   ├── Experience.js  # Work experience
│   │   ├── Contacts.js    # Contact section
│   │   └── Card.js        # Reusable card component
│   ├── App.js             # Main app component
│   ├── App.css            # Main styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy Options

- **GitHub Pages**: Push to GitHub and enable Pages
- **Netlify**: Connect your GitHub repo or drag-and-drop the build folder
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Heroku**: Deploy using the Heroku CLI

## Browser Support

This project supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!

## Support

If you encounter any issues:

1. Make sure Node.js is installed correctly
2. Delete `node_modules` folder and run `npm install` again
3. Check the console for error messages
4. Ensure all file paths are correct

---

**Happy coding!** 🚀