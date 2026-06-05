import React from 'react';

// Lazy load or direct imports for registry mapping
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductCarousel } from '../components/product/ProductCarousel';
import { RecommendationCard } from '../components/product/RecommendationCard';
import { ShoppingCart } from '../components/commerce/ShoppingCart';
import { CheckoutSummary } from '../components/commerce/CheckoutSummary';
import { PromotionBanner } from '../components/commerce/PromotionBanner';
import { OrderHistory } from '../components/commerce/OrderHistory';
import { WeatherWidget } from '../components/engagement/WeatherWidget';
import { StyleQuiz } from '../components/engagement/StyleQuiz';
import { SizeSelector } from '../components/filters/SizeSelector';
import { OutfitBuilder } from '../components/outfit/OutfitBuilder';

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  ProductGrid,
  ProductCarousel,
  RecommendationCard,
  ShoppingCart,
  CheckoutSummary,
  PromotionBanner,
  OrderHistory,
  WeatherWidget,
  StyleQuiz,
  SizeSelector,
  OutfitBuilder
};
