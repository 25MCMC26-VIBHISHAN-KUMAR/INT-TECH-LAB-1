"use strict";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const resultDiv = document.getElementById("result");
const API_KEY = "7552018d4e62103cfa20bc199d459ae7";
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        resultDiv.innerText = "Please enter a city name.";
        return;
    }
    fetchWeather(city);
});
async function fetchWeather(city) {
    resultDiv.innerText = "Loading...";
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            resultDiv.innerText = "Error: " + errorData.message;
            return;
        }
        const weatherData = data;
        displayWeather(weatherData);
    }
    catch (error) {
        resultDiv.innerText = "Network error. Please try again later.";
    }
}
function displayWeather(data) {
    var _a, _b;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = (_b = (_a = data.weather[0]) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "No description available";
    const cityName = data.name;
    resultDiv.innerHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Condition: ${description}</p>
    `;
}
//# sourceMappingURL=task7.js.map