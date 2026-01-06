import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      name: newName,
    };
    setPersons(persons.concat(person));
    setNewName("");
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
};

export default App;
