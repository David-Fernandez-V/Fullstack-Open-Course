import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Country from "./components/Country";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    axios.get(`${BASE_URL}/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      Find countries:
      <input type="text" value={search} onChange={handleSearchChange} />
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          <Country country={countriesToShow[0]} />
        ) : (
          <Countries countries={countriesToShow} />
        )}
      </div>
    </>
  );
}

export default App;
