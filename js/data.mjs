import { getWeatherStatus } from "./weatherCode.mjs"
import { ICON_MAP } from "./iconMap.mjs";
import { VIDEO_MAP } from "./videoMap.mjs";

function parseDateTime(timestamp) {
    const dateTime = new Date(timestamp);
    const day = dateTime.toLocaleString('en-US', { weekday: 'long' });
    const date = dateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return { day, date, time };
}
function getIconUrl(weatherCode, is_day) {

    const nightIconCode = [ 0, 1, 2, 51, 61, 80 ]

    if ((!is_day) && nightIconCode.includes(weatherCode)) {
        return `images/icons/svg/${ICON_MAP.get(weatherCode + 'n')}.svg`
    }
    else {
        return `images/icons/svg/${ICON_MAP.get(weatherCode)}.svg`;
    }


}
 function getVideoUrl(weatherCode){
    return `videos/${VIDEO_MAP.get(weatherCode)}`

}
export function parseCurrentWeather({ current, hourly ,daily }) {
    const currentData = {
        "temp": current.temperature_2m,
        "wSpeed": current.wind_speed_10m,
        "wDir": current.wind_direction_10m,
        "humidity": current.relative_humidity_2m,
        "precipitation": current.precipitation,
        "visibility": hourly.visibility[ 0 ],
        "apparent": current.apparent_temperature,
        "time": parseDateTime(current.time),
        "status": getWeatherStatus(current.weather_code).description,
        "img": getIconUrl(current.weather_code, current.is_day),
        "video": getVideoUrl(current.weather_code),
        "sunrise" : parseDateTime(daily.sunrise),
        "sunset" : parseDateTime(daily.sunset),

        
    }
    return currentData
}
export function parseDailyWeather({ daily }) {
    const dailyWeather = {}

    let numOfDays = daily.time.length

    for (let i = 0; i < numOfDays; ++i) {

        let day = 'day' + (i + 1);
        const dailyWeatherData = {
            'time': parseDateTime(daily.time[ i ]),
            'img': getIconUrl(daily.weathercode[ i ], 1),
            "status": getWeatherStatus(daily.weathercode[ i ]).description,
            'minTemp': daily.temperature_2m_min[ i ],
            'maxTemp': daily.temperature_2m_max[ i ],
            'sunrise': daily.sunrise[ i ],
            'sunset': daily.sunset[ i ],
            'precip': daily.precipitation_sum[ i ],

        }
        dailyWeather[ day ] = dailyWeatherData;


    }

    return dailyWeather;
}
export function parseHourlyWeather({ hourly }) {
    const hourlyWeather = {}

    // let numOfHrs = hourly.time.length
    let numOfHrs = 12

    for (let i = 0; i < numOfHrs; ++i) {

        let hour = hourly.time[ i ];
        const hourlyData = {

            'time': parseDateTime(hourly.time[ i ]).time,
            'temp': hourly.temperature_2m[ i ],
            // 'dew': hourly.dewpoint_2m[ i ],
            'precipProbab': hourly.precipitation_probability[ i ],
            // 'rain': hourly.rain[ i ],
            // 'showers': hourly.showers[ i ],
            'img': getIconUrl(hourly.weathercode[ i ], hourly.is_day[ i ]),
            "status": getWeatherStatus(hourly.weathercode[ i ]).description,
            // 'visibility': hourly.visibility[ i ],
            'wSpeed': hourly.windspeed_10m[ i ],
            'wDir': hourly.winddirection_10m[ i ],
            // 'uv': hourly.uv_index[ i ],
            'isDay': hourly.is_day[ i ]

        }
        hourlyWeather[ hour ] = hourlyData;


    }
    return hourlyWeather
}
