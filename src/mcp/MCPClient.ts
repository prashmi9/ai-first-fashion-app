import type { MCPToolResponse } from './types';
import { ToolRegistry } from './ToolRegistry';
import { ProductCatalogService } from './services/ProductCatalogService';
import { CustomerProfileService } from './services/CustomerProfileService';
import { WeatherService } from './services/WeatherService';
import { PromotionService } from './services/PromotionService';
import { CheckoutService } from './services/CheckoutService';
import { OrderHistoryService } from './services/OrderHistoryService';
import { delay } from '../types/common';

export class MCPClient {
  public static async invokeTool(
    toolName: string,
    args: Record<string, any>
  ): Promise<MCPToolResponse> {
    const startTime = Date.now();
    const tool = ToolRegistry.getTool(toolName);

    // Simulate real network/process latency (200ms - 500ms)
    await delay(300 + Math.random() * 200);

    if (!tool) {
      return {
        success: false,
        data: null,
        error: `Tool '${toolName}' not found in registry.`,
        executionTime: Date.now() - startTime
      };
    }

    try {
      let data: any = null;

      switch (toolName) {
        // ProductCatalog Service
        case 'searchProducts':
          data = ProductCatalogService.searchProducts(args);
          break;
        case 'getProductDetails':
          data = ProductCatalogService.getProductDetails({ productId: args.productId });
          break;
        case 'checkInventory':
          data = ProductCatalogService.checkInventory({ productId: args.productId, size: args.size });
          break;

        // CustomerProfile Service
        case 'getCustomerProfile':
          data = CustomerProfileService.getCustomerProfile({ customerId: args.customerId });
          break;
        case 'getPreferences':
          data = CustomerProfileService.getPreferences({ customerId: args.customerId });
          break;
        case 'getSavedSizes':
          data = CustomerProfileService.getSavedSizes({ customerId: args.customerId });
          break;

        // Weather Service
        case 'getCurrentWeather':
        case 'getDestinationForecast':
          data = WeatherService.getCurrentWeather({ city: args.city });
          break;

        // Promotion Service
        case 'getActiveCampaigns':
          data = PromotionService.getActiveCampaigns();
          break;
        case 'checkDiscountEligibility':
          data = PromotionService.checkDiscountEligibility({ customerId: args.customerId, cartTotal: args.cartTotal });
          break;

        // Checkout Service
        case 'createOrder':
          data = CheckoutService.createOrder({ items: args.items, paymentMethod: args.paymentMethod });
          break;

        // OrderHistory Service
        case 'getRecentOrders':
          data = OrderHistoryService.getRecentOrders({ customerId: args.customerId });
          break;
        case 'trackOrder':
          data = OrderHistoryService.trackOrder({ orderId: args.orderId });
          break;

        default:
          throw new Error(`Tool implementation for '${toolName}' is missing.`);
      }

      return {
        success: true,
        data,
        executionTime: Date.now() - startTime
      };
    } catch (err: any) {
      return {
        success: false,
        data: null,
        error: err.message || 'An error occurred during tool execution.',
        executionTime: Date.now() - startTime
      };
    }
  }
}
