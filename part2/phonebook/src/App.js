import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchVal, handleChange}) => (
  <div>
    filter shown with: <input value={searchVal} onChange={handleChange} />
  </div>
)

const PersonForm = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, searchVal}) => (
  persons.filter(
    person => person.name.toLowerCase().includes(searchVal.toLowerCase())
  ).map(
      person => <p key={person.name}>{person.name} {person.number}</p>
  )
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchVal, setSearchVal ] = useState('')

  useEffect(
    () => {axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
          },
    []
  )

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchVal(event.target.value);

  const addPerson = (event) => {
    event.preventDefault()

    // check that name doesnt already exist in the phonebook
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return;
    }

    // add person to phone book
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchVal={searchVal} handleChange={handleSearchChange} />
      <h2>add a new</h2>
        <PersonForm handleSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
          <Persons persons={persons} searchVal={searchVal}/>
      </div>
        </div>
  )
}

export default App