import React from 'react';
import type { WeatherData } from '../../types/common';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, } from 'lucide-react';
import { AnimatedCounter } from '../shared/AnimatedCounter';
import './WeatherWidget.css';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const getWeatherIcon = (cond: string) => {
    switch (cond.toLowerCase()) {
      case 'snowy':
      case 'freezing':
        return <CloudSnow className="w-icon snow" size={32} />;
      case 'rainy':
        return <CloudRain className="w-icon rain" size={32} />;
      case 'windy':
        return <Wind className="w-icon wind" size={32} />;
      case 'sunny':
        return <Sun className="w-icon sun" size={32} />;
      case 'cloudy':
      case 'partly-cloudy':
      default:
        return <Cloud className="w-icon cloud" size={32} />;
    }
  };

  return (
    <div className="weather-widget glass animate-slide-up">
      <div className="w-grid">
        {/* Left Side overview */}
        <div className="w-main">
          <span className="w-lbl">Travel Forecast</span>
          <h4 className="w-city">{weather.location}</h4>

          <div className="w-temp-row">
            {getWeatherIcon(weather.condition)}
            <div className="w-temp-block">
              <span className="w-temp">
                <AnimatedCounter value={weather.temperature} />°C
              </span>
              <span className="w-feels">Feels like {weather.feelsLike}°C</span>
            </div>
          </div>
        </div>

        {/* Right Side forecasts */}
        <div className="w-forecast">
          <span className="w-lbl">5-Day Outlook</span>
          <div className="w-forecast-row">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="w-forecast-item glass">
                <span className="day">{day.date}</span>
                <span className="temp">{day.high}°</span>
                <span className="cond">{day.condition} 
                  {/* <span className="w-icon">{getWeatherIcon(day.condition)}</span> */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherWidget;
