import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, Bell, Database, Lock, Info } from 'lucide-react';

import SettingsSection from '../components/settings/SettingsSection';
import ToggleSwitch from '../components/settings/ToggleSwitch';

const themeColors = [
    { name: 'Default', primary: '#ADD8E6', secondary: '#FFB6C1' }, // blue, pink
    { name: 'Forest', primary: '#22c55e', secondary: '#f59e0b' }, // green, amber
    { name: 'Ocean', primary: '#0ea5e9', secondary: '#06b6d4' }, // sky, cyan
    { name: 'Sunset', primary: '#f97316', secondary: '#ef4444' }, // orange, red
    { name: 'Lavender', primary: '#a855f7', secondary: '#818cf8' }, // purple, indigo
];

const SettingsPage = () => {
  // Use a single state object for all settings
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('zenith-settings');
    const defaultSettings = {
      themeColor: 'Default',
      layoutStyle: 'Expanded',
      darkMode: false,
      reminderTime: 'evening',
      aiTone: 'Friendly',
      storageType: 'cookie',
      passcodeLock: false,
    };
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem('zenith-settings', JSON.stringify(settings));
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleClearHistory = (type) => {
      if (window.confirm(`Are you sure you want to clear all your ${type} data? This cannot be undone.`)) {
          localStorage.removeItem(`zenith-${type}-entries`);
          alert(`${type} data has been cleared.`);
          window.location.reload(); // Reload to reflect changes
      }
  }

  return (
    <div className="min-h-screen bg-zenith-gray-50 dark:bg-zenith-gray-900 text-zenith-gray-800 dark:text-zenith-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl py-10 px-6"
      >
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display flex items-center">
            <Settings size={40} className="mr-4 text-zenith-blue" />
            Settings
          </h1>
          <p className="text-lg font-body text-zenith-gray-600 dark:text-zenith-gray-400 mt-1">
            Customize your Zenith AI experience.
          </p>
        </header>

        {/* Appearance Section */}
        <SettingsSection title="Appearance" description="Tailor the look and feel of the app.">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300">Theme Color (Visual Only)</label>
              <div className="mt-2 flex space-x-2">
                {themeColors.map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => handleSettingChange('themeColor', theme.name)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ring-2 transition ${settings.themeColor === theme.name ? 'ring-offset-2 ring-blue-500' : 'ring-transparent'}`}
                    title={theme.name}
                  >
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})`}}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
            <ToggleSwitch label="Dark Mode" enabled={settings.darkMode} setEnabled={(val) => handleSettingChange('darkMode', val)} />
            {/* Mock Layout Style */}
            <div>
              <label className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300">Layout Style</label>
              <div className="mt-2 flex items-center p-1 bg-zenith-gray-100 dark:bg-zenith-gray-800 rounded-lg">
                {['Minimalist', 'Expanded'].map(style => (
                  <button key={style} onClick={() => handleSettingChange('layoutStyle', style)} className={`w-1/2 py-1.5 text-sm font-semibold rounded-md transition ${settings.layoutStyle === style ? 'bg-white dark:bg-zenith-gray-600 shadow' : 'hover:bg-white/50 dark:hover:bg-zenith-gray-700/50'}`}>
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Behavior Section */}
        <SettingsSection title="Behavior" description="Adjust how the app interacts with you.">
           <div className="flex flex-col space-y-4">
               <div>
                    <label className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300">AI Tone</label>
                    <select value={settings.aiTone} onChange={(e) => handleSettingChange('aiTone', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-zenith-gray-300 focus:outline-none focus:ring-zenith-blue focus:border-zenith-blue sm:text-sm rounded-md bg-white dark:bg-zenith-gray-800 dark:border-zenith-gray-600">
                        <option>Friendly</option>
                        <option>Professional</option>
                        <option>Playful</option>
                    </select>
               </div>
               {/* Mock Reminder Settings */}
               <div>
                    <label className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300">Mood Log Reminders</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-zenith-gray-300 focus:outline-none focus:ring-zenith-blue focus:border-zenith-blue sm:text-sm rounded-md bg-white dark:bg-zenith-gray-800 dark:border-zenith-gray-600">
                        <option>Every 4 hours</option>
                        <option>Twice a day (Morning & Evening)</option>
                        <option>Once a day (Evening)</option>
                        <option>Disabled</option>
                    </select>
               </div>
           </div>
        </SettingsSection>

        {/* Storage & Security */}
        <SettingsSection title="Data & Security" description="Manage your personal data and app security.">
            <div className="flex flex-col space-y-4">
                <ToggleSwitch label="Enable Passcode Lock" enabled={settings.passcodeLock} setEnabled={(val) => handleSettingChange('passcodeLock', val)} />
                <div>
                  <label className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300">Data Storage</label>
                  <div className="mt-2 flex items-center p-1 bg-zenith-gray-100 dark:bg-zenith-gray-800 rounded-lg">
                    {['cookie', 'cloud'].map(type => (
                      <button key={type} onClick={() => handleSettingChange('storageType', type)} className={`w-1/2 py-1.5 text-sm font-semibold rounded-md transition capitalize ${settings.storageType === type ? 'bg-white dark:bg-zenith-gray-600 shadow' : 'hover:bg-white/50 dark:hover:bg-zenith-gray-700/50'}`}>
                        {type === 'cookie' ? 'Local' : 'Cloud Sync'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-zenith-gray-700 dark:text-zenith-gray-300 mb-2">Clear History</p>
                    <div className="flex space-x-3">
                        <button onClick={() => handleClearHistory('mood')} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg hover:bg-red-200 transition">Clear Mood Data</button>
                        <button onClick={() => handleClearHistory('journal')} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg hover:bg-red-200 transition">Clear Journal Data</button>
                    </div>
                </div>
            </div>
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="About Zenith AI" description="Version information and credits.">
            <div className="text-sm text-zenith-gray-600 dark:text-zenith-gray-400">
                <p><strong>Version:</strong> 1.0.0 (Client)</p>
                <p className="mt-2">Zenith AI is a project designed to explore the intersection of technology and mental well-being. It is not a medical device and should not be used as a replacement for professional therapy.</p>
                <p className="mt-2">Made with <span className="text-pink-500">&hearts;</span> by a dedicated team.</p>
            </div>
        </SettingsSection>

      </motion.div>
    </div>
  );
};

export default SettingsPage;
