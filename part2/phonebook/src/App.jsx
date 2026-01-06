import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "3348965722" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to the Phonebook`);
      return;
    }

    if (persons.find((p) => p.number === newNumber)) {
      alert(`${newNumber} is already added to the Phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.name}>
          {p.name}: {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
