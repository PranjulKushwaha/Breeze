export async function getUserLocation() {
    // Check if the Geolocation API is available in the browser
    if ("geolocation" in navigator) {
      try {
        // Use the Geolocation API to get the user's position
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        // Extract latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
  
        // Return location data along with no error message
        return { success: true, latitude, longitude, error: null };
      } catch (error) {
        // Handle any errors that occur during geolocation retrieval
        return { success: false, latitude: null, longitude: null, error: error.message };
      }
    } else {
      // Geolocation is not available in this browser
      return { success: false, latitude: null, longitude: null, error: "Geolocation is not supported in this browser" };
    }
  }
  
 
  