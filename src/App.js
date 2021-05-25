import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchWeatherData, searchCity } from "./api/OpenWeatherMap.js";
import Forecast from "./components/Forecast/Forecast.js";
import Search from "./components/Search/Search.js";
import Controls from "./components/Controls/Controls.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const App = () => {
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [forecastCity, setForecastCity] = useState({});
  const [geolocationStatus, setGeolocationStatus] = useState("");
  const [unit, setUnit] = useState("C");
  const geoPossitionName = "Your location";

  // get last used location from chache
  useEffect(() => {
    let storageCity = {};
    storageCity = JSON.parse(localStorage.getItem("city"));

    if (storageCity) {
      if (storageCity.name === geoPossitionName) {
        storageCity.name = "Your last used location";
      }
      setCity(storageCity);
      handleForecast(storageCity);
    } else {
      getLocation();
    }
  }, []);

  // clear status
  useEffect(() => {
    if (city && city.name !== geoPossitionName) {
      setGeolocationStatus("");
    }
  }, [city]);

  // handle geolocation
  const getLocation = () => {
    setGeolocationStatus("");
    const successCallback = (position) => {
      setCity({
        name: geoPossitionName,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        country: "",
      });
      // setCityName("Your location")
      setGeolocationStatus(
        "Geolocation data loaded. Click 'FORECAST' or search for other."
      );
    };

    const errorCallback = (error) => {
      if (error.code === 3) {
        setGeolocationStatus("Geolocation timeout, try again");
      } else {
        setGeolocationStatus(error.message);
      }
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      timeout: 5000,
    });
  };

  //fetch data, setup forecast, push to localstorage
  const handleForecast = async (location) => {
    setGeolocationStatus("");
    try {
      const weatherData = await fetchWeatherData(location, unit);
      setForecastCity(location);
      setForecast(weatherData);
      setShowForecast(true);

      //send data of last forecast to local storage
      localStorage.setItem("city", JSON.stringify(location));
    } catch (error) {
      switch (error.code) {
        case "401":
          setGeolocationStatus("Connection with API failed. Try again later.");
          break;
        case "404":
          setGeolocationStatus("Error: Wrong request, another location.");
          break;
        case "429":
          setGeolocationStatus("Error: Too many request, try again later.");
          break;
      }
    }
  };

  return (
    <div className="app">
      <a className="git-hub-icon" href="https://github.com/WojtekObl/Weather-app" target="blank"><FontAwesomeIcon icon={faGithub} /></a>
      <h1 className="app__tittle">
        <FontAwesomeIcon icon={faCloudSun} /> Weather Forecast
      </h1>

      <div className="app__location-search">
        <Search
          city={city}
          setCity={setCity}
          getLocation={() => getLocation()}
          searchCity={searchCity}
          handleForecast={handleForecast}
          city={city}
        />
        <Controls
          unit={unit}
          setUnit={setUnit}
          handleForecast={(city) => handleForecast(city)}
          city={city}
        />
      </div>

      <p className="app__geolocation-status" title="status">{geolocationStatus} </p>

      {showForecast && (
        <Forecast forecast={forecast} city={forecastCity} unit={unit} />
      )}
    </div>
  );
};

export default App;
