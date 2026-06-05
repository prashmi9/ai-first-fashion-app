export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  components?: ComponentInstance[];
  metadata?: MessageMetadata;
  suggestedActions?: SuggestedAction[];
}

export interface MessageMetadata {
  intent?: string;
  toolsUsed?: string[];
  processingTime?: number;
  confidence?: number;
}

export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, unknown>;
  priority?: number;
}

export interface ConversationState {
  messages: ConversationMessage[];
  isProcessing: boolean;
  currentIntent: string | null;
  suggestedActions: SuggestedAction[];
}

export interface SuggestedAction {
  id: string;
  label: string;
  icon?: string;
  prompt: string;
}
