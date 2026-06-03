/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, ShoppingBag, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { Product, QuizQuestion, CartItem } from '../types';

interface ScentQuizProps {
  products: Product[];
  onAddToCart: (product: Product, sizeMl: number) => void;
  onSelectProduct: (p: Product) => void;
  setCurrentPage: (page: string) => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Select your preferred atmospheric sanctuary",
    subtitle: "In which environment does your soul find absolute tranquility?",
    options: [
      { text: "Ancient Library & Warm Leather", description: "Old manuscripts, paper dust, and deep aged cedarwood beams.", tags: ['woody', 'dry', 'smoky', 'classic'], vibe: "Mysterious & Dry" },
      { text: "Nautical Shoreline & Salty Spray", description: "Cold tidal waves crashing on sand dunes, driftwood, and wild maritime sage.", tags: ['fresh', 'clean', 'mineral', 'beach', 'summer'], vibe: "Airy & Ozonic" },
      { text: "A Sun-Drenched Mediterranean Orchard", description: "Bitter blood oranges, crisp lemons, and deep golden earth after light rain.", tags: ['amber', 'warm', 'rich', 'citric'], vibe: "Bright & Citrusy" },
      { text: "A Night-Blooming Secret Garden", description: "Dewy gardenia blossoms, rich climbing jasmine, and wet floral earth.", tags: ['floral', 'sweet', 'romantic', 'delicate'], vibe: "Sensual & Lush" },
      { text: "A Smoke-Laced Incense Chamber", description: "Resinous agarwood (oud), saffron threads, and warm burning amber.", tags: ['oriental', 'dark', 'intense', 'spicy', 'night'], vibe: "Opulent & Nocturnal" }
    ]
  },
  {
    id: 2,
    question: "For which hours do you seek this signature?",
    subtitle: "Scent reacts with the daily movement of solar energy.",
    options: [
      { text: "Dawn & Luminous Mornings", description: "Clean, waking thoughts—an alert but calm invitation.", tags: ['clean', 'bright', 'day', 'office'], vibe: "Luminous" },
      { text: "Professional High-Noon Composure", description: "Dry, structured, sophisticated, and completely poised.", tags: ['office', 'sophisticated', 'unisex', 'clean'], vibe: "Structured" },
      { text: "Sultry Golden Hour Twilight", description: "Warm, amberous, shifting from conversational to intimate.", tags: ['warm', 'rich', 'classic', 'sensual'], vibe: "Intimate" },
      { text: "Enigmatic Midnight Sophistication", description: "Intense, deep, attention-commanding, designed for darkness.", tags: ['dark', 'night', 'intense', 'evening'], vibe: "Nocturnal" }
    ]
  },
  {
    id: 3,
    question: "Which raw texture resonates most with your tactile sense?",
    subtitle: "Olfaction is deeply linked to touch.",
    options: [
      { text: "Smooth Mysore Sandalwood", description: "Silky, creamy, soft, almost milky warmth.", tags: ['woody', 'unisex', 'calming'], vibe: "Velvety Wood" },
      { text: "Sun-Bleached Shoreline Driftwood", description: "Dry, salted, fibrous, weathered by maritime winds.", tags: ['fresh', 'mineral', 'unisex', 'beach'], vibe: "Salty Fiber" },
      { text: "Fresh Picked Dew-kissed Grass & Bergamot", description: "Sharp, citric, cold, and immensely green.", tags: ['fresh', 'citric', 'bright', 'vetiver'], vibe: "Cold Crystal" },
      { text: "Saffron Spiced Assam Oud Resin", description: "Dense, smoky, oily, slightly sweet, and immensely complex.", tags: ['oriental', 'dark', 'intense', 'oud'], vibe: "Liquid Gold" },
      { text: "Hand-Picked Damask Rose Petals", description: "Velvet, deep, honeyed, and classic.", tags: ['floral', 'romantic', 'classic'], vibe: "Rich Veil" }
    ]
  },
  {
    id: 4,
    question: "How would you define your personal style composure?",
    subtitle: "A fragrance should drape onto you seamlessly like apparel.",
    options: [
      { text: "Tailored Minimalist Structure", description: "Neutral palette, crisp cottons, raw silks, and sharp lines.", tags: ['clean', 'sophisticated', 'unisex', 'office'], vibe: "Architechtural" },
      { text: "Coastal Linen & Relaxed Knitwear", description: "Oatmeal colors, open collars, sea breeze textiles.", tags: ['fresh', 'mineral', 'beach', 'summer'], vibe: "Effortless" },
      { text: "Heavy Cashmere & Evening Velvets", description: "Rich deep burgundy, emerald green, cozy, and classic.", tags: ['warm', 'rich', 'classic', 'evening'], vibe: "Indulgent" },
      { text: "Distressed Black Leather & Suede Nocturnes", description: "Unapologetically bold, rebellious yet luxurious.", tags: ['dark', 'night', 'intense', 'smoky'], vibe: "Provocative" }
    ]
  },
  {
    id: 5,
    question: "What is your preferred volume projection?",
    subtitle: "How far into the room should your scent travel?",
    options: [
      { text: "An Intimate Skin Whisper", description: "Visible only to those allowed inside your private boundary.", tags: ['clean', 'unisex', 'day', 'delicate'], vibe: "Intimate Whisper" },
      { text: "A Sophisticated Conversation", description: "Noticeable during warm greetings, leaves a subtle trail.", tags: ['clean', 'sophisticated', 'floral', 'woody'], vibe: "Slight Trail" },
      { text: "A Grand Statement", description: "Precedes your arrival, commands respect, and lingers after departure.", tags: ['intense', 'dark', 'rich', 'evening', 'oud'], vibe: "Majestic Aura" }
    ]
  },
  {
    id: 6,
    question: "What gender formulation do you prefer?",
    subtitle: "Maison d'Aura scents are gender-liquid, but we adapt to your preference.",
    options: [
      { text: "Strictly Gender-Unneutral & Liquid", description: "Focused on mineral, wood, amber, and spice roots.", tags: ['unisex', 'woody', 'fresh'], vibe: "Universal Fluid" },
      { text: "Leaning Decidedly Feminine", description: "Lighter floral peaks, dewy blooms, and soft musk.", tags: ['floral', 'sweet', 'romantic', 'feminine'], vibe: "Floral Feminine" },
      { text: "Leaning Decidedly Masculine", description: "Dry cedar, salty vetiver, heavy black cardamom, and leather.", tags: ['woody', 'fresh', 'vetiver', 'smoky'], vibe: "Noble Masculine" }
    ]
  }
];

