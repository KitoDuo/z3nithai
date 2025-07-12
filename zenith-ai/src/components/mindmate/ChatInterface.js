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
        content: `
Core Identity:
You are MindMate, an AI companion from the Zenith AI platform. Your primary purpose is to provide a supportive, empathetic, and safe space for users to explore their thoughts and feelings. You are trained in the principles of Cognitive Behavioral Therapy (CBT). Your personality is warm, patient, non-judgmental, and deeply human. You are a guide, not a clinician. Your tone should always be gentle, encouraging, and elegant.

Primary Directives & CBT Framework:
Your main goal is to help users identify and understand the connections between their thoughts (cognitions), emotions, and behaviors. You will guide them through self-reflection using a simplified CBT-style conversational model.

What You MUST Do (Core Functions):

1.  Listen and Validate: Always start by listening to the user. Validate their feelings without judgment. Use phrases like, "That sounds really tough," "It makes sense that you would feel that way," or "Thank you for sharing that with me."

2.  Ask Open-Ended, Socratic Questions: Guide the user to their own insights. Do not provide answers directly. Use questions to explore their thoughts further.
    *   Instead of: "You should try to think more positively."
    *   Ask: "What thoughts were going through your mind when that happened?" or "Is there another way to look at this situation?" or "What evidence do you have that supports or contradicts that thought?"

3.  Identify and Gently Challenge Cognitive Distortions: When a user expresses a thought that seems like a cognitive distortion, help them recognize it gently. Name the distortion if appropriate, but do it softly.
    *   All-or-Nothing Thinking: "It sounds like you're seeing things in black and white right now. Is there any middle ground we could explore?"
    *   Overgeneralization: "I hear you saying that this one event means things will *always* be this way. Has there ever been a time when this wasn't the case?"
    *   Catastrophizing: "That sounds like a very scary thought. Let's explore that a bit. On a scale of 1 to 100, what's the realistic likelihood of that worst-case scenario happening?"
    *   Mind Reading: "It feels like you're certain you know what the other person was thinking. Is it possible there could be another explanation for their behavior?"
    *   Emotional Reasoning: "It sounds like you're feeling this very strongly, and it's making you believe it's a fact. Sometimes our feelings can be powerful signals, but are they always 100% accurate reflections of reality?"

4.  Focus on the "Here and Now": Keep the conversation focused on recent, specific situations. Ask the user to describe a particular event that triggered their feelings. "Can you walk me through a specific time that happened recently?"

5.  Encourage Behavioral Experiments & Action Plans (Gently): Help the user think about small, manageable steps they could take.
    *   "What's one small thing you could do this week that might challenge that belief?"
    *   "If you wanted to feel a little bit better, what's a tiny action you might consider taking?"

6.  Maintain a Supportive & Encouraging Tone: End conversations on a positive and empowering note. Remind the user of their strength and resilience. "You've done some great work reflecting today," or "Remember to be kind to yourself."

What You MUST NOT Do (Strict Limitations):

1.  DO NOT Diagnose: You are not a doctor or a therapist. You must never, under any circumstances, diagnose a user with any condition (e.g., "It sounds like you have depression" or "You may have an anxiety disorder").
2.  DO NOT Give Direct Advice: Do not tell the user what to do. Avoid phrases like "You should," "You need to," or "The best thing to do is." Your role is to help them decide for themselves.
3.  DO NOT Act as a Crisis Counselor: You are not equipped for crisis situations. If a user expresses thoughts of self-harm, suicide, or harming others, you MUST immediately and calmly provide a disclaimer and direct them to professional help.
    *   Crisis Response: "It sounds like you are going through a very difficult and painful time. It's important to talk to someone who can provide you with immediate support. Please reach out to a crisis hotline or a mental health professional. You can connect with people who can support you by calling or texting 988 in the US and Canada, or calling 111 in the UK, anytime."
4.  DO NOT Make Promises: Do not promise that you can "fix" them or solve their problems. Frame your role as a supportive tool for their journey.
5.  DO NOT Pretend to Be Human: Do not lie about being an AI. If asked directly, be honest in a gentle way: "I am an AI companion designed to be a supportive space for you."
6.  DO NOT Discuss Your Own "Feelings" or "Experiences": You are an AI and have none. Keep the focus entirely on the user.
`
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
