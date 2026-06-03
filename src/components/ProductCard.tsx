/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCartDirect: (product: Product, sizeMl: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCartDirect }) => {
  // Use first listed ml size as direct add target
  const defaultSize = product.sizes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-gold-200/10 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
    >
      {/* Product Image Panel */}
      <div className="relative aspect-4/5 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Hover quick-actions overlay (Desktop) */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-3">
          <button
            onClick={() => onSelect(product)}
            className="bg-white/90 hover:bg-white text-sand-950 p-3 rounded-full shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
            title="Inspect Olfactory Details"
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={() => onAddToCartDirect(product, defaultSize.ml)}
            className="bg-gold-500 hover:bg-gold-400 text-white p-3 rounded-full shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
            title={`Add ${defaultSize.ml}ml directly to cart`}
          >
            <ShoppingBag size={15} />
          </button>
        </div>

        {/* Floating details badge (e.g. concentration) */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[9px] text-sand-900 font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-xs border border-gold-200/5 select-none">
          {product.concentration}
        </div>
      </div>

      {/* Product Text Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            {/* Scent family colored indicator style */}
            <span className="text-[10px] text-gold-600 font-serif font-bold uppercase tracking-widest bg-gold-50/50 px-2 py-0.5 rounded">
              {product.scentFamily}
            </span>
            
            {/* Minimal rating display */}
            <div className="flex items-center gap-0.5 text-gold-500 select-none">
              <Star size={11} fill="currentColor" />
              <span className="font-mono text-[10px] font-bold text-sand-700">{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-lg font-light text-sand-950 uppercase tracking-wide group-hover:text-gold-600 cursor-pointer pt-1 hover:underline transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-xs text-sand-500 italic font-serif leading-none line-clamp-1">
            {product.tagline}
          </p>

          <p className="text-xs text-sand-600 font-light mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer: size summary + pricing */}
        <div className="flex items-center justify-between border-t border-gold-100/50 pt-4 mt-5">
          <span className="text-xs text-sand-400 font-mono tracking-wider italic select-none">
            From {product.sizes[0].ml}ml / ${product.sizes[0].price}
          </span>
          <span className="text-base font-serif font-semibold text-sand-950 font-mono">
            ${product.price}
          </span>
        </div>
      </div>

    </motion.div>
  );
};

export default ProductCard;
