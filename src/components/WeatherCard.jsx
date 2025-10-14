const WeatherCard = ({ data }) => {
  const { name, main, wind, weather } = data;
  const icon = weather[0].icon;

  return (
    <div className="mt-6 bg-white text-black p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={weather[0].description}
        className="mx-auto"
      />
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Condition: {weather[0].main}</p>
    </div>
  );
};

export default WeatherCard;
