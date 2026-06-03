/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, Star, Heart, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, sizeMl: number) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1]?.ml || product.sizes[0].ml);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);

  // Derive active price
  const activePrice = product.sizes.find(s => s.ml === selectedSize)?.price || product.price;

  // Scent pyramid interactive selected state (explain elements on click)
  const [focusedPyramidTier, setFocusedPyramidTier] = useState<'top' | 'heart' | 'base'>('heart');

  // Sync state if product changes
  useEffect(() => {
    setSelectedSize(product.sizes[1]?.ml || product.sizes[0].ml);
    setActiveImageIdx(0);
    setReviewsList(product.reviews);
    setFocusedPyramidTier('heart');
  }, [product]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const addedReview: Review = {
      id: `new-${Date.now()}`,
      userName: newReviewName,
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment,
      verified: true
    };

    setReviewsList([addedReview, ...reviewsList]);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-16">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-xs uppercase font-bold tracking-widest text-sand-500 hover:text-gold-600 transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <ChevronLeft size={14} />
        <span>To the Compendium</span>
      </button>

      {/* Main detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative pb-16">
        
        {/* Left Column: Image Showcase (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/5 rounded-lg overflow-hidden bg-stone-100 border border-gold-200/10">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails array selection */}
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 h-20 rounded overflow-hidden border transition-all cursor-pointer bg-stone-50 ${
                  activeImageIdx === idx ? 'border-gold-500 scale-[1.03] ring-1 ring-gold-500' : 'border-gold-200/20 hover:border-gold-300'
                }`}
              >
                <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information, sizing, matching details (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Identity Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-gold-50 text-gold-700 text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded border border-gold-200/20">
                {product.concentration} · {product.volumePercent}% vol
              </span>
              <span className="bg-sand-100 text-sand-700 text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded">
                {product.scentFamily}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-sand-950 uppercase pt-2">
              {product.name}
            </h1>
            <p className="text-sm font-serif italic text-gold-600 font-medium">
              {product.tagline}
            </p>

            <p className="text-sm text-sand-700 leading-relaxed font-light pt-3">
              {product.description}
            </p>
          </div>

          {/* Interactive Bottle Size Customization */}
          <div className="space-y-3 pt-4 border-t border-gold-100">
            <div className="flex justify-between items-baseline">
              <label className="text-xs text-sand-500 uppercase tracking-widest font-bold">
                Select Formulation Volume
              </label>
              <span className="text-xs text-sand-400 italic">Complementary travel vial included</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((sz) => (
                <button
                  key={sz.ml}
                  onClick={() => setSelectedSize(sz.ml)}
                  className={`py-3.5 rounded border flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden select-none ${
                    selectedSize === sz.ml
                      ? 'bg-gold-950 border-gold-950 text-gold-200 shadow-md ring-1 ring-gold-500'
                      : 'bg-white border-gold-200/40 text-sand-800 hover:bg-gold-50/50 hover:border-gold-300'
                  }`}
                >
                  <span className="font-sans font-semibold text-xs tracking-wide">
                    {sz.ml} ml
                  </span>
                  <span className={`text-[10px] font-mono mt-0.5 ${selectedSize === sz.ml ? 'text-gold-300' : 'text-sand-500'}`}>
                    ${sz.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cart triggers */}
          <div className="space-y-3 pt-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-sand-400 uppercase font-mono tracking-widest select-none">Liquid Valuation</span>
              <span className="font-serif text-2xl font-semibold text-sand-950 font-mono">${activePrice}</span>
            </div>

            <button
              onClick={() => {
                setShowNotification(true);
                onAddToCart(product, selectedSize);
                setTimeout(() => setShowNotification(false), 2500);
              }}
              className="w-full bg-gold-500 hover:bg-gold-400 text-white font-serif font-medium uppercase tracking-[0.2em] text-xs py-4.5 rounded transition-all transform hover:translate-y-[-1px] shadow-md hover:shadow-lg active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag size={15} />
              <span>Pour & Wrap into Scent Bag</span>
            </button>

            {/* Hand-wrapped Guarantee */}
            <div className="flex items-start gap-2 text-[10px] text-sand-500 leading-normal bg-gold-50/25 border border-gold-100 p-3 rounded">
              <ShieldCheck size={14} className="text-gold-600 shrink-0 mt-0.5" />
              <span>
                <strong>Maison Assurance</strong>: Each bottle is inspected, wax-sealed, and hand-wrapped under controlled atmospheric observation. Two complementary 2.5ml matching tester vials are included. Check safety with the tester first—unopened main boxes are eligible for fully complimentary return cycles.
              </span>
            </div>
          </div>

          {/* Behind the Perfume Narrative */}
          <div className="bg-sand-100/60 p-6 rounded space-y-2.5 border border-gold-200/5">
            <h4 className="font-serif text-xs uppercase tracking-widest font-bold text-gold-700">Behind the Olfaction</h4>
            <p className="text-xs text-sand-700 leading-relaxed font-serif italic text-justify">
              "{product.story}"
            </p>
          </div>

        </div>
      </div>

      {/* Interactive Olfactory Scent Pyramid Panel */}
      <section className="bg-white border border-gold-200/10 rounded-xl p-8 md:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-serif text-2xl uppercase tracking-widest text-sand-950 font-light">
            The Olfactory Hierarchy
          </h3>
          <p className="text-xs text-sand-500 uppercase tracking-widest font-semibold">
            Olfaction unravels in highly calculated gaseous volatility thresholds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Visual Triangle Pyramid representational element (md:col-span-5) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Pyramid Base Graphics */}
            <div className="w-full max-w-[280px] flex flex-col items-center select-none font-serif text-xs font-semibold uppercase tracking-widest">
              
              {/* Top Peak */}
              <button
                onClick={() => setFocusedPyramidTier('top')}
                className={`w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[80px] transition-all relative cursor-pointer ${
                  focusedPyramidTier === 'top'
                    ? 'border-b-gold-500 drop-shadow-xl scale-[1.04]'
                    : 'border-b-gold-200/40 hover:border-b-gold-300/60'
                }`}
                title="View peak notes"
              >
                <span className="absolute left-1/2 -translate-x-1/2 top-10 text-sand-950 font-sans text-[10px] font-bold">
                  Peak
                </span>
              </button>

              {/* Heart/Middle Tier */}
              <button
                onClick={() => setFocusedPyramidTier('heart')}
                className={`w-[200px] h-[75px] clip-path-trapezoid transition-all mt-1 bg-linear-to-b relative cursor-pointer ${
                  focusedPyramidTier === 'heart'
                    ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-xl scale-[1.04]'
                    : 'bg-gold-100/50 text-sand-800 hover:bg-gold-200/50'
                }`}
                title="View heart notes"
              >
                <div className="absolute inset-0 flex items-center justify-center font-sans text-[10px] font-bold">
                  Heart Notes
                </div>
              </button>

              {/* Base Tier */}
              <button
                onClick={() => setFocusedPyramidTier('base')}
                className={`w-[268px] h-[85px] clip-path-trapezoid-large transition-all mt-1 relative cursor-pointer ${
                  focusedPyramidTier === 'base'
                    ? 'bg-gold-950 text-gold-200 shadow-xl scale-[1.04]'
                    : 'bg-stone-100 text-sand-700 hover:bg-stone-200/70'
                }`}
                title="View anchor notes"
              >
                <div className="absolute inset-0 flex items-center justify-center font-sans text-[10px] font-bold uppercase">
                  Base Anchors
                </div>
              </button>

            </div>

            <div className="text-[10px] text-sand-400 mt-6 tracking-widest uppercase font-bold text-center select-none">
              ▲ Click Tiers to dissect chemistry
            </div>
          </div>

          {/* Chemistry Tier Details Column (md:col-span-7) */}
          <div className="md:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {focusedPyramidTier === 'top' && (
                <motion.div
                  key="top"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="border-l-4 border-gold-400 pl-4 py-1.5">
                    <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-sand-950">
                      The Peak (Top Notes)
                    </h4>
                    <p className="text-xs text-sand-500 uppercase tracking-widest mt-0.5">
                      First Gaseous Expression · Lasts 0 to 45 Minutes
                    </p>
                  </div>
                  <p className="text-xs text-sand-600 leading-relaxed font-light">
                    The initial greeting. These light, low-molecular-weight molecules escape alcohol evaporation instantly, creating the bright, dramatic trail that captures attention during your first encounter.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.pyramid.top.map((note) => (
                      <span key={note} className="bg-gold-50 text-gold-800 border border-gold-200/20 text-xs px-3 py-1.5 rounded font-serif font-medium">
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {focusedPyramidTier === 'heart' && (
                <motion.div
                  key="heart"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="border-l-4 border-gold-500 pl-4 py-1.5">
                    <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-sand-950">
                      The Heart (Middle Notes)
                    </h4>
                    <p className="text-xs text-sand-500 uppercase tracking-widest mt-0.5">
                      The Olfactory Soul · Lasts 1 to 5 Hours
                    </p>
                  </div>
                  <p className="text-xs text-sand-600 leading-relaxed font-light">
                    Once the citrus peak settles, the soul of the formulation blooms. Composed of soft woods, complex blossoms, and dry herbs, this tier establishes the main thematic dialogue that lingers in rooms and prompts conversation.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.pyramid.heart.map((note) => (
                      <span key={note} className="bg-gold-100/50 text-gold-900 border border-gold-250/20 text-xs px-3 py-1.5 rounded font-serif font-medium">
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {focusedPyramidTier === 'base' && (
                <motion.div
                  key="base"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="border-l-4 border-gold-900 pl-4 py-1.5">
                    <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-sand-950">
                      The Anchor (Base Notes)
                    </h4>
                    <p className="text-xs text-sand-500 uppercase tracking-widest mt-0.5">
                      The Silent Memory · Lasts 6 to 18 Hours
                    </p>
                  </div>
                  <p className="text-xs text-sand-600 leading-relaxed font-light">
                    Heavy, magnificent, complex macromolecules. These dense ingredients (resins, sands, high-grade animal-friendly ambergris, deep agarwoods) anchor the scent. They fuse cleanly with your natural skin warmth, expressing a mysterious, private lingering memory.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.pyramid.base.map((note) => (
                      <span key={note} className="bg-stone-900 text-gold-200 text-xs px-3 py-1.5 rounded font-serif font-medium">
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Reviews and Community Ratings */}
      <section className="space-y-6">
        <div className="border-b border-gold-200/30 pb-3 flex items-baseline justify-between">
          <div>
            <h3 className="font-serif text-xl font-medium uppercase tracking-wide text-sand-950">Verified Scent Testimonials</h3>
            <p className="text-[10px] text-sand-500 uppercase tracking-widest mt-0.5">Honest observations on longevity, sillage, and character</p>
          </div>
          <span className="text-xs text-sand-600 font-mono font-medium">{reviewsList.length} verified observations</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Scent Reviews List (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="bg-white border border-gold-200/10 rounded p-5 space-y-3 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-serif text-sm font-semibold text-sand-950">{rev.userName}</span>
                      {rev.verified && <CheckCircle2 size={13} className="text-gold-500" title="Verified Hand-pour Purchase" />}
                    </div>
                    <span className="text-[10px] text-sand-400">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-gold-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        fill={i < rev.rating ? "currentColor" : "none"}
                        className={i < rev.rating ? "text-gold-500" : "text-stone-200"}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-sand-700 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Add testimonial Form (lg:col-span-5) */}
          <form onSubmit={handleAddReview} className="lg:col-span-5 bg-sand-100 border border-gold-200/15 rounded p-6 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-sand-950">Submit Your Scent Log</h4>
            
            <div className="space-y-1">
              <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Your Name / Pseudonym</label>
              <input
                type="text"
                required
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-white border border-gold-200/25 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 text-sand-950"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold block">Testimonial Rating</label>
              <div className="flex gap-1.5 select-none text-gold-500">
                {[1, 2, 3, 4, 5].map((rt) => (
                  <button
                    type="button"
                    key={rt}
                    onClick={() => setNewReviewRating(rt)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                    title={`Rate ${rt} stars`}
                  >
                    <Star size={18} fill={rt <= newReviewRating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold block">Observations & Commentary</label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="How does it react to your chemistry? Note projection comments, longevity details..."
                className="w-full bg-white border border-gold-200/25 rounded p-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 text-sand-950 placeholder:text-stone-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-950 hover:bg-gold-900 text-gold-200 text-[10px] tracking-widest uppercase font-bold py-3.5 rounded transition-all cursor-pointer shadow-xs"
            >
              Sign and Log Testimonial
            </button>
          </form>

        </div>
      </section>

      {/* Floating Sticky cart drawer bar (for scrolling usability) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gold-200/25 py-3 px-4 shadow-2xl z-30 transition-transform flex items-center justify-between select-none max-w-7xl mx-auto rounded-t-md">
        <div className="flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-serif text-sm font-semibold text-sand-950 uppercase">{product.name}</h4>
            <p className="text-[10px] text-sand-500 italic mt-0.5">{product.concentration} · {selectedSize}ml</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-bold text-sand-950">${activePrice}</span>
          <button
            onClick={() => {
              setShowNotification(true);
              onAddToCart(product, selectedSize);
              setTimeout(() => setShowNotification(false), 2000);
            }}
            className="bg-gold-950 hover:bg-gold-900 text-gold-200 text-[10px] font-bold uppercase tracking-widest py-3 px-6 rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag size={12} />
            <span>Bag note</span>
          </button>
        </div>
      </div>

      {/* Toast alert indicator */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gold-950 text-gold-200 px-6 py-4.5 rounded-md border border-gold-500/35 shadow-2xl flex items-center gap-3 max-w-sm w-full"
          >
            <div className="bg-gold-500 text-white rounded-full p-1 leading-none">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-white">Added to Scent Bag</div>
              <div className="text-[10px] font-serif text-gold-300">
                1x {product.name} ({selectedSize}ml) has been added to your checkout coordinates.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
