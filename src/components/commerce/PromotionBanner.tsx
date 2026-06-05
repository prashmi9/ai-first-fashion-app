import React, { useState } from 'react';
import type { Promotion } from '../../types/common';
import { Sparkles, X } from 'lucide-react';
import './PromotionBanner.css';

interface PromotionBannerProps {
  promotions: Promotion[];
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ promotions }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !promotions || promotions.length === 0) return null;

  const current = promotions[0]; // Spotlight the main promotion

  return (
    <div className="promo-banner-container animate-shimmer">
      <div className="promo-banner-content">
        <Sparkles className="promo-sparkle" size={14} />
        <div className="promo-text">
          <span className="promo-tag">EXCLUSIVE:</span>
          <span className="promo-title">{current.title}</span>
          <span className="promo-desc">— {current.description} Use code **{current.code}**</span>
        </div>
      </div>
      <button className="promo-close-btn" onClick={() => setIsVisible(false)} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
};
export default PromotionBanner;
