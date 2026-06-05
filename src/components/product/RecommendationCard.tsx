import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../types/common';
import { Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './RecommendationCard.css';
import { products } from '../../data/products';

interface RecommendationCardProps {
  product: Product;
  reasoning: string;
  matchScore: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  product,
  reasoning,
  matchScore
}) => {
  const { addToCart, toggleWishlist, state } = useApp();
  const isWishlisted = state.wishlist.some(item => item.product.id === product.id);

  const imageGenerator =  (id: string) => {
      // get from products data
      const imageUrl = products.find(p => p.id === id)?.images[0];
      return imageUrl;
    }

  return (
    <div className="rec-card glass-strong gold-border gold-glow">
      {/* Sparkle overlay badge */}
      <div className="rec-badge">
        <Sparkles size={12} />
        <span>AI Stylist Match</span>
      </div>

      <div className="rec-split-layout">
        {/* Visual Showcase */}
        <div className="rec-image-showcase" style={{ backgroundImage: `url(${imageGenerator(product.id)})` }}>
          <div className="rec-brand-watermark">{product.brand.split(' ')[0]}</div>
          <div className="rec-match-score">
            <span className="number">{matchScore}%</span>
            <span className="label">Match</span>
          </div>
        </div>

        {/* Curation Commentary */}
        <div className="rec-info">
          <span className="rec-brand">{product.brand}</span>
          <h3 className="rec-name">{product.name}</h3>

          <div className="rec-price">{formatPrice(product.price, product.currency)}</div>

          <div className="rec-commentary">
            <h5 className="commentary-header">
              <Sparkles size={10} className="comment-sparkle" />
              Stylist Notes
            </h5>
            <p className="commentary-text">{reasoning}</p>
          </div>

          <div className="rec-actions">
            <button
              className="rec-action-cart"
              onClick={() => {
                const size = product.sizes.find(s => s.inStock)?.value || 's';
                const color = product.colors[0]?.name || 'default';
                addToCart(product, size, color);
                const mainStage = document.querySelector<HTMLElement>('.app-stage-pane');
                mainStage?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ShoppingBag size={14} />
              <span>Add to Wardrobe</span>
            </button>

            <button
              className={`rec-action-wishlist glass ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Add to Wishlist"
            >
              <Heart size={14} fill={isWishlisted ? 'var(--color-accent-rose)' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecommendationCard;
