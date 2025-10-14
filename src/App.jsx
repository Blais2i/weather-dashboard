import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    try {
      setError('');
      setWeather(null);
      setForecast([]);

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const currentData = await currentRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      if (currentData.cod !== 200 || forecastData.cod !== '200') {
        setError(currentData.message || forecastData.message || 'City not found');
      } else {
        setWeather(currentData);
        const daily = forecastData.list.filter((item, index) => index % 8 === 0);
        setForecast(daily);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">WeatherView</h1>
      <p className="mb-6 text-lg">Get accurate weather forecasts for any city worldwide</p>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard data={weather} />}
      {weather && (
        <button
          onClick={() => fetchWeather(city)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Refresh Weather
        </button>
      )}
      {forecast.length > 0 && <ForecastCard data={forecast} />}
    </div>
  );
}

export default App;
