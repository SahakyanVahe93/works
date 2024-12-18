import React from 'react';

export default function Form({ WeatherMethod }) {
  return (
    <form onSubmit={WeatherMethod}>
      <input type="text" name="city" placeholder="Enter City" />
      <button type="submit">Get Weather</button>
    </form>
  );
}
