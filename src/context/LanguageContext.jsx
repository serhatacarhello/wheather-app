import { createContext, useContext, useState, useMemo } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang")||"tr"); 
  // Memoized translations
  const translations = useMemo(() => ({
    tr: {
      title: "Hava Durumu 🌍",
      forecast: "7 Günlük Tahmin",
      loading: "Yükleniyor... ⏳",
      error: "Hata Oluştu",
      retry: "Tekrar Dene",
      noData: "Veri Bulunamadı",
      noDataDesc: "Seçilen şehir için hava durumu verisi bulunamadı.",
      selectCity: "Şehir Seçin",
      today: "Bugün",
      current: "✓ Güncel",
      footer: "Hava durumu verileri OpenWeatherMap tarafından sağlanmaktadır 🌤️",
      unknown: "Bilinmiyor",
      days: {
        monday: "Pazartesi",
        tuesday: "Salı", 
        wednesday: "Çarşamba",
        thursday: "Perşembe",
        friday: "Cuma",
        saturday: "Cumartesi",
        sunday: "Pazar"
      }
    },
    en: {
      title: "Weather Forecast 🌍",
      forecast: "7-Day Forecast",
      loading: "Loading... ⏳",
      error: "Error Occurred",
      retry: "Try Again",
      noData: "No Data Found",
      noDataDesc: "Weather data not found for the selected city.",
      selectCity: "Select City",
      today: "Today",
      current: "✓ Current",
      footer: "Weather data provided by OpenWeatherMap 🌤️",
      unknown: "Unknown",
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday", 
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      }
    }
  }), []);

  // Memoized context value
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language]
  }), [language, translations]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};