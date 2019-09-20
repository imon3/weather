const appId = '463027451d184b8251cf33d0558a16cc';
const units = 'imperial';
let searchMethod;

// FETCH API FUNCTION
const searchWeather = searchTerm => {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    })
    .catch(err => {
      console.log(err);
    });
};

// DETERMINE SEARCH METHOD FUNCTION
const getSearchMethod = searchTerm => {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + '' === searchTerm
  ) {
    searchMethod = 'zip';
  } else {
    searchMethod = 'q';
  }
};

// CONSOLE LOG RESULT FROM API
const init = resultFromServer => {
  console.log(resultFromServer);
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("pics/clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("pics/cloudy.jpg")';
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("pics/rain.jpg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("pics/storm.jpg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("pics/snow.jpg")';
      break;

    default:
      break;
  }

  let resultDescription = resultFromServer.weather[0].description;

  let weatherDescriptionHeader = document.getElementById(
    'weatherDescriptionHeader'
  );
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src =
    'http://openweathermap.org/img/wn/' +
    resultFromServer.weather[0].icon +
    '.png';

  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + '&#176' + 'F';

  windSpeedElement.innerHTML =
    'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';

  cityHeader.innerHTML = resultFromServer.name;

  humidityElement.innerHTML =
    'Humidity at ' + resultFromServer.main.humidity + '%';

  setPositionForWeatherInfo();
};

// SET POSITION OF WEATHER INFO AND MAKE VISIBLE
const setPositionForWeatherInfo = () => {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = 'visible';
};

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;

  if (searchTerm) {
    return searchWeather(searchTerm);
  }
});
