import { useEffect, useState } from "react";
import WeatherService from "../services/weather";
import Weather from "./Weather";

function Country({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country) return;
    WeatherService.getWeather(country.capital).then((weatherObject) =>
      setWeather(weatherObject),
    );
  }, [country]);

  return (
    <div>
      {/*General info*/}
      <h1>{country.name.common}</h1>
      <div>{`Capital: ${country.capital}`}</div>
      <div>{`Area: ${country.area}`}</div>
      {/*Languages*/}
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {/*Flag*/}
      <img src={country.flags.png} />
      {/*Weather*/}
      <Weather countryCapital={country.capital} wheatherObject={weather} />
    </div>
  );
}

export default Country;
