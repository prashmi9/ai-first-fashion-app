import React, { createContext, useContext, useReducer, } from 'react';
import type { Product, } from '../types/product';
import { defaultCustomer } from '../data/customers';
import { LLMOrchestrator } from '../ai/LLMOrchestrator';
import { appReducer, type AppState, type AppAction } from './reducer';
import { generateId } from '../types/common';

const initialState: AppState = {
  user: {
    id: defaultCustomer.profile.id,
    name: defaultCustomer.profile.name,
    loyaltyTier: defaultCustomer.profile.loyaltyTier,
    loyaltyPoints: defaultCustomer.profile.loyaltyPoints,
    sizes: { ...defaultCustomer.sizes },
    preferences: { ...defaultCustomer.preferences }
  },
  conversation: {
    messages: [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Welcome to LUXE, your personal AI Fashion Stylist. I've analyzed your profile and sizes. Are you styling for an upcoming conference trip (like Finland), shopping for a warm getaway, or looking to build a modular outfit? Let me know!`,
        timestamp: new Date(),
        suggestedActions: [
          { id: 'sa-1', label: 'Trip to Finland', prompt: 'Help me put together a summer wardrobe for my trip to Finland.' },
          { id: 'sa-2', label: 'Spain Holiday', prompt: 'Show me beach holiday items for Spain.' },
          { id: 'sa-3', label: 'Modular Outfit Builder', prompt: 'Help me build an outfit.' },
          { id: 'sa-4', label: 'Track Recent Orders', prompt: 'Show my orders' }
        ]
      }
    ],
    isProcessing: false,
    suggestedActions: [
      { id: 'sa-1', label: 'Trip to Finland', prompt: 'Help me put together a summer wardrobe for my trip to Finland.' },
      { id: 'sa-2', label: 'Spain Holiday', prompt: 'Show me beach holiday items for Spain.' },
      { id: 'sa-3', label: 'Modular Outfit Builder', prompt: 'Help me build an outfit.' },
      { id: 'sa-4', label: 'Track Recent Orders', prompt: 'Show my orders' }
    ]
  },
  cart: [],
  wishlist: [],
  activeComponents: [],
  theme: 'dark',
  orderConfirmed: false
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  sendMessage: (text: string) => Promise<void>;
  addToCart: (product: Product, size: string, color: string) => void;
  setOrderConfirmed: (confirmed: boolean) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const sendMessage = async (text: string) => {
    // Add User Message
    const userMsgId = `msg-user-${generateId().substring(0, 4)}`;
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: userMsgId,
        role: 'user',
        content: text,
        timestamp: new Date()
      }
    });

    dispatch({ type: 'SET_PROCESSING', payload: true });

    try {
      // Process through LLM Orchestrator
      const response = await LLMOrchestrator.processInput(text, state.orderConfirmed);

      const aiMsgId = `msg-ai-${generateId().substring(0, 4)}`;
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: aiMsgId,
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
          components: response.components,
          suggestedActions: response.suggestedActions
        }
      });

      // Update active viewport components
      dispatch({ type: 'SET_COMPONENTS', payload: response.components });
      dispatch({ type: 'SET_SUGGESTIONS', payload: response.suggestedActions });
    } catch (err) {
      console.error('Error styling query:', err);
    } finally {
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  };

  const addToCart = (product: Product, size: string, color: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, selectedSize: size, selectedColor: color, quantity: 1 }
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId, size, color }
    });
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { productId, size, color, quantity }
    });
  };

  const toggleWishlist = (product: Product) => {
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setOrderConfirmed = (confirmed: boolean) => {
    dispatch({ type: 'SET_ORDER_CONFIRMED', payload: confirmed });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        sendMessage,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        clearCart,
        setOrderConfirmed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside an AppProvider');
  return context;
};
