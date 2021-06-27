import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewfilter ] = useState('')
  const [ newMessage, setNewMessage ] = useState('')
  const [ isError, setError ] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if( persons.find((person) => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const obj = persons.find(o => o.name === newName)
          const id = obj.id
          const changedNum = {...obj, number: newNumber}
        personService
          .update(id, changedNum).then(response => {setPersons(persons.map(person => person.id !== id ? person : response))
          })
          .catch(error => {
            setNewMessage(`Information of ${newName} has already been removed from server`)
            setError(true)
            setTimeout(() => {
              setNewMessage('')
              setError(true)
            }, 5000);
          })
      }
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat(personObject))
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
      })
      setNewMessage(`${newName} was added to phonebook`)
      setTimeout(() => {
        setNewMessage('')
      }, 5000);
      setNewName('')
      setNewNumber('')
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    const name = event.target.value
    const obj = persons.find(o => o.name === name)
    const id = obj.id
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(o => o.id !== id))
        })
    setNewMessage(`${name} was deleted from phonebook`)
    setTimeout(() => {
      setNewMessage('')
    }, 5000);
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewfilter(event.target.value)
  }
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={newMessage} isError={isError} />
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber}
       onNameChange={handleNameChange} onNumChange={handleNumberChange}/>
      <h2>Contacts</h2>
      <Content persons={persons} filter={newFilter} handleClick={handleClick} />
    </div>
  )
}

export default App