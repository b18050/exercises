import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName
    }
      if(!persons.filter(
          person=>person.name===newName)
          .length>0) {

        setPersons(persons.concat(nameObject))
        setNewName('')
        console.log(persons)
      }
      else {
        alert(`${newName} is already added to phonebook`)
      }
      
    
    
  
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Name = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <Name person={person} key={person.name} />)}
      </ul>
      
    </div>
  )
}

export default App