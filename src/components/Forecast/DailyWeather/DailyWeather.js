import React from "react";
import "./DailyWeather.css";

function DailyWeather({
  forecast,
  wunit,
  tunit,
  getDateStringFromTimestamp,
  dayKey,
}) {
  return (
    <div className="daily-weather">
      <p className="daily-weather__date">
        {getDateStringFromTimestamp(forecast.daily[dayKey].dt)}
      </p>
      <p className="daily-weather__main-weather">
        <i className={`owf owf-${forecast.daily[dayKey].weather[0].id}`}></i>
      </p>
      <div className="daily-weather__temperature">
        <p className="daily-weather__main-temp">
          {Math.round(forecast.daily[dayKey].temp.day)}&deg;{tunit}
        </p>
        <div className="daily-weather__additional-temp">
          <p>
            {Math.round(forecast.daily[dayKey].temp.min)}&deg;{tunit}
          </p>
          <p>
            {Math.round(forecast.daily[dayKey].temp.max)}&deg;{tunit}
          </p>
        </div>
      </div>
      <p className="daily-weather__describtion">
        {forecast.daily[dayKey].weather[0].description}
      </p>
      <p className="daily-weather__wind-speed">
        wind speed: {Math.round(forecast.daily[dayKey].wind_speed * 10) / 10}
        {wunit}
      </p>
    </div>
  );
}

export default DailyWeather;
