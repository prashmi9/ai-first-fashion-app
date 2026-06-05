import type { MCPTool } from './types';

export class ToolRegistry {
  private static tools: MCPTool[] = [
    // Product Catalog Service
    {
      name: 'searchProducts',
      description: 'Search for fashion products by text query, category, price range, season, occasion, and gender.',
      service: 'ProductCatalog',
      parameters: [
        { name: 'query', type: 'string', required: false, description: 'Text search query (e.g. puffer coat, dress)' },
        { name: 'category', type: 'string', required: false, description: 'Category (Outerwear, Knitwear, Dresses, Tops, Bottoms, Footwear, Accessories)' },
        { name: 'maxPrice', type: 'number', required: false, description: 'Maximum price in GBP' },
        { name: 'season', type: 'string', required: false, description: 'Season (winter, summer, autumn, spring)' },
        { name: 'occasion', type: 'string', required: false, description: 'Occasion (casual, formal, holiday, business, outdoor, evening, wedding)' },
        { name: 'gender', type: 'string', required: false, description: 'Gender tag (men, women, unisex)' }
      ]
    },
    {
      name: 'getProductDetails',
      description: 'Retrieve details for a specific product by ID.',
      service: 'ProductCatalog',
      parameters: [
        { name: 'productId', type: 'string', required: true, description: 'The unique product ID' }
      ]
    },
    {
      name: 'checkInventory',
      description: 'Verify if a product size and color variant is currently in stock.',
      service: 'ProductCatalog',
      parameters: [
        { name: 'productId', type: 'string', required: true, description: 'The product ID' },
        { name: 'size', type: 'string', required: true, description: 'Size label (e.g. S, M, L)' },
        { name: 'color', type: 'string', required: false, description: 'Color variant name' }
      ]
    },

    // Customer Profile Service
    {
      name: 'getCustomerProfile',
      description: 'Retrieve active customer profile details, including size profiles and style preferences.',
      service: 'CustomerProfile',
      parameters: [
        { name: 'customerId', type: 'string', required: true, description: 'Unique customer ID' }
      ]
    },
    {
      name: 'getPreferences',
      description: 'Fetch detailed fashion preferences for style matching and suggestions.',
      service: 'CustomerProfile',
      parameters: [
        { name: 'customerId', type: 'string', required: true, description: 'Unique customer ID' }
      ]
    },
    {
      name: 'getSavedSizes',
      description: 'Retrieve saved sizes for the customer across categories.',
      service: 'CustomerProfile',
      parameters: [
        { name: 'customerId', type: 'string', required: true, description: 'Unique customer ID' }
      ]
    },

    // Weather Service
    {
      name: 'getCurrentWeather',
      description: 'Get current weather and conditions for a destination.',
      service: 'WeatherService',
      parameters: [
        { name: 'city', type: 'string', required: true, description: 'The city name' }
      ]
    },
    {
      name: 'getDestinationForecast',
      description: 'Retrieve a 5-day weather forecast for travel outfit planning.',
      service: 'WeatherService',
      parameters: [
        { name: 'city', type: 'string', required: true, description: 'The city name' }
      ]
    },

    // Promotion Service
    {
      name: 'getActiveCampaigns',
      description: 'List all current promotions, discounts, and voucher codes.',
      service: 'PromotionService',
      parameters: []
    },
    {
      name: 'checkDiscountEligibility',
      description: 'Check if a customer and cart are eligible for specialized offers.',
      service: 'PromotionService',
      parameters: [
        { name: 'customerId', type: 'string', required: true, description: 'Unique customer ID' },
        { name: 'cartTotal', type: 'number', required: true, description: 'Total price of items in cart' }
      ]
    },

    // Checkout Service
    {
      name: 'createOrder',
      description: 'Place an order and finalize purchase.',
      service: 'CheckoutService',
      parameters: [
        { name: 'items', type: 'array', required: true, description: 'Array of cart items' },
        { name: 'paymentMethod', type: 'string', required: true, description: 'Payment method name' }
      ]
    },

    // Order History Service
    {
      name: 'getRecentOrders',
      description: 'Fetch order history for a customer.',
      service: 'OrderHistoryService',
      parameters: [
        { name: 'customerId', type: 'string', required: true, description: 'Unique customer ID' }
      ]
    },
    {
      name: 'trackOrder',
      description: 'Get tracking status and estimated delivery time for a specific order.',
      service: 'OrderHistoryService',
      parameters: [
        { name: 'orderId', type: 'string', required: true, description: 'Order ID' }
      ]
    }
  ];

  public static getTools(): MCPTool[] {
    return this.tools;
  }

  public static getTool(name: string): MCPTool | undefined {
    return this.tools.find(t => t.name === name);
  }

  public static getToolsByService(service: string): MCPTool[] {
    return this.tools.filter(t => t.service === service);
  }
}
