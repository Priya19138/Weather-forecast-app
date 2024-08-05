import React, { useState } from 'react';
import { WiHumidity } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { GiWindSlap } from "react-icons/gi";
import { MdVisibility } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "c1a33091b9b939a96199bc445d621ac4";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    fetchWeatherData();
  };

  return (
    <div className='info'>
      <input
        className="inform"
        type="text"
        placeholder="Enter City..."
        value={city}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      {weatherData && (
        <div className='middata'>
          <h2>{weatherData.name}</h2>
          <h2>Tuesday 1 July 2024</h2>
        </div>
      )}
      <div className='infor'>
        {weatherData && (
          <div>
            <p className="visib"><TbTemperatureCelsius size="25px" color="black" /> Temperature: {weatherData.main.temp} °C</p>
            <p className="visib"><WiHumidity size="25px" color="blue" /> Humidity: {weatherData.main.humidity}%</p>
            <p className="visib"><GiWindSlap size="25px" color="black" /> Wind Speed: {weatherData.wind.speed} m/s</p>
            <p className="visib"><MdVisibility size="25px" color="black" /> Visibility: {weatherData.visibility} meters</p>
            <p className="visib"><FaCloud size="25px" color="blue" /> Cloudiness: {weatherData.clouds.all}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
