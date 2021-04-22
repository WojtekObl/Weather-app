
import axios from "axios";

const apiKey = "151b7bd3af91874b71f10e22eebed35c";
const url = "https://api.openweathermap.org/data/2.5/onecall";
const urlSearch = "https://api.openweathermap.org/geo/1.0/direct"




export const fetchWeatherData = async (city) => {
    console.log(city)
    const { data } = await axios.get(url, {
        params: {
            lat: city.lat,
            lon: city.lon,
            appid: apiKey,
            exclude: 'hourly,current,minutely,alerts',
            units: "metric",
        }
    });

    return data;
};

export const searchCity = async (cityName) => {
    const { data } = await axios.get(urlSearch, {
        params: {
            q: cityName,
            appid: apiKey,
            limit: 8,
        }
    });
    return data;
};