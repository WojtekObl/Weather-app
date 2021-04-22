import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeatherData, searchCity } from './api/OpenWeatherMap.js';
import Forecast from './components/Forecast';
// import Options from './components/Options';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'



import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';






const App = () => {
  const [cityName, setCityName] = useState("");
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [label, setLabel] = useState("Search City");
  const [geolocationStatus, setGeolocationStatus] = useState("");
  // const [options, setOptions] = useState({});
  // const [showOptions, setShowOptions] = useState(false)
  const [unit, setUnit] = useState("C");


  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;




  useEffect(() => {
    let active = true;
    // if (!loading) {
    //   return undefined;
    // }
    (async () => {
      try {
        if (cityName.length > 2) {
          const response = await searchCity(cityName);
          const countries = await response

          // console.log(countries);
          if (active && countries) {
            setOptions(Object.keys(countries).map((key) => countries[key]));
            // console.log("opt", options)
          }
        }
      } catch (error) {
        alert(error.message);
      }
    }
    )();

    return () => {
      active = false;
    };
  }, [cityName, loading]);


  // const searchOptions = async () => {
  //   try {
  //     const data = await searchCity(cityName)
  //     // console.log(data);
  //     setOptions(data)
  //     setShowOptions(true)

  //   } catch (error) {
  //     alert(error.message);
  //     setShowOptions(false)
  //   }
  // }
  const toggleUnit = () => {

    if (unit === "C") {
      setUnit("F")
    } else {
      setUnit("C")
    }
  }


  const getLocation = () => {
    setGeolocationStatus("")
    const successCallback = (position) => {
      setCity({
        name: "Your current location",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
      setOptions([{
        name: "Your current location",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        country: ""
      }])
      setCityName("Your current location")

      setGeolocationStatus("Geolocation loaded. Click 'FORECAST' or search for other.")

    };
    const errorCallback = (error) => {
      setGeolocationStatus(error.message)
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      timeout: 5000
    });
  }

  useEffect(() => {
    let storageCity = {
      name: localStorage.getItem('name'),
      lat: localStorage.getItem('lat'),
      lon: localStorage.getItem('lon'),
      country: localStorage.getItem('country'),
    }
    console.log(storageCity);
    setCity(storageCity);
    console.log(city)
    handleForecast(storageCity);
    getLocation();
  }, []);

  useEffect(() => {
    if (city && city.name != "Your current location") {
      setGeolocationStatus("")
    }
  }, [city]);


  const handleForecast = async (city) => {
    // console.log('forecast', city)

    try {
      const weatherData = await fetchWeatherData(city, unit)
      // console.log(weatherData);
      setForecast(weatherData);
      setShowForecast(true);
      localStorage.setItem('name', `${city.name}`)
      localStorage.setItem('lat', `${city.lat}`)
      localStorage.setItem('lon', `${city.lon}`)
      localStorage.setItem('country', `${city.country}`)
      
      // setCity({});

    } catch (error) {
      console.log(error)
      alert(error.message);
    }

  };



  return (
    <div className="App">

      <h1 className="app__tittle">3Day Forecast</h1>


      <div className="app__input">

        <Autocomplete
          id="asynchronous-search"
          style={{ width: 600 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          autoComplete={true}
          autoSelect={true}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          onHighlightChange={(e, option, auto) => {
            // console.log('option',city);
            setCity(option)
          }}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              id="name"
              value={city}
              onChange={(e) => setCityName(e.target.value)}
              {...params}
              label={label}
              variant="outlined"
              placeholder="Input exact city name"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <FontAwesomeIcon onClick={() => getLocation()} className="input__geoicon" icon={faMapMarkerAlt} />

        <Button onClick={() => toggleUnit()}> TOOGLE UNIT {unit}&deg;</Button>

        <Button className="input__button" disabled={!city} onClick={() => {
          handleForecast(city);

        }}>Forecast</Button>
        {/* <Button
          variant="contained"
          onClick={this.handleClear()}
          className="materialBtn"
        ></Button> */}
      </div>
      <span className="geolocation__status">{geolocationStatus}</span>



      {/* <input
        type="text"
        className="app__search"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      >
      </input>
      // <button onClick={searchOptions}>searchCity</button> */}

      {/* {showOptions &&
        <Options options={options} handleForecast={handleForecast} setShowOptions={setShowOptions} />
      } */}

      {showForecast &&
        <Forecast forecast={forecast} city={city} unit={unit} />
      }

    </div>
  );
}

export default App;
