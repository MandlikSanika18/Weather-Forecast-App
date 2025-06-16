// Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

function Home() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [displayCity, setDisplayCity] = useState("");

  // Fetch weather using coordinates
  const fetchWeather = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    try {
      const res = await axios.get(url);
      console.log(res);
      setWeatherData(res.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Get current location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      setLat(latitude);
      setLon(longitude);
      setDisplayCity("Your Location"); // <-- for geolocation case
      fetchWeather(latitude, longitude);
    });
  }, []);

  // Handle City Search
  const handleSearch = async () => {
    if (!city) return;

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    try {
      const res = await axios.get(geoUrl);
      if (res.data.results && res.data.results.length > 0) {
        const loc = res.data.results[0];
        const newLat = loc.latitude;
        const newLon = loc.longitude;

        setLat(newLat);
        setLon(newLon);
        setDisplayCity(loc.name); // <-- set formatted city name
        fetchWeather(newLat, newLon);
      } else {
        alert("City not found");
      }
    } catch (err) {
      alert("Error fetching location");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Background decorative elements - responsive positioning */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 sm:top-60 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - responsive text sizes */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
            Weather App
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light">
            ☀️ Your personal weather companion 🌤️
          </p>
        </div>

        {/* Search Section - responsive layout */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center px-4 sm:px-0">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white/20 backdrop-blur-md border border-white/30 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl w-full sm:w-64 lg:w-80 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto text-sm sm:text-base"
          >
            Search
          </button>
        </div>

        {/* Weather Content */}
        {weatherData && (
          <div className="space-y-6 sm:space-y-8">
            {/* Current Weather */}
            <div className="flex justify-center">
              <WeatherCard current={weatherData.current} city={displayCity} />
            </div>

            {/* Forecast Section - responsive layout */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                7-Day Forecast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
                {weatherData.daily.time.map((day, index) => (
                  <ForecastCard
                    key={day}
                    date={day}
                    min={weatherData.daily.temperature_2m_min[index]}
                    max={weatherData.daily.temperature_2m_max[index]}
                    code={weatherData.daily.weathercode[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
