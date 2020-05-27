import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
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

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const FilterName = ({persons}) => {
    console.log(persons)
    const filter_persons=persons.filter(function(person){
      return(person.name.toUpperCase().indexOf(filterName.toUpperCase()) > -1)
    });
    console.log(filter_persons)
    return(<>
       {filter_persons.map((person) => <Contact person={person} key={person.name} />)} 
      </>)
  }

  const Contact = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
    )
  }

  const PersonForm = () => {
    return(
    <>
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
    </>)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p> filter shown with <input value={filterName} onChange={handleFilterNameChange}/> </p>
      <h2> add a new </h2>
      <PersonForm />
      <h2>Numbers</h2>
      <FilterName persons={persons} /> 
      
    </div>
  )
}

export default App