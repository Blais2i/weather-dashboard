import React from 'react';

const WeatherDetails = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const pressureUnit = unit === 'metric' ? 'hPa' : 'in';

  return (
    <section className="mt-8 max-w-3xl mx-auto bg-white text-blue-700 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <li><strong>Humidity:</strong> {data.main.humidity}%</li>
        <li><strong>Wind Speed:</strong> {data.wind.speed} {windUnit}</li>
        <li><strong>Visibility:</strong> {data.visibility / 1000} km</li>
        <li><strong>Feels Like:</strong> {Math.round(data.main.feels_like)}{tempUnit}</li>
        <li><strong>Pressure:</strong> {data.main.pressure} {pressureUnit}</li>
        <li><strong>UV Index:</strong> N/A</li>
      </ul>
    </section>
  );
};

export default WeatherDetails;
