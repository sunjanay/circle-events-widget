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
      
      // Get current date at start of day for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Filter events to only show general-events space and current/future events
      const events = allEvents.filter(event => {
        // Check if event is in general-events space
        const isGeneralEvents = event.space && event.space.slug === 'general-events';
        
        // Check if event is today or in the future
        const eventDate = new Date(event.starts_at);
        eventDate.setHours(0, 0, 0, 0);
        const isFutureOrToday = eventDate >= today;
        
        return isGeneralEvents && isFutureOrToday;
      });
      
      if (events.length === 0) {
        eventsContainer.innerHTML = '<div class="no-events">No upcoming events found in General Events.</div>';
        return;
      }
      
      // Group events by month
      const eventsByMonth = {};
      events.forEach(event => {
        const eventDate = new Date(event.starts_at);
        const monthYear = eventDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
        
        if (!eventsByMonth[monthYear]) {
          eventsByMonth[monthYear] = [];
        }
        eventsByMonth[monthYear].push(event);
      });
      
      // Sort months chronologically
      const sortedMonths = Object.keys(eventsByMonth).sort((a, b) => {
        return new Date(a + ' 1') - new Date(b + ' 1');
      });
      
      // Create month navigation
      if (sortedMonths.length > 1) {
        const monthNavigation = document.createElement('div');
        monthNavigation.className = 'month-navigation';
        
        const navTitle = document.createElement('div');
        navTitle.className = 'nav-title';
        navTitle.textContent = 'Jump to month:';
        monthNavigation.appendChild(navTitle);
        
        const navButtons = document.createElement('div');
        navButtons.className = 'nav-buttons';
        
        sortedMonths.forEach(monthYear => {
          const navButton = document.createElement('button');
          navButton.className = 'nav-button';
          navButton.textContent = monthYear;
          navButton.addEventListener('click', () => {
            const monthElement = document.getElementById(`month-${monthYear.replace(/\s/g, '-')}`);
            if (monthElement) {
              monthElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          });
          navButtons.appendChild(navButton);
        });
        
        monthNavigation.appendChild(navButtons);
        eventsContainer.appendChild(monthNavigation);
      }
      
      // Display events grouped by month
      sortedMonths.forEach(monthYear => {
        // Create month header
        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.id = `month-${monthYear.replace(/\s/g, '-')}`;
        monthHeader.innerHTML = `
          <h3 class="month-title">${monthYear}</h3>
          <div class="month-events-count">${eventsByMonth[monthYear].length} event${eventsByMonth[monthYear].length !== 1 ? 's' : ''}</div>
        `;
        eventsContainer.appendChild(monthHeader);
        
        // Create month container
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        
        // Sort events within month by date
        eventsByMonth[monthYear].sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
        
        eventsByMonth[monthYear].forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.className = 'event-item';
          
          // Format the date and time separately
          const eventDate = new Date(event.starts_at);
          
          // Get date components for calendar-style display
          const dayOfMonth = eventDate.getDate();
          const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' });
          const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
          const year = eventDate.getFullYear();
          
          // Get time in 12-hour format
          const timeString = eventDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          
          eventElement.innerHTML = `
            <div class="event-date-block">
              <div class="calendar-day">${dayOfMonth}</div>
              <div class="calendar-weekday">${dayOfWeek}</div>
            </div>
            <div class="event-content">
              <div class="event-main-info">
                <div class="event-details">
                  <div class="event-title">${event.name || 'Untitled Event'}</div>
                  <div class="event-meta">
                    <div class="event-datetime">
                      <span class="event-time">${timeString}</span>
                    </div>
                    <div class="event-host">${event.host || event.member_name || 'Foster Greatness'}</div>
                    <div class="event-location">${event.location_type === 'virtual' ? '🌐 Virtual Event' : '📍 In-Person'}</div>
                  </div>
                </div>
              </div>
            </div>
            ${event.cover_image_url ? `<div class="event-cover-image"><img src="${event.cover_image_url}" alt="${event.name || 'Event cover'}" loading="lazy"></div>` : ''}
          `;
          
          // Add click handler to open the event in a new tab if URL is available
          if (event.url) {
            eventElement.style.cursor = 'pointer';
            eventElement.addEventListener('click', () => {
              window.open(event.url, '_blank');
            });
          }
          
          monthContainer.appendChild(eventElement);
        });
        
        eventsContainer.appendChild(monthContainer);
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
