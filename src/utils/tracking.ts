// Utility function to track user behavior
export const trackUserBehavior = async (behaviorName: string) => {
  try {
    // Call API in the background without awaiting or handling errors
    fetch('https://shadowing-tracking-production.up.railway.app/user-behavior/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        behavior_name: behaviorName
      })
    }).catch(() => {
      // Silently ignore errors as requested
    });
  } catch (error) {
    // Silently ignore errors as requested
  }
};
