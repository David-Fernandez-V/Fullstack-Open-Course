import { useState } from "react";
import Filter from "./componets/Filter";
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAllPersons, setShowAllPersons] = useState(true);

  const personsToShow = showAllPersons
    ? persons
    : persons.filter((p) =>
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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
    setSearch(name);
    if (name === "") {
      setShowAllPersons(true);
    } else {
      setShowAllPersons(false);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={search} handeler={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        nameValue={newName}
        nameHandler={handleNameChange}
        numberValue={newNumber}
        numberHandler={handleNumberChange}
        addPersonHandler={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
