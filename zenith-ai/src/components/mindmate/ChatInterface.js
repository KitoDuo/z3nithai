import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, FileText, Wind, Smile, Settings2 } from 'lucide-react';
import { getChatCompletion } from '../../services/OpenRouterService';

// Mock AI Avatar (no changes)
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

// Typing indicator (no changes)
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
    { role: 'assistant', content: "Hello! I'm MindMate, your AI companion for reflection and growth. How are you feeling today?", id: 1 }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isAiTyping]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { role: 'user', content: inputValue, id: Date.now() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsAiTyping(true);

    // Prepare messages for the API - don't send the 'id' field
    const apiMessages = newMessages.map(({ role, content }) => ({ role, content }));

    // Add a system prompt to guide the AI
    const systemPrompt = {
        role: 'system',
        content: 'You are MindMate, a friendly, empathetic, and supportive AI mental wellness companion from the Zenith AI platform. Your tone should be calming, elegant, and deeply human. Avoid sounding robotic. Your goal is to listen, ask thoughtful questions, and gently guide the user in their self-reflection. Keep your responses concise and encouraging.'
    };

    const aiResponseContent = await getChatCompletion([systemPrompt, ...apiMessages]);

    const aiMessage = { role: 'assistant', content: aiResponseContent, id: Date.now() + 1 };
    setMessages(prev => [...prev, aiMessage]);
    setIsAiTyping(false);
  };

  // Placeholder functions for additional features (no changes)
  const handleQuickEmotionLog = () => alert("Quick Emotion Log feature placeholder.");
  const handleGuidedBreathing = () => alert("Guided Breathing Exercise feature placeholder.");
  const handleExportSession = () => alert("Export Session / Journal feature placeholder.");
  const handleSessionSettings = () => alert("Session Settings placeholder.");


  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-zenith-blue/10 via-zenith-lavender/10 to-zenith-pink/10 p-4 md:p-6 relative">
      {/* Header / Controls Area (no changes) */}
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

      {/* MindMate Avatar (no changes) */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 hidden md:block">
        <MindMateAvatar />
      </div>

      {/* Messages Area - updated to use role/content */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.role === 'assistant' && <div className="md:hidden mr-2 mt-1"><MindMateAvatar/></div>}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-5 py-3 rounded-2xl shadow ${
                  msg.role === 'assistant'
                    ? 'bg-white text-zenith-gray-700 rounded-bl-none'
                    : 'bg-zenith-blue text-white rounded-br-none'
                }`}
              >
                <p className="font-body text-md">{msg.content}</p>
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

      {/* Input Area (no changes) */}
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
      </motion..div>
    </div>
  );
};

export default ChatInterface;
