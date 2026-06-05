import React from 'react';
import type { ComponentInstance } from '../../types/conversation';
import { DynamicRenderer } from '../../registry/DynamicRenderer';
import { Sparkles, Shirt, Compass, Star } from 'lucide-react';
import './MainStage.css';

interface MainStageProps {
  components: ComponentInstance[];
  onSuggestionClick?: (prompt: string) => void;
}

export const MainStage: React.FC<MainStageProps> = ({
  components,
  onSuggestionClick
}) => {
  const isEmpty = !components || components.length === 0;

  return (
    <div className="main-stage-container">
      {isEmpty ? (
        <div className="stage-welcome animate-fade-in-up">
          <div className="welcome-glow-dot" />

          <div className="welcome-header">
            <Sparkles className="sparkle-gold animate-float" size={32} />
            <h1 className="welcome-title text-gradient">LUXE STYLING</h1>
            <p className="welcome-subtitle">AI-First Personal Fashion Curation</p>
          </div>

          <div className="welcome-divider" />

          {/* Luxury features layout */}
          <div className="welcome-features">
            <div className="feature-card glass">
              <Compass className="icon" size={16} />
              <h4 className="title">Travel planner</h4>
              <p className="desc">Plan your trips with style, considering weather, activities, and local fashion trends.</p>
            </div>

            <div className="feature-card glass">
              <Shirt className="icon" size={16} />
              <h4 className="title">Contextual Styling</h4>
              <p className="desc">Get styled for any occasion with AI-powered recommendations based on your preferences and body type.</p>
            </div>

            <div className="feature-card glass">
              <Star className="icon" size={16} />
              <h4 className="title">Styling Expert</h4>
              <p className="desc">AI-powered styling advice tailored to your preferences and body type.</p>
            </div>
          </div>

          {/* Quickstart links */}
          <div className="welcome-quickstart">
            <span className="qs-lbl">Quick suggestions to start</span>
            <div className="qs-chips">
              <button
                className="qs-chip glass"
                onClick={() => onSuggestionClick?.('I need styling for a summer trip to Finland.')}
              >
                "Style a summer trip to Finland"
              </button>
              <button
                className="qs-chip glass"
                onClick={() => onSuggestionClick?.('Show my orders')}
              >
                "Show my order history and tracking"
              </button>
              <button
                className="qs-chip glass"
                onClick={() => onSuggestionClick?.('Help me build a complete outfit look')}
              >
                "Launch modular Outfit Builder"
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="stage-active-components">
          <DynamicRenderer components={components} />
        </div>
      )}
    </div>
  );
};
export default MainStage;
