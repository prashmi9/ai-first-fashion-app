import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../types/common';
import { Sparkles, ShoppingBag, RefreshCw } from 'lucide-react';
import './OutfitBuilder.css';

interface OutfitBuilderProps {
  topOptions: Product[];
  bottomOptions: Product[];
  footwearOptions: Product[];
  accessoryOptions: Product[];
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  topOptions,
  bottomOptions,
  footwearOptions,
  accessoryOptions
}) => {
  const { addToCart,  } = useApp();
  const [showSuccess, setShowSuccess] = useState(false);

  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);
  const [footIdx, setFootIdx] = useState(0);
  const [accIdx, setAccIdx] = useState(0);

  const selectedTop = topOptions[topIdx] || null;
  const selectedBottom = bottomOptions[bottomIdx] || null;
  const selectedFoot = footwearOptions[footIdx] || null;
  const selectedAcc = accessoryOptions[accIdx] || null;

  const totalOutfitPrice =
    (selectedTop?.price || 0) +
    (selectedBottom?.price || 0) +
    (selectedFoot?.price || 0) +
    (selectedAcc?.price || 0);

  const handleShuffle = () => {
    if (topOptions.length > 1) setTopIdx(Math.floor(Math.random() * topOptions.length));
    if (bottomOptions.length > 1) setBottomIdx(Math.floor(Math.random() * bottomOptions.length));
    if (footwearOptions.length > 1) setFootIdx(Math.floor(Math.random() * footwearOptions.length));
    if (accessoryOptions.length > 1) setAccIdx(Math.floor(Math.random() * accessoryOptions.length));
  };

  const handleAddOutfitToCart = () => {
    const items = [selectedTop, selectedBottom, selectedFoot, selectedAcc].filter(Boolean) as Product[];
    items.forEach(p => {
      const size = p.sizes.find(s => s.inStock)?.value || 's';
      const color = p.colors[0]?.name || 'default';
      addToCart(p, size, color);
    });
    
    // Show success feedback on cart icon
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    // Scroll to top to reveal cart icon
    const mainStage = document.querySelector<HTMLElement>('.app-stage-pane');
    mainStage?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="outfit-card glass gold-border gold-glow animate-slide-up">
      <div className="outfit-header">
        <div className="outfit-ai-tag">
          <Sparkles size={12} />
          <span>AI Wardrobe Capsule</span>
        </div>
        <button className="outfit-shuffle-btn glass" onClick={handleShuffle} aria-label="Shuffle looks">
          <RefreshCw size={12} />
          <span>Restyle</span>
        </button>
      </div>

      {showSuccess && (
        <div className="outfit-success-toast">
          <div className="success-icon">✓</div>
          <span className="success-message">Outfit added to cart</span>
        </div>
      )}

      <div className="outfit-slots">
        {/* Top */}
        {selectedTop && (
          <div className="outfit-slot">
            <span className="slot-lbl">Layer One (Top)</span>
            <div className="slot-item-details">
              <img src={selectedTop.images[0]} alt={selectedTop.name} className="slot-item-image" />
              <span className="brand">{selectedTop.brand}</span>
              <span className="name">{selectedTop.name}</span>
              <span className="price">{formatPrice(selectedTop.price)}</span>
            </div>
            {topOptions.length > 1 && (
              <button className="slot-cycle glass" onClick={() => setTopIdx((topIdx + 1) % topOptions.length)}>Cycle</button>
            )}
          </div>
        )}

        {/* Bottom */}
        {selectedBottom && (
          <div className="outfit-slot">
            <span className="slot-lbl">Foundation (Bottom)</span>
            <div className="slot-item-details">
              <img src={selectedBottom.images[0]} alt={selectedBottom.name} className="slot-item-image" />
              <span className="brand">{selectedBottom.brand}</span>
              <span className="name">{selectedBottom.name}</span>
              <span className="price">{formatPrice(selectedBottom.price)}</span>
            </div>
            {bottomOptions.length > 1 && (
              <button className="slot-cycle glass" onClick={() => setBottomIdx((bottomIdx + 1) % bottomOptions.length)}>Cycle</button>
            )}
          </div>
        )}

        {/* Footwear */}
        {selectedFoot && (
          <div className="outfit-slot">
            <span className="slot-lbl">Footwear</span>
            <div className="slot-item-details">
              <img src={selectedFoot.images[0]} alt={selectedFoot.name} className="slot-item-image" />
              <span className="brand">{selectedFoot.brand}</span>
              <span className="name">{selectedFoot.name}</span>
              <span className="price">{formatPrice(selectedFoot.price)}</span>
            </div>
            {footwearOptions.length > 1 && (
              <button className="slot-cycle glass" onClick={() => setFootIdx((footIdx + 1) % footwearOptions.length)}>Cycle</button>
            )}
          </div>
        )}

        {/* Accessory */}
        {selectedAcc && (
          <div className="outfit-slot">
            <span className="slot-lbl">Accessory</span>
            <div className="slot-item-details">
              <img src={selectedAcc.images[0]} alt={selectedAcc.name} className="slot-item-image" />
              <span className="brand">{selectedAcc.brand}</span>
              <span className="name">{selectedAcc.name}</span>
              <span className="price">{formatPrice(selectedAcc.price)}</span>
            </div>
            {accessoryOptions.length > 1 && (
              <button className="slot-cycle glass" onClick={() => setAccIdx((accIdx + 1) % accessoryOptions.length)}>Cycle</button>
            )}
          </div>
        )}
      </div>

      <div className="outfit-divider" />

      {/* Pricing and Actions */}
      <div className="outfit-summary-row">
        <div className="outfit-pricing">
          <span className="lbl">Complete Capsule Price</span>
          <span className="price">{formatPrice(totalOutfitPrice)}</span>
        </div>

        <button className="outfit-buy-btn" onClick={handleAddOutfitToCart}>
          <ShoppingBag size={14} />
          <span>Add Outfit to Cart</span>
        </button>
      </div>
    </div>
  );
};
export default OutfitBuilder;
