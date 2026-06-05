import React from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AppShell.css';

interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  onCartClick: () => void;
  onWishlistClick: () => void;
  contextLabel?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  sidebar,
  children,
  onCartClick,
  onWishlistClick,
  contextLabel = 'LUXE Curation'
}) => {
  const { state } = useApp();

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <div className="app-shell-root bg-gradient-subtle">
      {/* Dynamic ambient backdrop light */}
      <div className="ambient-glow" />

      {/* Luxury Header */}
      <header className="app-header glass">
        <div className="header-left">
          <h1 className="logo text-gradient">LUXE</h1>
          <span className="divider" />
          <span className="header-context-tag">{contextLabel}</span>
        </div>

        <div className="header-right">
          {/* Wishlist Button */}
          <button className="header-action-btn glass" onClick={onWishlistClick} aria-label="Favorites">
            <Heart size={16} />
            {wishlistCount > 0 && <span className="counter-badge">{wishlistCount}</span>}
          </button>

          {/* Cart Button */}
          <button className="header-action-btn glass" onClick={onCartClick} aria-label="Cart">
            <ShoppingBag size={16} />
            {cartCount > 0 && <span className="counter-badge gold">{cartCount}</span>}
          </button>

          <span className="divider" />

          {/* User profile avatar */}
          <div className="user-profile-badge">
            <div className="avatar glass">
              <User size={12} />
            </div>
            <span className="username">{state.user.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="app-main-layout">
        <aside className="app-sidebar-pane">{sidebar}</aside>
        <main className="app-stage-pane">{children}</main>
      </div>
    </div>
  );
};
export default AppShell;
