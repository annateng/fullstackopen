import React, { useState, useEffect } from 'react'
import dbService from './services/db'
import db from './services/db'

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

const Persons = ({persons, searchVal, setPersons}) => {
  
  const deletePerson = (id, confirmed) => {
    if (!confirmed) return
    const personsCopy = persons.slice()
    personsCopy.splice(personsCopy.map(person => person.id).indexOf(id), 1)
    
    dbService.deleteEntry(id)
      .then(() => {setPersons(personsCopy)})
  }

  return persons.filter(
    person => person.name.toLowerCase().includes(searchVal.toLowerCase())
  ).map(
      person => (
        <div key={person.name}>
          <span>{person.name} {person.number}   </span>
          <button type='button' onClick={() => deletePerson(person.id, window.confirm(`delete ${person.name}?`))}>delete</button>
        </div>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchVal, setSearchVal ] = useState('')

  useEffect(
    () => {db.getAll().then(response => setPersons(response))},
    []
  )

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchVal(event.target.value);

  const addPerson = (event) => {
    event.preventDefault()

    // if name already exists in phonebook, update number on prompt
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPersonsIndex = persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase())
        
        const newPerson = persons[oldPersonsIndex]
        newPerson.number = newNumber
        let newPersons = persons.slice()
        newPersons.splice(oldPersonsIndex,1)
        setPersons(newPersons.concat(newPerson))
      }
    } 
    else { // otherwise, add person to phone book
    dbService.create({name: newName, number: newNumber})
              .then(response => setPersons(persons.concat(response)))
    }
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
          <Persons persons={persons} searchVal={searchVal} setPersons={setPersons}/>
      </div>
        </div>
  )
}

export default App