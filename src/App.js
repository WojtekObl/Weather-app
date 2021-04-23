import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeatherData, searchCity } from './api/OpenWeatherMap.js';
import Forecast from './components/Forecast';
import Input from './components/Input'
import Controls from './components/Controls';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';






const App = () => {
  const [cityName, setCityName] = useState("");
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
    setCity(storageCity)
    handleForecast(storageCity);

    getLocation()
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

      setCityName("Your location")

      setGeolocationStatus("Geolocation data loaded. Click 'FORECAST' or search for other.")

    };
    const errorCallback = (error) => {
      setGeolocationStatus(error.message)
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      timeout: 5000
    });
  }

  //fetch data, setup forecast, push to localstorage
  const handleForecast = async (location) => {
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
      setGeolocationStatus("Error. Wrong request")

    }

  };



  return (
    <div className="App">

      <h1 className="app__tittle"><FontAwesomeIcon icon={faCloudSun} /> Weather Forecast</h1>

      <div className="app__input">
        <Input
          city={city}
          cityName={cityName}
          setCityName={setCityName}
          setCity={setCity}
          getLocation={() => getLocation()}
          searchCity={searchCity}
        />
        <Controls unit={unit} setUnit={setUnit} handleForecast={(city) => handleForecast(city)} city={city}/>
      </div>
      
      <div className="geolocation__status">
        <p><span style={{ color: 'lightgray' }} className="geolocation__status">{geolocationStatus}</span></p>
      </div>


      {showForecast &&
        <Forecast forecast={forecast} city={forecastCity} unit={unit} />
      }

    </div>
  );
}

export default App;
