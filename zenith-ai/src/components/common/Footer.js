import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Instagram, Facebook } from 'lucide-react'; // Placeholder icons

const Footer = () => {
  return (
    <footer className="bg-zenith-gray-800 text-zenith-gray-200 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Zap size={32} className="text-zenith-blue mr-2" />
              <h3 className="text-2xl font-display text-white">Zenith AI</h3>
            </div>
            <p className="text-sm font-body text-zenith-gray-400">
              Rise above the noise. Heal, track, and grow—gently. Your soft companion for mental wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-body">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-zenith-blue transition-colors">About Us</Link></li>
              <li><Link to="/features" className="hover:text-zenith-blue transition-colors">Features</Link></li>
              <li><Link to="/contact" className="hover:text-zenith-blue transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-zenith-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-zenith-blue transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-body">Stay Connected</h4>
            <p className="text-sm text-zenith-gray-400 mb-3">Sign up for our newsletter for updates and wellness tips.</p>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md text-zenith-gray-800 focus:outline-none focus:ring-2 focus:ring-zenith-blue"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zenith-blue text-white rounded-r-md hover:bg-opacity-80 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-zenith-gray-400 hover:text-zenith-blue transition-colors"><Twitter size={24} /></a>
              <a href="#" aria-label="Instagram" className="text-zenith-gray-400 hover:text-zenith-blue transition-colors"><Instagram size={24} /></a>
              <a href="#" aria-label="Facebook" className="text-zenith-gray-400 hover:text-zenith-blue transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-zenith-gray-700 pt-8 text-center">
          <p className="text-sm text-zenith-gray-500 font-body">
            &copy; {new Date().getFullYear()} Zenith AI. All rights reserved.
            Made with <span className="text-zenith-pink">&hearts;</span> for your well-being.
          </p>
          <p className="text-xs text-zenith-gray-600 mt-2 font-body">
            Disclaimer: Zenith AI is a supportive tool and not a replacement for professional medical advice or therapy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
