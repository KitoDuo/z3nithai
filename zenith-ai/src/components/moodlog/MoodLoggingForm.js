import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const moodOptions = [
  { level: 1, emoji: '😔', label: 'Awful', color: '#6b7280' },
  { level: 2, emoji: '😟', label: 'Bad', color: '#ef4444' },
  { level: 3, emoji: '😐', label: 'Meh', color: '#f97316' },
  { level: 4, emoji: '🙂', label: 'Okay', color: '#f59e0b' },
  { level: 5, emoji: '😄', label: 'Good', color: '#84cc16' },
  { level: 6, emoji: '🤩', label: 'Great', color: '#22c55e' },
];

const popularTags = ["work", "family", "friends", "health", "hobby", "weather", "relaxing", "stressful"];

const MoodLoggingForm = ({ onSave, onCancel }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [note, setNote] = useState('');
  const [customTag, setCustomTag] = useState('');

  const handleTagClick = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleCustomTagKeydown = (e) => {
    if (e.key === 'Enter' && customTag.trim()) {
      e.preventDefault();
      if (!tags.includes(customTag.trim())) {
        setTags(prev => [...prev, customTag.trim()]);
      }
      setCustomTag('');
    }
  };

  const handleSave = () => {
    if (!selectedMood) {
      alert("Please select a mood before saving.");
      return;
    }
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      tags,
      note,
    };
    onSave(newEntry);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="p-6 bg-white rounded-2xl shadow-2xl max-w-lg w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display text-zenith-gray-800">How are you feeling right now?</h2>
      </div>

      {/* Mood Scale */}
      <div className="flex justify-around items-end mb-6">
        {moodOptions.map(mood => (
          <motion.div
            key={mood.level}
            className="text-center cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedMood(mood)}
          >
            <span className={`text-4xl transition-transform duration-200 ${selectedMood?.level === mood.level ? 'transform scale-125' : 'opacity-60'}`} style={{filter: selectedMood && selectedMood.level !== mood.level ? 'saturate(0)' : 'saturate(1)'}}>
              {mood.emoji}
            </span>
            <p className={`text-xs font-semibold transition-colors ${selectedMood?.level === mood.level ? '' : 'text-zenith-gray-500'}`} style={{color: selectedMood?.level === mood.level ? mood.color : ''}}>
              {mood.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-zenith-gray-700 mb-2">Add tags (optional)</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {popularTags.map(tag => (
            <button key={tag} onClick={() => handleTagClick(tag)} className={`px-3 py-1 text-sm rounded-full border transition-colors ${tags.includes(tag) ? 'bg-zenith-blue text-white border-zenith-blue' : 'bg-zenith-gray-100 border-zenith-gray-200 hover:bg-zenith-lavender/50'}`}>
              {tag}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            {tags.filter(t => !popularTags.includes(t)).map(tag => (
                <div key={tag} className="flex items-center bg-zenith-blue text-white text-sm px-3 py-1 rounded-full">
                    <span>{tag}</span>
                    <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1.5 opacity-70 hover:opacity-100"><X size={14}/></button>
                </div>
            ))}
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={handleCustomTagKeydown}
              placeholder="Add your own tag..."
              className="flex-grow p-1 border-b-2 border-transparent focus:border-zenith-blue focus:outline-none"
            />
        </div>
      </div>

      {/* Note */}
      <div className="mb-6">
        <label htmlFor="note" className="block text-md font-semibold text-zenith-gray-700 mb-2">Add a note (optional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="3"
          placeholder="What's on your mind?"
          className="w-full p-3 border border-zenith-lavender rounded-lg focus:ring-2 focus:ring-zenith-blue focus:border-transparent transition"
        ></textarea>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        {onCancel && <button onClick={onCancel} className="px-6 py-2 text-zenith-gray-600 hover:bg-zenith-gray-100 rounded-lg transition">Cancel</button>}
        <button
          onClick={handleSave}
          disabled={!selectedMood}
          className="px-8 py-2 bg-zenith-pink text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Entry
        </button>
      </div>
    </motion.div>
  );
};

export default MoodLoggingForm;
