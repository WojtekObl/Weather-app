import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Forecast({ forecast, city, unit }) {
  const [location, setLocation] = useState({});
  const [tunit, setTunit] = useState("");
  const [wunit, setWunit] = useState("km/h");

  const getDateStringFromTimestamp = (timestamp) => {
    const timeFromTimestamp = new Date(timestamp * 1000);
    let month = timeFromTimestamp.getMonth() + 1;
    const day = timeFromTimestamp.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    return day + "." + month;
  };
  
  useEffect(() => {
    setLocation(city);
    setTunit(unit);
    setWunit(unit === "F" ? "mph" : "km/h");
  }, [forecast]);

  return (
    <div className="app__forecast">
      <div className="app__forecast_header">
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {location.name}{" "}
          {location.country}{" "}
        </h1>
      </div>
      <div className="app__forecast_daily">
        <div className="day">
          <span className="day__data">
            {getDateStringFromTimestamp(forecast.daily[1].dt)}
          </span>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <span className="day__weather">
            {forecast.daily[1].weather[0].main}{" "}
            {Math.round(forecast.daily[1].temp.day)}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.min: {forecast.daily[1].temp.min}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.max: {forecast.daily[1].temp.max}&deg;{tunit}
          </span>
          <span className="day__additional">
            Wind: {forecast.daily[1].wind_speed}
            {wunit}
          </span>
        </div>
        <div className="day">
          <span className="day__data">
            {getDateStringFromTimestamp(forecast.daily[2].dt)}
          </span>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <span className="day__weather">
            {forecast.daily[2].weather[0].main}{" "}
            {Math.round(forecast.daily[2].temp.day)}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.min: {forecast.daily[2].temp.min}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.max: {forecast.daily[2].temp.max}&deg;{tunit}
          </span>
          <span className="day__additional">
            Wind: {forecast.daily[2].wind_speed}
            {wunit}
          </span>
        </div>
        <div className="day">
          <span className="day__data">
            {getDateStringFromTimestamp(forecast.daily[3].dt)}
          </span>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <span className="day__weather">
            {forecast.daily[3].weather[0].main}{" "}
            {Math.round(forecast.daily[3].temp.day)}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.min: {forecast.daily[3].temp.min}&deg;{tunit}
          </span>
          <span className="day__additional">
            Temp.max: {forecast.daily[3].temp.max}&deg;{tunit}
          </span>
          <span className="day__additional">
            Wind: {forecast.daily[3].wind_speed}
            {wunit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
