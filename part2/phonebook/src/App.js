import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (e) => {
    e.preventDefault()
    if(persons.map(p=>p.name).includes(newName)){
      alert(`${newName} is already added to phone book`)
    }
    else{
      const newPersonObj = {name: newName, number: newNumber}
      setPersons(persons.concat(newPersonObj))
      setNewName('')
      setNewNumber('')
    }
    
  }
  const nameContains = person => person.name.toLowerCase().includes(filter.toLowerCase())
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={filter} onChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>

      {persons.filter(nameContains).map(person => <p key={person.name}>{person.name} {person.number}</p>)}

      
    </div>
  )
}

export default App