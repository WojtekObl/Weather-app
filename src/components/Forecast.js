import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'




const convertDate = (timestamp) => {

    const Unix = new Date((timestamp) * 1000);
    let m = Unix.getMonth() + 1;
    const d = Unix.getDate();
    if (m < 10) {
        m = "0" + m;
    };

    return d + "." + m;
}


function Forecast({ forecast, city, unit }) {

    const [location, setLocation] = useState({})
    const [tunit, setTunit] = useState("")

    useEffect(() => {
        setLocation(city)
        setTunit(unit)
    }, [forecast])



    return (
        <div>
            <div className="app__forecast">
                <div className="app__forecast_header">
                    <h1>{location.name} {location.country} </h1>

                </div>
                <div className="app__forecast_daily">
                    <div className="day">
                        <span className="day__data">{convertDate(forecast.daily[1].dt)}</span>
                        <span className="day__data">{forecast.daily[1].weather[0].main}</span>
                        <span>Temp: min {forecast.daily[1].temp.min}&deg;{tunit} max {forecast.daily[1].temp.max}&deg;{tunit} </span>
                        <span>Wind: {forecast.daily[1].wind_speed}km/h</span>
                    </div>
                    <div className="day">
                        <span className="day__data">{convertDate(forecast.daily[2].dt)}</span>
                        <span className="day__data">{forecast.daily[2].weather[0].main}</span>
                        <span>Temp: min {forecast.daily[2].temp.min}&deg;{tunit} max {forecast.daily[2].temp.max}&deg;{tunit} </span>
                        <span>Wind: {forecast.daily[2].wind_speed}km/h</span>
                    </div>
                    <div className="day">
                        <span className="day__data">{convertDate(forecast.daily[3].dt)}</span>
                        <span className="day__data">{forecast.daily[3].weather[0].main}</span>
                        <span>Temp: min {forecast.daily[3].temp.min}&deg;{tunit} max {forecast.daily[3].temp.max}&deg;{tunit} </span>
                        <span>Wind: {forecast.daily[3].wind_speed}km/h</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Forecast
