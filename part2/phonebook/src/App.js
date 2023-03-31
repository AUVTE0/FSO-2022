import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0,
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    if(persons.map(p=>p.name).includes(newName)){
      alert(`${newName} is already added to phone book`)
    }
    else{
      const newNameObj = { id: persons.length, name: newName}
      setPersons(persons.concat(newNameObj))
    }
    
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => <p key={person.id}>{person.name}</p>)}

      
    </div>
  )
}

export default App