export default function ScentQuiz({ products, onAddToCart, onSelectProduct, setCurrentPage }: ScentQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Intro, 1-6 = Questions, 7 = Results
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [quizVibeRecord, setQuizVibeRecord] = useState<string[]>([]);
  const [sizePreference, setSizePreference] = useState<number>(100);
  const [isAddingMatch, setIsAddingMatch] = useState<boolean>(false);

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setQuizVibeRecord([]);
    setSizePreference(100);
    setIsAddingMatch(false);
  };

  const handleSelectOption = (questionId: number, tags: string[], vibe: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: tags
    });
    
    // Add vibe string to trail
    const updatedVibes = [...quizVibeRecord];
    updatedVibes[questionId - 1] = vibe;
    setQuizVibeRecord(updatedVibes);

    // Auto-advance
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 350);
  };

  // Matching algorithm
  const getResults = () => {
    const allSelectedTags = Object.values(selectedAnswers).flat();
    
    // Score products
    const productScores = products.map((product) => {
      let score = 0;
      product.matchTags.forEach((tag) => {
        if (allSelectedTags.includes(tag)) {
          score += 1;
        }
      });
      
      // Bonus if scentFamily tags align
      if (allSelectedTags.includes(product.scentFamily.toLowerCase())) {
        score += 2;
      }

      // Percentage calculation
      // base matching max tags is approx 10
      const percentage = Math.min(Math.round((score / 9) * 100), 99);
      const guaranteedPercent = Math.max(percentage, 55); // Minimum 55% match for elegance

      return {
        product,
        matchPercentage: guaranteedPercent
      };
    });

    // Sort descending by percentage
    productScores.sort((a, b) => b.matchPercentage - a.matchPercentage);

    const primaryMatch = productScores[0];
    const secondaryMatches = productScores.slice(1, 3);

    return {
      primaryMatch,
      secondaryMatches
    };
  };

  const results = currentStep >= 7 ? getResults() : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      
      <AnimatePresence mode="wait">
        {/* step 0: Consultation Intro */}
        {currentStep === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-gold-200/25 shadow-xl rounded p-8 md:p-14 text-center space-y-8 max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center border border-gold-100">
                <Sparkles className="text-gold-500" size={30} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-sand-950 uppercase tracking-wider mt-6">
                Bespoke Scent Consultation
              </h2>
              <div className="text-gold-600 font-serif text-sm italic mt-2 tracking-widest uppercase">
                The House Alchemist's Guidance
              </div>
            </div>

            <p className="text-sand-700 text-sm leading-relaxed max-w-md mx-auto">
              Scent is a sacred layer of identification. Through a dynamic analysis of your sensory environments, attire silhouettes, and temperature moods, our master perfumer will decode your personal atmosphere.
            </p>

            <div className="border-t border-b border-gold-100 py-4 max-w-sm mx-auto flex items-center justify-around text-xs tracking-widest text-sand-500 font-semibold uppercase">
              <span>6 Questions</span>
              <span className="text-gold-400">•</span>
              <span>Olfactory Matching</span>
              <span className="text-gold-400">•</span>
              <span>2 Minutes</span>
            </div>

            <button
              id="start-quiz-btn"
              onClick={() => setCurrentStep(1)}
              className="bg-gold-950 hover:bg-gold-900 text-gold-100 text-xs font-semibold uppercase tracking-[0.25em] py-4 px-10 rounded transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer inline-block"
            >
              Begin Consultation
            </button>
          </motion.div>
        )}

        {/* step 1 to 6: Questions */}
        {currentStep >= 1 && currentStep <= 6 && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gold-200/25 shadow-xl rounded p-6 md:p-12 space-y-8"
          >
            {/* Progress breadcrumb */}
            <div className="flex items-center justify-between text-xs text-sand-400 font-bold uppercase tracking-widest pb-4 border-b border-gold-100">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 hover:text-gold-600 cursor-pointer text-[10px]"
              >
                <ArrowLeft size={12} />
                <span>Retrace Steps</span>
              </button>
              <span>Olfactory Profile {currentStep} of 6</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gold-100 relative rounded-full overflow-hidden">
              <motion.div
                initial={{ width: `${((currentStep - 1) / 6) * 100}%` }}
                animate={{ width: `${(currentStep / 6) * 100}%` }}
                className="absolute inset-y-0 left-0 bg-gold-500"
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-sand-950">
                {QUIZ_QUESTIONS[currentStep - 1].question}
              </h3>
              <p className="text-sand-500 italic font-serif text-sm">
                {QUIZ_QUESTIONS[currentStep - 1].subtitle}
              </p>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUIZ_QUESTIONS[currentStep - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentStep, opt.tags, opt.vibe)}
                  className="group text-left border border-gold-200/20 hover:border-gold-500 p-5 rounded-md hover:bg-gold-50/20 transition-all duration-300 transform hover:-translate-y-[1px] shadow-xs cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif text-[11px] font-semibold tracking-widest text-gold-600 block uppercase mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      Vibe: {opt.vibe}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-sand-950 group-hover:text-gold-600 transition-colors">
                      {opt.text}
                    </h4>
                    <p className="text-xs text-sand-600 font-light leading-relaxed mt-1.5">
                      {opt.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="w-5 h-5 rounded-full border border-gold-300 flex items-center justify-center text-gold-500 opacity-20 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* step 7: Results */}
        {currentStep === 7 && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {/* Top match header */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gold-100/50 rounded-full flex items-center justify-center border border-gold-200/40 mx-auto">
                <Award className="text-gold-600" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase text-sand-950 font-light">
                Your Scent Profile Analysis
              </h2>
              <p className="text-xs text-sand-500 uppercase tracking-widest font-semibold">
                An exact matching formulation has been calculated
              </p>
            </div>

            {/* Main Result Card */}
            <div className="bg-white border border-gold-400/25 shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative h-80 md:h-auto min-h-[300px] bg-stone-100">
                <img
                  src={results.primaryMatch.product.images[0]}
                  alt={results.primaryMatch.product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Match percentage floating badge */}
                <div className="absolute top-4 left-4 bg-gold-950/90 text-gold-200 px-3.5 py-1.5 rounded-full border border-gold-500/20 font-serif flex items-center gap-1.5 shadow-md">
                  <span className="font-mono font-bold text-sm">{results.primaryMatch.matchPercentage}%</span>
                  <span className="text-[10px] tracking-wider uppercase font-semibold">Match score</span>
                </div>
              </div>

              {/* Product Scent Narrative & Customizing Purchase */}
              <div className="p-6 md:p-10 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="bg-gold-50 text-gold-700 text-[9px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded border border-gold-200/20">
                      {results.primaryMatch.product.scentFamily} Note Family
                    </span>
                    <span className="bg-stone-50 text-sand-600 text-[9px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded">
                      {results.primaryMatch.product.concentration}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-light text-sand-950 uppercase tracking-wide">
                    {results.primaryMatch.product.name}
                  </h3>
                  <p className="text-sm text-gold-600 italic font-serif mt-1">
                    {results.primaryMatch.product.tagline}
                  </p>

                  <p className="text-xs text-sand-600 font-light leading-relaxed mt-4">
                    {results.primaryMatch.product.description}
                  </p>

                  {/* Vibe Recap trail */}
                  <div className="mt-5 p-3 rounded bg-sand-50/70 border border-gold-200/10">
                    <div className="text-[9px] text-sand-400 font-bold uppercase tracking-widest mb-1.5">
                      Consultant Decoded Vibes
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {quizVibeRecord.filter(Boolean).map((v, i) => (
                        <span key={i} className="text-[10px] bg-white border border-gold-200/10 px-2 py-0.5 rounded text-sand-700 font-medium">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Customizing Bottle size specifically compiled here */}
                  <div className="mt-6 pt-5 border-t border-gold-100">
                    <label className="text-xs text-sand-500 uppercase tracking-widest font-bold block mb-2.5">
                      Select Bottle Size Formulation
                    </label>
                    <div className="flex gap-2">
                      {results.primaryMatch.product.sizes.map((sz) => (
                        <button
                          key={sz.ml}
                          onClick={() => setSizePreference(sz.ml)}
                          className={`flex-1 py-2 text-xs font-mono font-medium rounded border uppercase select-none transition-all cursor-pointer ${
                            sizePreference === sz.ml
                              ? 'bg-gold-950 text-gold-200 border-gold-950 ring-1 ring-gold-500'
                              : 'bg-white text-sand-800 border-gold-200/60 hover:bg-gold-50'
                          }`}
                        >
                          <div>{sz.ml}ml</div>
                          <div className={`text-[10px] mt-0.5 ${sizePreference === sz.ml ? 'text-gold-300' : 'text-sand-500'}`}>
                            ${sz.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={() => {
                      setIsAddingMatch(true);
                      setTimeout(() => {
                        onAddToCart(results.primaryMatch.product, sizePreference);
                        setIsAddingMatch(false);
                      }, 800);
                    }}
                    className={`w-full bg-gold-950 hover:bg-gold-900 text-gold-100 font-serif text-xs uppercase tracking-widest py-4 rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                      isAddingMatch ? 'bg-gold-800 opacity-90' : ''
                    }`}
                  >
                    {isAddingMatch ? (
                      <>
                        <RefreshCw className="animate-spin" size={14} />
                        <span>Meticulously Wrapping...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} className="text-gold-300" />
                        <span>Add Bespoke Match to Scent Bag · ${results.primaryMatch.product.sizes.find(s => s.ml === sizePreference)?.price || results.primaryMatch.product.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectProduct(results.primaryMatch.product)}
                    className="w-full text-center text-[10px] text-gold-600 uppercase tracking-[0.2em] font-bold hover:underline py-1.5 cursor-pointer block"
                  >
                    DISCOVER OLFACTORY STORY & NOTES PYRAMID →
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Matches (Alternative Fragrances) */}
            <div className="space-y-4">
              <div className="text-left border-b border-gold-200/30 pb-2">
                <h4 className="font-serif text-lg font-medium text-sand-950 uppercase tracking-wide">
                  Alternative Olfactory Profiles
                </h4>
                <p className="text-[10px] text-sand-500 uppercase tracking-widest mt-0.5">
                  Complementary paths with high correspondence scores
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.secondaryMatches.map(({ product, matchPercentage }) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gold-200/15 rounded p-5 flex gap-4 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded bg-stone-100 border border-gold-200/12 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h5 className="font-serif text-base font-semibold text-sand-950">
                            {product.name}
                          </h5>
                          <span className="font-mono text-[10px] text-gold-600 font-bold bg-gold-50/80 px-1.5 py-0.5 rounded border border-gold-200/10 shrink-0">
                            {matchPercentage}% Match
                          </span>
                        </div>
                        <p className="text-[10px] text-gold-600 italic font-serif mt-0.5">{product.tagline}</p>
                        <p className="text-[11px] text-sand-500 leading-normal line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gold-100/50 mt-2">
                        <span className="text-xs font-mono font-bold text-sand-950">${product.price}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="text-[10px] text-gold-600 hover:underline uppercase font-bold tracking-wider cursor-pointer"
                          >
                            NOTES →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart Box */}
            <div className="border border-gold-100 p-6 rounded bg-gold-50/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="font-serif text-base font-semibold text-sand-950">
                  Dissatisfied with your matching coordinates?
                </div>
                <p className="text-xs text-sand-600 mt-1 leading-normal max-w-md">
                  Olfaction is highly context-sensitive. Retake the consultation or search our fragrance catalogs manually.
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-white border border-gold-950 text-gold-950 hover:bg-gold-950 hover:text-white px-5 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} />
                <span>Restart Consultant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
