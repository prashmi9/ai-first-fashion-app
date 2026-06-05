import type { Season } from './product';

export interface LocationData {
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  forecast: ForecastDay[];
  icon: string;
}

export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'windy'
  | 'foggy'
  | 'freezing';

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  icon: string;
}

export interface BudgetConstraints {
  total: number;
  spent: number;
  remaining: number;
  currency: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  code?: string;
  validUntil: string;
  minPurchase?: number;
  applicableCategories?: string[];
  image?: string;
}

export interface ToolResult<T = unknown> {
  success: boolean;
  data: T;
  error?: string;
  toolName: string;
  executionTime: number;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function formatPrice(amount: number, currency: string = '€'): string {
  return `${currency}${amount.toFixed(2)}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getSeasonFromMonth(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
