import React from 'react'
import { Button } from '@material-ui/core';


function Controls({unit, setUnit, city, handleForecast}) {


    //change unit for forecast
    const toggleUnit = () => {

        if (unit === "C") {
            setUnit("F")
        } else {
            setUnit("C")
        }
    }

    return (
        <div className="input__controls">
            <Button
                size="small"
                style={{ margin: 5, color: 'white' }}
                onClick={() => toggleUnit()}
            >
                TOOGLE UNIT = {unit}&deg;
          </Button>

            <Button
                size="large"
                style={{ margin: 5, color: 'white' }}
                className="input__button"
                disabled={!city}
                onClick={() => {
                    console.log(city)
                    handleForecast(city);
                }}>
                Forecast
          </Button>
        </div>
    )
}

export default Controls
