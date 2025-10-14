import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    try {
      setError('');
      setWeather(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message || 'City not found');
      } else {
        setWeather(data);
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
    </div>
  );
}

export default App;
