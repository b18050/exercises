import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
const App = () => {

    const [country, setCountryData] = useState([])
    const [newCountry, setNewCountry] = useState('')
    const [showCountry, setShowCountry] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response.data)
                setCountryData(response.data)
            })
    }, [])

    const Button = (props) => {
        return (
            <>
                <button onClick={ () =>props.eventHandler} >
                    {props.text}
                </button>
            </>
        )
    }

    const Filter = ({ country }) => {
        console.log(country.length)
        if (country.length > 10) {
            return (
                <>
                    <p> Too many matches , specify another filter </p>
                </>
            )
        }
        else if (country.length == 1) {

            return (
                <>
                    {country.map((x) => < DisplayData country={x} key={x.name} />)}
                </>
            )
        }
        else {
            return (
                <>
                    {country.map((x) => < Display country={x} key={x.name} />)}

                </>
            )
        }
    }

    const Showcountry = ({ country }) => {
        console.log(country)

        const filter_country = country.filter(function (x) {
            return (x.name.toUpperCase().indexOf(newCountry.toUpperCase()) > -1)
        });
        console.log(filter_country)

        return (<>
            <Filter country={filter_country} />
        </>
        )
    }

     

    const Display = ({ country }) => {
        console.log(country.name)
        return (<>
            <p> {country.name}
                <button onClick={() => setNewCountry(country.name)} >
                    show
                </button>
                </p>
            </>
        )
    }

    const ShowLanguage = ({ language }) => {

        return (
            <li>{language.name} </li>
        )
    }

    const Language = ({ language }) => {
        console.log(language)
        const listlang = language.map((language) => <ShowLanguage language={language} key={language.name} />)
        console.log(listlang)
        return (<>
            <ul>
                {listlang} 
            </ul>
            </>)
    } 

    const Flag = ({ flag }) => {
        console.log(flag)
        return (<>
            <img src={flag} />
        </>
        )
            }
    const DisplayData = ({ country }) => {
        console.log(country.languages)
        console.log(country.flag)
        
        return (<>
            <h2> {country.name} </h2>
            <p> capital {country.capital} </p>
            <p> population {country.population} </p>

            <h3> languages: </h3>

            <Language language={country.languages}  /> 
            <Flag flag={country.flag} />
            </>
        )
    }

    const SearchCountry = (event) => {
        event.preventDefault()

        const country = newCountry
        console.log(country)

    }

    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setNewCountry(event.target.value)
    }

    
    
    return (
        <>
            <form onSubmit={SearchCountry}>
            <div> 
                find countries: <input value={newCountry} onChange={handleCountryChange} />
            </div>
            
        </form>
   
        <Showcountry country={country} /> 
    </>)

    }

        export default App;
