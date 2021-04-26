import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeatherData, searchCity } from './api/OpenWeatherMap.js';
import Forecast from './components/Forecast';
import Input from './components/Input'
import Controls from './components/Controls';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'






const App = () => {
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [forecastCity, setForecastCity] = useState({});
  const [geolocationStatus, setGeolocationStatus] = useState("");
  const [unit, setUnit] = useState("C");


  // get last used location from chache

  useEffect(() => {
    let storageCity = {
      name: localStorage.getItem('name'),
      lat: localStorage.getItem('lat'),
      lon: localStorage.getItem('lon'),
      country: localStorage.getItem('country'),
    }
    if (storageCity.name === "Your location") {
      storageCity.name = "Your last used location"
    }
    if (storageCity.name) {
      setCity(storageCity)
      handleForecast(storageCity);
    } else {
      getLocation()
    }
  }, []);

  // clear status
  useEffect(() => {
    if (city && city.name !== "Your location") {
      setGeolocationStatus("")
    }
  }, [city]);


  // handle geolocation
  const getLocation = () => {
    setGeolocationStatus("")
    const successCallback = (position) => {
      setCity({
        name: "Your location",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        country: "",
      })

      // setCityName("Your location")

      setGeolocationStatus("Geolocation data loaded. Click 'FORECAST' or search for other.")

    };
    const errorCallback = (error) => {
      if (error.code === 1) {
        setGeolocationStatus(error.message)
      } else if (error.code === 2) {
        setGeolocationStatus(error.message)
      } else if (error.code === 3) {
        setGeolocationStatus("Geolocation timeout, try again")
      }
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      timeout: 5000
    });
  }

  //fetch data, setup forecast, push to localstorage
  const handleForecast = async (location) => {
    setGeolocationStatus("")
    try {
      const weatherData = await fetchWeatherData(location, unit)
      setForecastCity(location)
      setForecast(weatherData);
      setShowForecast(true);

      //send data of last forecast to local storage
      localStorage.setItem('name', `${location.name}`)
      localStorage.setItem('lat', `${location.lat}`)
      localStorage.setItem('lon', `${location.lon}`)
      localStorage.setItem('country', `${location.country}`)

    } catch (error) {
      if (error.cod === "401") {
        setGeolocationStatus("Connection with API failed. Try again later.")
      } else if (error.cod === "404") {
        setGeolocationStatus("Error: Wrong request, another location.")
      } else if (error.cod === "429") {
        setGeolocationStatus("Error: Too many request, try again later.")
      }
    }

  };



  return (
    <div className="App">

      <h1 className="app__tittle"><FontAwesomeIcon icon={faCloudSun} /> Weather Forecast</h1>

      <div className="app__input">
        <Input
          city={city}
          setCity={setCity}
          getLocation={() => getLocation()}
          searchCity={searchCity}
        />
        <Controls unit={unit} setUnit={setUnit} handleForecast={(city) => handleForecast(city)} city={city} />
      </div>

      <div className="geolocation__status" title="status">
        <p><span style={{ color: 'lightgray' }} className="geolocation__status">{geolocationStatus}</span></p>
      </div>


      {showForecast &&
        <Forecast forecast={forecast} city={forecastCity} unit={unit} />
      }

    </div>
  );
}

export default App;
