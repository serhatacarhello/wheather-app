# Weather App 🌤️

A modern weather application built with React and Vite that displays 7-day weather forecasts for Turkish cities.

## Features

- 7-day weather forecast
- Support for all Turkish cities
- Responsive design
- Modern UI with Tailwind CSS
- Real-time weather data from OpenWeatherMap API

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

5. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Axios for API calls
- date-fns for date formatting
- OpenWeatherMap API

## Project Structure

```
src/
├── components/
│   ├── CitySelector.jsx
│   └── WeatherCard.jsx
├── context/
│   └── WeatherContext.jsx
├── services/
│   └── weatherService.js
├── App.jsx
└── main.jsx
```

## API

This app uses the OpenWeatherMap API to fetch weather data. You need to sign up for a free account to get an API key.