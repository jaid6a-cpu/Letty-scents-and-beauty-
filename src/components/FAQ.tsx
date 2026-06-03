/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare, Compass, Truck, HelpCircle, Shield, RefreshCw } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Why does Maison use organic beet alcohol?",
    a: "Standard perfumery denatures alcohol using heavy phthalates, which are synthetically manufactured chemicals that can trigger allergen sensitivity. We denature our certified agricultural sugar beetroot spirits using safe botanical oil trace compounds, creating an eye-safe, skin-safe, olfactory-neutral mist that evaporates cleanly."
  },
  {
    q: "How does the complementary travel vial trial work?",
    a: "Every grand 50ml, 100ml, and 200ml bottle is wrapped inside a thick hand-labeled capsule accompanied by a matching 2.5ml travel spray. We request that you utilize the tester vial first to experience its evolution over a 48-hour cycle. If you decide the scent family does not marry with your natural chemistry, you are welcome to schedule a complimentary courier pickup—provided the primary grand box seals remain completely unbroken."
  },
  {
    q: "What are the concentration ratios of Extrait vs Eau de Parfum?",
    a: "Our Eau de Parfums (such as Santal Sacré and Fleur de Sel) range from 18% to 22% raw essential oil concentrations, delivering immediate conversations that last for up to 6 hours. Our Extraits de Parfum (such as L'Ombre d'Or) and Oud Intense profiles contain up to 30% concentrations, unravelling rich base-notes layers that trigger olfactory recognition on pulse coordinates for a solid 12 to 18 hours."
  },
  {
    q: "Do you ship internationally under customs certificates?",
    a: "Yes. Due to the alcohol ratios, fragrances require specific hazardous consumer logistics handling certificates. Maison d'Aura is registered to ship packages into all major countries under EU & global chemical tracking directives, wrapped securely under flight-pressure safety observation."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchOrderCode, setSearchOrderCode] = useState('');
  const [trackingState, setTrackingState] = useState<string | null>(null);
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderCode.trim()) return;

    setIsSearchingOrder(true);
    setTrackingState(null);

    setTimeout(() => {
      setIsSearchingOrder(false);
      const randStatus = [
        "Scent bottle registered cleanly. Hand-pouring completes at 3:15 PM today.",
        "Meticulously wrapping inside warm velvet fabric. Shipped to London hub.",
        "Undergoing wax seal temperature inspection by chief chemist Marcella.",
        "Awaiting courier scheduled pickup inside flight-safe pressurized crates."
      ];
      setTrackingState(randStatus[Math.floor(Math.random() * randStatus.length)]);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="text-gold-500 animate-pulse" size={18} />
          <span className="text-[10px] uppercase font-bold text-gold-600 tracking-[0.3em] font-serif">Maison Concierge</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-950 uppercase tracking-widest leading-none">
          Client Services
        </h2>
        <p className="text-sand-600 font-light text-xs sm:text-sm leading-relaxed">
          Our concierge representatives operate twenty-four hours to direct inquiries regarding chemistry safety, courier arrivals, and formulation updates.
        </p>
      </div>

      {/* Scent tracking simulator tool */}
      <section className="bg-white border border-gold-200/20 p-6 md:p-8 rounded shadow-xl space-y-6">
        <div className="flex items-start gap-3">
          <Truck className="text-gold-600 shrink-0 mt-0.5" size={22} />
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand-950 uppercase">
              Trace Scent Coordinates
            </h4>
            <p className="text-xs text-sand-500 font-light leading-normal pt-0.5">
              Input your invoice reference to trace our hand-pouring and courier transportation milestones.
            </p>
          </div>
        </div>

        <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={searchOrderCode}
            onChange={(e) => setSearchOrderCode(e.target.value)}
            placeholder="e.g. MA-2026-628405"
            className="flex-1 bg-sand-50 border border-gold-200/30 rounded p-3 text-xs font-mono tracking-widest text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />

          <button
            type="submit"
            className="bg-gold-950 hover:bg-gold-900 text-gold-200 text-xs font-serif uppercase tracking-widest px-8 py-3.5 rounded transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSearchingOrder ? (
              <>
                <RefreshCw className="animate-spin" size={12} />
                <span>Searching ledgers...</span>
              </>
            ) : (
              <>
                <Compass size={12} />
                <span>Sync coordinates</span>
              </>
            )}
          </button>
        </form>

        {trackingState && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold-50/50 border border-gold-100 p-4 rounded text-xs leading-normal font-sans"
          >
            <div className="font-semibold text-sand-950 flex items-center gap-1.5 uppercase tracking-wider text-[10px] pb-1 border-b border-gold-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LOGGED STATUS REPORT</span>
            </div>
            <p className="text-sand-700 mt-2 font-serif italic text-sm">
              "{trackingState}"
            </p>
          </motion.div>
        )}
      </section>

      {/* Accordion list */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl uppercase tracking-widest text-sand-950 font-light text-center">
          Intellectual Questions
        </h3>
        
        <div className="space-y-3.5 max-w-3xl mx-auto pt-6">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gold-200/10 rounded overflow-hidden shadow-xs hover:border-gold-300 transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-sand-950 hover:text-gold-600 transition-colors cursor-pointer select-none"
              >
                <div className="flex gap-3 items-center">
                  <HelpCircle size={16} className="text-gold-500" />
                  <span className="font-serif text-base font-semibold uppercase tracking-wide">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown size={14} className={`text-sand-400 transition-transform ${openIdx === idx ? 'rotate-180 text-gold-500' : ''}`} />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-1 text-xs text-sand-600 leading-relaxed font-light border-t border-gold-100/30">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
