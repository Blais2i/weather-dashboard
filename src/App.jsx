import { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [city, setCity] = useState('');

  const handleSearch = (cityName) => {
    console.log('Searching for:', cityName);
    setCity(cityName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">WeatherView</h1>
      <p className="mb-6 text-lg">Get accurate weather forecasts for any city worldwide</p>
      <SearchBar onSearch={handleSearch} />
      {city && <p className="mt-6 text-xl">You searched for: {city}</p>}
    </div>
  );
}

export default App;
