/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Feather, Sparkles, MapPin, Milestone } from 'lucide-react';

export default function About() {
  const stats = [
    { label: "Provenance Origins", value: "Grasse, FR", suffix: "", sub: "Maritime Alps base harvest" },
    { label: "Harvester Sourcing", value: "142", suffix: " Families", sub: "Multi-generational flower picking" },
    { label: "Natural Essential Purity", value: "98.2", suffix: "%", sub: "Cold chemical-free extraction" },
    { label: "Age-Old Formulation", value: "15", suffix: " Years", sub: "Strict maturation tracking" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] uppercase font-bold text-gold-600 tracking-[0.3em] font-serif block">
          Since 2011 · Scented Heritage
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-950 uppercase tracking-widest leading-none">
          Olfactory Solace
        </h2>
        <p className="text-sand-600 font-light text-xs sm:text-sm leading-relaxed">
          The heritage of Maison d'Aura coordinates the boundaries of classic Provencal extraction with modern, bold, intellectual liquid structures.
        </p>
      </div>

      {/* Founder Story Block (Horizontal Splits) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Story text (col-span-7) */}
        <div className="lg:col-span-7 space-y-6 font-serif select-none">
          <div className="text-xs uppercase tracking-widest font-bold text-gold-600 font-sans">
            A Note from the Lab
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-sand-950 tracking-normal leading-tight">
            "We do not design perfumes; we record brief capsules of silent memory."
          </h3>
          
          <div className="text-sm text-sand-700 leading-relaxed font-sans font-light space-y-4 pt-4">
            <p>
              Maison d'Aura was founded in Grasse by third-generation formulation botanist Marcella Vance. Raised in the dewy jasmine orchards of Southern France, Marcella watched the industrialization of scent with mounting despair. Synthetics replaced handmade absolutes, and cheap packaging overthrew artisanal craftsmanship.
            </p>
            <p>
              Our establishment represents an direct rebellious cycle. Under our observe, all raw petals are harvested by hand at precise sun coordinates when oil levels peak. Every extraction is macerated for 18 weeks inside small dark temperature-controlled vats in London, allowing the alcohol bonds to fuse cleanly.
            </p>
            <p className="italic text-gold-700 pt-2 text-sm font-serif font-semibold">
              — Marcella Vance, Founder & Chief Chemist
            </p>
          </div>
        </div>

        {/* Right Atmospheric Imagery (col-span-5) */}
        <div className="lg:col-span-5 aspect-4/5 rounded bg-stone-100 overflow-hidden relative border border-gold-200/20 shadow-lg">
          <div className="absolute inset-0 bg-gold-950/5 hover:opacity-0 transition-opacity" />
          <img
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800"
            alt="Maison d'Aura lab chemistry"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

      </section>

      {/* Scent Extraction Process Timeline */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl uppercase tracking-widest text-sand-950 font-light">
            The Provencal Alinement Cycle
          </h3>
          <p className="text-xs text-sand-500 uppercase tracking-widest font-semibold">
            Chronology of a single liquid glass formulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {[
            { step: "01", name: "Chasing Dawn Harvest", desc: "Flowers and petals are hand-plucked at 5:00 AM under cool dew, ensuring essential oils suffer no heat-degradation." },
            { step: "02", name: "In Vacuo Maceration", desc: "Ingredients are combined with denatured beetroot spirits inside oxygen-vacant vats for eighteen weeks." },
            { step: "03", name: "Dual-Stage Filtration", desc: "The liquid is chilled to 2°C and passed through mineral paper to remove solid micro-wax bonds, yielding sparkling clarity." },
            { step: "04", name: "Wax Seal & Inspection", desc: "Each blown-glass carafe is hand-labeled, inspected, stamped with batch coordinates, and ribbon-tied." },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-gold-200/10 p-6 rounded space-y-4 hover:shadow-md transition-all relative">
              <span className="font-mono text-5xl font-extralight text-gold-300 block select-none">
                {item.step}
              </span>
              <h4 className="font-serif text-base font-semibold text-sand-950 uppercase tracking-wide">
                {item.name}
              </h4>
              <p className="text-xs text-sand-600 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Exquisite count-up styled stats block */}
      <section className="bg-gold-950 text-gold-200 py-12 px-6 sm:px-12 rounded-lg border border-gold-900/50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center select-none">
          {stats.map((st) => (
            <div key={st.label} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-extralight text-white tracking-tight">
                {st.value}{st.suffix}
              </div>
              <div className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                {st.label}
              </div>
              <p className="text-[10px] text-stone-400 italic">
                {st.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand values core pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        <div className="text-center p-6 space-y-3">
          <div className="p-3 bg-gold-50 inline-block rounded-full border border-gold-100 text-gold-600 mx-auto">
            <Feather size={20} />
          </div>
          <h4 className="font-serif text-base font-semibold text-sand-950 uppercase">Botanical Authenticity</h4>
          <p className="text-xs text-sand-600 leading-relaxed font-light">
            We operate with zero synthetic phthalates, nitro-musks, or petroleum colors. Scent intensity is powered purely by the high ratio concentration of genuine essential oils.
          </p>
        </div>

        <div className="text-center p-6 space-y-3">
          <div className="p-3 bg-gold-50 inline-block rounded-full border border-gold-100 text-gold-600 mx-auto">
            <Award size={20} />
          </div>
          <h4 className="font-serif text-base font-semibold text-sand-950 uppercase">Socio-Provenance Craft</h4>
          <p className="text-xs text-sand-600 leading-relaxed font-light">
            Our flower harvesters in Grasse receive fair-wages audited directly under European agriculture standards. We fund local heritage flower-conservancy schools.
          </p>
        </div>

        <div className="text-center p-6 space-y-3">
          <div className="p-3 bg-gold-50 inline-block rounded-full border border-gold-100 text-gold-600 mx-auto">
            <Sparkles size={20} />
          </div>
          <h4 className="font-serif text-base font-semibold text-sand-950 uppercase">Infinite Recyclability</h4>
          <p className="text-xs text-sand-600 leading-relaxed font-light">
            Each heavy perfume base is molded from 35% raw recycled glass, fitted with simple threaded atomizers that permit full recycling or clean in-store secondary refills.
          </p>
        </div>

      </section>

    </div>
  );
}
