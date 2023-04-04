import { useState, useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(res => console.log('Error getting all persons!'))  
  }, [])

  //helper functions
  const showMessage = (message, isError) => {
    setMessage({text: message, error: isError})
    setTimeout(()=>setMessage(null), 3000)
  }

  const addName = (e) => {
    e.preventDefault()
    console.log("addName called")
    if(persons.map(p=>p.name).includes(newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        updateNumber(newName, newNumber)
      }
    }
    else{
      console.log('adding adding')
      const newPersonObj = {name: newName, number: newNumber}
      personService
        .add(newPersonObj)
        .then(
          personObj => {
            console.log('adding new person')
            setPersons(persons.concat(personObj))
            setNewName('')
            setNewNumber('')
            showMessage(`Added ${personObj.name}`, false)
          })
        .catch(res => {
          console.log(JSON.stringify(res))
          console.log('Error adding person!')
          showMessage(`Error updating ${newPersonObj.name}`, true)
          // showMessage(res, true)
        })
    }  
  }

  const updateNumber = (name, newNumber) => {
    const personObj = persons.find(p => p.name === name)
    const updatedPersonObj = {...personObj, number: newNumber}
    personService
      .update(updatedPersonObj)
      .then(updatedPersonObj => {
        setPersons(persons.map(p => p.id !== personObj.id ? p : updatedPersonObj))
        setNewName('')
        setNewNumber('')
        showMessage(`Updated ${updatedPersonObj.name}'s number`, false)
      }) 
      .catch(res => {
        console.log('Error updating person!')
        showMessage(`Error updating ${name}`, true)
      })
  }

  const deleteName = (id) => {
    const deletedPerson = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${deletedPerson.name}?`)){
      personService
      .remove(id)
      .then(
        (result) => {
          console.log(result)
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
          showMessage(`Deleted ${deletedPerson.name}`, false)
        })
      .catch(res => console.log('Error deleting person!'))
    }
  }
  const nameContains = person => person.name.toLowerCase().includes(filter.toLowerCase())
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)
  console.log('Rerendering')
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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

const Notification = ({message}) => {
  if (!message){
    return null
  }
  return(
    <div className={message.error?'error':'noti'}>{message.text}</div>
  )
}


export default App