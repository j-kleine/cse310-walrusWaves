import { renderWeatherPage } from "./weatherPage.mjs";
import { checkStoredUnit } from "./unitSwitcher.mjs";

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setSavedLocation(selectedLocation) {
  if (selectedLocation) {
    renderWeatherPage();
    createWeatherURL(selectedLocation).then(weatherURL => {
      weatherAPI(weatherURL);
    });
    createAstroURL(selectedLocation).then(astroURL => {
      astroAPI(astroURL);
    });
    createWaterURL(selectedLocation);
  } else {
    // add eventlistener 'change' to dropdown
    document.querySelector('#plunge-select').addEventListener('change', (event) => {
      const selectedLocation = event.target.value;
      setLocalStorage('select-location', selectedLocation);
      renderWeatherPage();
      createWeatherURL(selectedLocation).then(weatherURL => {
        weatherAPI(weatherURL);
      });
      createAstroURL(selectedLocation).then(astroURL => {
        astroAPI(astroURL);
      });
    });
  }
}

export function getSavedLocation() {
  const selectedLocation = getLocalStorage('select-location');
  return selectedLocation
}

export function displaySavedLocation(selectedLocation) {
  if (selectedLocation) {
    document.querySelector('#plunge-select').value = selectedLocation;
  }
}

async function findCoordinates(selectedLocation) {
  const cityListURL = 'https://j-kleine.github.io/cse310-walrusWaves/src/json/cityList.json';
  const response = await fetch(cityListURL);
  const data = await response.json();
  
  // Find the city object in the data array that matches the selected city name
  const selectedCity = data.cities.find(city => city.displayName === selectedLocation);
  
  // If the selected city is found, extract its latitude and longitude
  if (selectedCity) {
      const { displayName, lat, lng } = selectedCity;
      // console.log(selectedLocation + ':' + lat, lng)
      return { displayName, lat, lng };
  } else {
      // Handle case when selected city is not found
      console.error('City not found');
      return null;
  }
}

async function createWeatherURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        // const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;

        const APIkey = 'ef87a209058e4633a7c121100242002';
        const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${lat},${lng}&aqi=no`;


                    // OPENWETHERMAP TEST API
                    // const unit = 'metric';
                    // const APIkey = '96b776019148012b0ca89f700b1532be';

                    // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${APIkey}`;
        
        // console.log(weatherURL);
        
        return weatherURL
      })
}

async function createAstroURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        // const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;

        const APIkey = 'ef87a209058e4633a7c121100242002';
        const astroURL = `https://api.weatherapi.com/v1/marine.json?key=${APIkey}&q=${lat},${lng}&days=1`;

        // console.log(astroURL);

        return astroURL
      })
}

async function createWaterURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        // const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;
        const params = 'waterTemperature';

        const APIkey = '550898c0-0b1f-11f0-a3d7-0242ac130003-55089992-0b1f-11f0-a3d7-0242ac130003';
        const waterURL = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;

        fetch(waterURL, {
          headers: {
            'Authorization': APIkey
          }
        }).then(response => response.json()).then(data => {
          // console.log(JSON.stringify(data));
          displayCurrentWater(data);
        })
      })
}

async function weatherAPI(URL) {
  try {
      const response = await fetch(URL);
      if (response.ok) {
          const data = await response.json();
          // console.log(JSON.stringify(data));
          displayCurrentWeather(data);
      } else {
          throw Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
}

async function astroAPI(URL) {
  try {
      const response = await fetch(URL);
      if (response.ok) {
          const data = await response.json();
          // console.log(JSON.stringify(data));
          displayCurrentAstro(data);
      } else {
          throw Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
}

function displayCurrentWeather(data) {
  const tempUnit = checkStoredUnit('settings-temp');
  const speedUnit = checkStoredUnit('settings-speed');

  const airTemp = document.querySelector('#air-temp-value');
  const weatherIcon = document.querySelector('#weather-icon');
  const windSpeed = document.querySelector('#windspeed');
  const windDirection = document.querySelector('#wind-direction');
  const uvIndex = document.querySelector('#uv-index');

  // console.log(JSON.stringify(data));

  let roundedAirTemp;
  if (tempUnit == 'imperial') {
    roundedAirTemp = data.current.temp_f.toFixed(0);
    document.querySelector('.air-temp-unit').innerHTML = 'Fahrenheit';
  } else {
    roundedAirTemp = data.current.temp_c.toFixed(0);
    document.querySelector('.air-temp-unit').innerHTML = 'Celsius';
  }
  if (roundedAirTemp == -0) {
      roundedAirTemp = 0;
  }
  airTemp.innerHTML = `${roundedAirTemp}&deg;`;
  const iconsrc = data.current.condition.icon;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', `weather icon for "${data.current.condition.text}" - weatherapi.com`);
  
  if (speedUnit == 'imperial') {
    windSpeed.innerHTML = `${data.current.wind_mph} mph`;

  } else {
    windSpeed.innerHTML = `${data.current.wind_kph} kmh`;
  }
  
  windDirection.innerHTML = `${data.current.wind_dir}`;

  uvIndex.innerHTML = data.current.uv.toFixed(0);

}

function displayCurrentAstro(data) {
  const sunriseTime = document.querySelector('#sunrise-time');
  const sunsetTime = document.querySelector('#sunset-time');

  // console.log(JSON.stringify(data));

  const sunriseTimeString = data.forecast.forecastday[0].astro.sunrise;
  const sunsetTimeString = data.forecast.forecastday[0].astro.sunset;
  
  const referenceDate = dayjs().format('YYYY-MM-DD') + ' ';

  sunriseTime.innerHTML = dayjs(referenceDate + sunriseTimeString, 'YYYY-MM-DD h:mm A').format('HH:mm');
  sunsetTime.innerHTML = dayjs(referenceDate + sunsetTimeString, 'YYYY-MM-DD h:mm A').format('HH:mm');
}

function displayCurrentWater(data) {
  const tempUnit = checkStoredUnit('settings-temp');

  const waterTemp = document.querySelector('#water-temp-value');

  // console.log(JSON.stringify(data));

  let roundedWaterTemp;

  const waterTempC = data.hours[7].waterTemperature.meto;
  if (tempUnit == 'imperial') {
    const waterTempF = (waterTempC * 9/5) + 32;
    roundedWaterTemp = waterTempF.toFixed(0);
    document.querySelector('.water-temp-unit').innerHTML = 'Fahrenheit';
  } else {
    roundedWaterTemp = waterTempC.toFixed(1);
    document.querySelector('.water-temp-unit').innerHTML = 'Celsius';
  }
  if (roundedWaterTemp == -0) {
      roundedWaterTemp = 0;
  }
  waterTemp.innerHTML = `${roundedWaterTemp}&deg;`;
}