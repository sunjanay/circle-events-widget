document.addEventListener('DOMContentLoaded', () => {
  const eventsContainer = document.getElementById('events-container');
  
  // Fetch events from our backend
  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      
      // Clear loading message
      eventsContainer.innerHTML = '';
      
      // Handle Circle.so API response format (data.records contains the events array)
      const allEvents = data.records || data || [];
      
      // Filter events to only show general-events space
      const events = allEvents.filter(event => 
        event.space && event.space.slug === 'general-events'
      );
      
      if (events.length === 0) {
        eventsContainer.innerHTML = '<div class="no-events">No upcoming events found in General Events.</div>';
        return;
      }
      
      // Display each event
      events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        
        // Format the date
        const eventDate = new Date(event.starts_at);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Extract first sentence or first 150 characters from body as description
        let description = '';
        if (event.body) {
          description = event.body.replace(/<[^>]*>/g, ''); // Strip HTML tags
          description = description.split('.')[0] + '.'; // First sentence
          if (description.length > 150) {
            description = description.substring(0, 150) + '...';
          }
        }
        
        eventElement.innerHTML = `
          ${event.cover_image_url ? `<div class="event-cover-image"><img src="${event.cover_image_url}" alt="${event.name || 'Event cover'}" loading="lazy"></div>` : ''}
          <div class="event-content">
            <div class="event-title">${event.name || 'Untitled Event'}</div>
            <div class="event-date">${formattedDate}</div>
            <div class="event-host">Hosted by: ${event.host || event.member_name || 'Foster Greatness'}</div>
            ${description ? `<div class="event-description">${description}</div>` : ''}
            <div class="event-location">${event.location_type === 'virtual' ? '🌐 Virtual Event' : '📍 In-Person'}</div>
          </div>
        `;
        
        // Add click handler to open the event in a new tab if URL is available
        if (event.url) {
          eventElement.style.cursor = 'pointer';
          eventElement.addEventListener('click', () => {
            window.open(event.url, '_blank');
          });
        }
        
        eventsContainer.appendChild(eventElement);
      });
      
    } catch (error) {
      console.error('Error:', error);
      
      // Check if this is a CORS error (common when hosting on GitHub Pages)
      if (error.message.includes('CORS') || error.message.includes('fetch') || error.name === 'TypeError') {
        eventsContainer.innerHTML = `
          <div class="error">
            <h3>⚠️ CORS Restriction</h3>
            <p>This widget needs to be served from your own domain to fetch live events from Circle.so.</p>
            <p><strong>Options:</strong></p>
            <ul style="text-align: left; margin: 20px 0;">
              <li>Embed this widget on your website (not GitHub Pages)</li>
              <li>Run locally: <code>npm run dev</code></li>
              <li>Deploy to Vercel/Netlify with backend support</li>
            </ul>
            <p>For embedding instructions, see the <a href="https://github.com/sunjanay/circle-events-widget" target="_blank">GitHub repository</a>.</p>
          </div>
        `;
      } else {
        eventsContainer.innerHTML = `
          <div class="error">
            Failed to load events. Please try again later.
          </div>
        `;
      }
    }
  }
  
  // Initial fetch
  fetchEvents();
  
  // Optional: Refresh events every 5 minutes
  setInterval(fetchEvents, 5 * 60 * 1000);
});
