# 🚀 Foster Greatness Circle Events Widget - Deployment Guide

## 📋 Repository Created
✅ **GitHub Repository**: https://github.com/sunjanay/circle-events-widget

## 🎯 Deployment Options

### Option 1: GitHub Pages (Recommended for Team Access)

#### Step 1: Push Your Code
```bash
# In your local project directory
git add .
git commit -m "Update widget"
git push origin main
```

#### Step 2: Enable GitHub Pages
1. Go to https://github.com/sunjanay/circle-events-widget
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The deployment will automatically start!

#### Step 3: Access Your Widget
- **Live URL**: `https://sunjanay.github.io/circle-events-widget/`
- **Updates automatically** when you push to main branch

---

### Option 2: Embed in Your Website

#### Copy the Widget Files
```html
<!-- Add to your website's HTML -->
<link rel="stylesheet" href="styles.css">
<div id="circle-events-widget">
  <h2>Upcoming Events</h2>
  <div id="events-container" class="events-container">
    <div class="loading">Loading events...</div>
  </div>
</div>
<script src="bundle.js"></script>
```

#### Backend API Required
- Run `npm start` on a server for the `/api/events` endpoint
- Or deploy to services like Heroku, Vercel, or Railway

---

### Option 3: Cloud Deployment (Full-Stack)

#### Vercel (Recommended)
```bash
npx vercel --prod
```

#### Heroku
```bash
git push heroku main
```

#### Railway
```bash
railway deploy
```

---

## 🔧 Environment Variables for Production

Create `.env.production`:
```env
CIRCLE_API_KEY=your_production_api_key
CIRCLE_COMMUNITY_ID=fostergreatness
PORT=3001
```

## 👥 Team Access

### For Developers
- **Repository**: https://github.com/sunjanay/circle-events-widget
- **Clone**: `git clone https://github.com/sunjanay/circle-events-widget.git`
- **Local Development**: `npm install && npm run dev`

### For Non-Developers
- **Live Widget**: https://sunjanay.github.io/circle-events-widget/
- **Embed Code**: Available in the repository README

## 🛠️ Making Changes

1. **Edit locally**: Make changes to `src/index.js` or `public/styles.css`
2. **Build**: Run `npm run build` 
3. **Commit**: `git add . && git commit -m "Your changes"`
4. **Deploy**: `git push origin main`
5. **Live in 2-3 minutes**: Check https://sunjanay.github.io/circle-events-widget/

## 🎨 Customization

### Update Styling
- Edit `public/styles.css` for colors, fonts, layout
- Run `npm run build` after changes

### Change API Filters  
- Edit `src/index.js` line 20-22 to change event filtering
- Run `npm run build` after changes

### Update API Credentials
- Update `.env` file with new Circle.so API token
- Restart the server

---

## ✅ Quick Checklist

- [x] Repository created: https://github.com/sunjanay/circle-events-widget
- [x] GitHub Actions workflow configured
- [ ] Push code to GitHub
- [ ] Enable GitHub Pages in Settings
- [ ] Share live URL with team: `https://sunjanay.github.io/circle-events-widget/`

## 🆘 Need Help?

- **Issues**: Create an issue on GitHub
- **API Problems**: Check Circle.so API token permissions
- **Styling Questions**: Modify `public/styles.css`