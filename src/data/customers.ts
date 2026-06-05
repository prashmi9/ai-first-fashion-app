import type { Customer } from '../types/customer';

export const defaultCustomer: Customer = {
  profile: {
    id: 'cust-101',
    name: 'Rashmi Suralkar',
    email: 'rashmi.s@fashionLUXE.com',
    avatar: '',
    loyaltyTier: 'gold',
    loyaltyPoints: 1250,
    memberSince: '2024-03-12'
  },
  preferences: {
    favoriteColors: ['#fefefe', '#e2d6c5',  '#064e3b', '#fcfcfc'], // ivory, oatmeal, navy/midnight, emerald
    favoriteBrands: ['Maison Laurent', 'Velvet & Stone'],
    preferredStyles: ['Business', 'Classic', 'Streetwear'],
    avoidStyles: ['Sporty', 'Bohemian'],
    priceRange: { min: 50, max: 350 }
  },
  sizes: {
    tops: 'S',
    bottoms: 'S',
    dresses: 'S',
    shoes: 'EU 38',
    general: 'S'
  },
  orderHistory: [
    {
      id: 'ord-9821',
      date: '2026-04-10',
      items: [
        {
          productId: 'top-2',
          productName: 'Silk Utility Blouse',
          brand: 'Maison Laurent',
          size: 'S',
          color: 'Ivory Cream',
          price: 135.00,
          quantity: 1,
          image: '/src/assets/products-img/silky-utility-blouse.jpeg'
        }
      ],
      total: 135.00,
      currency: '€',
      status: 'delivered',
      trackingNumber: 'LUXE-9821-GB',
      estimatedDelivery: '2026-04-12'
    },
    {
      id: 'ord-9104',
      date: '2026-03-20',
      items: [
        {
          productId: 'out-4',
          productName: 'Suede Biker Jacket',
          brand: 'Velvet & Stone',
          size: 'M',
          color: 'Warm Taupe',
          price: 275.00,
          quantity: 1,
          image: '/src/assets/products-img/suede-jacket.jpg'
        }
      ],
      total: 275.00,
      currency: '€',
      status: 'delivered',
      trackingNumber: 'LUXE-9104-GB',
      estimatedDelivery: '2024-03-22'
    },
    {
      id: 'ord-8104',
      date: '2025-11-20',
      items: [
        {
          productId: 'acc-1',
          productName: 'Ribbed Cashmere Scarf',
          brand: 'Velvet & Stone',
          size: 'One Size',
          color: 'Burgundy',
          price: 75.00,
          quantity: 1,
          image: '/src/assets/products-img/cashmere-scarf.jpeg'
        }
      ],
      total: 75.00,
      currency: '€',
      status: 'returned',
      trackingNumber: 'LUXE-8104-GB',
      estimatedDelivery: '2025-11-22'
    },
    
  ]
};
