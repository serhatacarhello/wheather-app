import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { fetchWeatherData } from "../services/weatherService";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Bursa"); // Default city
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  // Memoized function to check if data is still fresh
  const isDataFresh = useMemo(() => {
    if (!lastFetchTime) return false;
    return Date.now() - lastFetchTime < CACHE_DURATION;
  }, [lastFetchTime, CACHE_DURATION]);

  // Memoized weather fetch function
  const getWeather = useCallback(async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      setLastFetchTime(Date.now());
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err.message || "Hava durumu verileri alınamadı. 😔");
      setWeatherData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch if data is not fresh or city has changed
    if (!isDataFresh) {
      getWeather(city);
    }
  }, [city, getWeather, isDataFresh]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    city,
    setCity,
    weatherData,
    loading,
    error,
    isDataFresh,
    refreshWeather: () => getWeather(city)
  }), [city, weatherData, loading, error, isDataFresh, getWeather]);

  return (
    <WeatherContext.Provider value={contextValue}>
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