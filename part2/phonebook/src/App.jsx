import { useState, useEffect } from "react";
import Filter from "./componets/Filter";
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";
import PersonService from "./services/persons";
import Notification from "./componets/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAllPersons, setShowAllPersons] = useState(true);
  const [notificacionMessage, setNotificationMessage] = useState(null);

  const personsToShow = showAllPersons
    ? persons
    : persons.filter((p) =>
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (personInfo) => {
    PersonService.create(personInfo).then((newObject) => {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
      //Notification
      setNotificationMessage(`Added ${newObject.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const updatePerson = (id, personInfo) => {
    if (
      confirm(
        `${newName} is already added to the Phonebook, replace the old number with a new one?`
      )
    ) {
      PersonService.update(id, personInfo).then((newObject) => {
        setPersons(persons.map((p) => (p.id === id ? newObject : p)));
        setNewName("");
        setNewNumber("");
        //notification
        setNotificationMessage(`Modified ${newObject.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (personId) => {
    const personToDelete = persons.find((p) => p.id === personId);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      PersonService.destroy(personId).then((newObject) => {
        setPersons(persons.filter((p) => p.id !== newObject.id));
      });
    }
  };

  const handleButton = (e) => {
    e.preventDefault();

    const registeredNumber = persons.find((p) => p.number === newNumber);
    const registeredPerson = persons.find((p) => p.name === newName);

    const person = {
      name: newName,
      number: newNumber,
    };

    if (registeredNumber) {
      alert(`${newNumber} is already added to the Phonebook`);
    } else if (registeredPerson) {
      updatePerson(registeredPerson.id, person);
    } else {
      addPerson(person);
    }
  };

  //Inputs handlers

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
      <Notification message={notificacionMessage} />
      <Filter value={search} handeler={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        nameValue={newName}
        nameHandler={handleNameChange}
        numberValue={newNumber}
        numberHandler={handleNumberChange}
        addPersonHandler={handleButton}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} deleteFunction={deletePerson} />
    </div>
  );
};

export default App;
