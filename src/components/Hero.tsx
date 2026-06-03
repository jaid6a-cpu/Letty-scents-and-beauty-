/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, Compass, ChevronRight, Wind, Award, Flower2 } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onGoToShop: () => void;
}

export default function Hero({ onStartQuiz, onGoToShop }: HeroProps) {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1600',
      title: "L'Ombre d'Or",
      tagline: "The Golden Shadow — Extrait de Parfum",
      description: "An intoxicating blend of wild saffron, velvet rose absolute, and warm ambergris. Made in limited quantities for the autumn solstice.",
      badge: "L'Ombre d'Or",
      themeColor: "text-amber-400 border-amber-400/30"
    },
    {
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1600',
      title: "Santal Sacré",
      tagline: "The Sacred Sandalwood — Eau de Parfum",
      description: "A serene sanctuary of dry papyrus reed, Virginia cedarwood, Mysore sandalwood, and soft white leather.",
      badge: "Santal Sacré",
      themeColor: "text-sand-400 border-sand-400/30"
    },
    {
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1600',
      title: "Rêve de Jasmin",
      tagline: "The Jasmine Dream — Eau de Parfum",
      description: "An authentic, dewy floral signature extracted by hand at sunrise in Grasse, blended with fresh white peach and clean skin musk.",
      badge: "Rêve de Jasmin",
      themeColor: "text-rose-300 border-rose-300/30"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-stone-950">
      
      {/* Immersive Slideshow Container */}
      <div className="relative h-[90vh] md:h-[82vh] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Background Image with Layered Shadows for readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-stone-950/45 to-stone-950" />
            <img
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover select-none object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col items-center max-w-3xl"
            >
              {/* Luxury Limited Release Badge */}
              <div className={`text-[10px] uppercase tracking-[0.4em] px-4 py-1.5 border rounded-full mb-6 font-serif ${slides[activeSlide].themeColor} bg-black/30 backdrop-blur-md`}>
                Featured Creation
              </div>

              {/* Master Heading */}
              <h1 className="font-serif text-white font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] uppercase leading-none drop-shadow-lg">
                {slides[activeSlide].title}
              </h1>

              {/* Subheading */}
              <div className="text-gold-200 font-serif text-lg sm:text-xl italic md:text-2xl mt-4 tracking-wider">
                {slides[activeSlide].tagline}
              </div>

              {/* Story/Description */}
              <p className="text-sand-100/85 text-xs sm:text-sm md:text-base font-light mt-4 leading-relaxed tracking-wider max-w-2xl px-4">
                {slides[activeSlide].description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
                <button
                  onClick={onGoToShop}
                  className="bg-gold-500 hover:bg-gold-400 text-white font-serif text-xs uppercase tracking-[0.25em] font-medium py-4 px-8 rounded transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 cursor-pointer w-full sm:w-auto"
                >
                  Explore Collection
                </button>
                
                <button
                  onClick={onStartQuiz}
                  className="bg-white/10 hover:bg-white/15 text-gold-200 border border-gold-300/30 hover:border-gold-300/65 font-serif text-xs uppercase tracking-[0.25em] font-medium py-4 px-8 rounded backdrop-blur-md transition-all transform hover:translate-y-[-2px] cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1"
                >
                  <span>Bespoke Scent Finder</span>
                  <ChevronRight size={14} className="text-gold-300" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex space-x-2.5 mt-16">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeSlide === index ? 'w-8 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/45'
                }`}
                title={`Show creation slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Brands Trust/Pillars Bar */}
      <section className="bg-sand-100/90 border-t border-b border-gold-200/10 py-10 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white rounded shadow-sm shrink-0 border border-gold-100">
              <Flower2 className="text-gold-600" size={18} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-sand-950 uppercase">Provenance of Grasse</h4>
              <p className="text-xs text-sand-600 mt-1 leading-relaxed">
                Raw materials harvested exclusively at dawn for ultimate extract preservation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white rounded shadow-sm shrink-0 border border-gold-100">
              <Compass className="text-gold-600" size={18} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-sand-950 uppercase">Olfactory Pyramids</h4>
              <p className="text-xs text-sand-600 mt-1 leading-relaxed">
                Balanced evolutions engineered to unravel from citrus peaks to deep velvet resins.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white rounded shadow-sm shrink-0 border border-gold-100">
              <Shield className="text-gold-600" size={18} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-sand-950 uppercase">Conscious Luxury</h4>
              <p className="text-xs text-sand-600 mt-1 leading-relaxed">
                100% recyclable hand-blown Italian glass, organic denatured beet alcohol.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white rounded shadow-sm shrink-0 border border-gold-100">
              <Sparkles className="text-gold-600" size={18} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-sand-950 uppercase">Signature Service</h4>
              <p className="text-xs text-sand-600 mt-1 leading-relaxed">
                Bespoke luxury wrapping with two travel vials included with every order.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
