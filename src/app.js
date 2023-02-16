let apiKey = "aa4349d1502cfb42ae79dd3817ceotf1";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
axios.get(url).then(showTemperature);
