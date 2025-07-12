import React, { useState, useEffect } from 'react';
import Footer from './common/Footer';
import SoothingMusicPlayer from './common/SoothingMusicPlayer';
import FloatingAffirmation from './common/FloatingAffirmation';

// This component will now manage the global UI widgets
const Layout = ({ children }) => {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);

  // In a real app, these would be controlled by the settings context.
  // For now, let's use a timer to show them as a demo.
  useEffect(() => {
    const musicTimer = setTimeout(() => setShowMusicPlayer(true), 3000);
    const affirmationTimer = setTimeout(() => setShowAffirmation(true), 5000);

    return () => {
      clearTimeout(musicTimer);
      clearTimeout(affirmationTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-body bg-zenith-white dark:bg-zenith-gray-900 text-zenith-gray-800 dark:text-zenith-gray-200">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      {/* Ambient Features */}
      <SoothingMusicPlayer
        isVisible={showMusicPlayer}
        onClose={() => setShowMusicPlayer(false)}
      />
      <FloatingAffirmation
        isVisible={showAffirmation}
        onClose={() => setShowAffirmation(false)}
      />
    </div>
  );
};

export default Layout;
