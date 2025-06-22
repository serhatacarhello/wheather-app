import { format } from "date-fns";
import { tr } from "date-fns/locale";

const WeatherCard = ({ day, index }) => {
  const date = new Date(day.dt * 1000);
  const isToday = index === 0;
  const weatherIcon =
    (
      <img
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt="weather icon"
        className="w-12 mx-auto"
      />
    ) || getWeatherIcon(day.weather[0].main);

  return (
    <div
      className={`p-4 rounded-lg text-center ${
        isToday ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
      } shadow-md`}
    >
      <h3 className="font-semibold">{format(date, "EEEE", { locale: tr })}</h3>

      <div className="text-3xl my-2">{weatherIcon}</div>
      <p className="text-lg">
        {Math.round(day.temp.max)}°C / {Math.round(day.temp.min)}°C
      </p>
      <p className="text-sm capitalize">{day.weather[0].description}</p>
    </div>
  );
};

const getWeatherIcon = (weather) => {
  switch (weather) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "⛅";
    case "Rain":
      return "🌧️";
    case "Snow":
      return "❄️";
    default:
      return "🌈";
  }
};

export default WeatherCard;
