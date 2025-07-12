import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, BarChart2, Edit3, Users, Settings, Heart } from 'lucide-react'; // Example icons

const features = [
  {
    icon: <MessageCircle size={36} className="text-zenith-blue" />,
    title: "MindMate AI Therapist",
    description: "Engage in meaningful conversations with our advanced AI therapist, available 24/7.",
    gif: null, // Placeholder for GIF preview
  },
  {
    icon: <BarChart2 size={36} className="text-zenith-pink" />,
    title: "Mood & Emotion Tracking",
    description: "Log your feelings and gain insights into your emotional patterns with beautiful visualizations.",
    gif: null,
  },
  {
    icon: <Edit3 size={36} className="text-zenith-mint" />,
    title: "Reflective Journaling",
    description: "A calm, distraction-free space to pen down your thoughts and reflections.",
    gif: null,
  },
  {
    icon: <Users size={36} className="text-zenith-lavender" />,
    title: "Comforting Characters",
    description: "Connect with unique AI companions, each with their own personality and charm.",
    gif: null,
  },
  {
    icon: <Heart size={36} className="text-zenith-blue" />,
    title: "Personalized Journey",
    description: "Zenith AI adapts to your needs, offering a truly tailored wellness experience.",
    gif: null,
  },
  {
    icon: <Settings size={36} className="text-zenith-pink" />,
    title: "Deep Customization",
    description: "Adjust themes, reminders, AI tones, and more to make Zenith AI your own.",
    gif: null,
  },
];

const FeatureGridSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display text-zenith-gray-800 mb-12">Explore Zenith AI Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zenith-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="p-3 bg-white rounded-full shadow-md mb-4">
                {feature.icon}
              </div>
              {/* Placeholder for GIF, if available */}
              {feature.gif ? (
                <img src={feature.gif} alt={`${feature.title} preview`} className="w-full h-40 object-cover rounded-md mb-4" />
              ) : (
                <div className="w-full h-32 bg-zenith-beige rounded-md mb-4 flex items-center justify-center">
                  <p className="text-sm text-zenith-gray-500">Feature Preview (GIF)</p>
                </div>
              )}
              <h3 className="text-xl font-display text-zenith-gray-800 mb-2">{feature.title}</h3>
              <p className="text-md font-body text-zenith-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGridSection;
