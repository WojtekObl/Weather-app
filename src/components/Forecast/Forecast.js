import React, { useEffect, useState } from "react";
import "./Forecast.css";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import DailyWeather from "./DailyWeather/DailyWeather";

function Forecast({ forecast, city, unit }) {
  const [location, setLocation] = useState({});
  const [tunit, setTunit] = useState("");
  const [wunit, setWunit] = useState("km/h");

  //translate timestamp(unix) to human-readable format
  const getDateStringFromTimestamp = (timestamp) => {
    const timeFromTimestamp = new Date(timestamp * 1000);
    let month = timeFromTimestamp.getMonth() + 1;
    const day = timeFromTimestamp.getDate();
    const noumberOfWeek = timeFromTimestamp.getDay();
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (month < 10) {
      month = "0" + month;
    }
    return dayOfWeek[noumberOfWeek] +
    " " + day + "." + month;
  };


  //set units and location name to display depend on forecast
  useEffect(() => {
    setLocation(city);
    setTunit(unit);
    setWunit(unit === "F" ? "mph" : "km/h");
  }, [forecast]);

  return (
    <div className="forecast">
      <CurrentWeather
        forecast={forecast}
        wunit={wunit}
        tunit={tunit}
        location={location}
        getDateStringFromTimestamp={getDateStringFromTimestamp}
      />
      <p className="forecast__daily-section-tittle">Next 5 days:</p>
      <div className="forecast__daily">
        <DailyWeather forecast={forecast} tunit={tunit} wunit={wunit} getDateStringFromTimestamp={getDateStringFromTimestamp} dayKey={1}/>
        <DailyWeather forecast={forecast} tunit={tunit} wunit={wunit} getDateStringFromTimestamp={getDateStringFromTimestamp} dayKey={2}/>
        <DailyWeather forecast={forecast} tunit={tunit} wunit={wunit} getDateStringFromTimestamp={getDateStringFromTimestamp} dayKey={3}/>
        <DailyWeather forecast={forecast} tunit={tunit} wunit={wunit} getDateStringFromTimestamp={getDateStringFromTimestamp} dayKey={4}/>
        <DailyWeather forecast={forecast} tunit={tunit} wunit={wunit} getDateStringFromTimestamp={getDateStringFromTimestamp} dayKey={5}/>
      </div>
    </div>
  );
}

export default Forecast;
