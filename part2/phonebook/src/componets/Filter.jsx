const Filter = ({ value, handeler }) => {
  return (
    <div>
      Filter shown with <input value={value} onChange={handeler} />
    </div>
  );
};

export default Filter;
