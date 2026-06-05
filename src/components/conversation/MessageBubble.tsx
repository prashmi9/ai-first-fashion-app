import React from 'react';
import type { ConversationMessage } from '../../types/conversation';
import { Sparkles, User } from 'lucide-react';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: ConversationMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAi = message.role === 'assistant';
  const isSystem = message.role === 'system';

  const formatText = (text: string) => {
    // Simple custom bold matching for markdown (**bold**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--color-accent-gold-light)' }}>{part.slice(2, -2)}</strong>;
      }
      // Simple header bold support
      if (part.startsWith('### ')) {
        return <h4 key={i} className="bubble-header">{part.slice(4)}</h4>;
      }
      return part;
    });
  };

  if (isSystem) {
    return (
      <div className="bubble-system-container animate-fade-in">
        <span className="bubble-system">{message.content}</span>
      </div>
    );
  }

  return (
    <div className={`bubble-container ${isAi ? 'ai' : 'user'} animate-fade-in-up`}>
      {/* Sender Tag */}
      <div className="bubble-avatar-row">
        {isAi ? (
          <div className="bubble-avatar ai glass">
            <Sparkles size={10} className="ai-icon" />
          </div>
        ) : (
          <div className="bubble-avatar user glass">
            <User size={10} />
          </div>
        )}
        <span className="bubble-sender">{isAi ? 'LUXE Stylist' : 'You'}</span>
      </div>

      {/* Bubble Panel */}
      <div className={`bubble-content glass-strong ${isAi ? 'ai' : 'user'}`}>
        <p className="bubble-text">{formatText(message.content)}</p>
      </div>
      
      <span className="bubble-time">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};
export default MessageBubble;
