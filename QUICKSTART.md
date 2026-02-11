# Purple Swans - Quick Start (5 Minutes)

## TL;DR - Get Running in 3 Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit: http://localhost:3000
```

Done! Your portfolio website is running! 🚀

---

## What's Next?

### Customize Sample Projects
1. Open `/lib/storage.ts` in your code editor
2. Find the `SAMPLE_PROJECTS` array
3. Edit the sample projects with your own work:
   - **title**: Your project name
   - **category**: Type (Flyers, Brochures, Branding, Posters, etc.)
   - **description**: Brief description
   - **images**: Replace `/placeholder.jpg` with your image URLs
   - **featured**: `true` shows on homepage, `false` hides
4. Save the file and the website updates automatically

### Customize Branding
1. Replace logo: `/public/purple-swan-logo.svg`
2. Change colors in `/app/globals.css` (lines 3-16)
3. Update contact info in `/app/contact/page.tsx`

### Deploy Live
```bash
# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import your repo
# 3. Click Deploy
# Your site goes live instantly!
```

---

## Navigation

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | http://localhost:3000 | Showcase featured work |
| Portfolio | http://localhost:3000/portfolio | Browse all projects |
| Contact | http://localhost:3000/contact | Client inquiry form |

---

## Useful Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Check code quality
```

---

## File Locations

- **Logo**: `/public/purple-swan-logo.svg`
- **Colors/Styles**: `/app/globals.css`
- **Navigation**: `/components/header.tsx`
- **Projects Data**: `/lib/storage.ts`
- **Contact Form**: `/app/contact/page.tsx`

---

## Troubleshooting

### Blank page loading?
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Dependencies missing?
```bash
rm -rf node_modules
npm install
npm run dev
```

### Port 3000 in use?
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

---

## Common Customizations

### Change Primary Color
Edit `/app/globals.css`:
```css
--primary: 280 65% 50%;  /* Change this HSL value */
```

### Add More Categories
Edit `/lib/storage.ts` and add to `CATEGORIES` array

### Update Company Name
Search for "Purple Swans" and replace with your name

---

## You're All Set! 🎉
Start the dev server with `npm run dev` and begin building your portfolio!

For detailed setup, see `SETUP_GUIDE.md`
