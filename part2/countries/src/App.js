import React, {useState, useEffect, cloneElement} from "react"
import axios from 'axios'

const SearchBox = ({searchVal, handleChange}) => (
  <form>
    <label>
      find countries: <input value={searchVal} onChange={handleChange} />
    </label>
  </form>
)

const WeatherData = ({weatherData}) => {
  if (weatherData === undefined || weatherData.length == 0)
    return null
  else
    return (
    <div>
      <p>temperature: {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt='weather icon' width='85' />
      <p>wind: {weatherData.wind.speed}</p>
    </div>
  )
}

const Details = ({country, weatherData}) => {
        return (
        <div>
          <h1>{country.name.toLowerCase()}</h1>
          <p>capital: {country.capital.toLowerCase()}</p>
          <p>population: {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt='country flag' width='150'/>
          <h2>weather in {country.capital.toLowerCase()}</h2>
          <WeatherData weatherData={weatherData} />
        </div>
        )
}

const SingleResult = ({country, setCountry}) => (
  <li>
    {country.name} <button name={country.name} type='button' onClick={() => setCountry(country)}>show</button>
  </li>
)

const ResultList = ({filteredCountries, setCountry, weatherData}) => {
  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map(country => <SingleResult key={country.numericCode} country={country} setCountry={setCountry} />)}
      </ul>
    )
  } else if (filteredCountries.length > 10) {
    return <p>too many matches, specify another filter</p>
  } else if (filteredCountries.length == 1) {
    return (<Details country={filteredCountries[0]} weatherData={weatherData}/>)
  } else return null // 0 countries
}

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  // console.log(api_key)

  const [countries, setCountries] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(
    countries.filter(
    country => country.name.toLowerCase().includes(searchVal)))
  const [weatherData, setWeatherData] = useState([])
  
  const handleSearchChange = (event) => {
    setSearchVal(event.target.value)
    setFilteredCountries(countries.filter(
      country => country.name.toLowerCase().includes(event.target.value)))
  }
  const setCountry = (country) => setFilteredCountries([country])

  // only after the first render, load country data
  useEffect(() => 
    {axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
    }, []
  )

  // only when we are displaying a single country, load weather data
  useEffect(() =>
    {
      if (filteredCountries.length == 1) 
      {axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital},${filteredCountries[0].alpha2Code}&appid=${api_key}`)
        .then(response => setWeatherData(response.data))
      }
    }, [filteredCountries]
  )
  

  return (
    <div>
      <SearchBox searchVal={searchVal} handleChange={handleSearchChange}/>
      <ResultList filteredCountries={filteredCountries} setCountry={setCountry} weatherData={weatherData}/>
    </div>
  )
}

export default App