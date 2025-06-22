import { useWeather } from "../context/WeatherContext";

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", 
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", 
  "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", 
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", 
  "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", 
  "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "Istanbul", "İzmir", 
  "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", 
  "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", 
  "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", 
  "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", 
  "Sinop", "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", 
  "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

const CitySelector = () => {
  const { city, setCity, loading } = useWeather();

  return (
    <div className="mb-6">
      <label htmlFor="city-select" className="sr-only">
        Şehir Seçin
      </label>
      <select
        id="city-select"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
        className="p-3 border-2 border-white/20 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
      >
        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;