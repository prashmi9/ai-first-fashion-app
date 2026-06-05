import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import './StyleQuiz.css';

export const StyleQuiz: React.FC = () => {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    style: 'Minimalist',
    color: '#0f172a',
    budget: 250,
    occasions: ['casual']
  });

  const styles = ['Minimalist', 'Classic', 'Bohemian', 'Streetwear', 'Glamorous'];
  const colors = [
    { name: 'Navy', hex: '#0f172a' },
    { name: 'Emerald', hex: '#064e3b' },
    { name: 'Oatmeal', hex: '#e2d6c5' },
    { name: 'Ivory', hex: '#f8fafc' },
    { name: 'Wine', hex: '#4c0519' }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Update preferences in global context state
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        favoriteColors: [selections.color],
        favoriteBrands: ['Maison Laurent', 'Velvet & Stone'],
        preferredStyles: [selections.style],
        avoidStyles: ['Sporty'],
        priceRange: { min: 50, max: selections.budget }
      }
    });

    // Append AI confirmation comment
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: `msg-quiz-${Date.now()}`,
        role: 'assistant',
        content: `### 🎯 Style Profile Calibrated!\n\nThank you for completing your styling assessment, ${state.user.name.split(' ')[0]}! \n\n* **Style Direction:** ${selections.style}\n* **Fav Color Palette:** HSL Custom Swatch\n* **Target Price Range:** £50 - £${selections.budget}\n\nI've refreshed your LUXE styling engine. Try asking: **"Show outfits under £${selections.budget}"** or **"Suggest everyday pieces matching my new style"**!`,
        timestamp: new Date()
      }
    });
  };

  return (
    <div className="quiz-card glass gold-border animate-slide-up">
      {/* Progress */}
      <div className="quiz-header">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <span className="quiz-step-lbl">Step {step} of 3</span>
      </div>

      <div className="quiz-body">
        {step === 1 && (
          <div className="quiz-step">
            <h4 className="quiz-step-title">Select your primary aesthetic</h4>
            <div className="quiz-options">
              {styles.map(sty => (
                <button
                  key={sty}
                  className={`quiz-opt-btn glass ${selections.style === sty ? 'active' : ''}`}
                  onClick={() => setSelections({ ...selections, style: sty })}
                >
                  {sty}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="quiz-step">
            <h4 className="quiz-step-title">Choose your core palette color</h4>
            <div className="quiz-colors-row">
              {colors.map(col => (
                <button
                  key={col.hex}
                  className={`quiz-color-swatch ${selections.color === col.hex ? 'active' : ''}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => setSelections({ ...selections, color: col.hex })}
                  aria-label={col.name}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="quiz-step">
            <h4 className="quiz-step-title">Set your luxury outerwear budget</h4>
            <div className="quiz-slider-container">
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={selections.budget}
                onChange={(e) => setSelections({ ...selections, budget: parseInt(e.target.value, 10) })}
                className="quiz-range-slider"
              />
              <div className="quiz-budget-val">£{selections.budget} max</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-footer">
        {step > 1 ? (
          <button className="quiz-nav-btn back glass" onClick={handleBack}>
            <ArrowLeft size={12} />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button className="quiz-nav-btn next" onClick={handleNext}>
            <span>Next</span>
            <ArrowRight size={12} />
          </button>
        ) : (
          <button className="quiz-nav-btn finish" onClick={handleComplete}>
            <Sparkles size={12} />
            <span>Finish Style</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default StyleQuiz;
