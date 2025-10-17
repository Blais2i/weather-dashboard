import React from 'react';

const WeatherCard = ({ data, unit }) => {
  const icon = data.weather[0].icon;
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const description = data.weather[0].description;
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="bg-white text-blue-700 p-6 rounded-lg shadow-md mt-6 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">{data.name}, {data.sys.country}</h2>
      <p className="text-sm text-gray-600 mb-4">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto mb-2"
      />
      <p className="text-4xl font-bold">{Math.round(data.main.temp)}{tempUnit}</p>
      <p className="text-lg font-semibold capitalize">{data.weather[0].main}</p>
      <p className="italic text-sm text-gray-700">{description}</p>
    </section>
  );
};

export default WeatherCard;
