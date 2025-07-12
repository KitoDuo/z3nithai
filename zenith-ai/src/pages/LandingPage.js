import React from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/landing/HeroSection';
import ExplainerSection from '../components/landing/ExplainerSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FeatureGridSection from '../components/landing/FeatureGridSection';
import FAQSection from '../components/landing/FAQSection';

// Placeholder images (replace with actual paths or imports if you have them)
const wellnessImage = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Example
const howItWorksImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Example

const LandingPage = () => {
  const wellnessContent = [
    "In today's fast-paced world, taking a moment for yourself is not a luxury, but a necessity. Mental wellness is the foundation of a fulfilling life, influencing how we think, feel, and act.",
    "Zenith AI provides a sanctuary for your mind, offering tools and support to navigate life's challenges with greater calm and resilience. It's about empowering you to understand your emotions and cultivate inner peace."
  ];

  const howItWorksContent = [
    "Zenith AI combines cutting-edge artificial intelligence with principles of positive psychology and mindfulness. Our platform offers a suite of interconnected tools designed to support your mental well-being:",
    "- **MindMate AI:** Engage in empathetic conversations and guided exercises.",
    "- **Mood Logging:** Track your emotional landscape to uncover patterns and insights.",
    "- **Journaling:** Reflect in a private, serene space with thoughtful prompts.",
    "- **Personalization:** Experience a platform that adapts to your unique journey and preferences."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zenith-white"
    >
      <HeroSection />

      <ExplainerSection
        title="Why Mental Wellness Matters"
        content={wellnessContent}
        image={wellnessImage}
      />

      <ExplainerSection
        title="How Zenith AI Works"
        content={howItWorksContent}
        image={howItWorksImage}
        reverse={true}
      />

      <FeatureGridSection />

      <TestimonialsSection />

      <FAQSection />

      {/* The Footer is now part of the global Layout */}
    </motion.div>
  );
};

export default LandingPage;
