const Countries = ({ countries, buttonHandler }) => {
  return (
    <>
      {countries.map((c) => (
        <div key={c.name.common}>
          <div>{c.name.common}</div>
          <button onClick={() => buttonHandler(c.name.common)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default Countries;
