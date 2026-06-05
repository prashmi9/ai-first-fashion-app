import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { ChatPanel } from './components/conversation/ChatPanel';
import { MainStage } from './components/layout/MainStage';
import { ShoppingCart } from './components/commerce/ShoppingCart';
import { CheckoutSummary } from './components/commerce/CheckoutSummary';

const MainAppContent: React.FC = () => {
  const { state, sendMessage } = useApp();
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'cart' | 'wishlist'>('none');

  const getActiveContextLabel = () => {
    if (state.activeComponents.some(c => c.type === 'WeatherWidget')) {
      return '✈️ Traveling Climate Stylist';
    }
    if (state.activeComponents.some(c => c.type === 'OutfitBuilder')) {
      return '👔 Capsule Outfit Designer';
    }
    if (state.activeComponents.some(c => c.type === 'ShoppingCart' || c.type === 'CheckoutSummary')) {
      return '💳 Secure Luxury Checkout';
    }
    return '💎 LUXE Elite Curation';
  };

  const handleSuggestionClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <AppShell
      sidebar={<ChatPanel />}
      onCartClick={() => {
        // Toggle Shopping Cart component onto viewport
        sendMessage('Show my shopping bag.');
        const mainStage = document.querySelector<HTMLElement>('.app-stage-pane');
        mainStage?.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onWishlistClick={() => {
        // Toggle Wishlist components onto viewport
        sendMessage('Show my favorites wishlist.');
        const mainStage = document.querySelector<HTMLElement>('.app-stage-pane');
        mainStage?.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      contextLabel={getActiveContextLabel()}
    >
      <MainStage
        components={state.activeComponents}
        onSuggestionClick={handleSuggestionClick}
      />
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
