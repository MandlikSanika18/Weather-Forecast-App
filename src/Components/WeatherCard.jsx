import React from "react";

function WeatherCard({ current, city }) {
  const getWeatherIcon = (code) => {
    const icons = {
      0: "https://openweathermap.org/img/wn/01d.png", // Clear sky
      1: "https://openweathermap.org/img/wn/02d.png", // Mainly clear
      2: "https://openweathermap.org/img/wn/03d.png", // Partly cloudy
      3: "https://openweathermap.org/img/wn/04d.png", // Overcast
      45: "https://openweathermap.org/img/wn/50d.png", // Fog
      48: "https://openweathermap.org/img/wn/50d.png", // Fog
      51: "https://openweathermap.org/img/wn/09d.png", // Light drizzle
      61: "https://openweathermap.org/img/wn/10d.png", // Rain
      80: "https://openweathermap.org/img/wn/09d.png", // Showers
      95: "https://openweathermap.org/img/wn/11d.png", // Thunderstorm
    };

    return icons[code] || "https://openweathermap.org/img/wn/01d.png"; // default
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
      
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-white/95 break-words">
          {city}
        </h2>
        
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <img
            src={getWeatherIcon(current.weathercode)}
            alt="weather icon"
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-lg"
          />
        </div>
        
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2">
            {current.temperature_2m}°C
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white/15 backdrop-blur-sm rounded-xl p-3 sm:p-4 gap-3 sm:gap-0">
            <div className="text-center">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Wind Speed</p>
              <p className="text-base sm:text-lg font-semibold">{current.windspeed_10m} km/h</p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Condition</p>
              <p className="text-base sm:text-lg font-semibold">Code {current.weathercode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;