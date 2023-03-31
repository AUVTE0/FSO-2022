import { useState, useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(res => console.log('Error getting all persons!'))  
  })

  const addName = (e) => {
    e.preventDefault()
    if(persons.map(p=>p.name).includes(newName)){
      alert(`${newName} is already added to phone book`)
    }
    else{
      const newPersonObj = {name: newName, number: newNumber}
      personService
        .add(newPersonObj)
        .then(
          personObj => {
            setPersons(persons.concat(personObj))
            setNewName('')
            setNewNumber('')
          })
        .catch(res => console.log('Error adding person!'))
    }  
  }

  const deleteName = (id) => {
    if(window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)){
      personService
      .remove(id)
      .then(
        deletedPersonObj => {
          setPersons(persons.filter(p => p.id !== deletedPersonObj.id))
        })
      .catch(res => console.log('Error deleteing person!'))
    }
  }
  const nameContains = person => person.name.toLowerCase().includes(filter.toLowerCase())
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameContains={nameContains} deleteName={deleteName}/>
    </div>
  )
}

// Components
const Filter = ({filter, handleFilterChange}) => <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
  return( 
  <form onSubmit={addName}>
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
}
const Persons = ({persons, nameContains, deleteName}) => {
  return(
    <div>
      {persons
        .filter(nameContains)
        .map(person => {
          return(
            <div key={person.id}>
              <span>{person.name} {person.number} </span>
              <button onClick={()=>deleteName(person.id)}>delete</button>
            </div>
          )
        }
      )}
      
    </div>
  )
  
}
export default App