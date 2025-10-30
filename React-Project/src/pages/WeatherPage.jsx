import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WeatherPage.css';

// API key for OpenWeatherMap (using a public demo key)
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

// Weather Widget page
function WeatherPage() {
  const navigate = useNavigate();

  // State for city input
  const [city, setCity] = useState('');

  // State for weather data
  const [weather, setWeather] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [error, setError] = useState('');

  // Function to fetch weather data from API
  const fetchWeather = async () => {
    // Validate input
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError('');
    setWeather(null);

    try {
      // Make API request to OpenWeatherMap
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Handle error responses
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Error fetching weather data');
      }

      // Parse JSON response
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Weather Widget</h1>
      </div>

      {/* Search form */}
      <div className="weather-search">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="city-input"
          />
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="weather-loading">Fetching weather...</div>
      )}

      {/* Error state */}
      {error && (
        <div className="weather-error">{error}</div>
      )}

      {/* Weather display */}
      {weather && (
        <div className="weather-card">
          {/* City name */}
          <h2 className="weather-city">
            {weather.name}, {weather.sys.country}
          </h2>

          {/* Weather icon - OpenWeatherMap provides icons for different conditions */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />

          {/* Temperature */}
          <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>

          {/* Weather description (e.g., "clear sky", "light rain") */}
          <div className="weather-description">
            {weather.weather[0].description}
          </div>

          {/* Additional weather details */}
          <div className="weather-details">
            <div className="weather-detail">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.main.humidity}%</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weather.wind.speed} m/s</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
