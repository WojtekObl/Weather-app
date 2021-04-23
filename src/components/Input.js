import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'





function Input({cityName, searchCity, setCityName, setCity, getLocation}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    
    
    useEffect(() => {
        let active = true;
        
        (async () => {
          try {
            if (cityName.length > 2) {
              const response = await searchCity(cityName);
              const countries = await response
              
              //create option list from fetchdata
              if (active && countries) {
                setOptions(Object.keys(countries).map((key) => countries[key]));
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
    


    return (

            <div className="input__location">
                <Autocomplete
                    id="asynchronous-search"
                    style={{ width: 400, color: 'white' }}
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
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            {...params}
                            label={'Search City'}
                            variant="outlined"
                            placeholder="Input exact city name"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )

                            }}
                        />
                    )}
                />
                <FontAwesomeIcon onClick={() => getLocation()} className="input__geoicon" icon={faMapMarkerAlt} />
            </div>

    )
}


export default Input
