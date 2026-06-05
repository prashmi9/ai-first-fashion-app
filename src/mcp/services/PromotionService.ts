import { promotions } from '../../data/promotions';
import type { Promotion } from '../../types/common';

export class PromotionService {
  public static getActiveCampaigns(): Promotion[] {
    return promotions;
  }

  public static checkDiscountEligibility(args: { customerId: string; cartTotal: number }): Promotion[] {
    return promotions.filter(p => {
      if (p.minPurchase && args.cartTotal < p.minPurchase) return false;
      return true;
    });
  }
}
