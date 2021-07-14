function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
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

function displayForecast() {
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML +
    `
    <div class="col-2">
        <div class="weather-forecast-date">
            ${day}
        </div>
        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="sunny"  width="46"/>
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-high"> 18° </span>
            <span class="weather-forecast-temp-low"> 12° </span>
        </div>
    </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fTemp = Math.round(response.data.main.temp);
}

function search(city) {
    let key = "05992a658e151609dfa497fc6c2796f2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  axios.get(apiUrl).then(displayTemp);

  form.reset();
}

function handleSubmit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCelsius(event) {
    event.preventDefault();

    let tempElement = document.querySelector("#temp");

    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");

    let celsiusTemp = Math.round((fTemp * 9 / 5) + 32);
    tempElement.innerHTML = celsiusTemp;  
}

function showFahrenheit(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = fTemp;
}

let fTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Knoxville");

displayForecast();