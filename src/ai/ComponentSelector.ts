import type { ComponentInstance } from '../types/conversation';
import type { EnrichedContext } from './ContextEngine';
import { generateId } from '../types/common';
import { OrderHistoryService } from '../mcp/services/OrderHistoryService';

export class ComponentSelector {
  public static selectComponents(
    intent: string,
    context: EnrichedContext,
    toolData: Record<string, any>
  ): ComponentInstance[] {
    const components: ComponentInstance[] = [];

    // If the user asks for order history, show only the OrderHistory component.
    if (intent === 'orders' || intent === 'last orders' || intent === 'history') {
      const orders = (toolData.orders as any[]) || OrderHistoryService.getRecentOrders({ customerId: context.customerId });
      return [
        {
          id: `comp-orders-${generateId().substring(0, 4)}`,
          type: 'OrderHistory',
          props: {
            orders: orders.slice(0, 10)
          }
        }
      ];
    }

    // Shopping cart (should appear before products)
    if (intent === 'cart' || intent === 'checkout') {
      components.push({
        id: `comp-cart-${generateId().substring(0, 4)}`,
        type: 'ShoppingCart',
        props: {}
      });
    }

    // Checkout Summary (should appear before products)
    if (intent === 'checkout') {
      components.push({
        id: `comp-checkout-${generateId().substring(0, 4)}`,
        type: 'CheckoutSummary',
        props: {}
      });
    }

    // Style quiz for new profile curation (should appear before products)
    if (intent === 'quiz') {
      components.push({
        id: `comp-quiz-${generateId().substring(0, 4)}`,
        type: 'StyleQuiz',
        props: {}
      });
    }

    // Active promotions banner (should appear before products)
    if (intent === 'sale' && toolData.promotions) {
      components.push({
        id: `comp-promo-${generateId().substring(0, 4)}`,
        type: 'PromotionBanner',
        props: { promotions: toolData.promotions }
      });
    }

    // Weather widget should be included if weather data is queried or active location is present
    if (context.activeLocation && toolData.weather) {
      components.push({
        id: `comp-weather-${generateId().substring(0, 4)}`,
        type: 'WeatherWidget',
        props: { weather: toolData.weather }
      });
    }

    // Main listing component (either ProductGrid or ProductCarousel)
    if (toolData.products && toolData.products.length > 0) {
      const isGridPreferred = intent === 'search' || toolData.products.length > 4;
      components.push({
        id: `comp-products-${generateId().substring(0, 4)}`,
        type: isGridPreferred ? 'ProductGrid' : 'ProductCarousel',
        props: {
          products: toolData.products,
          title: this.getProductsTitle(context)
        }
      });
    }

    // Recommendation card (AI-curated spotlight item)
    if (toolData.products && toolData.products.length > 0 && (intent === 'search' || context.activeLocation)) {
      const topMatch = toolData.products[0];
      components.push({
        id: `comp-rec-${generateId().substring(0, 4)}`,
        type: 'RecommendationCard',
        props: {
          product: topMatch,
          matchScore: 95,
          reasoning: this.getRecommendationReasoning(topMatch, context)
        }
      });
    }

    // Outfit builder (mix and match)
    if (intent === 'outfit' && toolData.products) {
      const tops = toolData.products.filter((p: any) => p.category === 'Tops' || p.category === 'Knitwear');
      const bottoms = toolData.products.filter((p: any) => p.category === 'Bottoms');
      const foot = toolData.products.filter((p: any) => p.category === 'Footwear');
      const acc = toolData.products.filter((p: any) => p.category === 'Accessories');

      components.push({
        id: `comp-outfit-${generateId().substring(0, 4)}`,
        type: 'OutfitBuilder',
        props: {
          topOptions: tops.length > 0 ? tops : toolData.fallbackTops || [],
          bottomOptions: bottoms.length > 0 ? bottoms : toolData.fallbackBottoms || [],
          footwearOptions: foot.length > 0 ? foot : toolData.fallbackFootwear || [],
          accessoryOptions: acc.length > 0 ? acc : toolData.fallbackAccessories || []
        }
      });
    }

    // Size Selector
    if (intent === 'search' && toolData.products && toolData.products.length > 0) {
      components.push({
        id: `comp-size-${generateId().substring(0, 4)}`,
        type: 'SizeSelector',
        props: {
          sizes: [
            { label: 'XS', value: 'xs', inStock: true },
            { label: 'S', value: 's', inStock: true },
            { label: 'M', value: 'm', inStock: true },
            { label: 'L', value: 'l', inStock: true },
            { label: 'XL', value: 'xl', inStock: false }
          ],
          savedSize: context.sizes.tops
        }
      });
    }

    return components;
  }

  private static getProductsTitle(context: EnrichedContext): string {
    const brand = context.preferences.favoriteBrands[0] || '';
    const occasion = context.activeOccasion ? ` for ${context.activeOccasion}` : '';
    const season = context.activeSeason ? ` ${context.activeSeason}` : '';
    
    if (context.activeLocation) {
      return `Curated looks for your trip to ${context.activeLocation.charAt(0).toUpperCase() + context.activeLocation.slice(1)}`;
    }
    // if (brand) {
    //   return `Top picks from ${brand}${occasion}`;
    // }

    return `Premium Selection${season}${occasion}`;
  }

  private static getRecommendationReasoning(product: any, context: EnrichedContext): string {
    if (context.activeLocation) {
      return `Handpicked for ${context.activeLocation.charAt(0).toUpperCase() + context.activeLocation.slice(1)} because of its superior temperature resistance, matching your preferred minimalist luxury aesthetic in size ${context.sizes.tops}.`;
    }
    if (context.activeOccasion) {
      return `Selected for your upcoming ${context.activeOccasion} occasion. It complements your styling criteria of premium, slow-fashion fabrics like ${product.material.toLowerCase()}.`;
    }
    return `We recommend this piece because it aligns perfectly with your size ${context.sizes.tops} profile and favorite brand ${product.brand}.`;
  }
}
