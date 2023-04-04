import {useState, useEffect} from 'react'
import axios from 'axios';
import weatherService from './services/weatherService';
const baseUrl = "https://restcountries.com/v3.1/all"

function App() {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  const handleFilterChange = (e) => setFilter(e.target.value)

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => setCountries(res.data))
      .catch(e => console.log(e))

    
  }, [])

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter} handleShow={setFilter}/> 
    </div>
  );
}

const nameContains = (name, s) => name.toLowerCase().includes(s.toLowerCase())

const Filter = ({filter, handleFilterChange}) => <div>find countries <input value={filter} onChange={handleFilterChange}/></div>
const Countries = ({countries, filter, handleShow}) => {
  const filteredCountries = countries.filter(c => nameContains(c.name.common, filter))
  
  if(filteredCountries.length > 10){
    return <Warning />
  }
  else if(filteredCountries.length === 1){
    return <Country country = {filteredCountries[0]}/>
  }
  return filteredCountries.map(c => 
    (
      <div key={c.name.official}>
        {c.name.common} 
        <button onClick={e=>handleShow(c.name.common)}>show</button>
      </div>
    )
  )

}
const Warning = () => <p>Too many matches, specify another filter</p>
const Country = ({country}) => {
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital[0]} <br/> 
        area {country.area}
      </p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <Weather country={country}/>
    </div>

  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    weatherService
      .get(country.capitalInfo.latlng)
      .then(data => setWeather(data))
  }, [country])
  
  if(!weather){return null}
  return(
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )

}

export default App;
