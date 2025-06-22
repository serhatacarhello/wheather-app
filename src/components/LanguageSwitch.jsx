import { useLanguage } from "../context/LanguageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-all duration-200 border border-white/20"
        aria-label={`Switch to ${language === "tr" ? "English" : "Turkish"}`}
      >
        <span className="text-lg">
          {language === "tr" ? "🇹🇷" : "🇺🇸"}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {language === "tr" ? "TR" : "EN"}
        </span>
        <div className="flex items-center">
          <div className={`w-8 h-4 bg-gray-300 rounded-full relative transition-colors duration-200 ${
            language === "en" ? "bg-blue-500" : ""
          }`}>
            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
              language === "en" ? "translate-x-4" : "translate-x-0.5"
            }`} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitch;