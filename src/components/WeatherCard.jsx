import { format } from "date-fns";
import { tr } from "date-fns/locale";

const WeatherCard = ({ day, index }) => {
  const date = new Date(day.dt * 1000);
  const isToday = index === 0;
  
  // Always use emoji icons for better reliability
  const weatherIcon = (
    <div className="text-4xl mb-2">
      {getWeatherIcon(day.weather?.[0]?.main)}
    </div>
  );

  const formatDate = (date, isToday) => {
    if (isToday) return "Bugün";
    return format(date, "EEEE", { locale: tr });
  };

  return (
    <div
      className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
        isToday 
          ? "bg-white border-2 border-yellow-400 shadow-lg" 
          : "bg-white/90 backdrop-blur-sm hover:bg-white"
      } shadow-md`}
    >
      <h3 className={`font-semibold text-lg mb-2 ${isToday ? "text-yellow-600" : "text-gray-800"}`}>
        {formatDate(date, isToday)}
      </h3>
      
      <div className="mb-3">
        {weatherIcon}
      </div>
      
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-800">
          {Math.round(day.temp.max)}°C
        </p>
        <p className="text-sm text-gray-600">
          {Math.round(day.temp.min)}°C
        </p>
        <p className="text-sm text-gray-700 capitalize mt-2">
          {day.weather?.[0]?.description || "Bilinmiyor"}
        </p>
      </div>
    </div>
  );
};

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