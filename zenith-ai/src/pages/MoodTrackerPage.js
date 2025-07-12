import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodLoggingForm from '../components/moodlog/MoodLoggingForm';
import MoodChart from '../components/moodlog/MoodChart';
import { PlusCircle, BarChartHorizontal } from 'lucide-react';
import { subDays } from 'date-fns';

// Mock data for demonstration
const initialMoodEntries = [
  { id: 1, date: subDays(new Date(), 1).toISOString(), mood: { level: 5, emoji: '😄', label: 'Good', color: '#84cc16' }, tags: ['work', 'project'], note: 'Finished a major project! Feeling accomplished.' },
  { id: 2, date: subDays(new Date(), 3).toISOString(), mood: { level: 2, emoji: '😟', label: 'Bad', color: '#ef4444' }, tags: ['health', 'stressful'], note: 'Feeling under the weather and stressed.' },
  { id: 3, date: subDays(new Date(), 5).toISOString(), mood: { level: 4, emoji: '🙂', label: 'Okay', color: '#f59e0b' }, tags: ['friends'], note: 'Hung out with friends, which was nice.' },
  { id: 4, date: new Date().toISOString(), mood: { level: 6, emoji: '🤩', label: 'Great', color: '#22c55e' }, tags: ['relaxing', 'hobby'], note: 'Spent the evening reading a great book.' },
];


const MoodTrackerPage = () => {
  const [moodEntries, setMoodEntries] = useState(() => {
    // In a real app, load from localStorage or API
    // For now, use mock data
    try {
      const savedEntries = localStorage.getItem('zenith-mood-entries');
      return savedEntries ? JSON.parse(savedEntries) : initialMoodEntries;
    } catch (error) {
      return initialMoodEntries;
    }
  });

  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect(() => {
    // Save to localStorage whenever entries change
    try {
      localStorage.setItem('zenith-mood-entries', JSON.stringify(moodEntries));
    } catch (error) {
      console.error("Could not save mood entries to localStorage", error);
    }
  }, [moodEntries]);


  const handleSaveEntry = (newEntry) => {
    setMoodEntries(prevEntries => [...prevEntries, newEntry].sort((a, b) => new Date(b.date) - new Date(a.date)));
    setShowLogForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zenith-pink/30 via-zenith-beige to-zenith-mint/30 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-5xl"
      >
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-display text-zenith-gray-800">Mood Log</h1>
            <p className="text-lg font-body text-zenith-gray-600 mt-1">
              Track your emotional well-being over time.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogForm(true)}
            className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-zenith-pink text-white font-semibold rounded-xl shadow-lg hover:bg-opacity-90 transition-colors"
          >
            <PlusCircle size={22} className="mr-2" />
            Log Current Mood
          </motion.button>
        </header>

        {/* Chart and View Toggles */}
        <section className="mb-10">
          <div className="flex justify-center md:justify-end mb-4">
            <div className="flex items-center p-1 bg-zenith-lavender/50 rounded-lg">
              {['week', 'month'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors capitalize ${
                    view === v ? 'bg-white text-zenith-blue shadow' : 'text-zenith-gray-600 hover:bg-white/50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <MoodChart entries={moodEntries} view={view} />
        </section>

        {/* Recent Entries List */}
        <section>
            <h2 className="text-2xl font-display text-zenith-gray-700 mb-4 flex items-center"><BarChartHorizontal size={24} className="mr-3 text-zenith-blue"/>Recent Entries</h2>
            <div className="space-y-4">
                {moodEntries.slice(0, 5).map(entry => (
                    <motion.div
                        key={entry.id}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1}}
                        className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4"
                    >
                        <span className="text-3xl mt-1">{entry.mood.emoji}</span>
                        <div className="flex-grow">
                            <p className="font-semibold text-zenith-gray-800">{entry.mood.label} <span className="text-sm font-normal text-zenith-gray-500">- {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span></p>
                            <p className="text-sm text-zenith-gray-600 italic">{entry.note || "No note added."}</p>
                            {entry.tags.length > 0 &&
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {entry.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 text-xs bg-zenith-gray-100 text-zenith-gray-700 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            }
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

      </motion.div>

      {/* Logging Form Modal */}
      <AnimatePresence>
        {showLogForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogForm(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <MoodLoggingForm
                onSave={handleSaveEntry}
                onCancel={() => setShowLogForm(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodTrackerPage;
