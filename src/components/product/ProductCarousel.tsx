import React, { useRef } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductCarousel.css';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  onSelectProduct
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="product-carousel-section">
      <div className="product-carousel-header">
        <h3 className="product-carousel-title">{title}</h3>
        
        <div className="product-carousel-controls">
          <button className="carousel-btn glass" onClick={() => scroll('left')} aria-label="Scroll Left">
            <ChevronLeft size={16} />
          </button>
          <button className="carousel-btn glass" onClick={() => scroll('right')} aria-label="Scroll Right">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="product-carousel-track" ref={scrollRef}>
        {products.map(product => (
          <div key={product.id} className="carousel-item">
            <ProductCard product={product} onSelect={onSelectProduct} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductCarousel;
