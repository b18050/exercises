import React, { useState, useEffect } from 'react'

import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

    useEffect(() => {
        personService
            .getPersons()
            .then(initialPersons => {
                console.log(initialPersons)
                setPersons(initialPersons)
            })
            .catch(error => {
                alert('the server is not running, please run >>npx json-server --port 3001 --watch db.json'
                 )
            })
  },[])
  
  const addName = (event) => {
    event.preventDefault()
   
    const nameObject = {
      name: newName,
       number: newNumber

    }

      if(!persons.filter(
          person=>person.name===newName)
          .length>0) {

          personService
              .create(nameObject)
              .then(returnedPerson => {
                  setPersons(persons.concat(returnedPerson))
                  setNewName('')
                  setNewNumber('')
                  console.log(persons)
              })    
        
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
        {filter_persons.map((person) => <Contact person={person} key={person.name} deletePerson={() => deletePerson(person.id)} />)} 
      </>)
  }

    const deletePerson = (personid) => {
        console.log(personid)
        console.log("person want to be deleted")
        personService
            .erase(personid)
            .then(returnedPerson => {
                console.log(returnedPerson)
                setPersons(persons.filter(person => person.id !== personid))
            })
            .catch(error => {
                alert(`the person with id '${personid}' no more exists`)
            })
               

    }

    const Contact = ({ person, deletePerson }) => {
      const label = 'erase'
  return (
      <p>{person.name} {person.number }
          <button onClick={deletePerson}> {label}
          </button>
              </p>
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