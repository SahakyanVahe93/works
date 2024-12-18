import './App.css';
import { useState } from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = 'b1f0d9559ce5892dc707902b47900cb3';

export default function App() {
  // Initialize state using the useState hook
  const [weatherData, setWeatherData] = useState({
    temp: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    error: undefined
  });

  const gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value; 
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; 
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data);

     
      setWeatherData({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunset: data.sys.sunset, 
        error: ''
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      
      setWeatherData({
        ...weatherData,
        error: 'City not found'
      });
    }
  };

  return (
    <div>
      <Info />
      <Form WeatherMethod={gettingWeather} />
      <Weather
        temp={weatherData.temp}
        city={weatherData.city}
        country={weatherData.country}
        sunset={weatherData.sunset}
        error={weatherData.error}
      />
    </div>
  );
}
