import Person from "./Person";

const Persons = ({ persons, deleteFunction }) => {
  return (
    <div>
      {persons.map((p) => (
        <Person
          person={p}
          deleteFunction={() => deleteFunction(p.id)}
          key={p.name}
        />
      ))}
    </div>
  );
};

export default Persons;
