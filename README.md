# Circle.so Events Widget

An interactive widget to display Circle.so community events on your website.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your Circle.so API credentials:**
   - Copy `.env` and update with your credentials:
   ```bash
   CIRCLE_API_KEY=your_api_key_here
   CIRCLE_COMMUNITY_ID=your_community_id_here
   ```

3. **Get your Circle.so API credentials:**
   - Go to your Circle.so community
   - Navigate to Settings → API (or Developers → Tokens)
   - Generate an API token
   - Find your community ID in the URL or API response

4. **Build the frontend:**
   ```bash
   npx webpack --mode production
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

## Development

- **Development mode:** `npm run dev`
- **Build for production:** `npm run build`

## Deployment Options

### 🚀 GitHub Pages (Demo Only)
- **Live Demo**: https://sunjanay.github.io/circle-events-widget/
- **Limitation**: Cannot fetch live events due to CORS restrictions
- **Use Case**: Preview the widget design and functionality

### 💻 Local Development
```bash
git clone https://github.com/sunjanay/circle-events-widget.git
cd circle-events-widget
npm install
npm run dev
```
Visit http://localhost:3001 to see live events.

### 🌐 Production Deployment (Recommended)

For live events on your website, you need to run the backend server:

#### Option 1: Full-Stack Deployment
Deploy to Vercel, Heroku, or Railway:
```bash
# Vercel
npx vercel --prod

# Heroku
git push heroku main

# Railway
railway deploy
```

#### Option 2: Embed on Your Website
1. Copy the `public/` folder contents to your website
2. Run the backend server separately:
   ```bash
   npm start  # Runs on port 3001
   ```
3. Include in your HTML:
   ```html
   <div id="circle-events-widget">
     <h2>Upcoming Events</h2>
     <div id="events-container" class="events-container">
       <div class="loading">Loading events...</div>
     </div>
   </div>
   <link rel="stylesheet" href="styles.css">
   <script src="bundle.js"></script>
   ```

### 📋 CORS Explanation
The widget makes direct API calls to Circle.so, which blocks requests from different domains (like GitHub Pages) for security. To show live events, the widget must be:
- Served from the same domain as your backend, OR
- Deployed with a backend server that proxies the API calls

## Features

- ✅ Responsive design
- ✅ Auto-refresh every 5 minutes
- ✅ Click to open events in new tab
- ✅ Loading and error states
- ✅ Modern, clean UI

## API Endpoints

- `GET /api/events` - Fetch community events

## Customization

Edit `public/styles.css` to customize the widget appearance to match your website's design.
