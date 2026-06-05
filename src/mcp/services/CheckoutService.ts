import type { CartItem } from '../../types/product';
import { generateId } from '../../types/common';

export interface OrderConfirmation {
  orderId: string;
  success: boolean;
  message: string;
  total: number;
}

export class CheckoutService {
  public static createOrder(args: { items: CartItem[]; paymentMethod: string }): OrderConfirmation {
    const total = args.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return {
      orderId: `ord-${generateId().substring(0, 6)}`,
      success: true,
      message: `Successfully processed payment via ${args.paymentMethod}. Your order is confirmed!`,
      total
    };
  }
}
