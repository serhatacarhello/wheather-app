import { createContext, useContext, useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherService";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Bursa"); // Varsayılan şehir
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(city);
        console.log(data);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError("Hava durumu verileri alınamadı. 😔");
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{ city, setCity, weatherData, loading, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
