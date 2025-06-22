import { createContext, useContext, useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherService";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Istanbul"); // Default city
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err.message || "Hava durumu verileri alınamadı. 😔");
        setWeatherData([]);
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

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};