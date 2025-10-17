import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import WeatherDetails from './components/WeatherDetails';
import ErrorMessage from './components/ErrorMessage';
import Landing from './components/Landing';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem('recentCities');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchWeather = async (cityName, selectedUnit = unit) => {
    try {
      setLoading(true);
      setError('');
      setWeather(null);
      setForecast([]);
      setAlerts([]);

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${selectedUnit}&appid=${API_KEY}`
      );
      const currentData = await currentRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${selectedUnit}&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      if (currentData.cod !== 200 || forecastData.cod !== '200') {
        setError(currentData.message || forecastData.message || 'City not found');
      } else {
        setWeather(currentData);
        const daily = forecastData.list.filter((item, index) => index % 8 === 0);
        setForecast(daily);

        const { coord } = currentData;
        const alertRes = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,daily&appid=${API_KEY}`
        );
        const alertData = await alertRes.json();
        setAlerts(alertData.alerts || []);
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

  const getBackgroundClass = () => {
    if (!weather) return 'from-purple-500 to-blue-500';

    const condition = weather.weather[0].main.toLowerCase();

    switch (condition) {
      case 'clear':
        return 'from-yellow-400 to-orange-500';
      case 'clouds':
        return 'from-gray-400 to-gray-700';
      case 'rain':
        return 'from-blue-700 to-gray-800';
      case 'snow':
        return 'from-white to-blue-300';
      case 'thunderstorm':
        return 'from-indigo-800 to-gray-900';
      default:
        return 'from-purple-500 to-blue-500';
    }
  };

  if (!weather && !loading && !error) {
    return <Landing onSearch={handleSearch} recentCities={recentCities} />;
  }

  return (
    <main
      role="main"
      className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} text-white px-4 py-6 sm:px-6 md:px-12`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">WeatherView</h1>
        <p className="mb-6 text-lg">Get accurate weather forecasts for any city worldwide</p>
        <SearchBar onSearch={handleSearch} />

        <div className="mb-4">
          <button
            onClick={() => {
              const newUnit = unit === 'metric' ? 'imperial' : 'metric';
              setUnit(newUnit);
              if (city) fetchWeather(city, newUnit);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
          >
            Switch to {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>

        {loading && (
          <div className="mt-6 text-center" role="status" aria-live="polite">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white mx-auto"></div>
            <p className="mt-2">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div role="alert" aria-live="assertive">
            <ErrorMessage message={error} />
          </div>
        )}

        {weather && <WeatherCard data={weather} unit={unit} />}
        {weather && <WeatherDetails data={weather} unit={unit} />}
        {forecast.length > 0 && <ForecastCard data={forecast} unit={unit} />}

        {alerts.length > 0 && (
          <section className="mt-6" aria-label="Weather alerts">
            <h2 className="text-xl font-semibold mb-2">Weather Alerts</h2>
            <ul className="space-y-2">
              {alerts.map((alert, index) => (
                <li key={index} className="bg-red-100 text-red-800 p-4 rounded-md">
                  <p className="font-bold">{alert.event}</p>
                  <p>{alert.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
