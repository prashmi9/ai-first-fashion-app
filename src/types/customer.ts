export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  memberSince: string;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface StylePreferences {
  favoriteColors: string[];
  favoriteBrands: string[];
  preferredStyles: string[];
  avoidStyles: string[];
  priceRange: { min: number; max: number };
}

export interface SizeProfile {
  tops: string;
  bottoms: string;
  dresses: string;
  shoes: string;
  general: string;
}

export interface OrderHistoryItem {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'returned' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Customer {
  profile: CustomerProfile;
  preferences: StylePreferences;
  sizes: SizeProfile;
  orderHistory: OrderHistoryItem[];
}
