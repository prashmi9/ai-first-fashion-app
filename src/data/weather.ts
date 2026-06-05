import type { WeatherData } from '../types/common';

export const weatherData: Record<string, WeatherData> = {
  finland: {
    location: 'Helsinki, Finland',
    temperature: 19,
    feelsLike: 13,
    condition: 'cloudy',
    humidity: 78,
    windSpeed: 15,
    icon: 'Cloud',
    forecast: [
      { date: 'Mon', high: 20, low: 11, condition: 'partly-cloudy', icon: 'Cloud' },
      { date: 'Tue', high: 20, low: 11, condition: 'cloudy', icon: 'Sun' },
      { date: 'Wed', high: 19, low: 13, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Thu', high: 19, low: 11, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Fri', high: 19, low: 10, condition: 'rainy', icon: 'CloudRain' }
    ]
  },
  iceland: {
    location: 'Reykjavik, Iceland',
    temperature: -2,
    feelsLike: -7,
    condition: 'snowy',
    humidity: 85,
    windSpeed: 28,
    icon: 'Snowflake',
    forecast: [
      { date: 'Mon', high: -1, low: -4, condition: 'snowy', icon: 'Snowflake' },
      { date: 'Tue', high: 0, low: -3, condition: 'windy', icon: 'Wind' },
      { date: 'Wed', high: 1, low: -2, condition: 'cloudy', icon: 'Cloud' },
      { date: 'Thu', high: -2, low: -6, condition: 'freezing', icon: 'Thermometer' },
      { date: 'Fri', high: -4, low: -8, condition: 'snowy', icon: 'Snowflake' }
    ]
  },
  norway: {
    location: 'Oslo, Norway',
    temperature: 1,
    feelsLike: -3,
    condition: 'cloudy',
    humidity: 78,
    windSpeed: 15,
    icon: 'Cloud',
    forecast: [
      { date: 'Mon', high: 2, low: -1, condition: 'cloudy', icon: 'Cloud' },
      { date: 'Tue', high: 3, low: 0, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Wed', high: 1, low: -2, condition: 'snowy', icon: 'Snowflake' },
      { date: 'Thu', high: 0, low: -4, condition: 'freezing', icon: 'Thermometer' },
      { date: 'Fri', high: 2, low: -2, condition: 'partly-cloudy', icon: 'Sun' }
    ]
  },
  spain: {
    location: 'Barcelona, Spain',
    temperature: 31,
    feelsLike: 36,
    condition: 'sunny',
    humidity: 70,
    windSpeed: 12,
    icon: 'Sun',
    forecast: [
      { date: 'Mon', high: 31, low: 26, condition: 'sunny', icon: 'Sun' },
      { date: 'Tue', high: 32, low: 27, condition: 'sunny', icon: 'Sun' },
      { date: 'Wed', high: 30, low: 26, condition: 'partly-cloudy', icon: 'Sun' },
      { date: 'Thu', high: 31, low: 25, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Fri', high: 31, low: 26, condition: 'sunny', icon: 'Sun' }
    ]
  },
  paris: {
    location: 'Paris, France',
    temperature: 14,
    feelsLike: 13,
    condition: 'partly-cloudy',
    humidity: 62,
    windSpeed: 10,
    icon: 'Sun',
    forecast: [
      { date: 'Mon', high: 15, low: 8, condition: 'partly-cloudy', icon: 'Sun' },
      { date: 'Tue', high: 16, low: 9, condition: 'sunny', icon: 'Sun' },
      { date: 'Wed', high: 13, low: 7, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Thu', high: 12, low: 6, condition: 'cloudy', icon: 'Cloud' },
      { date: 'Fri', high: 14, low: 8, condition: 'partly-cloudy', icon: 'Sun' }
    ]
  },
  london: {
    location: 'London, UK',
    temperature: 12,
    feelsLike: 11,
    condition: 'rainy',
    humidity: 88,
    windSpeed: 18,
    icon: 'CloudRain',
    forecast: [
      { date: 'Mon', high: 13, low: 8, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Tue', high: 14, low: 9, condition: 'cloudy', icon: 'Cloud' },
      { date: 'Wed', high: 12, low: 7, condition: 'rainy', icon: 'CloudRain' },
      { date: 'Thu', high: 11, low: 6, condition: 'windy', icon: 'Wind' },
      { date: 'Fri', high: 13, low: 7, condition: 'partly-cloudy', icon: 'Sun' }
    ]
  }
};
