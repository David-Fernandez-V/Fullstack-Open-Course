import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAllPersons, setShowAllPersons] = useState(true);

  const personsToShow = showAllPersons
    ? persons
    : persons.filter((p) =>
        p.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
      );

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

  const handleFilterChange = (e) => {
    const name = e.target.value;
    setSearchName(name);
    if (name === "") {
      setShowAllPersons(true);
    } else {
      setShowAllPersons(false);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with{" "}
        <input value={searchName} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
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
      {personsToShow.map((p) => (
        <p key={p.name}>
          {p.name}: {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
