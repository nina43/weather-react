import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [message, setMessage] = useState(false);

  function showInformation(response) {
    setMessage(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function formSubmit(event) {
    event.preventDefault();
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showInformation);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={formSubmit}>
      <input type="search" onChange={updateCity}></input>
      <input type="submit" value="Search"></input>
    </form>
  );
  if (message) {
    return (
      <div className="info">
        {form}
        <ul>
          <li>
            <strong>Temperature:</strong> {Math.round(weather.temperature)}°C
          </li>
          <li>
            <strong>Description:</strong> {weather.description}{" "}
          </li>
          <li>
            <strong>Wind:</strong> {weather.wind} mph
          </li>
          <li>
            <strong>Humidity:</strong> {weather.humidity}%
          </li>
          <li>
            <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
