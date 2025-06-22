import { useMemo } from "react";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./context/WeatherContext";

function App() {
  const { weatherData, loading, error, city, isDataFresh, refreshWeather } = useWeather();

  // Memoize weather cards to prevent unnecessary re-renders
  const weatherCards = useMemo(() => 
    weatherData.map((day, index) => (
      <WeatherCard key={day.dt} day={day} index={index} />
    )), [weatherData]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Yükleniyor... ⏳</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hata Oluştu</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <CitySelector />
          <button
            onClick={refreshWeather}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Veri Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Seçilen şehir için hava durumu verisi bulunamadı.</p>
          <CitySelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Hava Durumu 🌍</h1>
          <CitySelector />
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-2xl text-white font-semibold">{city} - 7 Günlük Tahmin</h2>
            {isDataFresh && (
              <span className="text-green-300 text-sm">✓ Güncel</span>
            )}
          </div>
        </header>
        
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {weatherCards}
        </main>
        
        <footer className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            Hava durumu verileri OpenWeatherMap tarafından sağlanmaktadır 🌤️
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;