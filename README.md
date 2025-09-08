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

## Embedding the Widget

### Option 1: Iframe Embed
```html
<iframe src="http://your-domain.com" width="400" height="500" frameborder="0"></iframe>
```

### Option 2: Direct Integration
Copy the contents of the `public` folder to your website and include:
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
