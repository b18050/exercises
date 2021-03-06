import React, { useEffect, useState } from 'react'
import axios from 'axios'




const Weather = ({ place }) => {
    console.log(place)
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    const params = {
        access_key: api_key ,
        query: { place }
    }
    const [weather, setWeatherData] = useState({})

    const Temperature = () => {
        if (weather.current != undefined) {
            return (
                <>
                    <p> <b>temperature :</b> {weather.current.temperature} Celsius</p>
                    <img src={weather.current.weather_icons} />
                    <p><b> wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
                </>
            )
            
        }
        return (<>
        </>
        )
            }

    
    console.log(api_key)

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current?', { params })
            .then(response => {
                console.log(response.data)
                setWeatherData(response.data)
            })
    }, [])

    console.log(weather.current)
    return (
        <>
            <h2> Weather in {place} </h2>
            <Temperature />
            

        </>
    )
        }

export default Weather