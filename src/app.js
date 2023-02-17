function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = "aa4349d1502cfb42ae79dd3817ceotf1";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);
