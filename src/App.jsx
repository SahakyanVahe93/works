import './App.css';
import { useState, useEffect } from 'react';
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
    sunrise: undefined,
    error: undefined
  });

  // State for the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

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

      // Get sunset and sunrise time (in UNIX timestamp)
      const sunset = data.sys.sunset;
      const sunrise = data.sys.sunrise;

      // Convert sunset and sunrise time from UNIX timestamp to time format
      const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert from UNIX timestamp (in seconds)
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      };

      setWeatherData({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunset: formatTime(sunset),
        sunrise: formatTime(sunrise),
        error: ""
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
    <div className="container">
      <Info />
      
      {/* Current time display */}
      <div className="current-time">
        <h2>Current Time: {currentTime}</h2>
      </div>
      
      {/* Form for entering city */}
      <Form WeatherMethod={gettingWeather} />
      
      {/* Weather information display */}
      <Weather
        temp={weatherData.temp}
        city={weatherData.city}
        country={weatherData.country}
        sunset={weatherData.sunset}
        sunrise={weatherData.sunrise}
        error={weatherData.error}
      />
    </div>
  );
}
