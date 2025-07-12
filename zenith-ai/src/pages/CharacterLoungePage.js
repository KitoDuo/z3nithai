import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard, { charactersData } from '../components/characters/CharacterCard';
import { Users, Lock, HelpCircle } from 'lucide-react'; // Icons

const CharacterLoungePage = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  // const [showQuiz, setShowQuiz] = useState(false); // For personality quiz modal

  const handleSelectCharacter = (id) => {
    const character = charactersData.find(c => c.id === id);
    if (character && !character.locked) {
      setSelectedCharacterId(id);
    } else if (character && character.locked) {
      // setShowQuiz(true); // Or trigger some other interaction for locked characters
      alert("This character is locked! Complete the personality quiz to unlock.");
    }
  };

  // Placeholder for Quiz Modal
  // const PersonalityQuizModal = () => ( ... );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zenith-mint via-zenith-lavender to-zenith-beige p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Users size={48} className="mx-auto text-zenith-blue mb-4" />
        <h1 className="text-4xl md:text-5xl font-display text-zenith-gray-800">Character Lounge</h1>
        <p className="text-lg font-body text-zenith-gray-600 mt-2">
          Choose a comforting AI companion to chat with. Each has a unique personality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {charactersData.map((character) => (
          <div key={character.id} className="h-full"> {/* Ensure cards in a row have same height implicitly */}
            {character.locked ? (
              <motion.div
                layout
                initial={{ opacity: 0.7, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-xl shadow-lg bg-zenith-gray-200/70 backdrop-blur-sm flex flex-col items-center text-center h-full cursor-pointer"
                onClick={() => alert("Unlock more characters by taking the personality quiz!")}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-6 flex items-center justify-center bg-zenith-gray-300/50">
                  <Lock size={60} className="text-zenith-gray-500" />
                </div>
                <h3 className="text-2xl font-display text-zenith-gray-600 mb-2">{character.name}</h3>
                <p className="text-sm font-body text-zenith-gray-500">This companion is waiting to be discovered!</p>
                 <button className="mt-auto px-4 py-2 bg-zenith-pink text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors flex items-center">
                   <HelpCircle size={18} className="mr-2"/> Take Quiz to Unlock
                </button>
              </motion.div>
            ) : (
              <CharacterCard
                character={character}
                onSelect={handleSelectCharacter}
                isSelected={selectedCharacterId === character.id}
              />
            )}
          </div>
        ))}
      </div>

      {/* Placeholder for Personality Quiz Button/Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-center mt-16"
      >
        <button
          // onClick={() => setShowQuiz(true)}
          onClick={() => alert("Personality Quiz feature coming soon!")}
          className="px-8 py-4 bg-zenith-pink text-white font-semibold rounded-xl shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 text-lg"
        >
          <HelpCircle size={22} className="inline mr-3" />
          Unlock More Companions (Personality Quiz)
        </button>
      </motion.div>

      {/* {showQuiz && <PersonalityQuizModal onClose={() => setShowQuiz(false)} />} */}
    </div>
  );
};

export default CharacterLoungePage;
