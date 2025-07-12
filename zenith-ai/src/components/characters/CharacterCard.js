import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Waves, Bone } from 'lucide-react'; // Example icons for characters

// Placeholder for Lottie Player if we were to integrate Lottie
// const LottiePlayer = ({ animationData }) => <div>Lottie Animation Placeholder</div>;

const CharacterCard = ({ character, onSelect, isSelected }) => {
  const Icon = character.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300
                  ${isSelected ? 'ring-4 ring-zenith-blue bg-zenith-blue/10' : 'bg-white hover:bg-zenith-lavender/20'}
                  flex flex-col items-center text-center h-full`}
      onClick={() => onSelect(character.id)}
    >
      {/* Placeholder for 3D illustration or Lottie animation */}
      <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full mb-6 flex items-center justify-center overflow-hidden ${character.bgColor} bg-opacity-30`}>
        {character.lottie ? (
          // <LottiePlayer animationData={character.lottie} />
          <div className="text-5xl md:text-6xl text-white"> {/* Lottie Placeholder */}
            {Icon && <Icon size="60%" strokeWidth={1.5} />}
          </div>
        ) : (
          <div className="text-5xl md:text-6xl" style={{color: character.iconColor}}>
            {Icon && <Icon size="100%" strokeWidth={1.5} />}
          </div>
        )}
      </div>

      <h3 className="text-2xl font-display text-zenith-gray-800 mb-2">{character.name}</h3>
      <p className="text-sm font-body text-zenith-gray-600 mb-1">"{character.tagline}"</p>
      <p className="text-xs font-body text-zenith-gray-500 mb-3">Voice: {character.voiceTone}</p>

      <div className="mt-auto w-full">
        <p className="text-sm font-body text-zenith-gray-700 mb-2"><strong>Favorite Topics:</strong> {character.topics.join(', ')}</p>

        {isSelected && (
          <motion.button
            initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}
            className="mt-3 w-full px-4 py-2 bg-zenith-blue text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
          >
            Chat with {character.name}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const charactersData = [
  {
    id: 'zen',
    name: "Zen the Owl",
    tagline: "Wisdom in every whisper.",
    icon: Feather,
    iconColor: '#A855F7', // Purple
    bgColor: 'bg-purple-200', // Tailwind class for bg
    voiceTone: "Calm, insightful, patient",
    topics: ["Mindfulness", "Philosophy", "Nature", "Reflection"],
    lottie: null, // Placeholder for Lottie animation data
    description: "Zen offers thoughtful perspectives and guides you through moments of quiet contemplation. Prefers serene conversations."
  },
  {
    id: 'loa',
    name: "Loa the Jellyfish",
    tagline: "Flowing with gentle energy.",
    icon: Waves,
    iconColor: '#3B82F6', // Blue
    bgColor: 'bg-blue-200',
    voiceTone: "Soft-spoken, empathetic, encouraging",
    topics: ["Creativity", "Dreams", "Emotions", "Art"],
    lottie: null,
    description: "Loa drifts with a soft luminescence, offering a gentle presence. Enjoys discussing feelings and creative ideas."
  },
  {
    id: 'max',
    name: "Max the Space Dog",
    tagline: "Your pawsitive pal!",
    icon: Bone, // Using Bone as a stand-in for a dog/space theme
    iconColor: '#F59E0B', // Amber
    bgColor: 'bg-amber-200',
    voiceTone: "Silly, optimistic, playful",
    topics: ["Adventure", "Humor", "Motivation", "Games"],
    lottie: null,
    description: "Max is always ready for an adventure or a good laugh. Perfect for when you need a boost of optimism or a playful chat."
  },
  // Example of a locked character
  {
    id: 'luna',
    name: "Luna the Star Guide",
    tagline: "Navigate your inner cosmos.",
    icon: null, // Will show 'Locked'
    iconColor: '#EC4899', // Pink
    bgColor: 'bg-pink-200',
    voiceTone: "Mysterious, intuitive, guiding",
    topics: ["Astrology", "Intuition", "Future", "Self-discovery"],
    lottie: null,
    description: "Luna helps you explore the deeper mysteries of your mind. (Unlock via Personality Quiz)",
    locked: true,
  }
];


export default CharacterCard;
