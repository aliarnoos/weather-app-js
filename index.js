const currentTemp = document.querySelector(".curr-temp");
const skyCond = document.querySelector(".sky-condition");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");
const winds = document.querySelector("#winds");
const weatherBox = document.querySelector(".weather-box");

const backimg = document.querySelector(".background");

const searchBox = document.querySelector(".city-search");
const inputCity = document.querySelector("#city");
const searchBtn = document.querySelector("#city-btn");

const changeUnitBtn = document.querySelector(".switch-unit");
const searchAgainBtn = document.querySelector(".search-again");

const loadingbackground = document.querySelector(".loading");
let cityName;
searchAgainBtn.addEventListener("click", () => {
  cityName = null;
  inputCity.value = "";
  searchBox.classList.toggle("hide");
  weatherBox.classList.toggle("show");
  changeUnitBtn.textContent = "°C";
  backimg.src = "images/day.jpg";
});

searchBtn.addEventListener("click", fetchWeather);
searchBtn.addEventListener("click", changeScreen);

function changeScreen() {
  inputCity.value = "";
  searchBox.classList.toggle("hide");
  weatherBox.classList.toggle("show");
}

async function fetchWeather() {
        cityName = inputCity.value;
        loadingbackground.classList.add("show");
        const respnse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6c3acff6064bc2257ee6fede85f53a74`,
          { mode: "cors" }
        );
        const data = await respnse.json();
        console.log(data);
        const hour = new Date(data.dt * 1000 - data.timezone * 1000).getHours();
        if (hour > 17) {
          backimg.src = "images/night.jpg";
        } else if (hour <= 0 < 16) {
          backimg.src = "images/day.jpg";
        }
        const weatherInfo = {
          currentTempC: Math.round(parseFloat(data.main.temp) - 273.15) + "°C",
          currentTempF:Math.round(parseFloat(data.main.temp) - 273.15) * 1.8 + 32 + "°F",
      
          tempLikeC: Math.round(parseFloat(data.main.feels_like) - 273.15) + "°C",
          tempLikeF: Math.round(parseFloat(data.main.feels_like) - 273.15) * 1.8 + 32 + "°F",
      
          humidityPrec: data.main.humidity + " %",
          pressureMb: data.main.pressure + " mb",
      
          temp_maxC: Math.round(parseFloat(data.main.temp_max) - 273.15) + "°C",
          temp_maxF: Math.round(parseFloat(data.main.temp_max) - 273.15) + "°F",
      
          temp_minC: Math.round(parseFloat(data.main.temp_min) - 273.15) + "°C",
          temp_minF: Math.round(parseFloat(data.main.temp_min) - 273.15) + "°F",
          sky: data.weather["0"].description,
          wind: data.wind.speed + "m/s",
        };
        updateCity();
        function updateCity() {
          currentTemp.textContent = weatherInfo.currentTempC;
          minTemp.textContent = weatherInfo.temp_minC;
          maxTemp.textContent = weatherInfo.temp_maxC;
          feelsLike.textContent = weatherInfo.tempLikeC;
          humidity.textContent = weatherInfo.humidityPrec;
          pressure.textContent = weatherInfo.pressureMb;
          skyCond.textContent = weatherInfo.sky;
          winds.textContent = weatherInfo.wind;
          loadingbackground.classList.remove("show");
        }
      
        changeUnitBtn.addEventListener("click", changeUnit);
        function changeUnit() {
          if (currentTemp.textContent === weatherInfo.currentTempC) {
            currentTemp.textContent = weatherInfo.currentTempF;
            minTemp.textContent = weatherInfo.temp_minF;
            maxTemp.textContent = weatherInfo.temp_maxF;
            feelsLike.textContent = weatherInfo.tempLikeF;
            changeUnitBtn.textContent = "°F";
          } else if (currentTemp.textContent === weatherInfo.currentTempF) {
            currentTemp.textContent = weatherInfo.currentTempC;
            minTemp.textContent = weatherInfo.temp_minC;
            maxTemp.textContent = weatherInfo.temp_maxC;
            feelsLike.textContent = weatherInfo.tempLikeC;
            changeUnitBtn.textContent = "°C";
          }
        }
 

}
