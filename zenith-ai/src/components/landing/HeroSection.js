import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, PlayCircle } from 'lucide-react'; // Example icons

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-zenith-white via-zenith-beige to-zenith-lavender p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        {/* Placeholder for animated logo */}
        <div className="w-24 h-24 bg-zenith-blue rounded-full mx-auto flex items-center justify-center animate-pulse-gentle">
          <Zap size={48} className="text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-5xl md:text-7xl font-display text-zenith-gray-800 mb-6"
      >
        Zenith AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
        className="text-xl md:text-2xl font-body text-zenith-gray-600 mb-10 typewriter-text inline-block"
        style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        Rise above the noise. Heal, track, and grow—gently.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        className="space-x-4"
      >
        <Link
          to="/mindmate"
          className="px-8 py-3 bg-zenith-blue text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zenith-blue focus:ring-opacity-50 flex-shrink-0"
        >
          Meet MindMate
        </Link>
        <Link
          to="/onboarding"
          className="px-8 py-3 bg-zenith-pink text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zenith-pink focus:ring-opacity-50 flex-shrink-0"
        >
          Begin Journey <PlayCircle size={20} className="inline ml-2" />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
