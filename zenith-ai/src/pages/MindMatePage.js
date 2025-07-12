import React from 'react';
import ChatInterface from '../components/mindmate/ChatInterface';
import { motion } from 'framer-motion';

const MindMatePage = () => {
  return (
    <motion.div
      className="h-screen w-screen overflow-hidden" // Ensures full screen and no scrollbars on page itself
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ChatInterface />
    </motion.div>
  );
};

export default MindMatePage;
