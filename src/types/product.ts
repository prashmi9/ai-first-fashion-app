export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Occasion = 'casual' | 'formal' | 'business' | 'evening' | 'sport' | 'outdoor' | 'wedding' | 'holiday';
export type Gender = 'men' | 'women' | 'unisex';

export interface Size {
  label: string;
  value: string;
  inStock: boolean;
}

export interface ColorVariant {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  sizes: Size[];
  colors: ColorVariant[];
  images: string[];
  description: string;
  material: string;
  seasons: Season[];
  occasions: Occasion[];
  gender: Gender;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}
