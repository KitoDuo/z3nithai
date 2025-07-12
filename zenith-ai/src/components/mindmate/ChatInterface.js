import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, FileText, Wind, Smile, Settings2 } from 'lucide-react'; // Icons

// Mock AI Avatar
const MindMateAvatar = () => (
  <motion.div
    className="w-16 h-16 rounded-full bg-gradient-to-br from-zenith-blue to-zenith-lavender shadow-xl flex items-center justify-center mr-4"
    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.div
      className="w-8 h-8 bg-white/30 rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

// Typing indicator
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex items-center space-x-1 p-3 bg-zenith-gray-100 rounded-lg self-start"
  >
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-zenith-blue rounded-full"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </motion.div>
);


const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MindMate, your AI companion for reflection and growth. How are you feeling today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isAiTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { id: messages.length + 2, text: "That's interesting. Could you tell me more about that?", sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  // Placeholder functions for additional features
  const handleQuickEmotionLog = () => alert("Quick Emotion Log feature placeholder.");
  const handleGuidedBreathing = () => alert("Guided Breathing Exercise feature placeholder.");
  const handleExportSession = () => alert("Export Session / Journal feature placeholder.");
  const handleSessionSettings = () => alert("Session Settings placeholder.");


  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-zenith-blue/10 via-zenith-lavender/10 to-zenith-pink/10 p-4 md:p-6 relative">
      {/* Header / Controls Area */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col space-y-2 z-10">
        <button onClick={handleQuickEmotionLog} title="Log Today's Emotion" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-zenith-pink/30 transition-colors">
          <Smile size={22} className="text-zenith-pink" />
        </button>
        <button onClick={handleGuidedBreathing} title="Guided Breathing" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-zenith-mint/30 transition-colors">
          <Wind size={22} className="text-zenith-mint" />
        </button>
        <button onClick={handleExportSession} title="Export Session" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-zenith-beige/50 transition-colors">
          <FileText size={22} className="text-zenith-blue" />
        </button>
         <button onClick={handleSessionSettings} title="Session Settings" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-zenith-gray-200/50 transition-colors">
          <Settings2 size={22} className="text-zenith-gray-600" />
        </button>
      </div>

      {/* MindMate Avatar (Top-left or integrated with messages) */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 hidden md:block">
        <MindMateAvatar />
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.sender === 'ai' && <div className="md:hidden mr-2 mt-1"><MindMateAvatar/></div> /* Show avatar for mobile on AI messages */}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-5 py-3 rounded-2xl shadow ${
                  msg.sender === 'ai'
                    ? 'bg-white text-zenith-gray-700 rounded-bl-none'
                    : 'bg-zenith-blue text-white rounded-br-none'
                }`}
              >
                <p className="font-body text-md">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isAiTyping && (
          <div className="flex justify-start">
            <div className="md:hidden mr-2 mt-1"><MindMateAvatar/></div>
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center p-3 bg-white rounded-xl shadow-xl"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow p-3 border-none focus:ring-0 font-body text-md text-zenith-gray-700"
        />
        <button title="Voice Input (placeholder)" className="p-3 text-zenith-gray-500 hover:text-zenith-blue transition-colors">
          <Mic size={22} />
        </button>
        <button
          onClick={handleSendMessage}
          disabled={isAiTyping || inputValue.trim() === ''}
          className="p-3 bg-zenith-blue text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-60"
          aria-label="Send message"
        >
          <Send size={22} />
        </button>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
