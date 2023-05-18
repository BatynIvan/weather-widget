//

const weatherBlock = document.querySelector("#weather");
let city = prompt("Введіть місто");

async function loadWeather(e) {
  weatherBlock.innerHTML = `
    <div class="weather-loading">
        <img src="loading.gif" alt="Loading...">
    </div>`;

  const server = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  // обробляємо та виводимо дані
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  //   HTML шаблон
  const template = `
  <div id="weather" class="weather">
    <div class="weather-header">
      <div class="weather-main">
          <div class="weather-city">${location}</div>
          <div class="weather-status">${weatherStatus}</div>
      </div>
      <div class="weather-icon">
          <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
      </div>
    </div>
    <div class="weather-temp">${temp}</div>
    <div class="weather-feels-like">Feels like: ${feelsLike}</div>
  </div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
