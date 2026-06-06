import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { SuggestionChips } from './SuggestionChips';
import { VoiceInput } from '../input/VoiceInput';
import { ArrowRight, MessageSquareCode, PlusCircle } from 'lucide-react';
import './ChatPanel.css';

export const ChatPanel: React.FC = () => {
  const { state, sendMessage, dispatch } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.conversation.messages, state.conversation.isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      // Mock Speech Recognition Confirmation
      const spokenText = inputText || 'I need outfits for a Conference to Finland. My budget is €500.';
      setIsListening(false);
      setInputText('');
      setTranscript('');
      sendMessage(spokenText);
    } else {
      setIsListening(true);
      setTranscript('Listening for your voice intent...');
      setInputText('');
      // Simulated spoken input
      setTimeout(() => {
        setTranscript('What should I pack for Finland in summer?');
        setInputText('What should I pack for Finland in summer?');
      }, 3000);
    }
  };

  const handleSuggestionSelect = (sug: { prompt: string }) => {
    sendMessage(sug.prompt);
  };

  const handleNewChat = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'SET_COMPONENTS',
      payload: []
    });
    // Add greet initial message
    dispatch({
      type: 'SET_SUGGESTIONS',
      payload: [
        { id: 'sa-1', label: 'Trip to Finland', prompt: 'Help me put together a summer wardrobe for my trip to Finland.' },
        { id: 'sa-2', label: 'Trip to Norway', prompt: 'I need outfits for a winter trip to Norway.' },
        { id: 'sa-3', label: 'Spain Holiday', prompt: 'Show me beach holiday items for Spain.' },
        { id: 'sa-4', label: 'Modular Outfit Builder', prompt: 'Help me build an outfit.' },
        { id: 'sa-5', label: 'Track Recent Orders', prompt: 'Show my orders' }
      ]
    });
  };

  return (
    <div className="chat-panel glass">
      {/* Sidebar Header */}
      <div className="chat-header">
        <div className="logo-group">
          <MessageSquareCode className="logo-icon" size={16} />
          <h2 className="logo-text text-gradient">LUXE</h2>
        </div>

        <button className="new-chat-btn glass" type="button" onClick={handleNewChat} title="Reset Chat" aria-label="Start new chat">
          <PlusCircle size={14} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Messages area */}
      <div className="chat-messages-container" ref={scrollRef}>
        <div className="chat-messages-list" role="log" aria-live="polite" aria-label="Conversation messages">
          {state.conversation.messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {state.conversation.isProcessing && <TypingIndicator />}
        </div>
      </div>

      {/* Suggestion Chips */}
      <SuggestionChips
        suggestions={state.conversation.suggestedActions}
        onSelect={handleSuggestionSelect}
      />

      {/* Voice preview row */}
      {isListening && (
        <div className="voice-preview-container glass animate-slide-up">
          <VoiceInput isListening={isListening} transcript={transcript} onToggle={handleVoiceToggle} />
        </div>
      )}

      {/* Input panel area */}
      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="chat-input-wrapper glass">
            <label htmlFor="chat-input" className="visually-hidden">Type your message</label>
            <input
              id="chat-input"
              type="text"
              placeholder="Ask LUXE to curate an outfit, look up a trip..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={state.conversation.isProcessing}
              className="chat-input-field"
              autoComplete="off"
            />
            
            <button
              type="button"
              className={`mic-btn ${isListening ? 'active' : ''}`}
              onClick={handleVoiceToggle}
              aria-label="Toggle Voice Input"
            >
              <span className="mic-dot" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || state.conversation.isProcessing}
            className="chat-send-btn"
            aria-label="Send message"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatPanel;
