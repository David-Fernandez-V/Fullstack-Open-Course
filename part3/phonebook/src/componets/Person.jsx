const Person = ({ person, deleteFunction }) => {
  return (
    <div>
      {person.name}: {person.number}{" "}
      <button onClick={deleteFunction}>Delete</button>
    </div>
  );
};

export default Person;
