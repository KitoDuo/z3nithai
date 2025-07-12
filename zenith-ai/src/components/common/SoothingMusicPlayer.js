import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Forward, ListMusic, Timer, X } from 'lucide-react';

const tracks = [
  { name: 'Lofi Beats', icon: '🎧' },
  { name: 'Forest Rain', icon: '🌧️' },
  { name: 'Underwater Calm', icon: '🌊' },
  { name: 'Ambient Drone', icon: '✨' },
];

const SoothingMusicPlayer = ({ isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaylistOpen, setPlaylistOpen] = useState(false);
  const [timer, setTimer] = useState(null); // '30', '60', '90'

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const selectTrack = (index) => {
      setCurrentTrackIndex(index);
      setIsPlaying(true); // Auto-play new track
      setPlaylistOpen(false);
  }

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        drag
        dragConstraints={{ top: -200, left: -300, right: 300, bottom: 200 }}
        dragMomentum={false}
        className="fixed bottom-6 left-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-4 w-72 z-50 text-zenith-gray-800"
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-zenith-gray-500 hover:text-zenith-gray-800"><X size={18}/></button>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-zenith-lavender rounded-lg flex items-center justify-center text-2xl mr-3">
            {tracks[currentTrackIndex].icon}
          </div>
          <div>
            <p className="font-semibold">{tracks[currentTrackIndex].name}</p>
            <p className="text-xs text-zenith-gray-500">{isPlaying ? 'Now Playing' : 'Paused'}</p>
          </div>
        </div>

        <div className="flex items-center justify-around mt-4">
          <button onClick={() => setPlaylistOpen(!isPlaylistOpen)} title="Playlist" className="text-zenith-gray-600 hover:text-zenith-blue"><ListMusic size={20}/></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-zenith-blue text-white rounded-full shadow-lg">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={nextTrack} title="Next Track" className="text-zenith-gray-600 hover:text-zenith-blue"><Forward size={20}/></button>
        </div>

        {/* Playlist Dropdown */}
        <AnimatePresence>
        {isPlaylistOpen && (
            <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0, height: 0}}
                className="mt-3 border-t pt-3"
            >
                {tracks.map((track, index) => (
                    <button key={track.name} onClick={() => selectTrack(index)} className={`w-full text-left p-2 text-sm rounded-md flex items-center ${currentTrackIndex === index ? 'bg-zenith-lavender/50 font-semibold' : 'hover:bg-zenith-gray-100'}`}>
                        <span className="mr-2">{track.icon}</span> {track.name}
                    </button>
                ))}
            </motion.div>
        )}
        </AnimatePresence>

        {/* Timer */}
        <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-zenith-gray-600">
            <Timer size={14}/>
            <span>Auto-stop in:</span>
            {['30', '60', '90'].map(t => (
                <button key={t} onClick={() => setTimer(t)} className={`px-2 py-0.5 rounded-full ${timer === t ? 'bg-zenith-blue text-white' : 'hover:bg-zenith-gray-200'}`}>{t}m</button>
            ))}
            {timer && <button onClick={() => setTimer(null)}><X size={14}/></button>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SoothingMusicPlayer;
