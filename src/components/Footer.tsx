/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Mail, Leaf, Globe, Shield, HelpCircle, Check, X } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setSelectedScentFamily: (family: string | null) => void;
}

export default function Footer({ setCurrentPage, setSelectedScentFamily }: FooterProps) {
  const [showCookie, setShowCookie] = useState(false);
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSigned, setNewsSigned] = useState(false);

  // Read cookies state gracefully after loading
  useEffect(() => {
    const isAccepted = localStorage.getItem('aura-cookies-approved');
    if (!isAccepted) {
      setTimeout(() => setShowCookie(true), 3000);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('aura-cookies-approved', 'true');
    setShowCookie(false);
  };

  const handleNewsSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSigned(true);
    setNewsEmail('');
    setTimeout(() => setNewsSigned(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sand-950 text-sand-300 relative border-t-2 border-gold-500/40 select-none z-10">
      
      {/* Upper Newsletter Container */}
      <div className="border-b border-gold-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-1 text-gold-400 select-none">
              <Leaf size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-gold-300">The Secret Ledger</span>
            </div>
            <h4 className="font-serif text-2xl font-light text-white uppercase tracking-wider">
              Join Our Botanical Register
            </h4>
            <p className="text-xs text-stone-400 leading-normal font-light">
              We distribute quarterly essays regarding Southern French jasmines extraction, organic beet chemistry research, and exclusive limited solstice blend releases.
            </p>
          </div>

          <form onSubmit={handleNewsSignUp} className="w-full lg:max-w-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="email"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="Enter email coordinate..."
                className="w-full bg-stone-900/60 border border-gold-500/10 text-xs text-white placeholder-stone-600 rounded py-3.5 pl-10 pr-4 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <button
              type="submit"
              className="bg-gold-500 hover:bg-gold-400 text-white text-[10px] tracking-widest font-bold uppercase py-3.5 px-8 rounded transition-colors cursor-pointer shrink-0"
            >
              REGISTER
            </button>
          </form>

        </div>
      </div>

      {/* Main Middle multi-links columns list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Description Column */}
        <div className="space-y-4 col-span-2 md:col-span-1">
          <div className="font-serif text-xl text-white tracking-widest uppercase">
            Maison d'Aura
          </div>
          <p className="text-[11px] text-stone-400 leading-relaxed font-light">
            An immersive digital window into molecular botanical science, hand-blown Italian glass, and classic Grasse maceration extraction frameworks.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-400">
            <Globe size={11} />
            <span>London · Grasse · Paris</span>
          </div>
        </div>

        {/* Portfolios links selection */}
        <div className="space-y-4">
          <h5 className="font-serif text-xs font-bold uppercase tracking-widest text-gold-300">
            Olfactory Compendium
          </h5>
          <div className="flex flex-col space-y-2 text-xs text-stone-400">
            {['Woody', 'Fresh', 'Floral', 'Amber', 'Oriental'].map((f) => (
              <button
                key={f}
                className="text-left hover:text-white transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedScentFamily(f);
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0 });
                }}
              >
                {f} Portfolio
              </button>
            ))}
          </div>
        </div>

        {/* Company chronicles links */}
        <div className="space-y-4">
          <h5 className="font-serif text-xs font-bold uppercase tracking-widest text-gold-300">
            The Académie
          </h5>
          <div className="flex flex-col space-y-2 text-xs text-stone-400">
            <button
              onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              The Vance Story
            </button>
            <button
              onClick={() => { setCurrentPage('blog'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Sourcing Chronicles
            </button>
            <button
              onClick={() => { setCurrentPage('shop'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Liquid Sizing options
            </button>
            <button
              onClick={() => { setCurrentPage('quiz'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Decisive Scent Quiz
            </button>
          </div>
        </div>

        {/* Concierge support */}
        <div className="space-y-4">
          <h5 className="font-serif text-xs font-bold uppercase tracking-widest text-gold-300">
            Client Registry
          </h5>
          <div className="flex flex-col space-y-2 text-xs text-stone-400">
            <button
              onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Trace coordinates
            </button>
            <button
              onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Refill programs
            </button>
            <button
              onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Security assurance
            </button>
            <button
              onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0 }); }}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Concierge Contact
            </button>
          </div>
        </div>

      </div>

      {/* Deepest Base footer containing regulatory statements + Back-to-top button */}
      <div className="bg-stone-950 border-t border-gold-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-[10px] text-stone-500 tracking-wider text-center md:text-left space-y-1">
            <div>
              © 2026 Maison d'Aura Ltd. Registered European Botanical Chemists and Macerators. All rights reserved.
            </div>
            <p className="max-w-2xl font-light leading-relaxed">
              *Statements made regarding botanical purity profiles refer strictly to organic denatured beet maceration practices. Natural compounds are monitored for safe application coordinates.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="bg-stone-900 hover:bg-gold-500 border border-gold-500/15 hover:border-gold-500 text-gold-300 hover:text-white p-3 rounded-full cursor-pointer transition-all shrink-0"
            title="Scent to top of screen"
          >
            <ArrowUp size={16} />
          </button>

        </div>
      </div>

      {/* Global Toast indicator for Newsletter signup */}
      <AnimatePresence>
        {newsSigned && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-gold-950 text-gold-200 border border-gold-500/20 shadow-2xl p-4 max-w-sm rounded flex items-start gap-3"
          >
            <Check size={16} className="text-gold-500 mt-1 shrink-0 bg-white rounded-full p-0.5 leading-none" />
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-white">Joined Scent Register</div>
              <p className="text-[10px] text-stone-400 mt-0.5 font-light">
                Your email coordinate has been locked cleanly. Welcome to the Vance heritage chronicle files.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookies acknowledgement banner standard */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-stone-900 border border-gold-500/10 p-5 rounded-lg shadow-2xl flex flex-col gap-4 text-white"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gold-500" />
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">
                  Intellectual Cookie Coordinates
                </h4>
              </div>
              <button onClick={() => setShowCookie(false)} className="text-stone-400 hover:text-white cursor-pointer">
                <X size={15} />
              </button>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed font-light">
              Maison d'Aura logs miniature local storage cookies to securely retain checkout calculations, cart coordinates, and matching quiz choices between sessions.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAcceptCookies}
                className="bg-gold-500 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 px-5 rounded hover:bg-gold-400 transition-colors cursor-pointer flex-1"
              >
                AUTHORIZE COOKIES
              </button>
              <button
                onClick={() => setShowCookie(false)}
                className="border border-stone-700 hover:bg-stone-800 text-[10px] tracking-widest uppercase font-bold py-2.5 px-4 rounded transition-colors cursor-pointer"
              >
                DECLINE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
