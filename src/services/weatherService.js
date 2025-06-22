import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeatherData = async (city_name, cnt = 7, lang = "tr") => {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file"
    );
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city_name,
        cnt: cnt * 8, // 8 forecasts per day (every 3 hours)
        appid: API_KEY,
        units: "metric",
        lang: lang, // Add language parameter
      },
    });

    // Group forecasts by day and get daily averages
    const dailyForecasts = [];
    const groupedByDay = {};

    response.data.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toDateString();
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(forecast);
    });

    // Convert grouped data to daily format
    Object.keys(groupedByDay)
      .slice(0, cnt)
      .forEach((date) => {
        const dayForecasts = groupedByDay[date];
        const temps = dayForecasts.map((f) => f.main.temp);
        const weatherConditions = dayForecasts.map((f) => f.weather[0]);

        // Get the most common weather condition for the day
        const weatherCounts = {};
        weatherConditions.forEach((w) => {
          const key = w.main;
          weatherCounts[key] = (weatherCounts[key] || 0) + 1;
        });

        const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) =>
          weatherCounts[a] > weatherCounts[b] ? a : b
        );

        const representativeWeather = weatherConditions.find(
          (w) => w.main === mostCommonWeather
        );

        dailyForecasts.push({
          dt: dayForecasts[0].dt,
          temp: {
            min: Math.min(...temps),
            max: Math.max(...temps),
          },
          weather: [representativeWeather],
        });
      });

    return dailyForecasts;
  } catch (error) {
    console.error("Weather API Error:", error);
    if (error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API key."
      );
    } else if (error.response?.status === 404) {
      throw new Error("City not found. Please check the city name.");
    } else {
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
  }
};
