import React from 'react';
import { motion } from 'framer-motion';

const WellnessScore = ({ score }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreColor = score > 75 ? '#22c55e' : score > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="15"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={scoreColor}
            strokeWidth="15"
            fill="transparent"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-zenith-gray-500">Wellness Score</span>
          <motion.span
            className="text-5xl font-display font-bold"
            style={{ color: scoreColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <p className="text-center text-sm text-zenith-gray-600 mt-4">
        A holistic score based on your recent mood logs and journal activity.
      </p>
    </div>
  );
};

export default WellnessScore;
