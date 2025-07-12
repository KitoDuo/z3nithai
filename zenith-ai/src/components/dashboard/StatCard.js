import React from 'react';
import { motion } from 'framer-motion';

// Mapping color names to hex values for gradients and icons
const colorMap = {
    pink: { light: '#FFB6C1', dark: '#DB7093' },
    blue: { light: '#ADD8E6', dark: '#87CEEB' },
    mint: { light: '#98FB98', dark: '#3CB371' },
};

const StatCard = ({ title, value, icon, color }) => {
  const lightColor = colorMap[color]?.light || '#F5F5DC'; // Default to beige
  const darkColor = colorMap[color]?.dark || '#D2B48C';

  return (
    <div
      className="p-4 rounded-xl shadow-lg flex items-center"
      style={{
          background: `linear-gradient(to bottom right, white, ${lightColor})`
      }}
    >
      <div
        className="p-3 rounded-full text-white mr-4"
        style={{ backgroundColor: darkColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-zenith-gray-500">{title}</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-zenith-gray-800"
        >
          {value}
        </motion.p>
      </div>
    </div>
  );
};

export default StatCard;
