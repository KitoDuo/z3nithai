import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, BarChart2, MessageSquare, Download, CheckCircle, TrendingUp } from 'lucide-react';

import DashboardCard from '../components/dashboard/DashboardCard';
import MoodChart from '../components/moodlog/MoodChart'; // Re-using this from moodlog
import JournalWordCloud from '../components/dashboard/JournalWordCloud';
import StatCard from '../components/dashboard/StatCard';
import WellnessScore from '../components/dashboard/WellnessScore';

const DashboardPage = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [stats, setStats] = useState({
    totalMoodLogs: 0,
    totalJournalEntries: 0,
    mindmateSessions: 12, // Placeholder
    wellnessScore: 78, // Placeholder
  });

  useEffect(() => {
    // Load data from localStorage
    try {
      const savedMoods = JSON.parse(localStorage.getItem('zenith-mood-entries') || '[]');
      const savedJournals = JSON.parse(localStorage.getItem('zenith-journal-entries') || '[]');
      setMoodEntries(savedMoods);
      setJournalEntries(savedJournals);

      // Calculate stats (placeholders for more complex logic)
      setStats(prev => ({
        ...prev,
        totalMoodLogs: savedMoods.length,
        totalJournalEntries: savedJournals.length,
        // Wellness score could be a mix of avg mood, entry frequency, etc.
        wellnessScore: Math.min(95, Math.floor(60 + (savedMoods.length * 2) + (savedJournals.length * 3)))
      }));

    } catch (error) {
      console.error("Error loading dashboard data from localStorage", error);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleExport = (format) => {
    alert(`Exporting all data as ${format}... (feature placeholder)`);
    // In a real app, this would trigger a download of a CSV or JSON file.
  };

  return (
    <div className="min-h-screen bg-zenith-gray-50 p-6 md:p-10">
      <motion.div
        className="container mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display text-zenith-gray-800">Your Wellness Dashboard</h1>
          <p className="text-lg font-body text-zenith-gray-600 mt-1">
            An overview of your mental wellness journey.
          </p>
        </motion.header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {/* Column 1 */}
          <div className="lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Mood Logs" value={stats.totalMoodLogs} icon={<BarChart2/>} color="pink" />
            <StatCard title="Journal Entries" value={stats.totalJournalEntries} icon={<Book/>} color="blue" />
            <StatCard title="MindMate Sessions" value={stats.mindmateSessions} icon={<MessageSquare/>} color="mint" />

            <div className="md:col-span-3">
              <DashboardCard title="Recent Mood Trends" icon={<BarChart2 />}>
                <MoodChart entries={moodEntries} view="week" />
              </DashboardCard>
            </div>
          </div>

          {/* Column 2 (Sidebar) */}
          <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
            <DashboardCard title="Wellness Score" icon={<CheckCircle />}>
              <WellnessScore score={stats.wellnessScore} />
            </DashboardCard>
            <DashboardCard title="Journal Word Cloud" icon={<TrendingUp />}>
                <JournalWordCloud entries={journalEntries} />
            </DashboardCard>
          </div>

          {/* Additional Full-width cards */}
           <div className="lg:col-span-3 xl:col-span-4">
              <DashboardCard title="Data Export" icon={<Download />}>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                      <p className="text-zenith-gray-600 mb-4 md:mb-0">Download a copy of your journal and mood data.</p>
                      <div className="flex space-x-3">
                          <button onClick={() => handleExport('CSV')} className="px-4 py-2 bg-zenith-blue text-white font-semibold rounded-lg hover:bg-opacity-90 transition">Export as CSV</button>
                          <button onClick={() => handleExport('JSON')} className="px-4 py-2 bg-zenith-mint text-zenith-gray-800 font-semibold rounded-lg hover:bg-opacity-90 transition">Export as JSON</button>
                      </div>
                  </div>
              </DashboardCard>
           </div>

        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
