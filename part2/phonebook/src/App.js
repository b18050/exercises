import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
      number: '9234-334-456'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
      if(!persons.filter(
          person=>person.name===newName)
          .length>0) {

        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const Contact = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
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
          number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <Contact person={person} key={person.name} />)}
      </ul>
      
    </div>
  )
}

export default App