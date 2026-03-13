'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  agentName?: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Chatbot = ({ isOpen: externalIsOpen, onToggle }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Adorable Babies & Josemaria International School (ADJIS). I'm here to help you with any questions about admissions, programs, or school information. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentOptions, setShowAgentOptions] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<{ name: string; type: string } | null>(null);
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

  // AI Response Logic
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Admissions related responses
    if (lowerMessage.includes('admission') || lowerMessage.includes('apply') || lowerMessage.includes('enroll')) {
      return "Great to hear you're interested in ADJIS! Our admissions process is straightforward. You can apply online through our website, and we offer programs from infant through upper secondary levels. Would you like me to connect you with an admissions counselor for detailed guidance?";
    }
    
    // Fee related responses
    if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('tuition')) {
      return "Our tuition fees vary by program level. We offer competitive pricing with flexible payment options. For specific fee information, I'd recommend speaking with our finance office. Would you like me to connect you with them?";
    }
    
    // Program related responses
    if (lowerMessage.includes('program') || lowerMessage.includes('curriculum') || lowerMessage.includes('subject')) {
      return "ADJIS offers a comprehensive Cambridge International Curriculum from Early Years through Advanced Level. We also have Pearson BTEC pathways in Music and Creative Media. Our programs emphasize holistic development with strong academics, arts, and sports. Which program level are you interested in?";
    }
    
    // Contact/Visit related responses
    if (lowerMessage.includes('visit') || lowerMessage.includes('tour') || lowerMessage.includes('contact')) {
      return "We'd love to show you around ADJIS! We offer school tours on weekdays. You can schedule a visit by calling our office or filling out the inquiry form on our website. Would you like me to help you schedule a tour?";
    }
    
    // General responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to ADJIS. How can I help you learn more about our school today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with regarding ADJIS?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Thank you for chatting with ADJIS! Feel free to reach out anytime. Have a wonderful day!";
    }
    
    // Default response with agent option
    return "I understand you're asking about: " + userMessage + ". While I can provide general information, for specific details, I can connect you with one of our knowledgeable staff members. Would you like to speak with an admissions counselor, academic advisor, or general support?";
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

    // Simulate AI processing time
    setTimeout(() => {
      if (isConnectedToAgent && currentAgent) {
        // If connected to agent, the agent would respond (in real implementation)
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Thank you for your message. I'm ${currentAgent.name}, your ${currentAgent.type}. I'll be happy to help you with this. In a live implementation, I would respond directly to your question here.`,
          sender: 'agent',
          timestamp: new Date(),
          agentName: currentAgent.name,
        };
        setMessages(prev => [...prev, agentMessage]);
      } else {
        // AI Response
        const aiResponse = generateAIResponse(inputValue);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const connectToAgent = (agentType: string, agentName: string) => {
    setCurrentAgent({ name: agentName, type: agentType });
    setIsConnectedToAgent(true);
    setShowAgentOptions(false);
    
    const agentMessage: Message = {
      id: Date.now().toString(),
      text: `Hi! I'm ${agentName}, your ${agentType}. I'm now available to help you with any specific questions you may have about ADJIS. How can I assist you today?`,
      sender: 'agent',
      timestamp: new Date(),
      agentName: agentName,
    };
    
    setMessages(prev => [...prev, agentMessage]);
  };

  const connectToWhatsApp = () => {
    const phoneNumber = '+233XXXXXXXXXX'; // Replace with actual school WhatsApp number
    const message = encodeURIComponent('Hello, I have a question about ADJIS admissions.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const connectToPhone = () => {
    const phoneNumber = '+233XXXXXXXXXX'; // Replace with actual school phone number
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  const connectToEmail = () => {
    const email = 'admissions@adjis.edu.gh'; // Replace with actual school email
    const subject = encodeURIComponent('Inquiry about ADJIS');
    const body = encodeURIComponent('Hello, I would like to inquire about...');
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleToggle}
          className="w-14 h-14 bg-gis-green rounded-full shadow-lg flex items-center justify-center hover:bg-gis-green-dark transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    );
  }

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
              <h3 className="font-semibold">ADJIS Assistant</h3>
              <p className="text-xs text-white/80">
                {isConnectedToAgent ? `${currentAgent?.name} - ${currentAgent?.type}` : 'AI Chatbot'}
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

        {/* Messages */}
        <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-3">
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
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => connectToAgent('Admissions Counselor', 'Sarah Johnson')}
                className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
              >
                Admissions
              </button>
              <button
                onClick={() => connectToAgent('Academic Advisor', 'Dr. Michael Chen')}
                className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium hover:bg-green-200 transition-colors"
              >
                Academic
              </button>
              <button
                onClick={connectToWhatsApp}
                className="bg-green-500 text-white px-3 py-2 rounded text-xs font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                WhatsApp
              </button>
              <button
                onClick={connectToPhone}
                className="bg-purple-500 text-white px-3 py-2 rounded text-xs font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Call
              </button>
            </div>
            <button
              onClick={connectToEmail}
              className="w-full mt-2 bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
            >
              Send Email
            </button>
            <button
              onClick={() => setShowAgentOptions(false)}
              className="w-full mt-1 text-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
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
                onClick={() => {
                  setIsConnectedToAgent(false);
                  setCurrentAgent(null);
                  const disconnectMessage: Message = {
                    id: Date.now().toString(),
                    text: "You've been disconnected from the human agent. I'm back to assist you with AI responses.",
                    sender: 'bot',
                    timestamp: new Date(),
                  };
                  setMessages(prev => [...prev, disconnectMessage]);
                }}
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
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
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

export default Chatbot;
