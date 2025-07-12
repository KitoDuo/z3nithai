import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const JournalTimeline = ({ entries, onSelectEntry, onDeleteEntry, currentEntryId }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <BookOpen size={48} className="mx-auto text-zenith-gray-300 mb-4" />
        <h3 className="text-xl font-display text-zenith-gray-500">Your journal is empty.</h3>
        <p className="text-md font-body text-zenith-gray-400">Create your first entry to begin your journey.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                      ${currentEntryId === entry.id ? 'bg-zenith-lavender/50 ring-2 ring-zenith-blue' : 'bg-white hover:bg-zenith-beige/50 shadow-sm hover:shadow-md'}`}
          onClick={() => onSelectEntry(entry)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-display text-lg text-zenith-gray-800">{entry.title}</h4>
              <p className="text-xs text-zenith-gray-500 font-semibold">
                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {entry.mood && <span className="text-2xl">{entry.mood.emoji}</span>}
          </div>
          <p className="text-sm font-body text-zenith-gray-600 mt-2 truncate">
            {entry.content}
          </p>
          <div className="mt-3 flex justify-end">
            <button
                onClick={(e) => { e.stopPropagation(); onDeleteEntry(entry.id); }}
                className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
            >
                Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default JournalTimeline;
