import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchStr, setSearchStr] = useState('')

  useEffect(() => {
    console.log('gather data')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchStrChange = (event) => {
    setSearchStr(event.target.value)
  }

  const filteredCountries = (searchStr === '') ?
  countries :
  countries.filter(country =>
    country.name.common.toLowerCase().includes(searchStr.toLowerCase())
  )

  return (
    <>
      <Filter value={searchStr} onChange={handleSearchStrChange} />
      <CountryMain countries={filteredCountries} />
    </>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <>
      filter countries:
      <input
        value={value}
        onChange={onChange}
      />
    </>
  )
}

const CountryMain = ({countries}) => {
  if (countries.length > 10) {
    return (
      <h1>Too many matched results, refine query</h1>
    )
  } else if (countries.length > 1) {
    return (
      <CountryList countries={countries} />
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetail country={countries[0]} />
    )
  } else {
    return (
      null
    )
  }
}


const CountryList = ({countries}) => {

  const [showIndex, setShowIndex] = useState(-1)

  const createBindIndex = (index) => {
    const bindIndex = () => {
      setShowIndex(index)
    }
    return bindIndex
  }

  return (
    <>
      <ul>
      {countries.map((country, index) => 
        <CountryShort key={country.name.common}
        country={country}
        handleClick={createBindIndex(index)} />
      )}
      </ul>
      {showIndex > -1 &&
        <CountryDetail country={countries[showIndex]} />
      }
    </>
  )
}

const CountryShort = ({country, handleClick}) => {
  return (
    <div>
      <span key={country.name.common}>{country.name.common}</span>
      <Button text="show" handleClick={handleClick} />
    </div>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const CountryDetail = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log('gather weather data')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&APPID=${api_key}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }, [])
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <p>languages: </p>
      <ul>
        {Object.entries(country.languages).map(([key, value], i) => 
          <li key={key}>{value}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width={150}
      />
      <h2>Weather in {country.name.common}</h2>
      {weather && Object.keys(weather).length > 0 && <WeatherDetail weather={weather} />}

    </div>
  )
}

const WeatherDetail = ({weather}) => {
  const [iconURL, setIconURL] = useState('')
  const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  useEffect(() => {
    console.log('gather icon data')
    axios
      .get(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`, {responseType: 'blob'})
      .then(response => {
        let imgUrl = URL.createObjectURL(response.data)
        console.log(response.data)
        console.log(imgUrl)
        setIconURL(imgUrl)
      })
  }, [])


  return (
    <>
      <p>temperature {weather.main.temp / 10} in Celcius</p>
      <div>
        <img src={icon} alt={`icon for ${weather.weather[0].description}`} />
      </div>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default App