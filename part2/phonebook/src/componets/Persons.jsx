import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((p) => (
        <Person person={p} key={p.name} />
      ))}
    </div>
  );
};

export default Persons;
