import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./context/WeatherContext";

function App() {
  const { weatherData, loading, error, city } = useWeather();

  if (loading) return <div className="text-center mt-10">Yükleniyor... ⏳</div>;
  if (!weatherData || weatherData.length === 0 || error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <CitySelector />
        <footer className="mt-10 text-sm text-gray-600">
          {error ? (
            <div className="text-center mt-10 text-red-500">{error}</div>
          ) : (
            <p>Hava durumu verileri başarıyla yüklendi. 🌤 </p>
          )}
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Hava Durumu 🌍</h1>
      <CitySelector />
      <h2 className="text-xl mb-4">{city} Hava Durumu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weatherData.map((day, index) => (
          <WeatherCard key={day.dt} day={day} index={index} />
        ))}
      </div>
      <footer className="mt-10 text-sm text-gray-600">
        {error ? (
          <div className="text-center mt-10 text-red-500">{error}</div>
        ) : (
          <p>Hava durumu verileri başarıyla yüklendi. 🌤 </p>
        )}
      </footer>
    </div>
  );
}

export default App;
