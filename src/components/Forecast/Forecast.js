import React, { useEffect, useState } from "react";
import "./Forecast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Forecast({ forecast, city, unit }) {
  const [location, setLocation] = useState({});
  const [tunit, setTunit] = useState("");
  const [wunit, setWunit] = useState("km/h");

  //translate timestamp(unix) to human-readable format
  const getDateStringFromTimestamp = (timestamp) => {
    const timeFromTimestamp = new Date(timestamp * 1000);
    let month = timeFromTimestamp.getMonth() + 1;
    const day = timeFromTimestamp.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    return day + "." + month;
  };

  //set units and location name to display depend on forecast
  useEffect(() => {
    setLocation(city);
    setTunit(unit);
    setWunit(unit === "F" ? "mph" : "km/h");
  }, [forecast]);

  return (
    <div className="forecast">
      <div className="forecast__header">
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {location.name}{" "}
          {location.country}{" "}
        </h1>
      </div>

      <div className="forecast__display">
        <div className="day">
          <p className="day__date">
            {getDateStringFromTimestamp(forecast.daily[1].dt)}
          </p>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="day__main-weather">
            {forecast.daily[1].weather[0].main}{" "}
            
            {Math.round(forecast.daily[1].temp.day)}&deg;{tunit}
          </p>
          <div className="day__additional-info">
            <p className="day__text">
              Temp.min: {forecast.daily[1].temp.min}&deg;{tunit}
            </p>
            <p className="day__text">
              Temp.max: {forecast.daily[1].temp.max}&deg;{tunit}
            </p>
            <p className="day__text">
              Wind: {forecast.daily[1].wind_speed}
              {wunit}
            </p>
          </div>
        </div>
        <div className="day">
          <p className="day__date">
            {getDateStringFromTimestamp(forecast.daily[2].dt)}
          </p>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="day__main-weather">
            {forecast.daily[2].weather[0].main}{" "}
            
            {Math.round(forecast.daily[2].temp.day)}&deg;{tunit}
          </p>
          <div className="day__additional-info">
            <p className="day__text">
              Temp.min: {forecast.daily[2].temp.min}&deg;{tunit}
            </p>
            <p className="day__text">
              Temp.max: {forecast.daily[2].temp.max}&deg;{tunit}
            </p>
            <p className="day__text">
              Wind: {forecast.daily[2].wind_speed}
              {wunit}
            </p>
          </div>
        </div>
        <div className="day">
          <p className="day__date">
            {getDateStringFromTimestamp(forecast.daily[3].dt)}
          </p>
          <img
            className="day__icon"
            src={`http://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="day__main-weather">
            {forecast.daily[3].weather[0].main}{" "}
            
            {Math.round(forecast.daily[3].temp.day)}&deg;{tunit}
          </p>
          <div className="day__additional-info">
            <p className="day__text">
              Temp.min: {forecast.daily[3].temp.min}&deg;{tunit}
            </p>
            <p className="day__text">
              Temp.max: {forecast.daily[3].temp.max}&deg;{tunit}
            </p>
            <p className="day__text">
              Wind: {forecast.daily[3].wind_speed}
              {wunit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
