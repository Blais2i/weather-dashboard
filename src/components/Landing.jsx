const Landing = ({ onSearch, recentCities }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 text-white px-4 py-8 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">WeatherView</h1>
        <p className="text-lg mb-8">Get accurate weather forecasts for any city worldwide</p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6" role="search" aria-label="City weather search">
          <input
            type="text"
            placeholder="Enter city name..."
            aria-label="City name"
            className="px-4 py-2 rounded-md text-black w-full sm:w-2/3"
            id="landing-city-input"
          />
          <button
            onClick={() => {
              const input = document.getElementById('landing-city-input').value;
              if (input.trim()) onSearch(input.trim());
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Search for weather"
          >
            Get Weather
          </button>
        </div>

        {recentCities.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {recentCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => onSearch(city)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`Search weather for ${city}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white text-blue-700 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">☀️</div>
            <h3 className="text-lg font-bold">Current Weather</h3>
            <p>Real-time weather conditions and temperature.</p>
          </div>
          <div className="bg-white text-blue-700 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-lg font-bold">5-Day Forecast</h3>
            <p>Detailed weather predictions for the week ahead.</p>
          </div>
          <div className="bg-white text-blue-700 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🌬️</div>
            <h3 className="text-lg font-bold">Detailed Metrics</h3>
            <p>Humidity, wind speed, pressure, and more.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Landing;
