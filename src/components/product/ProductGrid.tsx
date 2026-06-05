import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../shared/Skeleton';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  title?: string;
  onSelectProduct?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  onSelectProduct
}) => {
  const isLoading = !products || products.length === 0;

  return (
    <div className="product-grid-section">
      {title && <h3 className="product-grid-title">{title}</h3>}
      
      {isLoading ? (
        <div className="product-grid-container">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} variant="card" />
          ))}
        </div>
      ) : (
        <div className="product-grid-container">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-grid-item"
              style={{
                animation: `fadeInUp 0.6s ease both`,
                animationDelay: `${index * 50}ms`
              }}
            >
              <ProductCard product={product} onSelect={onSelectProduct} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductGrid;
