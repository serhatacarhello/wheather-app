import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useMemo } from "react";

const WeatherCard = ({ day, index }) => {
  // Memoize date calculation
  const date = useMemo(() => new Date(day.dt * 1000), [day.dt]);
  const isToday = index === 0;
  
  // Memoize weather icon
  const weatherIcon = useMemo(() => (
    <div className="text-4xl mb-2">
      {getWeatherIcon(day.weather?.[0]?.main)}
    </div>
  ), [day.weather]);

  // Memoize formatted date
  const formattedDate = useMemo(() => {
    if (isToday) return "Bugün";
    return format(date, "EEEE", { locale: tr });
  }, [date, isToday]);

  // Memoize temperature calculations
  const temperatures = useMemo(() => ({
    max: Math.round(day.temp.max),
    min: Math.round(day.temp.min)
  }), [day.temp.max, day.temp.min]);

  // Memoize weather description
  const weatherDescription = useMemo(() => 
    day.weather?.[0]?.description || "Bilinmiyor",
    [day.weather]
  );

  return (
    <div
      className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
        isToday 
          ? "bg-white border-2 border-yellow-400 shadow-lg" 
          : "bg-white/90 backdrop-blur-sm hover:bg-white"
      } shadow-md`}
    >
      <h3 className={`font-semibold text-lg mb-2 ${isToday ? "text-yellow-600" : "text-gray-800"}`}>
        {formattedDate}
      </h3>
      
      <div className="mb-3">
        {weatherIcon}
      </div>
      
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-800">
          {temperatures.max}°C
        </p>
        <p className="text-sm text-gray-600">
          {temperatures.min}°C
        </p>
        <p className="text-sm text-gray-700 capitalize mt-2">
          {weatherDescription}
        </p>
      </div>
    </div>
  );
};

// Memoize the weather icon mapping
const getWeatherIcon = (weather) => {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
    Smoke: "🌫️",
    Dust: "🌪️",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "💨",
    Tornado: "🌪️"
  };
  
  return icons[weather] || "🌤️";
};

export default WeatherCard;