import React from 'react';
import './TypingIndicator.css';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator glass">
      <div className="typing-dots">
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
      </div>
      <span className="typing-lbl">LUXE is styling...</span>
    </div>
  );
};
export default TypingIndicator;
