import React from "react";
import "./CurrentWeather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function CurrentWeather({
  forecast,
  tunit,
  wunit,
  location,
  getDateStringFromTimestamp,
}) {
  const displayDateAndTime = (timestamp) => {
    const date = getDateStringFromTimestamp(timestamp);
    const timeFromTimestamp = new Date(timestamp * 1000);
    let hours = timeFromTimestamp.getHours();
    let minutes = timeFromTimestamp.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return date + " " + hours + ":" + minutes;
  };

  return (
    <div className="current-weather">
      <div className="current-weather__header">
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {location.name}{" "}
          {location.country}{" "}
        </h1>
        <p className="current-weather__date">
          {displayDateAndTime(forecast.current.dt)}
        </p>
      </div>

      <div className="current-weather__body">
        <div className="current-weather__basic-info-section">
          <div className="current-weather__icon-temp">
            <i className={`owf owf-${forecast.current.weather[0].id}`}></i>
            <p className="current-weather__temperature">
              {Math.round(forecast.current.temp)}&deg;{tunit}
            </p>
          </div>
          <p className="current-weather__description">
            {forecast.current.weather[0].description}
          </p>
        </div>
        <div className="current-weather__detail-info-section">
          <div className="current-weather__detail-body">
            <p className="current-weather__detail-header">
              {Math.round(forecast.current.feels_like)}&deg;{tunit}
            </p>
            <p className="current-weather__detail-name">
              effective temperature
            </p>
          </div>
          <div className="current-weather__detail-body">
            <p className="current-weather__detail-header">
              {forecast.current.pressure} hPa
            </p>
            <p className="current-weather__detail-name">air pressure</p>
          </div>
          <div className="current-weather__detail-body">
            <p className="current-weather__detail-header">
              {forecast.current.humidity}%
            </p>
            <p className="current-weather__detail-name">humidit </p>
          </div>
          <div className="current-weather__detail-body">
            <p className="current-weather__detail-header">
              {Math.round(forecast.current.wind_speed * 10) / 10}
              {wunit}
            </p>
            <p className="current-weather__detail-name">wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
