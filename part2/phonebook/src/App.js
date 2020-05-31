import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
                  setErrorMessage(`Added ${newName} to the list`)
                  setTimeout(() => {
                      setErrorMessage('')
                    },5000)
              }) 

        
      }
      else {
          if (window.confirm(`${newName} is already added to phonebook
Do you want to replace it?`)) {
              console.log(persons)
              
              const contact = persons.filter(x => x.name===newName)
              console.log(contact[0].id)
              const id = contact[0].id
              personService
                  .update(id, nameObject)
                  .then(returnedPerson => {
                      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                      setNewName('')
                      setNewNumber('')
                      setErrorMessage(`updated number of '${newName}' with '${newNumber}' to the list`)
                      setTimeout(() => {
                        setErrorMessage('')
                      },5000)
                  })
                  .catch(error => {
                    setErrorMessage(
                      `Person '${id}' was already removed from the server`
                      )
                    setTimeout(() => {
                      setErrorMessage(null)
                    },5000)
                    setPersons(persons.filter(x=>x.id !== id))
                  })
              
          }

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
              setErrorMessage(
              `Person with '${personid} ' was already deleted from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              },5000)  
            })
               

    }

    const Notification = ({message}) => {
      console.log(message)
      if(message === '') {
        return (null)
      }
      return (
        <div className="error">
            {message}
        </div>
      )
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
      <Notification message={errorMessage} />
      <p> filter shown with <input value={filterName} onChange={handleFilterNameChange}/> </p>
      <h2> add a new </h2>
      <PersonForm />
      <h2>Numbers</h2>
      <FilterName persons={persons} /> 
      
    </div>
  )
}

export default App