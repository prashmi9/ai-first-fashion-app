import React from 'react';
import { Search } from 'lucide-react';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSubmit?.();
  };

  return (
    <div className="search-input-container glass">
      <label htmlFor="search-input" className="visually-hidden">
        Search premium catalog
      </label>
      <Search size={14} className="search-icon" />
      <input
        id="search-input"
        type="text"
        placeholder="Filter premium catalog..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-field"
        aria-label="Search premium catalog"
      />
    </div>
  );
};
export default SearchInput;
