import React from 'react';
import type { SuggestedAction } from '../../types/conversation';
import { Sparkles, Shirt, ShoppingBag, Sun, Tag, Package } from 'lucide-react';
import './SuggestionChips.css';

interface SuggestionChipsProps {
  suggestions: SuggestedAction[];
  onSelect: (action: SuggestedAction) => void;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelect }) => {
  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('trip') || l.includes('finland') || l.includes('weather') || l.includes('maldives') || l.includes('sun')) {
      return <Sun size={10} className="chip-icon-active" />;
    }
    if (l.includes('trip') || l.includes('norway') || l.includes('weather') || l.includes('maldives') || l.includes('sun')) {
      return <Sun size={10} className="chip-icon-active" />;
    }
    if (l.includes('promo') || l.includes('discount') || l.includes('offer') || l.includes('sale')) {
      return <Tag size={10} className="chip-icon-active" />;
    }
    if (l.includes('outfit') || l.includes('style') || l.includes('match')) {
      return <Shirt size={10} className="chip-icon-active" />;
    }
    if (l.includes('order') || l.includes('package') || l.includes('history') || l.includes('track')) {
      return <Package size={10} className="chip-icon-active" />;
    }
    return <Sparkles size={10} className="chip-icon-active" />;
  };

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestion-chips-container" role="group" aria-label="Suggested actions">
      {suggestions.map(sug => (
        <button
          key={sug.id}
          type="button"
          className="suggestion-chip glass"
          onClick={() => onSelect(sug)}
          aria-label={`Suggestion: ${sug.label}`}
        >
          {getIcon(sug.label)}
          <span>{sug.label}</span>
        </button>
      ))}
    </div>
  );
};
export default SuggestionChips;
