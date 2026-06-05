import React from 'react';
import type { Product } from '../../types/product';
import { Badge } from '../shared/Badge';
import { formatPrice } from '../../types/common';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ProductCard.css';
import { products } from '../../data/products';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, toggleWishlist, state } = useApp();

  const isWishlisted = state.wishlist.some(item => item.product.id === product.id);

  // Generate an elegant, unique luxury gradient based on the product ID hash
  // const getGradientClass = (id: string) => {
  //   let hash = 0;
  //   for (let i = 0; i < id.length; i++) {
  //     hash = id.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   const hue1 = Math.abs(hash % 360);
  //   const hue2 = (hue1 + 40) % 360;
  //   return `linear-gradient(135deg, hsl(${hue1}, 25%, 15%) 0%, hsl(${hue2}, 30%, 8%) 100%)`;
  // };

  const imageGenerator =  (id: string) => {
    // get from products data
    const imageUrl = products.find(p => p.id === id)?.images[0];
    return imageUrl;
  }

  const gradientStyle = {
    backgroundImage: `url(${imageGenerator(product.id)})`
  };

  const handleSelect = () => {
    onSelect?.(product);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(product);
    }
  };

  return (
    <article
      className="product-card glass"
      role="button"
      tabIndex={0}
      aria-label={`Select ${product.name}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      {/* Product Image Area */}
      <div className="product-image-container" style={gradientStyle}>
        <div className="product-brand-initials">{product.brand.split(' ').map(w => w[0]).join('')}</div>

        {/* Badges */}
        <div className="product-badges">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestseller && <Badge variant="default">Bestseller</Badge>}
          {!product.inStock && <Badge variant="error">Sold Out</Badge>}
        </div>

        {/* Favorite Action Button */}
        <button
          className={`product-wishlist-btn glass ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Add to Wishlist"
        >
          <Heart className="wishlist-icon" fill={isWishlisted ? 'var(--color-accent-rose)' : 'none'} />
        </button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <span className="product-brand">{product.brand}</span>
        <h4 className="product-title">{product.name}</h4>

        <div className="product-meta">
          <div className="product-rating">
            <Star className="star-icon" fill="var(--color-accent-gold)" size={12} />
            <span>{product.rating.toFixed(1)}</span>
            <span className="reviews">({product.reviewCount})</span>
          </div>

          <div className="product-pricing">
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice, product.currency)}</span>
            )}
            <span className="current-price">{formatPrice(product.price, product.currency)}</span>
          </div>
        </div>

        {/* Add to Cart quick CTA */}
        {product.inStock && (
          <button
            type="button"
            className="product-quick-add"
            onClick={(e) => {
              e.stopPropagation();
              const size = product.sizes.find(s => s.inStock)?.value || 's';
              const color = product.colors[0]?.name || 'default';
              addToCart(product, size, color);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            <span>Buy</span>
          </button>
        )}
      </div>
    </article>
  );
};
export default ProductCard;
