import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../types/common';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { MCPClient } from '../../mcp/MCPClient';
import type { CartItem } from '../../types/product';
import './CheckoutSummary.css';

interface OrderConfirmationData {
  orderId: string;
  total: number;
  paymentMethod: string;
  items: CartItem[];
}

export const CheckoutSummary: React.FC = () => {
  const { state, clearCart } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Visa (**** **** 4242)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmationData | null>(null);

  const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const loyaltyDiscount = state.user.loyaltyTier === 'gold' ? subtotal * 0.15 : 0;
  const promoDiscount = appliedPromo ? subtotal * 0.10 : 0; // Flat 10% for any valid promo
  const shipping = subtotal > 150 ? 0 : 15.0;
  const total = subtotal - loyaltyDiscount - promoDiscount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'WELCOME10' || promoCode.toUpperCase() === 'GOLD15') {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try WELCOME10 or GOLD15.');
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const resp = await MCPClient.invokeTool('createOrder', {
        items: state.cart,
        paymentMethod
      });

      if (resp.success && resp.data) {
        const orderData = resp.data as { orderId: string; total: number };

        setOrderConfirmation({
          orderId: orderData.orderId,
          total: orderData.total ?? total,
          paymentMethod,
          items: [...state.cart]
        });

        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.cart.length === 0 && !orderConfirmation) return null;

  return (
    <div className="checkout-summary glass-strong gold-border animate-slide-up">
      {orderConfirmation ? (
        <>
          <h3 className="checkout-title">Order Confirmed</h3>
          <p className="confirmation-copy">
            Thank you, {state.user.name.split(' ')[0]}! Your order <strong>{orderConfirmation.orderId}</strong> is being processed. A confirmation email will be sent to you shortly.
          </p>

          <div className="order-confirmation-grid">
            <div className="confirmation-panel glass">
              <h4>Order Breakdown</h4>
              <p> Order Id: {orderConfirmation.orderId} </p>
              {orderConfirmation.items.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="checkout-item-row">
                  <span className="name">{item.product.name} (x{item.quantity})</span>
                  <span className="val">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="checkout-divider" />
              <div className="calc-row total">
                <span>Total Paid</span>
                <span className="total-val">{formatPrice(orderConfirmation.total)}</span>
              </div>
            </div>

            <div className="confirmation-panel glass">
              <h4>Shipping & Payment</h4>
              <p><strong>Payment Method:</strong> {orderConfirmation.paymentMethod}</p>
              <p><strong>Loyalty Reward:</strong> +100 XP</p>
              <p>Your premium fashion pieces will be packaged in eco-luxury boxes and dispatched shortly.</p>
            </div>
          </div>

          <div className="checkout-trust">
            <div className="trust-item">
              <ShieldCheck size={12} />
              <span>Secure SSL</span>
            </div>
            <div className="trust-item">
              <Truck size={12} />
              <span>Carbon Neutral</span>
            </div>
            <div className="trust-item">
              <RotateCcw size={12} />
              <span>Free Returns</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="checkout-title">Secure Styling Checkout</h3>

          {/* Cart Summary overview */}
          <div className="checkout-items">
            {state.cart.map(item => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="checkout-item-row">
                <span className="name">{item.product.name} (x{item.quantity})</span>
                <span className="val">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-divider" />

          {/* Promo Form */}
          <form onSubmit={handleApplyPromo} className="promo-form">
            <input
              type="text"
              placeholder="Promo code (e.g. WELCOME10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input glass"
            />
            <button type="submit" className="promo-btn glass">Apply</button>
          </form>

          {appliedPromo && (
            <div className="promo-applied">
              <Sparkles size={12} />
              <span>Promo {appliedPromo} applied (10% off)</span>
            </div>
          )}

          <div className="checkout-divider" />

          {/* Calculation Box */}
          <div className="checkout-calc">
            <div className="calc-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {loyaltyDiscount > 0 && (
              <div className="calc-row discount">
                <span>Gold Member Reward (15%)</span>
                <span>-{formatPrice(loyaltyDiscount)}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="calc-row discount">
                <span>Promo Discount (10%)</span>
                <span>-{formatPrice(promoDiscount)}</span>
              </div>
            )}
            <div className="calc-row">
              <span>Eco-Luxury Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="checkout-divider" />
            <div className="calc-row total">
              <span>Total Payable</span>
              <span className="total-val">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Payment Selector */}
          <div className="checkout-payment">
            <label className="payment-label">Select Payment</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select glass"
            >
              <option value="Visa (**** **** 4242)">Visa ending in **** **** 4242</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="checkout-place-btn"
          >
            {isProcessing ? 'Processing Transaction...' : `Pay ${formatPrice(total)}`}
          </button>

          {/* Trust badges */}
          <div className="checkout-trust">
            <div className="trust-item">
              <ShieldCheck size={12} />
              <span>Secure SSL</span>
            </div>
            <div className="trust-item">
              <Truck size={12} />
              <span>Carbon Neutral</span>
            </div>
            <div className="trust-item">
              <RotateCcw size={12} />
              <span>Free Returns</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CheckoutSummary;
