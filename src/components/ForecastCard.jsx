import React from 'react';

const ForecastCard = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <section className="mt-8 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((item, index) => {
          const date = new Date(item.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          const icon = item.weather[0].icon;
          const description = item.weather[0].description;
          const rain = item.pop ? Math.round(item.pop * 100) : 0;

          return (
            <div key={index} className="bg-white text-blue-700 p-4 rounded-lg shadow-md text-center">
              <p className="font-bold">{date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="mx-auto"
              />
              <p className="text-lg font-semibold">{Math.round(item.main.temp)}{tempUnit}</p>
              <p className="capitalize text-sm">{description}</p>
              <p className="text-sm text-gray-600">{rain}% rain</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ForecastCard;
