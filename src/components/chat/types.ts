export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
  messages: Message[];
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  showLeadForm: boolean;
  currentConversation: string | null;
  history: ChatHistoryItem[];
}

export type SoundType = 'send' | 'receive' | 'notification';
