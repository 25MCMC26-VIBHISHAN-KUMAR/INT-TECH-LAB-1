
const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const getWeatherBtn = document.getElementById("getWeatherBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
}


interface ErrorResponse {
    message: string;
}


const API_KEY = "7552018d4e62103cfa20bc199d459ae7";

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        resultDiv.innerText = "Please enter a city name.";
        return;
    }

    fetchWeather(city);
});


async function fetchWeather(city: string){
    resultDiv.innerText = "Loading...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data: WeatherResponse | ErrorResponse = await response.json();

        if (!response.ok) {
            const errorData = data as ErrorResponse;
            resultDiv.innerText = "Error: " + errorData.message;
            return;
        }

        const weatherData = data as WeatherResponse;

        displayWeather(weatherData);

    } catch (error) {
        resultDiv.innerText = "Network error. Please try again later.";
    }
}

function displayWeather(data: WeatherResponse): void {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0]?.description ?? "No description available";
    const cityName = data.name;

    resultDiv.innerHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Condition: ${description}</p>
    `;
}
