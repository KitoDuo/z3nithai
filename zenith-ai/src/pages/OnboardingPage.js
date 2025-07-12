import React from 'react';
import { motion } from 'framer-motion';
import OnboardingForm from '../components/onboarding/OnboardingForm';
// import { Cloud, Droplet } from 'lucide-react'; // For background animations

const OnboardingPage = () => {
  // Example of animated background elements (can be expanded)
  const backgroundAnimations = [
    { id: 'bubble1', x: '10vw', y: '80vh', size: 60, duration: 15, delay: 0 },
    { id: 'bubble2', x: '90vw', y: '20vh', size: 40, duration: 20, delay: 2 },
    { id: 'bubble3', x: '50vw', y: '50vh', size: 80, duration: 18, delay: 5 },
    { id: 'bubble4', x: '20vw', y: '10vh', size: 30, duration: 22, delay: 1 },
    { id: 'bubble5', x: '70vw', y: '90vh', size: 50, duration: 16, delay: 3 },
  ];


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zenith-blue via-zenith-lavender to-zenith-pink p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      {backgroundAnimations.map(anim => (
        <motion.div
          key={anim.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: anim.size,
            height: anim.size,
            left: anim.x,
            top: anim.y,
          }}
          animate={{
            y: [anim.y, `calc(${anim.y} - 30px)`, anim.y], // Simple bobbing animation
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: anim.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: anim.delay,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="z-10 w-full" // Ensure form is above background elements
      >
        <OnboardingForm />
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
