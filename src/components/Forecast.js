import React from 'react'


const convertDate = (timestamp) => {

    const Unix = new Date((timestamp) * 1000);
    let m = Unix.getMonth() + 1;
    const d = Unix.getDate();
    if (m < 10) {
        m = "0" + m;
    };

    return d + "." + m;
}


function Forecast({ forecast }) {
    return (
        <div>
            <div className="app__forecast">
                <div className="day">
                    <span>{convertDate(forecast.daily[1].dt)}</span>
                    <span>Weather: {forecast.daily[1].weather[0].main}</span>
                    <span>Temp: min {forecast.daily[1].temp.min}&deg;C max {forecast.daily[1].temp.max}&deg;C </span>
                    <span>Wind: {forecast.daily[1].wind_speed}km/h</span>
                </div>
                <div className="day">
                    <span>{convertDate(forecast.daily[2].dt)}</span>
                    <span>Weather: {forecast.daily[2].weather[0].main}</span>
                    <span>Temp: min {forecast.daily[2].temp.min}&deg;C max {forecast.daily[2].temp.max}&deg;C </span>
                    <span>Wind: {forecast.daily[2].wind_speed}km/h</span>
                </div>
                <div className="day">
                    <span>{convertDate(forecast.daily[3].dt)}</span>
                    <span>Weather: {forecast.daily[3].weather[0].main}</span>
                    <span>Temp: min {forecast.daily[3].temp.min}&deg;C max {forecast.daily[3].temp.max}&deg;C </span>
                    <span>Wind: {forecast.daily[3].wind_speed}km/h</span>
                </div>

            </div>
        </div>
    )
}

export default Forecast
