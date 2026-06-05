import { defaultCustomer } from '../../data/customers';
import type { OrderHistoryItem } from '../../types/customer';

export class OrderHistoryService {
  public static getRecentOrders(args: { customerId: string }): OrderHistoryItem[] {
    if (args.customerId === defaultCustomer.profile.id) {
      return defaultCustomer.orderHistory;
    }
    return [];
  }

  public static trackOrder(args: { orderId: string }): { status: string; estimatedDelivery: string; trackingNumber: string } | undefined {
    const order = defaultCustomer.orderHistory.find(o => o.id === args.orderId);
    if (order) {
      return {
        status: order.status,
        estimatedDelivery: order.estimatedDelivery || 'Calculated during dispatch',
        trackingNumber: order.trackingNumber || 'PENDING'
      };
    }
    return undefined;
  }
}
