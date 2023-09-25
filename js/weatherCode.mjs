export const weatherCodeDescriptions =
    [
        {
            "code": 0,
            "description": "Clear sky"
        },
        {
            "code": 1,
            "description": "Mainly clear"
        },
        {
            "code": 2,
            "description": "Partly cloudy"
        },
        {
            "code": 3,
            "description": "Overcast"
        },
        {
            "code": 45,
            "description": "Fog "
        },
        {
            "code": 48,
            "description": "Rime fog"
        },
        {
            "code": 51,
            "description": "Light Drizzle"
        },
        {
            "code": 53,
            "description": "Moderate Drizzle"
        },
        {
            "code": 55,
            "description": "Dense Drizzle"
        },
        {
            "code": 56,
            "description": "Light Freezing Drizzle"
        },
        {
            "code": 57,
            "description": "Dense Freezing Drizzle"
        },
        {
            "code": 61,
            "description": "Slight Rain"
        },
        {
            "code": 63,
            "description": "Moderate Rain"
        },
        {
            "code": 65,
            "description": "Heavy Rain"
        },
        {
            "code": 66,
            "description": "Light Freezing Rain "
        },
        {
            "code": 67,
            "description": "Heavy Freezing Rain"
        },
        {
            "code": 71,
            "description": "Slight Snow fall "
        },
        {
            "code": 73,
            "description": "Moderate Snow fall"
        },
        {
            "code": 75,
            "description": "Heavy Snow fall"
        },
        {
            "code": 77,
            "description": "Snow grains"
        },
        {
            "code": 80,
            "description": "Slight Rain showers"
        },
        {
            "code": 81,
            "description": "Moderate Rain showers "
        },
        {
            "code": 82,
            "description": "Violent Rain showers"
        },
        {
            "code": 85,
            "description": "Slight Snow showers"
        },
        {
            "code": 86,
            "description": "Heavy Snow showers"
        },
        {
            "code": 95,
            "description": "Slight Thunderstorm"
        },
        {
            "code": 96,
            "description": "Thunderstorm with slight hail"
        },
        {
            "code": 99,
            "description": "Thunderstorm with heavy hail"
        }
    ];

export const getWeatherStatus = (code) => {
    return weatherCodeDescriptions.find(weatherCode => code === parseInt(`${weatherCode[ 'code' ]}`));
}


// console.log(getWeatherStatus(2));