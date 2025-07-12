import React from 'react';
import { motion } from 'framer-motion';

const ExplainerSection = ({ title, content, image, reverse = false }) => {
  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className={`container mx-auto flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''} gap-8 md:gap-12`}>
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          {image ? (
            <img src={image} alt={title} className="rounded-lg shadow-xl object-cover w-full h-auto max-h-96" />
          ) : (
            <div className="w-full h-64 md:h-96 bg-zenith-lavender rounded-lg shadow-xl flex items-center justify-center">
              <p className="text-zenith-gray-500">Placeholder Image</p>
            </div>
          )}
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl font-display text-zenith-gray-800 mb-6">{title}</h2>
          <div className="text-lg font-body text-zenith-gray-600 space-y-4">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExplainerSection;
