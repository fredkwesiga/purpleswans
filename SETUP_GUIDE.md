# Purple Swans Portfolio Website - Local Setup Guide

## Overview
This is a modern, responsive portfolio website for graphic designers built with Next.js, React, TypeScript, and Tailwind CSS. The application features a homepage, portfolio gallery with filtering, project details pages, and a contact form. This is a client-facing website only with no admin panel.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v18.17.0 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning repositories)

To verify installations:
```bash
node --version  # Should be v18.17.0 or higher
npm --version   # Should be 9.0.0 or higher
```

## Project Structure
```
purple-swans/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Global styles and animations
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── portfolio/
│   │   ├── page.tsx               # Portfolio gallery
│   │   └── [id]/
│   │       └── page.tsx           # Project detail page
├── components/
│   ├── header.tsx                 # Navigation header
│   ├── footer.tsx                 # Footer component
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── storage.ts                 # Client-side data management
│   └── utils.ts                   # Utility functions
├── public/
│   └── purple-swan-logo.svg       # Logo file
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.mjs                # Next.js configuration
└── postcss.config.mjs             # PostCSS configuration
```

## Step-by-Step Setup

### 1. Download/Clone the Project

**Option A: Download as ZIP**
- Click the download button in v0
- Extract the ZIP file to your desired location
- Open terminal in the extracted folder

**Option B: Using Git**
```bash
git clone <repository-url>
cd purple-swans
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

This will install all required packages listed in `package.json`:
- Next.js 16.1.6
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons
- And all other dependencies

### 3. Verify Installation
Check that node_modules folder was created and all dependencies are installed:
```bash
ls node_modules  # On Windows: dir node_modules
```

## Running the Project

### Development Server
To start the development server:
```bash
npm run dev
# or
yarn dev
```

You should see output similar to:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local
  
Ready in 2.5s
```

**Open your browser** and navigate to: `http://localhost:3000`

The page will automatically reload when you make changes to the code.

### Production Build
To create an optimized production build:
```bash
npm run build
# or
yarn build
```

Then start the production server:
```bash
npm run start
# or
yarn start
```

### Linting
To check for code issues:
```bash
npm run lint
# or
yarn lint
```

## Project Features

### Pages & Routes
1. **Homepage** (`/`) - Features hero section, bio, and featured projects
2. **Portfolio** (`/portfolio`) - Full gallery with category filtering
3. **Project Details** (`/portfolio/[id]`) - Detailed project view with images and description
4. **Contact** (`/contact`) - Contact form with validation and inquiry handling

### Key Features
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Custom CSS animations for modern feel
- **Category Filtering** - Filter projects by type (Flyers, Brochures, etc.)
- **Contact Form** - Collect inquiries with WhatsApp/email options
- **Dark Mode Support** - Theme switching capability
- **Fast Performance** - Built with Next.js for optimal speed
- **Pre-loaded Portfolio** - Sample projects included, ready to customize

### Data Management
The application uses **localStorage** for client-side data persistence:
- Projects are stored with images, descriptions, and categories
- Contact submissions are saved locally
- Data persists across browser sessions

## Customization

### Update Logo
Replace `/public/purple-swan-logo.svg` with your own logo file.

### Change Colors
Edit the CSS variables in `/app/globals.css`:
```css
:root {
  --primary: 280 65% 50%;     /* Purple */
  --secondary: 0 0% 85%;       /* Light gray */
  --background: 0 0% 98%;      /* Off-white */
  --foreground: 0 0% 10%;      /* Dark text */
}
```

### Customize Sample Projects
The website comes with 6 sample projects. Edit `/lib/storage.ts` to modify titles, descriptions, categories, and add images. Replace `/placeholder.jpg` with your actual project images.

### Update Contact Information
- **Email**: Edit the contact page to add your email
- **WhatsApp**: Update the WhatsApp link in the contact section

## Deployment Options

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"

The site will be live in seconds!

### Deploy to Other Platforms
- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish: `.next`
- **AWS Amplify**: Similar GitHub integration process
- **Self-hosted**: Build with `npm run build` and deploy the `.next` folder

## Troubleshooting

### "Port 3000 is already in use"
Use a different port:
```bash
npm run dev -- -p 3001
```

### Module not found errors
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

### TypeScript errors
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Logo not showing
Ensure `/public/purple-swan-logo.svg` exists and the path is correct.

## Environment Variables
This project doesn't require environment variables for basic functionality. All data is stored locally in the browser.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips
1. **Edit Sample Data** - Modify `/lib/storage.ts` to customize projects
2. **Check console logs** for debugging issues
3. **Hot reload** works - changes save automatically
4. **Responsive testing** - Use browser DevTools to test mobile sizes
5. **Contact submissions** are stored in browser localStorage

## File Descriptions

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with hero and featured projects |
| `app/portfolio/page.tsx` | Portfolio gallery with filtering |
| `app/portfolio/[id]/page.tsx` | Individual project detail page |
| `app/contact/page.tsx` | Contact form and inquiry page |
| `components/header.tsx` | Navigation header component |
| `components/footer.tsx` | Footer component |
| `lib/storage.ts` | Data management utilities |
| `app/globals.css` | Global styles and animations |

## API & Data Flow
- **No backend API required** - Everything runs on the client
- **localStorage** - All data persists in browser storage
- **Real-time updates** - Changes immediately reflect in the UI

## Getting Help
- Check browser console for error messages
- Review the code comments in each file
- Verify all dependencies are installed correctly
- Ensure Node.js version is 18.17.0 or higher

## Next Steps
1. Customize the logo and colors
2. Add your portfolio projects through the admin panel
3. Update contact information
4. Deploy to Vercel or your preferred host
5. Share with potential clients!

Happy designing! 🎨
