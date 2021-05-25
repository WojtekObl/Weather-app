import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

function Search({ city, handleForecast, searchCity, setCity, getLocation }) {
  const [cityName, setCityName] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // listener on input changes, fetch options list from API
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (cityName.length > 2) {
          setLoading(true);
          const response = await searchCity(cityName);
          const countries = await response;

          //create option list from fetchdata
          if (active && countries) {
            setOptions(Object.keys(countries).map((key) => countries[key]));
          }
          setLoading(false);
        }
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [cityName]);

  // forecast on 'enter'
  const onKeyUp = (event) => {
    if (event.charCode === 13 && city) {
      handleForecast(city);
    }
  };

  return (
    <div className="search">
      <Autocomplete
        id="asynchronous-search"
        style={{ width: 400, color: "white" }}
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
          setCity(option);
        }}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            id="name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyPress={(e) => onKeyUp(e)}
            {...params}
            label={"Search City"}
            variant="outlined"
            placeholder="Input exact city name"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Tooltip title="Use your location" arrow enterDelay={500} placement="top">
        <button
          className="search__geolocalisation-button"
          onClick={() => {
            getLocation();
          }}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            aria-hidden="false"
            focusable="true"
          />
        </button>
      </Tooltip>
    </div>
  );
}

export default Search;
