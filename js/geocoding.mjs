export async function getCoordinatesByCity(cityName) {
    const apiUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&maxLocations=5&singleLine=${encodeURIComponent(cityName)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.candidates.length > 0) {
            // Extract the latitude and longitude from the first candidate

            // console.log(data);
            const entryArray = data.candidates
            let cityArray = []
            for (let entry in entryArray) {

                const candidate = entryArray[ entry ]
                // console.log(candidate);
                const cityData = {
                    "address": candidate.address,
                    "latitude": candidate.location.y,
                    "longitude": candidate.location.x,
                }
                cityArray.push(cityData)

            }
            // return { latitude, longitude };
            return cityArray
        }

        return null; // Coordinates not found or error occurred
    } catch (error) {
        console.error('Error:', error);
        return null; // Handle any errors
    }
}


export async function getCityByCoordinates(latitude, longitude) {
    const apiUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location=${longitude},${latitude}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.address) {
            // Extract the city name from the address field
            // const city = data.address;
            const location = `${data.address.City},${data.address.Subregion},${data.address.RegionAbbr}`
            return location;
        }

        return null; // City not found or error occurred
    } catch (error) {
        console.error('Error:', error);
        return null; // Handle any errors
    }
}
