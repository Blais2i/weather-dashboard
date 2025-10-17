import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() !== '') {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6" role="search" aria-label="City weather search">
      <input
        type="text"
        placeholder="Enter city name..."
        aria-label="City name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 px-4 py-2 rounded-md text-black"
      />
      <button
        onClick={handleSubmit}
        aria-label="Search for weather"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Get Weather
      </button>
    </div>
  );
};

export default SearchBar;
