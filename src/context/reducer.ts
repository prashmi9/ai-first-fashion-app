import type { Product, CartItem, WishlistItem } from '../types/product';
import type { ConversationMessage, ComponentInstance, SuggestedAction } from '../types/conversation';
import type { SizeProfile, StylePreferences } from '../types/customer';

export interface AppState {
  user: {
    id: string;
    name: string;
    loyaltyTier: string;
    loyaltyPoints: number;
    sizes: SizeProfile;
    preferences: StylePreferences;
  };
  conversation: {
    messages: ConversationMessage[];
    isProcessing: boolean;
    suggestedActions: SuggestedAction[];
  };
  cart: CartItem[];
  wishlist: WishlistItem[];
  activeComponents: ComponentInstance[];
  theme: 'dark' | 'light';
}

export type AppAction =
  | { type: 'ADD_MESSAGE'; payload: ConversationMessage }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_COMPONENTS'; payload: ComponentInstance[] }
  | { type: 'SET_SUGGESTIONS'; payload: SuggestedAction[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: Product }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_THEME'; payload: 'dark' | 'light' }
  | { type: 'UPDATE_PREFERENCES'; payload: StylePreferences };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [...state.conversation.messages, action.payload]
        }
      };

    case 'SET_PROCESSING':
      return {
        ...state,
        conversation: {
          ...state.conversation,
          isProcessing: action.payload
        }
      };

    case 'SET_COMPONENTS':
      return {
        ...state,
        activeComponents: action.payload
      };

    case 'SET_SUGGESTIONS':
      return {
        ...state,
        conversation: {
          ...state.conversation,
          suggestedActions: action.payload
        }
      };

    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(
        item =>
          item.product.id === action.payload.product.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += action.payload.quantity;
        return { ...state, cart: newCart };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          item =>
            !(
              item.product.id === action.payload.productId &&
              item.selectedSize === action.payload.size &&
              item.selectedColor === action.payload.color
            )
        )
      };

    case 'UPDATE_CART_QUANTITY': {
      const index = state.cart.findIndex(
        item =>
          item.product.id === action.payload.productId &&
          item.selectedSize === action.payload.size &&
          item.selectedColor === action.payload.color
      );

      if (index > -1) {
        const newCart = [...state.cart];
        newCart[index].quantity = Math.max(1, action.payload.quantity);
        return { ...state, cart: newCart };
      }
      return state;
    }

    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(item => item.product.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.product.id !== action.payload.id)
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, { product: action.payload, addedAt: new Date() }]
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        activeComponents: state.activeComponents.filter(
          component => component.type !== 'ShoppingCart'
        )
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        user: {
          ...state.user,
          preferences: action.payload
        }
      };

    default:
      return state;
  }
}
