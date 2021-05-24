import React from "react";
import "./DailyWeather.css";

function DailyWeather({ forecast, wunit, tunit, getDateStringFromTimestamp, dayNo }) {
  return (
    <div className="daily-weather">
      <p className="daily-weather__date">
        {getDateStringFromTimestamp(forecast.daily[dayNo].dt)}
      </p>
      <i className={`owf owf-${forecast.daily[dayNo].weather[0].id}`}></i>
      <p className="day__main-weather">
        {forecast.daily[1].weather[0].main}{" "}
        {Math.round(forecast.daily[1].temp.day)}&deg;{tunit}
      </p>
      <div className="daily-weather__additional-info">
        <p className="daily-weather__text">
          Temp.min: {forecast.daily[dayNo].temp.min}&deg;{tunit}
        </p>
        <p className="daily-weather__text">
          Temp.max: {forecast.daily[dayNo].temp.max}&deg;{tunit}
        </p>
        <p className="day__text">
          Wind: {forecast.daily[dayNo].wind_speed}
          {wunit}
        </p>
      </div>
    </div>
  );
}

export default DailyWeather;
