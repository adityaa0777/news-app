
import React, { useEffect, useState } from 'react';
import '../css/leftpanel.css';

const WEATHER_API_KEY = "cd42104f125bcd9c90cd293e32cf98bf";
const NEWS_API_KEY = "5c0179d25ee0439e9f50155665883261";

const LeftPanel = () => {

  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`);
      const data = await res.json();
      setLatestNews(data.articles.slice(0, 5));
    } catch (err) {
      console.error("News fetch error", err);
    }
  };

  
  const fetchWeatherByCity = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError(null);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.error("Weather fetch error", err);
      setError("Error fetching weather");
    }
  };

  useEffect(() => {
    fetchNews();
    fetchWeatherByCity(city);
  }, []);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  return (
    <div style={{ padding: "15px", color: "white", backgroundColor: "#143276",minHeight: "300px", overflowY: "auto" }}>
      

      <h3>🌤️ Weather</h3>
      <form onSubmit={handleCitySubmit} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="inp"></input>
        <button type="submit" id="btn">Go</button>
      </form>

      {weather ? (
        <div>
          <p><strong>{weather.name}, {weather.sys.country}</strong></p>
          <p>Temp: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p style={{ color: 'lightcoral' }}>{error || "Loading..."}</p>
      )}
    </div>

  );
};

export default LeftPanel;
