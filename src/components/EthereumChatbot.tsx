import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import EthereumAssistantLogo from './EthereumAssistantLogo';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface Position {
  x: number;
  y: number;
}

const EthereumChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hello! I\'m your Ethereum Assistant. I can help you understand blockchain transactions, fraud detection, and more. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 350, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Price related queries
    if (lowerQuestion.includes('price') || lowerQuestion.includes('eth') || lowerQuestion.includes('cost')) {
      return 'I monitor Ethereum prices in real-time through multiple reliable sources:\n\n' +
             '• Live price updates every 30 seconds\n' +
             '• Historical price trends analysis\n' +
             '• Market volatility monitoring\n' +
             '• Price alerts for suspicious movements\n\n' +
             'Would you like to know more about how we use price data for fraud detection?';
    }
    
    // Fraud detection queries
    if (lowerQuestion.includes('fraud') || lowerQuestion.includes('suspicious') || lowerQuestion.includes('detect')) {
      return 'Our fraud detection system uses multiple indicators to identify suspicious activities:\n\n' +
             '• Unusual transaction patterns\n' +
             '• Abnormal gas prices (>50 gwei)\n' +
             '• Large transfers (>10 ETH)\n' +
             '• Smart contract interactions\n' +
             '• Known malicious addresses\n\n' +
             'Would you like me to explain any of these indicators in detail?';
    }
    
    // Technical/System queries
    if (lowerQuestion.includes('how') || lowerQuestion.includes('work') || lowerQuestion.includes('system')) {
      return 'Our system operates through several sophisticated components:\n\n' +
             '1. Real-time blockchain monitoring\n' +
             '2. Advanced pattern recognition\n' +
             '3. Machine learning algorithms\n' +
             '4. Smart contract analysis\n' +
             '5. Network behavior tracking\n\n' +
             'Which aspect would you like to learn more about?';
    }
    
    // Gas price queries
    if (lowerQuestion.includes('gas')) {
      return 'Gas prices are crucial indicators in our fraud detection:\n\n' +
             '• Normal range: 15-50 gwei\n' +
             '• Suspicious: >50 gwei\n' +
             '• High priority: >100 gwei\n\n' +
             'Abnormal gas prices often indicate:\n' +
             '• Front-running attempts\n' +
             '• MEV (Miner Extractable Value) activity\n' +
             '• Priority transaction manipulation\n\n' +
             'Would you like to see current gas price statistics?';
    }
    
    // Transaction queries
    if (lowerQuestion.includes('transaction') || lowerQuestion.includes('transfer')) {
      return 'I analyze transactions based on several parameters:\n\n' +
             '• Transaction value\n' +
             '• Sender/receiver patterns\n' +
             '• Transaction frequency\n' +
             '• Smart contract interactions\n' +
             '• Historical behavior\n\n' +
             'I can help you understand specific transaction patterns or general monitoring approaches. What interests you?';
    }
    
    // Security queries
    if (lowerQuestion.includes('security') || lowerQuestion.includes('safe') || lowerQuestion.includes('protect')) {
      return 'Our security measures include:\n\n' +
             '• Real-time transaction monitoring\n' +
             '• Pattern-based threat detection\n' +
             '• Known scam address tracking\n' +
             '• Smart contract vulnerability scanning\n' +
             '• Automated alert systems\n\n' +
             'Would you like specific security recommendations?';
    }

    // Help/assistance queries
    if (lowerQuestion.includes('help') || lowerQuestion.includes('what') || lowerQuestion.includes('can you')) {
      return 'I can assist you with:\n\n' +
             '• Understanding transaction patterns\n' +
             '• Analyzing suspicious activities\n' +
             '• Monitoring gas prices\n' +
             '• Tracking ETH price movements\n' +
             '• Security recommendations\n' +
             '• System functionality explanations\n\n' +
             'What specific aspect would you like to explore?';
    }

    // Default response
    return 'I\'m your Ethereum security assistant. I can help you understand:\n\n' +
           '• Transaction monitoring\n' +
           '• Fraud detection methods\n' +
           '• Security measures\n' +
           '• Price analysis\n' +
           '• System functionality\n\n' +
           'Feel free to ask about any of these topics!';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 500);
    setInput('');
  };

  return (
    <>
      {/* Fixed Ask Assistant Button - Moved to bottom right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`${
            isOpen ? 'hidden' : 'flex'
          } items-center gap-2 bg-[#1A237E] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#311B92] transition-all duration-300 hover:shadow-xl`}
        >
          <EthereumAssistantLogo />
          <span className="hidden sm:inline">Ask Assistant</span>
        </button>
      </div>

      {/* Floating Chat Window - Initial position bottom right */}
      <div
        ref={chatRef}
        className={`fixed z-50 ${!isOpen && 'hidden'}`}
        style={{
          left: window.innerWidth <= 768 ? '50%' : 
            position.x === window.innerWidth - 350 ? 'auto' : `${position.x}px`,
          right: position.x === window.innerWidth - 350 ? '24px' : 'auto',
          top: window.innerWidth <= 768 ? '50%' : 
            position.y === 100 ? 'auto' : `${position.y}px`,
          bottom: position.y === 100 ? '100px' : 'auto',
          transform: window.innerWidth <= 768 ? 'translate(-50%, -50%)' : 'none',
          width: window.innerWidth <= 768 ? '90%' : '400px',
          maxWidth: '400px'
        }}
      >
        <div className="w-full bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#1A237E] text-white rounded-t-lg cursor-grab"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <EthereumAssistantLogo />
              <span className="font-semibold">Ethereum Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 mr-2 flex-shrink-0">
                    <EthereumAssistantLogo />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#1A237E] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  } whitespace-pre-line`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about the system..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1A237E]"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-[#1A237E] text-white rounded-lg hover:bg-[#311B92] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EthereumChatbot; 