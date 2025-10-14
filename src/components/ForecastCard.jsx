const ForecastCard = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
      {data.map((item, index) => {
        const date = new Date(item.dt_txt).toLocaleDateString('en-US', {
          weekday: 'short',
        });
        const icon = item.weather[0].icon;
        return (
          <div key={index} className="bg-white text-black p-4 rounded-lg shadow-md text-center">
            <p className="font-bold">{date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p>{item.main.temp}°C</p>
            <p>{item.weather[0].main}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastCard;
