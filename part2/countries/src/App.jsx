import { useEffect } from "react";
import { useState } from "react";

import Countries from "./components/Countries";
import Country from "./components/Country";
import CountriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  const country = countriesToShow.length === 1 ? countriesToShow[0] : null;

  useEffect(() => {
    CountriesService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const handleSearch = (e) => {
    const newEntry = e.target.value;

    if (newEntry.length === 0) {
      setCountriesToShow([]);
    } else {
      setCountriesToShow(
        countries.filter((c) =>
          c.name.common.toLowerCase().includes(newEntry.toLowerCase()),
        ),
      );
    }
  };

  const showCountry = (countryName) => {
    setCountriesToShow(countries.filter((c) => c.name.common === countryName));
  };

  if (countries.length === 0) return <p>Loading...</p>;

  return (
    <>
      Find countries:
      <input type="text" onChange={handleSearch} />
      <div>
        {countriesToShow.length === 0 ? (
          <p>Enter a country</p>
        ) : countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : country ? (
          <Country country={country} />
        ) : (
          <Countries countries={countriesToShow} buttonHandler={showCountry} />
        )}
      </div>
    </>
  );
}

export default App;
