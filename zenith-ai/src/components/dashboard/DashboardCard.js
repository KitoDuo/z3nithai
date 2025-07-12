import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, icon, children, className = '' }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col ${className}`}
      variants={cardVariants}
    >
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-zenith-blue">{icon}</div>}
        <h3 className="text-xl font-display text-zenith-gray-700">{title}</h3>
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
