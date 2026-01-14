import { useState, useEffect } from "react";
import Filter from "./componets/Filter";
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";
import PersonService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAllPersons, setShowAllPersons] = useState(true);

  useEffect(() => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

    PersonService.create(person).then((newObject) => {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    });
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
