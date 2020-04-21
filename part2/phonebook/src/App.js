import React, { useState, useEffect } from 'react'
import dbService from './services/db'
import db from './services/db'

const Notification = ({message}) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderColor: 'yellow',
    padding: '10px',
    marginBottom: '10px'
  }
  
  if (message === null) return null
  else return <div style={notificationStyle}>{message}</div>
}

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

const Persons = ({persons, searchVal, setPersons, setErrorMessage}) => {
  
  // DELETE PHONEBOOK ENTRY
  const deletePerson = (id, confirmed) => {
    const personName = persons[persons.map(person => person.id).indexOf(id)].name

    // if not confirmed, do nothing
    if (!confirmed) {
      // set no change made message
      const noChangeMessage = `No change was made to the phonebook`
      setErrorMessage(noChangeMessage)
      setTimeout(() => setErrorMessage(null), 5000)
    } else {
      // remove person from the phonebook
      const personsCopy = persons.slice()
      personsCopy.splice(personsCopy.map(person => person.id).indexOf(id), 1)
      
      dbService.deleteEntry(id)
        .then(() => {
          setPersons(personsCopy)
          // set successful deletion message
          const deletionMessage = `${personName} was successfully removed from the phonebook`
          setErrorMessage(deletionMessage)
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .catch(() => { // catch error if entry was previously deleted already
          setErrorMessage(`${personName} was already removed from the phonebook`)
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(personsCopy)
        })
    }
  } /* end delete entry code */

  // FILTER PHONEBOOK ENTRIES SHOWN
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
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchVal, setSearchVal ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(
    () => {db.getAll().then(response => setPersons(response))},
    []
  )

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchVal(event.target.value)

  // CODE FOR CLICKING THE "ADD" BUTTON
  const addPerson = (event) => {
    event.preventDefault()
    // if name already exists in phonebook, update number on prompt
    if (persons.find(person => person.name.toLowerCase() === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = {...persons.find(person => person.name.toLowerCase() === newName.toLowerCase())}
        person.number = newNumber
        dbService.update(person.id, person)
            .then(response => {
                // update persons array
                setPersons(persons.filter(p => p.id !== person.id).concat(person))

                // set successful number change message
                const numChangeMessage = `${newName}'s phone number was successfully changed to ${newNumber}`
                setErrorMessage(numChangeMessage)
                setTimeout(() => setErrorMessage(null), 5000)
            })
            .catch(error => {console.log(error)})
      } else {
        // set no change made message
        const noChangeMessage = `No change was made to the phonebook`
        setErrorMessage(noChangeMessage)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    } else { // otherwise, add person to phone book
      dbService.create({name: newName, number: newNumber})
              .then(response => setPersons(persons.concat(response)))
              .catch(error => console.log(error))
      
      // set successful added person message
      const createPersonMessage = `${newName} was successfully added to the phonebook`
      setErrorMessage(createPersonMessage)
      setTimeout(() => setErrorMessage(null), 5000)
    }
    setNewName('')
    setNewNumber('')
  } /* END CODE FOR CLICKING "ADD" BUTTON */

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <Filter searchVal={searchVal} handleChange={handleSearchChange} />
      <h2>add a new</h2>
        <PersonForm handleSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
          <Persons persons={persons} searchVal={searchVal} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
      </div>
        </div>
  )
}

export default App