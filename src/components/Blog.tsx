/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, Tag, ChevronRight, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/products';

export default function Blog() {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const activePost = activePostId ? BLOG_POSTS.find(p => p.id === activePostId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      <AnimatePresence mode="wait">
        {activePost ? (
          /* Article Reading Room View */
          <motion.article
            key="article"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8 pb-12"
          >
            {/* Back to feed button */}
            <button
              onClick={() => setActivePostId(null)}
              className="text-xs uppercase font-bold tracking-widest text-sand-500 hover:text-gold-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>To the Journal Feed</span>
            </button>

            {/* Metas */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gold-600">
              <span className="bg-gold-50 border border-gold-200/20 px-2.5 py-1 rounded">
                {activePost.category}
              </span>
              <span className="text-sand-400">•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {activePost.readTime}
              </span>
              <span className="text-sand-400">•</span>
              <span>{activePost.date}</span>
            </div>

            {/* Title / Sub */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-sand-950 font-light leading-tight">
                {activePost.title}
              </h1>
              <p className="text-base sm:text-lg text-sand-600 font-serif italic font-medium">
                {activePost.subtitle}
              </p>
            </div>

            {/* Author Credit */}
            <div className="flex items-center gap-2 border-t border-b border-gold-100 py-3.5 text-xs text-sand-500 font-bold uppercase tracking-wider">
              <span>Authored by:</span>
              <span className="text-sand-950 font-serif italic text-sm">{activePost.author}</span>
            </div>

            {/* Banner Image */}
            <div className="aspect-16/9 rounded overflow-hidden shadow-lg border border-gold-200/5">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Body Content with Luxe dropping-cap styling */}
            <div className="prose prose-stone prose-sm sm:prose-base max-w-none text-sand-800 leading-relaxed space-y-6 pt-4 text-justify font-serif">
              {activePost.content.map((paragraph, index) => (
                <p key={index} className="first-of-type:first-letter:text-5xl first-of-type:first-letter:font-serif first-of-type:first-letter:font-bold first-of-type:first-letter:text-gold-600 first-of-type:first-letter:float-left first-of-type:first-letter:mr-3 first-of-type:first-letter:mt-1 first-of-type:first-letter:line-height-[0.8]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer newsletter call inside blog article */}
            <div className="mt-12 bg-gold-950 text-gold-200 p-8 rounded-lg border border-gold-900/30 text-center space-y-4">
              <h3 className="font-serif text-xl font-light text-white uppercase tracking-wider">
                Enjoyed this olfactory chronicle?
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                We distribute highly intellectual quarterly journals on raw extraction harvests, direct from Grasse. Sign up for our ledger.
              </p>
              <div className="flex max-w-xs mx-auto gap-2">
                <input
                  type="email"
                  placeholder="Enter email coordinate"
                  className="bg-black/40 border border-gold-500/20 text-xs rounded px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-gold-500 flex-1"
                />
                <button className="bg-gold-500 hover:bg-gold-400 text-white text-[10px] uppercase font-bold px-3 py-2 rounded shrink-0 transition-colors cursor-pointer">
                  SIGN
                </button>
              </div>
            </div>

          </motion.article>
        ) : (
          /* Blog Grid Feed View */
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Editorial Feed Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="text-gold-500" size={18} />
                <span className="text-[10px] uppercase font-bold text-gold-600 tracking-[0.3em] font-serif">The Scent Journal</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-950 uppercase tracking-widest leading-none">
                L'Académie d'Aura
              </h2>
              <p className="text-sand-600 font-light text-xs sm:text-sm leading-relaxed">
                Compiles chronicles of raw botanical science, extraction voyages, fragrance layers masterclasses, and modern olfactory essays.
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-gold-200/10 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[9px] text-sand-900 font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-xs border border-gold-200/5 select-none">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-sand-400 uppercase font-semibold">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="font-serif text-lg tracking-wide font-semibold text-sand-950 leading-snug group-hover:text-gold-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-sand-600 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gold-100/50 pt-4 mt-2">
                      <div className="flex items-center gap-1 text-[10px] text-sand-400 uppercase font-semibold">
                        <Bookmark size={12} className="text-gold-500" />
                        <span>Provenance Chronicle</span>
                      </div>

                      <button
                        onClick={() => setActivePostId(post.id)}
                        className="text-[10px] text-gold-600 font-bold uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Examine chronicle</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
