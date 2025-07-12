import React from 'react';
import { motion } from 'framer-motion';

const SettingsSection = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-6 border-b border-zenith-gray-200"
    >
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-display font-medium leading-6 text-zenith-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-zenith-gray-600">{description}</p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsSection;
