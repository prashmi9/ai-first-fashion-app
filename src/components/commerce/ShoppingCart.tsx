import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../types/common';
import { Trash2, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';
import './ShoppingCart.css';

export const ShoppingCart: React.FC = () => {
  const { state, updateCartQuantity, removeFromCart, sendMessage } = useApp();

  const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  
  // Gold membership discounts (15% if GOLD15 applied, otherwise 0)
  const discountRate = state.user.loyaltyTier === 'gold' ? 0.15 : 0;
  const discount = subtotal * discountRate;
  const total = subtotal - discount + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="cart-container glass animate-slide-up">
        <div className="cart-empty">
          <ShoppingBag size={48} className="cart-empty-icon" />
          <h4 className="cart-empty-title">Your Wardrobe Bag is Empty</h4>
          <p className="cart-empty-subtitle">Talk to your personal stylist to find your next favorite outfit look!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container glass animate-slide-up">
      <h3 className="cart-title">Your Wardrobe Selections</h3>
      
      <div className="cart-layout">
        {/* Cart items list */}
        <div className="cart-items">
          {state.cart.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
              <div className="cart-item-img-placeholder" style={{ backgroundImage: `url(${item.product.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <span className="initials">{item.product.brand[0]}</span>
              </div>

              <div className="cart-item-details">
                <div className="cart-item-header">
                  <span className="brand">{item.product.brand}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <h4 className="title">{item.product.name}</h4>
                
                <div className="specs">
                  <span className="spec-tag">Size: {item.selectedSize.toUpperCase()}</span>
                  <span className="spec-tag">Color: {item.selectedColor}</span>
                </div>

                <div className="cart-item-pricing-row">
                  <div className="quantity-selector">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <span className="price">{formatPrice(item.product.price * item.quantity, item.product.currency)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="cart-summary">
          <h4 className="summary-title">Summary</h4>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount">
              <span>Gold Status Discount (15%)</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row total">
            <span>Total</span>
            <span className="total-val">{formatPrice(total)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => sendMessage('Let\'s proceed with checkout and purchase options.')}
          >
            <CreditCard size={14} />
            <span>Proceed to checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
