import React, { useState } from 'react';
import './App.css';
import { fetchData, searchCity } from './fetchData.js';


const App = () => {
  const [cityName, setCityName] = useState("");
  const [forecast, setForecast] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [options, setOptions] = useState({});
  const [open, setOpen] = useState(false)







  const searchOptions = async () => {
    try {
      const data = await searchCity(cityName)
      console.log(data);
      setOptions(data)
      // setOptions(Object.keys(data).map((key) => `${data[key].name}, ${data[key].country}`));
      setOpen(true)

    } catch (error) {
      alert(error.message);
      setOpen(false)
    }
  }



  const handleForecast = async (city) => {
    try {
      const data = await fetchData(city)
      console.log(data);

      setForecast(data);
      setShowForecast(true);

    } catch (error) {
      alert(error.message);
    }

  }



  return (
    <div className="App">
      <h1 className="app__tittle">3Day forecast app</h1>

      <input
        type="text"
        className="app__search"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      >
      </input>
      <button onClick={searchOptions}>searchCity</button>
      {open &&
        <div>
          {Object.keys(options).map((key) =>
            <button
              onClick={() => {
                handleForecast(options[key])
                setOpen(false) 
              }}
              key={key}
            >
              {options[key].name}, {options[key].country}
            </button>
          )
          }
        </div>
      }

      {showForecast &&
        <div className="app__forecast">
          <div className="day">

            <span>{forecast.daily[1].dt}</span>
            <span>Weather: {forecast.daily[1].weather[0].main}</span>
            <span>Temp: min {forecast.daily[1].temp.min}C max {forecast.daily[1].temp.max}C </span>
            <span>Wind: {forecast.daily[1].wind_speed}km/h</span>

          </div>
          <div className="day">

            <span>{forecast.daily[2].dt}</span>
            <span>Weather: {forecast.daily[2].weather[0].main}</span>
            <span>Temp: min {forecast.daily[2].temp.min}C max {forecast.daily[2].temp.max}C </span>
            <span>Wind: {forecast.daily[2].wind_speed}km/h</span>

          </div>
          <div className="day">

            <span>{forecast.daily[3].dt}</span>
            <span>Weather: {forecast.daily[3].weather[0].main}</span>
            <span>Temp: min {forecast.daily[3].temp.min}C max {forecast.daily[3].temp.max}C </span>
            <span>Wind: {forecast.daily[3].wind_speed}km/h</span>

          </div>

        </div>
      }

    </div>
  );
}

export default App;
