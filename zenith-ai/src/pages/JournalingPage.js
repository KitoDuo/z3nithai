import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JournalEditor from '../components/journal/JournalEditor';
import JournalTimeline from '../components/journal/JournalTimeline';
import { Book, PlusCircle } from 'lucide-react';
import { subDays } from 'date-fns';

// Mock data for demonstration
const initialJournalEntries = [
  {
    id: 1,
    date: subDays(new Date(), 2).toISOString(),
    title: 'A Moment of Peace',
    content: 'Today was hectic, but I found a quiet moment to watch the sunset. The colors were incredible, a mix of orange and purple. It helped me feel grounded and calm after a long day of meetings and deadlines.',
    mood: { level: 5, emoji: '😄', label: 'Good' }
  },
  {
    id: 2,
    date: subDays(new Date(), 5).toISOString(),
    title: 'Reflecting on a Challenge',
    content: 'Had a difficult conversation with a colleague. It was tough, but we managed to find a common ground. I feel like I learned a lot about listening and understanding different perspectives.',
    mood: { level: 4, emoji: '🙂', label: 'Okay' }
  },
];

const JournalingPage = () => {
  const [entries, setEntries] = useState(() => {
    try {
      const savedEntries = localStorage.getItem('zenith-journal-entries');
      return savedEntries ? JSON.parse(savedEntries) : initialJournalEntries;
    } catch (error) {
      return initialJournalEntries;
    }
  });

  const [selectedEntry, setSelectedEntry] = useState(null); // null means new entry

  useEffect(() => {
    try {
      localStorage.setItem('zenith-journal-entries', JSON.stringify(entries));
    } catch (error) {
      console.error("Could not save journal entries to localStorage", error);
    }
  }, [entries]);

  const handleSaveEntry = (entryToSave) => {
    const existingIndex = entries.findIndex(e => e.id === entryToSave.id);
    let newEntries;

    if (existingIndex > -1) {
      // Update existing entry
      newEntries = [...entries];
      newEntries[existingIndex] = entryToSave;
    } else {
      // Add new entry
      newEntries = [entryToSave, ...entries];
    }

    setEntries(newEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setSelectedEntry(entryToSave); // Keep the saved entry in the editor view
  };

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const handleNewEntry = () => {
    setSelectedEntry(null); // Setting to null signifies a new entry
  };

  const handleDeleteEntry = (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
        const newEntries = entries.filter(e => e.id !== idToDelete);
        setEntries(newEntries);
        // If the deleted entry was being edited, switch to new entry mode
        if (selectedEntry && selectedEntry.id === idToDelete) {
            setSelectedEntry(null);
        }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zenith-beige/70 via-zenith-lavender/50 to-zenith-mint/50 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <header className="text-center mb-10">
          <Book size={48} className="mx-auto text-zenith-blue mb-4" />
          <h1 className="text-4xl md:text-5xl font-display text-zenith-gray-800">My Journal</h1>
          <p className="text-lg font-body text-zenith-gray-600 mt-1">A private space to write, reflect, and grow.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Timeline / Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-display text-zenith-gray-700">Entries</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewEntry}
                    className="flex items-center px-4 py-2 bg-zenith-blue text-white text-sm font-semibold rounded-lg shadow hover:bg-opacity-90 transition-colors"
                >
                    <PlusCircle size={18} className="mr-2" />
                    New Entry
                </motion.button>
            </div>
            <div className="bg-white/50 p-4 rounded-xl shadow-lg max-h-[60vh] overflow-y-auto custom-scrollbar">
                <JournalTimeline
                    entries={entries}
                    onSelectEntry={handleSelectEntry}
                    onDeleteEntry={handleDeleteEntry}
                    currentEntryId={selectedEntry?.id}
                />
            </div>
          </motion.div>

          {/* Editor */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEntry ? selectedEntry.id : 'new'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <JournalEditor
                  onSave={handleSaveEntry}
                  existingEntry={selectedEntry}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournalingPage;
