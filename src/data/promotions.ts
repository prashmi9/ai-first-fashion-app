import type { Promotion } from '../types/common';

export const promotions: Promotion[] = [
  {
    id: 'promo-welcome',
    title: 'LUXE Welcomes You',
    description: 'Enjoy 10% off your first purchase as an elite member.',
    discountType: 'percentage',
    discountValue: 10,
    code: 'WELCOME10',
    validUntil: '2027-01-01',
    minPurchase: 50
  },
  {
    id: 'promo-winter-warmth',
    title: 'Winter Wardrobe Event',
    description: 'Get £50 off high-end outerwear when you spend over £250.',
    discountType: 'fixed',
    discountValue: 50,
    code: 'WARMTH50',
    validUntil: '2026-09-01',
    minPurchase: 250,
    applicableCategories: ['Outerwear']
  },
  {
    id: 'promo-gold-loyalty',
    title: 'Gold Tier Reward',
    description: '15% off any single transaction for Gold status members.',
    discountType: 'percentage',
    discountValue: 15,
    code: 'GOLD15',
    validUntil: '2026-12-31'
  }
];
