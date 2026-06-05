import React, { useState } from 'react';
import type { Size } from '../../types/product';
import './SizeSelector.css';

interface SizeSelectorProps {
  sizes: Size[];
  savedSize?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, savedSize }) => {
  const [selected, setSelected] = useState<string | null>(savedSize || null);

  return (
    <div className="size-selector-container glass animate-slide-up" role="group" aria-label="Size selector">
      <div className="size-selector-header">
        <span className="size-lbl">Select Your Fit</span>
        {savedSize && <span className="size-saved-hint">Profile Saved Size: **{savedSize}**</span>}
      </div>

      <div className="size-chips-row">
        {sizes.map(size => (
          <button
            key={size.value}
            type="button"
            disabled={!size.inStock}
            aria-pressed={selected === size.value}
            className={`size-chip glass ${selected === size.value ? 'active' : ''} ${!size.inStock ? 'out-of-stock' : ''}`}
            onClick={() => setSelected(size.value)}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SizeSelector;
