// lib/analytics/index.js
export const analytics = {
  track: (event, properties = {}) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }

    // Mixpanel
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track(event, properties);
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, properties, timestamp: new Date() }),
      }).catch(console.error);
    }
  },

  identify: (userId, traits = {}) => {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.identify(userId);
      window.mixpanel.people.set(traits);
    }
  },

  page: (name, properties = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: name,
        ...properties,
      });
    }
  },
};