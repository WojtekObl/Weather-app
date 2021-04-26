import React from 'react'
import { Button, withStyles } from '@material-ui/core';



function Controls({ unit, setUnit, city, handleForecast }) {
    
    const StyledButton = withStyles({
        root: {
          background: 'rgba(255,255,255, .2)',
          borderRadius: 3,
          margin: 5,
          border: 0,
          color: 'white',
          height: 40    ,
          padding: '0px 20px',
          '&:hover': {
            background: 'rgba(255,255,255, .3)',
            boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, .1)',
          },
        },
      })(Button);


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
                id="toggleunit__button"
                size="large"
                style={{ margin: 5, color: 'white' }}
                onClick={() => toggleUnit()}
            >
                F&deg;/C&deg;:  {unit}&deg;
          </Button>

            <StyledButton
                size="large"
                // style={{ margin: 5, color: 'white' }}
                className="input__button"
                disabled={!city}
                onClick={() => {
                    handleForecast(city);
                }}>
                Forecast
          </StyledButton>
        </div>
    )
}

export default Controls