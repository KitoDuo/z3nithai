import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ enabled, setEnabled, label }) => {
  return (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zenith-gray-700">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zenith-blue ${
                enabled ? 'bg-zenith-blue' : 'bg-zenith-gray-300'
            }`}
            aria-checked={enabled}
        >
            <motion.span
                className="inline-block w-4 h-4 transform bg-white rounded-full"
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                animate={{ x: enabled ? 22 : 2 }}
            />
        </button>
    </div>
  );
};

export default ToggleSwitch;
