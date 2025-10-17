const WeatherCard = ({ data, unit }) => {
  const icon = data.weather[0].icon;
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md text-center mt-6">
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={data.weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl">{data.main.temp}{tempUnit}</p>
      <p>{data.weather[0].main}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
    </div>
  );
};

export default WeatherCard;
