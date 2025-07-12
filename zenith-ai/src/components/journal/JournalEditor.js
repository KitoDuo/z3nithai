import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book, Edit, Plus, Save, RotateCcw, Smile } from 'lucide-react';

const dailyPrompts = [
  "What brought you joy today?",
  "Describe a small moment of peace you experienced.",
  "What is something you want to let go of?",
  "Who made you smile today and why?",
  "What are you grateful for right now?",
  "If you could give your past self some advice, what would it be?",
  "What challenge did you overcome today?",
];

const moodOptions = [
  { level: 1, emoji: '😔', label: 'Awful' },
  { level: 2, emoji: '😟', label: 'Bad' },
  { level: 3, emoji: '😐', label: 'Meh' },
  { level: 4, emoji: '🙂', label: 'Okay' },
  { level: 5, emoji: '😄', label: 'Good' },
  { level: 6, emoji: '🤩', label: 'Great' },
];

const JournalEditor = ({ onSave, existingEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (existingEntry) {
      setTitle(existingEntry.title);
      setContent(existingEntry.content);
      setMood(existingEntry.mood);
    } else {
      // New entry: reset fields
      setTitle('');
      setContent('');
      setMood(null);
      getNewPrompt();
    }
  }, [existingEntry]);

  useEffect(() => {
    // Auto-saving simulation
    const handler = setTimeout(() => {
      if (content) {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500); // Show "Saving..." for 1.5s
      }
    }, 2000); // Trigger auto-save 2s after user stops typing

    // Word count
    setWordCount(content.trim().split(/\s+/).filter(Boolean).length);

    return () => clearTimeout(handler);
  }, [content]);

  const handleSave = () => {
    if (!content.trim()) {
      alert("Cannot save an empty entry.");
      return;
    }
    const entryData = {
      id: existingEntry ? existingEntry.id : Date.now(),
      title: title || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      content,
      mood,
      date: existingEntry ? existingEntry.date : new Date().toISOString(),
    };
    onSave(entryData);
  };

  const getNewPrompt = () => {
    const newPrompt = dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)];
    setPrompt(newPrompt);
  };

  const applyPrompt = () => {
    setContent(prev => prev ? `${prev}\n\n${prompt}` : prompt);
    contentRef.current.focus();
  };

  return (
    <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display text-zenith-gray-800 flex items-center">
            <Edit size={24} className="mr-3 text-zenith-blue"/>
            {existingEntry ? 'Editing Entry' : 'New Journal Entry'}
        </h2>
        <div className="text-sm font-semibold transition-opacity duration-500" style={{opacity: isSaving ? 1 : 0}}>
            Saving...
        </div>
      </div>

      {/* Prompt Section */}
      {!existingEntry && (
        <div className="p-3 bg-zenith-beige/50 rounded-lg mb-4 flex items-center justify-between">
            <p className="text-sm text-zenith-gray-600 italic">Prompt: "{prompt}"</p>
            <div>
                <button onClick={getNewPrompt} title="New Prompt" className="p-1 text-zenith-gray-500 hover:text-zenith-blue"><RotateCcw size={16}/></button>
                <button onClick={applyPrompt} title="Use Prompt" className="p-1 text-zenith-gray-500 hover:text-zenith-blue"><Plus size={16}/></button>
            </div>
        </div>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title (optional, defaults to date)"
        className="w-full text-xl font-display p-2 mb-4 bg-transparent border-b-2 border-zenith-gray-100 focus:border-zenith-lavender focus:outline-none transition-colors"
      />

      <motion.div
        className="relative"
        whileFocus={{ boxShadow: '0 0 0 2px #E6E6FA' }} // Lavender glow on focus
      >
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="12"
          placeholder="Start writing here..."
          className="w-full p-4 font-body text-lg text-zenith-gray-700 bg-zenith-gray-50 rounded-lg border-2 border-transparent focus:outline-none focus:bg-white focus:border-zenith-lavender transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-zenith-gray-400 font-semibold">{wordCount} words</div>
      </motion.div>

      {/* Mood & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Smile size={20} className="text-zenith-gray-500"/>
          <span className="text-sm font-semibold text-zenith-gray-600">Tag a mood:</span>
          {moodOptions.map(m => (
              <button
                key={m.level}
                onClick={() => setMood(m)}
                title={m.label}
                className={`text-2xl transition-transform duration-200 ${mood?.level === m.level ? 'transform scale-125' : 'opacity-50 hover:opacity-100'}`}
              >
                {m.emoji}
              </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-8 py-3 bg-zenith-blue text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          <Save size={18} className="inline mr-2" />
          {existingEntry ? 'Update Entry' : 'Save Entry'}
        </button>
      </div>
    </motion.div>
  );
};

export default JournalEditor;
