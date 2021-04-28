
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'




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
    const [wunit, setWunit] = useState("km/h")


    useEffect(() => {
        setLocation(city)
        setTunit(unit)
        if (unit === "F") {
            setWunit("mph")
        } else {
            setWunit("km/h")
        }
    }, [forecast])



    return (
        <div className="app__forecast">
            <div className="app__forecast_header">
                <h1><FontAwesomeIcon icon={faMapMarkerAlt}/> {location.name} {location.country} </h1>
            </div>
            <div className="app__forecast_daily">
                <div className="day">
                    <span className="day__data">{convertDate(forecast.daily[1].dt)}</span>
                    <img className="day__icon" src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`} alt="weather icon"/>
                    <span className="day__weather">{forecast.daily[1].weather[0].main} {Math.round(forecast.daily[1].temp.day)}&deg;{tunit}</span>
                    <span className="day__additional">Temp.min: {forecast.daily[1].temp.min}&deg;{tunit}</span>
                    <span className="day__additional">Temp.max: {forecast.daily[1].temp.max}&deg;{tunit}</span>
                    <span className="day__additional">Wind: {forecast.daily[1].wind_speed}{wunit}</span>
                </div>
                <div className="day">
                    <span className="day__data">{convertDate(forecast.daily[2].dt)}</span>
                    <img className="day__icon" src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`} alt="weather icon"/>
                    <span className="day__weather">{forecast.daily[2].weather[0].main} {Math.round(forecast.daily[2].temp.day)}&deg;{tunit}</span>
                    <span className="day__additional">Temp.min: {forecast.daily[2].temp.min}&deg;{tunit}</span>
                    <span className="day__additional">Temp.max: {forecast.daily[2].temp.max}&deg;{tunit}</span>
                    <span className="day__additional">Wind: {forecast.daily[2].wind_speed}{wunit}</span>
                </div>
                <div className="day">
                    <span className="day__data">{convertDate(forecast.daily[3].dt)}</span>
                    <img className="day__icon" src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`} alt="weather icon"/>
                    <span className="day__weather">{forecast.daily[3].weather[0].main} {Math.round(forecast.daily[3].temp.day)}&deg;{tunit}</span>
                    <span className="day__additional">Temp.min: {forecast.daily[3].temp.min}&deg;{tunit}</span>
                    <span className="day__additional">Temp.max: {forecast.daily[3].temp.max}&deg;{tunit}</span>
                    <span className="day__additional">Wind: {forecast.daily[3].wind_speed}{wunit}</span>
                </div>

            </div>


        </div>
    )
}

export default Forecast
