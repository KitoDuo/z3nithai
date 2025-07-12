import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';

const affirmations = [
  "You are allowed to rest.",
  "It's okay to not be okay.",
  "You are stronger than you think.",
  "Breathe. This moment is temporary.",
  "You are deserving of peace and happiness.",
  "Be kind to yourself today.",
  "Your feelings are valid.",
];

const FloatingAffirmation = ({ isVisible, onClose }) => {
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    if (isVisible) {
      // Pick a new affirmation when it becomes visible
      setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-6 right-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 max-w-sm z-50 flex items-start"
      >
        <MessageSquare size={24} className="text-zenith-pink mr-3 mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <motion.h3
            className="font-body text-md text-zenith-gray-700"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {affirmation.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h3>
        </div>
        <button onClick={onClose} className="ml-3 text-zenith-gray-400 hover:text-zenith-gray-700">
          <X size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingAffirmation;
