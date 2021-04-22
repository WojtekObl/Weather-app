import React, { useState } from 'react';
import './App.css';
import { fetchWeatherData, searchCity } from './api/OpenWeatherMap.js';
import Forecast from './components/Forecast';
import Options from './components/Options';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'



import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, ButtonBase } from '@material-ui/core';



const App = () => {
  const [cityName, setCityName] = useState("");
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  // const [options, setOptions] = useState({});
  const [showOptions, setShowOptions] = useState(false)

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;





  React.useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }

    (async () => {
      if (cityName.length > 2) {
        const response = await searchCity(cityName);

        const countries = await response

        // const countries = await response.json();
        // console.log(countries);

        if (active && countries) {

          setOptions(Object.keys(countries).map((key) => countries[key]));
          console.log("opt", options)
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [cityName, loading]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);




  const searchOptions = async () => {
    try {
      const data = await searchCity(cityName)
      console.log(data);
      setOptions(data)
      setShowOptions(true)

    } catch (error) {
      alert(error.message);
      setShowOptions(false)
    }
  }



  const handleForecast = async (city) => {
    // console.log('forecast', city)
    try {
      const weatherData = await fetchWeatherData(city)
      console.log(weatherData);

      setForecast(weatherData);
      setShowForecast(true);

    } catch (error) {
      alert(error.message);
    }

  }



  return (
    <div className="App">

      <h1 className="app__tittle">3Day Forecast</h1>

      <div className="app__input">
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          onHighlightChange={(e, option,auto) => {
            // console.log('option',city);
            setCity(option)
          }}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              {...params}
              label="Search City"
              variant="outlined"
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
        <FontAwesomeIcon className="input__geoicon" icon={faMapMarkerAlt} />
        <Button className="input__button" onClick={() => handleForecast(city)}>Forecast</Button>
      </div>



      {/* <input
        type="text"
        className="app__search"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      >
      </input>
      // <button onClick={searchOptions}>searchCity</button> */}

      {showOptions &&
        <Options options={options} handleForecast={handleForecast} setShowOptions={setShowOptions} />
      }

      {showForecast &&
        <Forecast forecast={forecast} />
      }

    </div>
  );
}

export default App;
