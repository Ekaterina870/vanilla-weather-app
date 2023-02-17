function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  celsiusFeelsLikeTemperature = response.data.temperature.feels_like;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    celsiusFeelsLikeTemperature
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "aa4349d1502cfb42ae79dd3817ceotf1";

  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

function showFeelsLikeFahrenheitTemperature(event) {
  event.preventDefault();
  feelsLikeCelsius.classList.remove("active");
  feelsLikeFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusFeelsLikeTemperature * 9) / 5 + 32;
  document.querySelector("#feels-like").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
function showFeelsLikeCelsiusTemperature(event) {
  event.preventDefault();
  feelsLikeCelsius.classList.add("active");
  feelsLikeFahrenheit.classList.remove("active");
  document.querySelector("#feels-like").innerHTML = Math.round(
    celsiusFeelsLikeTemperature
  );
}

function searchLocation(position) {
  let apiKey = "aa4349d1502cfb42ae79dd3817ceotf1";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=aa4349d1502cfb42ae79dd3817ceotf1&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let celsiusTemperature = null;
let celsiusFeelsLikeTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let feelsLikeFahrenheit = document.querySelector("#feels-like-fahrenheit");
feelsLikeFahrenheit.addEventListener(
  "click",
  showFeelsLikeFahrenheitTemperature
);
let feelsLikeCelsius = document.querySelector("#feels-like-celsius");
feelsLikeCelsius.addEventListener("click", showFeelsLikeCelsiusTemperature);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Paris");
