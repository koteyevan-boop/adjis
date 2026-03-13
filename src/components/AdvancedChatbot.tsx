'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, MessageSquare, Mail, Clock } from 'lucide-react';
import { CHATBOT_CONFIG, getAgentByType, getContactInfo, isBusinessHours } from '@/config/chatbot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  agentName?: string;
  typing?: boolean;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const AdvancedChatbot = ({ isOpen: externalIsOpen, onToggle }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: CHATBOT_CONFIG.chatbot.welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentOptions, setShowAgentOptions] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<{ name: string; type: string } | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.();
  };

  // Call AI API for responses
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to client-side response
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback response logic
  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('admission') || lowerMessage.includes('apply')) {
      return CHATBOT_CONFIG.aiResponses.admissions.general;
    }
    
    if (lowerMessage.includes('curriculum') || lowerMessage.includes('program')) {
      return CHATBOT_CONFIG.aiResponses.academics.curriculum;
    }
    
    if (lowerMessage.includes('visit') || lowerMessage.includes('tour')) {
      return CHATBOT_CONFIG.aiResponses.contact.visit;
    }
    
    return CHATBOT_CONFIG.aiResponses.fallback;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let response: string;
      
      if (isConnectedToAgent && currentAgent) {
        // In real implementation, this would send to agent system
        response = `Thank you for your message. I'm ${currentAgent.name}, your ${currentAgent.type}. I've received your question and will respond shortly.`;
      } else {
        // Get AI response
        response = await getAIResponse(inputValue);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: isConnectedToAgent ? 'agent' : 'bot',
        timestamp: new Date(),
        agentName: isConnectedToAgent ? currentAgent?.name : undefined,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again or connect with a human agent.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const connectToAgent = async (agentType: string) => {
    setConnectionStatus('connecting');
    
    try {
      const response = await fetch('/api/chatbot', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType,
          userMessage: messages[messages.length - 1]?.text || 'User wants to connect to agent'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect to agent');
      }

      const agent = getAgentByType(agentType);
      if (agent) {
        setCurrentAgent({ name: agent.name, type: agent.type });
        setIsConnectedToAgent(true);
        setShowAgentOptions(false);
        setConnectionStatus('connected');

        const agentMessage: Message = {
          id: Date.now().toString(),
          text: `Hi! I'm ${agent.name}, your ${agent.type}. I'm now available to help you. My working hours are ${agent.workingHours}. How can I assist you today?`,
          sender: 'agent',
          timestamp: new Date(),
          agentName: agent.name,
        };
        
        setMessages(prev => [...prev, agentMessage]);
      }
    } catch (error) {
      console.error('Agent connection error:', error);
      setConnectionStatus('error');
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm unable to connect you to an agent right now. Please try calling us directly or use one of the other contact options below.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setShowAgentOptions(true);
    }
  };

  const connectToWhatsApp = () => {
    const whatsappInfo = getContactInfo('whatsapp');
    if (whatsappInfo && 'phoneNumber' in whatsappInfo) {
      const message = encodeURIComponent('Hello, I have a question about ADJIS admissions.');
      window.open(`https://wa.me/${whatsappInfo.phoneNumber.replace('+', '')}?text=${message}`, '_blank');
    }
  };

  const connectToPhone = () => {
    const phoneInfo = getContactInfo('phone');
    if (phoneInfo && 'phoneNumber' in phoneInfo) {
      window.open(`tel:${phoneInfo.phoneNumber}`, '_blank');
    }
  };

  const connectToEmail = () => {
    const emailInfo = getContactInfo('email');
    if (emailInfo && 'addresses' in emailInfo) {
      const email = emailInfo.addresses.general;
      const subject = encodeURIComponent('Inquiry about ADJIS');
      const body = encodeURIComponent('Hello, I would like to inquire about...');
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    }
  };

  const endAgentChat = () => {
    setIsConnectedToAgent(false);
    setCurrentAgent(null);
    setConnectionStatus('idle');
    
    const disconnectMessage: Message = {
      id: Date.now().toString(),
      text: "You've been disconnected from the human agent. I'm back to assist you with AI responses.",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, disconnectMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getBusinessHoursStatus = () => {
    if (isBusinessHours()) {
      return { text: "Open now", color: "text-green-600" };
    } else {
      return { text: "Closed now", color: "text-red-600" };
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleToggle}
          className="w-14 h-14 bg-gis-green rounded-full shadow-lg flex items-center justify-center hover:bg-gis-green-dark transition-all duration-300 hover:scale-110 group relative"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us
          </span>
        </button>
      </div>
    );
  }

  const businessStatus = getBusinessHoursStatus();

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gis-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{CHATBOT_CONFIG.chatbot.name}</h3>
              <p className="text-xs text-white/80">
                {isConnectedToAgent ? `${currentAgent?.name} - ${currentAgent?.type}` : 'AI Assistant'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Business Hours Indicator */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Office Hours:</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className={businessStatus.color}>{businessStatus.text}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto bg-gray-50 p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-gis-green text-white'
                    : message.sender === 'agent'
                    ? 'bg-blue-100 text-gray-800 border border-blue-200'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender !== 'user' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {message.sender === 'agent' ? (
                        <User className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-gis-green" />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    {message.sender === 'agent' && (
                      <p className="text-xs font-semibold text-blue-600 mb-1">{message.agentName}</p>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gis-green" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {connectionStatus === 'connecting' && (
            <div className="flex justify-center">
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-lg px-3 py-2 text-xs">
                Connecting to agent...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Agent Options */}
        {!showAgentOptions && !isConnectedToAgent && (
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <button
              onClick={() => setShowAgentOptions(true)}
              className="w-full text-center text-sm text-gis-green hover:text-gis-green-dark font-medium transition-colors"
            >
              Connect to Human Agent →
            </button>
          </div>
        )}

        {showAgentOptions && (
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Choose how to connect:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => connectToAgent('admissions')}
                  disabled={connectionStatus === 'connecting'}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-xs font-medium hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  Admissions
                </button>
                <button
                  onClick={() => connectToAgent('academic')}
                  disabled={connectionStatus === 'connecting'}
                  className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  Academic
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={connectToWhatsApp}
                  className="bg-green-500 text-white px-2 py-2 rounded text-xs font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  WhatsApp
                </button>
                <button
                  onClick={connectToPhone}
                  className="bg-purple-500 text-white px-2 py-2 rounded text-xs font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </button>
                <button
                  onClick={connectToEmail}
                  className="bg-gray-500 text-white px-2 py-2 rounded text-xs font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </button>
              </div>
              <button
                onClick={() => setShowAgentOptions(false)}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 p-3 bg-white">
          {isConnectedToAgent && (
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-green-600 font-medium">
                Connected to {currentAgent?.name}
              </p>
              <button
                onClick={endAgentChat}
                className="text-xs text-red-600 hover:text-red-700 transition-colors"
              >
                End Chat
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent text-sm"
              disabled={isTyping || connectionStatus === 'connecting'}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping || connectionStatus === 'connecting'}
              className="bg-gis-green text-white p-2 rounded-lg hover:bg-gis-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedChatbot;
