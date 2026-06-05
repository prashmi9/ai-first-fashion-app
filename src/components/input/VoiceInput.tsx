import React from 'react';
import { Mic, Sparkles } from 'lucide-react';
import './VoiceInput.css';

interface VoiceInputProps {
  isListening: boolean;
  transcript?: string;
  onToggle: () => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  isListening,
  transcript,
  onToggle
}) => {
  return (
    <div className="voice-input-panel">
      {/* Pulse Ripple and Waveform */}
      <div className="voice-indicator">
        <button
          className={`voice-mic-btn ${isListening ? 'active' : ''}`}
          onClick={onToggle}
          aria-label={isListening ? 'Stop Listening' : 'Start Voice Input'}
        >
          <Mic size={18} />
        </button>

        {isListening && (
          <div className="voice-waves">
            <span className="wave wave-1" />
            <span className="wave wave-2" />
            <span className="wave wave-3" />
            <span className="wave wave-4" />
            <span className="wave wave-5" />
          </div>
        )}
      </div>

      <div className="voice-details">
        <div className="voice-status-row">
          <Sparkles className="sparkle" size={10} />
          <span className="voice-status">{isListening ? 'Listening...' : 'Tap Mic to speak'}</span>
        </div>
        <p className="voice-transcript">{transcript || 'Say "Show outfits for Finland trip" or "Track my order"...'}</p>
      </div>
    </div>
  );
};
export default VoiceInput;
