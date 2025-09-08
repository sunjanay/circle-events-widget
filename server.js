require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Environment variables
const CIRCLE_API_KEY = process.env.CIRCLE_API_KEY;
const CIRCLE_COMMUNITY_ID = process.env.CIRCLE_COMMUNITY_ID;

// API endpoint to fetch events
app.get('/api/events', async (req, res) => {
  try {
    // Try multiple Circle.so API endpoints
    const endpoints = [
      // Admin API v2
      {
        url: `https://app.circle.so/api/admin/v2/events`,
        headers: {
          'Authorization': `Token token=${CIRCLE_API_KEY}`,
          'host': 'community.fostergreatness.co',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        name: 'Admin API v2'
      },
      // Headless API
      {
        url: `https://api-headless.circle.so/api/v1/events`,
        headers: {
          'Authorization': `Token token=${CIRCLE_API_KEY}`,
          'host': 'community.fostergreatness.co',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        name: 'Headless API v1'
      },
      // Custom domain API (this worked before)
      {
        url: `https://community.fostergreatness.co/api/v1/events`,
        headers: {
          'Authorization': `Token token=${CIRCLE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        name: 'Custom Domain API'
      }
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying ${endpoint.name}: ${endpoint.url}`);
        const response = await axios.get(endpoint.url, { headers: endpoint.headers });
        console.log(`✅ Success with ${endpoint.name}!`);
        res.json(response.data);
        return;
      } catch (error) {
        console.log(`❌ ${endpoint.name} failed: ${error.response?.status} - ${error.response?.data?.message || error.response?.statusText}`);
      }
    }

    throw new Error('All API endpoints failed');
    
  } catch (error) {
    console.error('All Circle.so API endpoints failed');
    res.status(500).json({ error: 'Failed to fetch events from all API endpoints' });
  }
});

// Serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
