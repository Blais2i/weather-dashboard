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
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem('recentCities');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);

    const updatedCities = [cityName, ...recentCities.filter(c => c !== cityName)].slice(0, 5);
    setRecentCities(updatedCities);
    localStorage.setItem('recentCities', JSON.stringify(updatedCities));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4 py-6 sm:px-6 md:px-12">
      <h1 className="text-4xl font-bold mb-4">WeatherView</h1>
      <p className="mb-6 text-lg">Get accurate weather forecasts for any city worldwide</p>
      <SearchBar onSearch={handleSearch} />

      {recentCities.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Recent Searches:</h2>
          <div className="flex flex-wrap gap-2">
            {recentCities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSearch(city)}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white mx-auto"></div>
          <p className="mt-2">Loading weather data...</p>
        </div>
      )}

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
