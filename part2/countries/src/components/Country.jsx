function Country({ country }) {
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
    </div>
  );
}

export default Country;
