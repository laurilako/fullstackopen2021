import React, { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showCountry, setShowCountry] = useState([])

  const handleFilterChange = (event) => {
    setShowCountry([])
    setNewFilter(event.target.value)
  }

  const handleClick = (event) => {
    const selected = countries.filter((country) => country.name === event.target.value)
    setShowCountry(selected)
  }

  useEffect(() => {
    setFoundCountries(
      countries.filter((country) => 
      country.name.toLowerCase().includes(newFilter.toLowerCase()))
      )
  }, [newFilter, countries])

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      <div>Find countries: <Filter filter={newFilter} onChange={handleFilterChange}/></div>
      <div><Content showCountry={showCountry} countries={foundCountries} filter={newFilter} handleClick={handleClick}/></div>
    </div>
  )
}

const Info = (country) => {
  console.log("lang", country.data)
  return(
    <div>
      <h2>{country.data.name}</h2>
      <p>Capital {country.data.capital}</p>
      <p>Population {country.data.population}</p>
      <h2>Languages</h2>
      {country.data.languages.map((language) => {
        return(
          <div key={country.data.languages.name}>
            {'\u2022'} {language.name}</div>)}
        )}
      <p></p>
      <img style={{width: '18%'}} src={country.data.flag} alt={country.name}/>
      <h2>Weather in {country.data.capital}</h2>
      <Weather capital={country.data.capital}/>
    </div>
  )
}

const Weather = (capital) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY
  console.log(capital)
  console.log(api_key)
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital.capital}`)
      .then(response => {
        setWeather(response.data)
        console.log("data", response.data)
      })
  }, [capital, api_key])
  if (weather){
    return(
      <div>
        {console.log(weather.current)}
        <p><strong>Temperature: </strong> {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons[0]} style={{width: '5%'}} alt={weather.current.weather_descriptions[0]}></img>
        <p><strong>Wind: </strong> {weather.current.wind_speed} kmph, direction {weather.current.wind_dir}</p>
      </div>)
      }
  else  {
    return(
      <p>Weather loading...</p>
    )
  }
}

const ShowButton = ({onClick, value}) => {
  console.log("props", value)
  return (
      <button onClick={onClick} value={value}>Show</button>
  )
}

const Content = ({countries, filter, handleClick, showCountry}) => {
  console.log("maat", showCountry)
  console.log("countries", countries)
    if (showCountry.length === 1)
      return(
        <Info data={showCountry[0]}/>
      )
    if (countries.length > 10 || filter === '') {
      return(
        <div>Too many matches, specify another filter</div>
      )
    }
    if (countries.length === 1) {
        return(
          <Info data={countries[0]} />
        )}
    else {
      return(
        countries.map((country) => {
          return(
            <div key={country.name}>
              {country.name}
              <ShowButton onClick={handleClick} value={country.name}/>
            </div>)}))}
}

const Filter = ({filter, onChange}) => {
return(
  <input filter={filter} onChange={onChange}/>
  )
}

export default App
