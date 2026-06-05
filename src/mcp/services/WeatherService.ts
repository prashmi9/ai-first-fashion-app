import { weatherData } from '../../data/weather';
import type { WeatherData } from '../../types/common';

export class WeatherService {
  public static getCurrentWeather(args: { city: string }): WeatherData | undefined {
    const key = args.city.toLowerCase().trim();
    return weatherData[key] || weatherData['london']; // Fallback to London
  }

  public static getDestinationForecast(args: { city: string }): WeatherData | undefined {
    return this.getCurrentWeather(args);
  }
}
