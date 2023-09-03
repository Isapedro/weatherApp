let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let dayoftheweek = document.querySelector("#dayoftheweek");
dayoftheweek.innerHTML = `${day}, ${date} ${month}. ${hours}:${minutes}`;
document.querySelector("#dayoftheweek").classList.add("dayToday");

function displayWeatherCondition(response) {
  document.querySelector("#locations").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  //document.querySelector("#highTemp").innerHTML = Math.round(
    //response.data.daily[1].temperature.maximum
  //);
  //document.querySelector("#lowTemp").innerHTML = Math.round(
   //response.data.daily[1].temperature.minimum
  //);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute(
  "src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
);

}
function searchCity(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let currentLocationButton = document.querySelector("#currentLocationSearch");
currentLocationButton.addEventListener("click", submitCurrent);

function submitCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
searchCity("munich");
