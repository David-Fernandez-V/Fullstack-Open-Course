const ICON_BASE_URL = "https://openweathermap.org/img/wn/";

function Weather({ wheatherObject, countryCapital }) {
  if (!wheatherObject) return null;
  else
    return (
      <div>
        <h2>Weather in {countryCapital}</h2>
        <p>Temperature: {wheatherObject.main.temp} Celsius</p>
        <img src={`${ICON_BASE_URL}${wheatherObject.weather[0].icon}@2x.png`} />
        <p>Wind: {wheatherObject.wind.speed} m/s</p>
      </div>
    );
}

export default Weather;
