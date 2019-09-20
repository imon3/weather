const appId = '463027451d184b8251cf33d0558a16cc';
const units = 'imperial';
let searchMethod = 'zip';

const init = resultFromServer => {
  console.log(resultFromServer);
};

const searchWeather = searchTerm => {
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
