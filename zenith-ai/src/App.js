import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import MindMatePage from './pages/MindMatePage';
import CharacterLoungePage from './pages/CharacterLoungePage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import JournalingPage from './pages/JournalingPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Import global styles for fonts if not already handled by index.css
// import '@fontsource/playfair-display';
// import '@fontsource/inter'; // or dm-sans

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/mindmate" element={<MindMatePage />} />
          <Route path="/characters" element={<CharacterLoungePage />} />
          <Route path="/moodlog" element={<MoodTrackerPage />} />
          <Route path="/journal" element={<JournalingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
