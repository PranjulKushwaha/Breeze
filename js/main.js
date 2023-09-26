import { fetchData } from './fetchData.mjs';
import { parseCurrentWeather, parseDailyWeather, parseHourlyWeather } from './data.mjs';
import { getUserLocation } from './getUserLocation.mjs'
import { getCoordinatesByCity, getCityByCoordinates } from './geocoding.mjs'

// parameters to fetch data via API
let hourlyParams = `&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,winddirection_10m,is_day&timezone=auto&forecast_days=1`
let dailyParams = `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=7`
let currentParams = `&hourly=dewpoint_2m,apparent_temperature,precipitation_probability,visibility,precipitation&current_weather=true&timezone=auto&forecast_days=1`


// declaration of constants 
const searchContainer = document.getElementById('searchContainer');
const searchResults = document.getElementById('searchResults');
const searchBox = document.getElementById('searchValue');
const searchButton = document.getElementById('searchButton');
const geoLocation = document.getElementById('geoLocation');
const weeklyWeatherContainer = document.getElementById('weeklyWeatherContainer')
// city list for famous cities data
const cityList = [ 'Lucknow', 'Kanpur Nagar', 'Kannauj', 'Unnao' ];


// ========================================
// =========== preloader ==================
// ========================================

let mainPreloader = document.getElementById('mainPreloader')
if (mainPreloader) {
    window.addEventListener('load', () => {
        mainPreloader.remove()
    });
}

// ========================================
// ====Fetch data ,parse and display it====
// ========================================


async function main(lat, long) {

    let preloader = document.getElementById('preloader')

    try {


        const currentWeather = parseCurrentWeather(await fetchData(lat, long, currentParams))
        const dailyWeather = parseDailyWeather(await fetchData(lat, long, dailyParams))
        const hourlyWeather = parseHourlyWeather(await fetchData(lat, long, hourlyParams))

        getCityByCoordinates(lat, long).then((city) => showCurrentData(city, currentWeather))
        showDailyData(dailyWeather)
        showHourlyData(hourlyWeather)



        preloader.remove()

    } catch (err) {
        console.error('An error occurred:', err);
    }



}

// famous cities weather 
async function getWeatherOfCities(cityList) {
    const citydata = {};
    for (const city of cityList) {
        const cityItem = await getCoordinatesByCity(city);
        const add = cityItem[ 0 ].address;
        const lat = cityItem[ 0 ].latitude;
        const long = cityItem[ 0 ].longitude;

        const data = await fetchData(lat, long, currentParams);
        citydata[ add ] = parseCurrentWeather(data);
    }

    return citydata;
};

// ========================================
// =========== Show data to UI  ===========
// ========================================


