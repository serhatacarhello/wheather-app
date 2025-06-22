import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";

export const fetchWeatherData = async({ city_name , cnt = 7 }) => {
  const response = await axios.get(BASE_URL, {
    params: {
        q:city_name,
      cnt,
      appid: API_KEY,
      units: "metric", // Celsius için
    },
  });

  return response.data;
};
