import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [notif, setNotif] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchStrChange = (event) => {
    setSearchStr(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const rep = persons.find(person => person.name === newName)
    if (rep !== undefined) {
      if (window.confirm(`${rep.name} already exists. Replace number?`)) {
        personService
          .update(rep.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id === rep.id) ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
          setNotif({
            text: `the person ${rep.name} has been deleted`,
            type: true
          })
          setTimeout(() => {
            setNotif(null)
          }, 3000)
          setPersons(persons.filter(person => person.id !== rep.id))
        })    
      } else {

      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotif({
            text: `Added ${returnedPerson.name}`,
            type: false
          })
          setTimeout(() => {
            setNotif(null)
          }, 3000)
        })
    }
  }

  const del = id => {
    console.log(`try to delete ${id}`)
    const rep = persons.find(person => person.id === id)
    if (window.confirm(`Do you really want to delete ${rep.name}`)) {
      const person = persons.find(p => p.id === id)
      personService
        .del(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    } else {
      console.log("user abandoned")
    }

  }

  const filteredPersons = (searchStr === '') ? persons : persons.filter(person => person.name.includes(searchStr))



  return (
    <>
      <Notification message={notif} />
      <h2>Search</h2>
      <Filter value={searchStr} onChange={handleSearchStrChange} />
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName}
      handleNameChange={handleNameChange} newNumber={newNumber}
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} del={del} />
    </>
  )
}

const PersonForm = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>        
        <div>
          <button type="submit">add</button>
        </div>
      </form>    
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with:
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Persons = ({persons, del}) => {
  return (
    <ul>
      {persons.map(person => {
        return (
          <Person
            key={person.name}
            person={person}
            del={() => del(person.id)}
          />
        )
      }
      )}
    </ul>
  )
}

const Person = ({person, del}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={del}>delete</button>
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.type) {
    return (
      <div className='error'>
        {message.text}
      </div>
    ) 
  } else {
    return (
      <div className='notif'>
        {message.text}
      </div>
    )
  }
}

export default App