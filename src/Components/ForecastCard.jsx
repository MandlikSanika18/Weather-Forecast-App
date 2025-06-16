import React from "react";

function ForecastCard({ date, min, max, code }) {
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
    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-0">
      <p className="font-bold text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 break-words">
        {new Date(date).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })}
      </p>
      
      <div className="flex justify-center mb-2 sm:mb-3">
        <img
          src={getWeatherIcon(code)}
          alt="weather icon"
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-md"
        />
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Max:</span>
          <span className="font-bold text-red-500 text-xs sm:text-sm">{max}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Min:</span>
          <span className="font-bold text-blue-500 text-xs sm:text-sm">{min}°C</span>
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;
