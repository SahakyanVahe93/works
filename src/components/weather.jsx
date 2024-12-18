import React from 'react';

const Weather = ({ temp, city, country, sunset,sunrise, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {city && (
        <div>
          <p>Location: {city}, {country}</p>
          <p>Temperature: {temp}°C</p>
          <p>Sunset: {sunset}</p>
          <p>sunris:{sunrise}</p>
          
        </div>
      )}
    </div>
  );
};

export default Weather;