function showCurrentData(location, currentWeather) {
    document.getElementById('currentWeatherTemp').innerText = Math.round(currentWeather.temp)
    document.getElementById('currentWeatherStatus').innerText = currentWeather.status
    document.getElementById('apparent').innerText = currentWeather.apparent
    document.getElementById('currentWeatherTime').innerText = currentWeather.time.time
    document.getElementById('location').innerText = location
    document.getElementById('currentWeatherIcon').src = currentWeather.img
    document.getElementById('wSpeed').innerText = currentWeather.wSpeed
    document.getElementById('visibility').innerText = Math.round((currentWeather.visibility) / 1000)
    document.getElementById('dew').innerText = currentWeather.dew
}
function showDailyData(dailyWeather) {
    for (let day in dailyWeather) {
        const dailyData = dailyWeather[ day ];
        let weeklyWeatherItem = document.createElement('div');
        weeklyWeatherItem.style.width = 'max-content';
        weeklyWeatherItem.classList = "swiper-slide bgSecondary mx-2 py-2 px-4 rounded-2 ";
        weeklyWeatherItem.innerHTML = `<div class="date">
                                <h6 class="">${dailyData.time.day}</h6>
                                <div class="container d-flex py-2">
                                  <img src="${dailyData.img}" class="ms-1 me-4 " height="50" alt="" />
                                  <div class="">
                                    <p class="high mb-0">${Math.round(dailyData.maxTemp)}</p>
                                    <p class="low mb-0">${Math.round(dailyData.minTemp)}</p>
                                  </div>
                                </div>
                                <p class="texxt-center">${dailyData.status}</p>
                              </div>`
        weeklyWeatherContainer.appendChild(weeklyWeatherItem);
    }
}
function showHourlyData(hourlyWeather) {

    for (let hr in hourlyWeather) {
        const hourlyData = hourlyWeather[ hr ]
        // console.log(hourlyData);
        const hrItem = document.createElement('div')
        hrItem.setAttribute('class', ' col ')
        hrItem.innerHTML = `  <div class=" bgSecondary  p-3 my-2 m-md-2 rounded-2">
    <h6 class="">${hourlyData.time}</h6>
    <div class="container d-flex py-2">
      <img src="${hourlyData.img}" class="ms-1 me-4 " height="50" alt="" />
      <div class="">
        <p class="high mb-0">${Math.round(hourlyData.temp)} °C</p>
      </div>
    </div>
    <p class="texxt-center">${hourlyData.status}</p>
  </div>`;
        document.getElementById('hourlyWeatherContainer').appendChild(hrItem)
    }

}
getWeatherOfCities(cityList).then((citiesWeather) => {
    for (const city in citiesWeather) {
        const cityWeather = citiesWeather[ city ];
        const cityWeatherItem = document.createElement('div');
        cityWeatherItem.setAttribute('class', 'col');
        cityWeatherItem.innerHTML = `
            <div class="  bgSecondary p-3 my-2 m-md-2 rounded-2">
                 <h6>${city}</h6>
                <div class="container d-flex py-2">
                    <img src="${cityWeather.img}" class="ms-1 me-4" height="50" alt="" />
                    <div>
                        <p class="high mb-0">${Math.round(cityWeather.temp)} °C</p>
                    </div>
                </div>
                <p class="text-center">${cityWeather.status}</p>
            </div>
        `;
        document.getElementById('cityWeatherContainer').appendChild(cityWeatherItem);
    }
   
})
function showSearchResults() {

    if (searchBox.value) {

        getCoordinatesByCity(searchBox.value).then((cityList) => {
            searchResults.innerHTML = ' '
            for (let id in cityList) {
                // console.log(id);
                const searchResultItem = document.createElement('div');
                searchResultItem.setAttribute('class', ' shadow bgSecondary py-2 ps-4 pe-2 mt-2 mb-2 d-flex align-items-center')
                searchResultItem.dataset.lat = cityList[ id ].latitude
                searchResultItem.dataset.long = cityList[ id ].longitude
                searchResultItem.innerHTML = `<i class="fas fa-location-arrow me-2"></i>`
                searchResultItem.innerHTML += `<h6 class="text-light mb-0"> ${cityList[ id ].address}</h6>`
                searchResultItem.onclick = function () {
                    setLocation(this.dataset.lat, this.dataset.long)
                }

                console.log(searchResultItem);
                searchResults.appendChild(searchResultItem)
            }
        })
    }

}


// ========================================
// =========== Handling Search  ===========
// ========================================



searchBox.addEventListener('focus', () => {
    searchContainer.classList.remove('d-none')

})

searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    searchResults.innerHTML =
        `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
    showSearchResults()
});




// ==============================================
// Calling main function with different datasets 
// ==============================================


// show default weather of dehli 
main(28.65195, 77.23149)

// calling main function when data is selected from search results
function setLocation(lat, long) {
    main(lat, long)
    searchResults.innerHTML = ''
    searchContainer.classList.add('d-none')
}
// calling main function when users selects geolocation as data
geoLocation.addEventListener('click', (event) => {

    // get user location
    geoLocation.innerHTML += `<div id="loader"  class=" me-2 d-flex align-items-center">
  <div class="spinner-border spinner-border-sm text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>`
    getUserLocation()
        .then((result) => {
            if (result.success) {

                searchContainer.classList.add('d-none')

                main(result.latitude, result.longitude,)
            } else {
                console.error("Error:", result.error);
                document.getElementById('locationError').innerText = result.error
            }
            geoLocation.removeChild(document.getElementById('loader'))
        })

        .catch((error) => {
            console.error("Unexpected error:", error);
            document.getElementById('locationError').innerText = 'Unexpected error'

            geoLocation.removeChild(document.getElementById('loader'))
        });
}
);


