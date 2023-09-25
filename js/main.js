import { fetchData } from './fetchData.mjs';
import { parseLocation, parseCurrentWeather, parseDailyWeather, parseHourlyWeather } from './data.mjs';
import { getUserLocation } from './getUserLocation.mjs'
import { getCoordinatesByCity, getCityByCoordinates } from './geocoding.mjs'

const weeklyWeatherContainer = document.getElementById('weeklyWeatherContainer')


/**
 * Preloader
*/
let mainPreloader = document.getElementById('mainPreloader')
if (mainPreloader) {
  window.addEventListener('load', () => {
    mainPreloader.remove()
  });
}

// Fetch data ,parse and display it

async function main(lat, long) {
  
  let preloader = document.getElementById('preloader')
  console.log(' Coordinates ', lat, long);

  try {
    console.log(lat, long);
    const jsonData = await fetchData(lat, long);
    
    const currentWeather = parseCurrentWeather(jsonData)
    const dailyWeather = parseDailyWeather(jsonData)
    const hourlyWeather = parseHourlyWeather(jsonData)
    
    

    getCityByCoordinates(lat, long).then((c) => {
      const city = c
      // console.log(city);

      showCurrentData(city, currentWeather)
    })

    showDailyData(dailyWeather)
    // showHourlyData(city, hourlyWeather)

    console.log('data fetched');
    preloader.remove()

  } catch (err) {
    // Handle errors
    console.error('An error occurred:', err);
  }



}


// Call the main function to start the process

function showCurrentData(location, currentWeather) {

  document.getElementById('currentWeatherTemp').innerText = currentWeather.temp
  document.getElementById('currentWeatherStatus').innerText = currentWeather.status
  // document.getElementById('currentWeatherDate').innerText = currentWeather.time.date
  document.getElementById('currentWeatherTime').innerText = currentWeather.time.time
  document.getElementById('location').innerText = location
  document.getElementById("currentWeatherIcon").src = currentWeather.img
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
                                    <p class="high mb-0">${dailyData.maxTemp}</p>
                                    <p class="low mb-0">${dailyData.minTemp}</p>
                                  </div>
                                </div>
                                <p class="texxt-center">${dailyData.status}</p>
                              </div>`
    weeklyWeatherContainer.appendChild(weeklyWeatherItem);
  }
}

const searchContainer = document.getElementById('searchContainer');
const searchResults = document.getElementById('searchResults');
const searchBox = document.getElementById('searchValue');
const searchButton = document.getElementById('searchButton');
const geoLocation = document.getElementById('geoLocation');


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




// show default weather of dehli 
main(28.65195, 77.23149)


function setLocation(lat, long) {
  main(lat, long)
  searchResults.innerHTML = ''
  searchContainer.classList.add('d-none')
}

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
