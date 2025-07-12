import React from 'react';
import { motion } from 'framer-motion';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay } from 'date-fns';

const moodOptions = [
    { level: 1, emoji: '😔', label: 'Awful', color: '#6b7280' },
    { level: 2, emoji: '😟', label: 'Bad', color: '#ef4444' },
    { level: 3, emoji: '😐', label: 'Meh', color: '#f97316' },
    { level: 4, emoji: '🙂', label: 'Okay', color: '#f59e0b' },
    { level: 5, emoji: '😄', label: 'Good', color: '#84cc16' },
    { level: 6, emoji: '🤩', label: 'Great', color: '#22c55e' },
];

const MoodChart = ({ entries, view }) => {
  const today = new Date();
  let dateInterval;

  switch (view) {
    case 'week':
      dateInterval = eachDayOfInterval({ start: startOfWeek(today, { weekStartsOn: 1 }), end: endOfWeek(today, { weekStartsOn: 1 }) });
      break;
    case 'month':
      dateInterval = eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) });
      break;
    default: // 'day' view will just show the week for context
      dateInterval = eachDayOfInterval({ start: startOfWeek(today, { weekStartsOn: 1 }), end: endOfWeek(today, { weekStartsOn: 1 }) });
      break;
  }

  const chartData = dateInterval.map(date => {
    const entryForDay = entries.find(entry => isSameDay(new Date(entry.date), date));
    return {
      date,
      entry: entryForDay,
      moodLevel: entryForDay ? entryForDay.mood.level : 0,
      moodColor: entryForDay ? entryForDay.mood.color : '#e5e7eb', // Default color for no entry
      moodEmoji: entryForDay ? entryForDay.mood.emoji : '',
    };
  });

  const getLabelFormat = () => {
    if (view === 'month') return 'd';
    return 'EEE';
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <h3 className="text-xl font-display text-zenith-gray-800 mb-6 text-center">Your Mood Over Time</h3>
      <div className="flex justify-end items-baseline space-x-2 h-64">
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full relative group">
            {/* Bar */}
            <motion.div
              className="w-full rounded-t-lg"
              style={{ backgroundColor: data.moodColor }}
              initial={{ height: 0 }}
              animate={{ height: `${(data.moodLevel / moodOptions.length) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tooltip */}
              {data.entry && (
                <div className="absolute bottom-full mb-2 w-max max-w-xs p-3 bg-zenith-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <p className="font-bold">{format(data.date, 'MMM d')}: {data.entry.mood.label} {data.moodEmoji}</p>
                  {data.entry.note && <p className="mt-1 italic">"{data.entry.note}"</p>}
                  {data.entry.tags.length > 0 && <p className="mt-1 text-zenith-lavender/80">Tags: {data.entry.tags.join(', ')}</p>}
                </div>
              )}
            </motion.div>

            {/* Label */}
            <span className={`mt-2 text-xs font-semibold ${isSameDay(data.date, today) ? 'text-zenith-blue font-bold' : 'text-zenith-gray-500'}`}>
              {format(data.date, getLabelFormat())}
            </span>
          </div>
        ))}
      </div>
       <div className="flex justify-center mt-4 border-t pt-4">
            <div className="flex flex-wrap gap-2">
                {moodOptions.map(mood => (
                    <div key={mood.level} className="flex items-center text-xs text-zenith-gray-600">
                        <div className="w-3 h-3 rounded-sm mr-1.5" style={{backgroundColor: mood.color}}></div>
                        <span>{mood.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default MoodChart;
