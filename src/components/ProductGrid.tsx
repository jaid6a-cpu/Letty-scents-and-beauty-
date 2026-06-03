/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, ArrowUpDown, Grid, List, Check, RotateCcw, Compass, MapPin } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCartDirect: (p: Product, sizeMl: number) => void;
  selectedScentFamily: string | null;
  setSelectedScentFamily: (family: string | null) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

export default function ProductGrid({
  products,
  onSelectProduct,
  onAddToCartDirect,
  selectedScentFamily,
  setSelectedScentFamily,
}: ProductGridProps) {
  const [selectedConcentration, setSelectedConcentration] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortOption>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Extract families & concentrations represented dynamically
  const listFamilies = useMemo(() => ['Woody', 'Floral', 'Fresh', 'Amber', 'Oriental'], []);
  const listConcentrations = useMemo(() => {
    const set = new Set(products.map((p) => p.concentration));
    return Array.from(set);
  }, [products]);

  // Combined Filtering and Sorting logic
  const filteredSortedProducts = useMemo(() => {
    let list = [...products];

    // Scent family filter
    if (selectedScentFamily) {
      list = list.filter((p) => p.scentFamily.toLowerCase() === selectedScentFamily.toLowerCase());
    }

    // Concentration filter
    if (selectedConcentration) {
      list = list.filter((p) => p.concentration === selectedConcentration);
    }

    // Sorting
    switch (activeSort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Default list ordering / featured
        break;
    }

    return list;
  }, [products, selectedScentFamily, selectedConcentration, activeSort]);

  const resetAllFilters = () => {
    setSelectedScentFamily(null);
    setSelectedConcentration(null);
    setActiveSort('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Editorial Catalog Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Compass className="text-gold-500 animate-pulse" size={20} />
          <span className="text-[10px] uppercase font-bold text-gold-600 tracking-[0.3em] font-serif">Maison Compendium</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-sand-950 uppercase tracking-widest leading-none">
          The Olfactory Portfolio
        </h2>
        <p className="text-sand-600 font-light text-xs sm:text-sm leading-relaxed">
          Crafted in small batches with strict meticulousness. Explore our hand-poured extractions, structured dynamically to express individual atmospheric identity.
        </p>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white border border-gold-200/20 rounded shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-20 relative">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Scent families filter tabs */}
          <button
            onClick={() => setSelectedScentFamily(null)}
            className={`px-3 py-1.5 rounded text-xs tracking-wider uppercase font-medium select-none transition-all cursor-pointer ${
              selectedScentFamily === null
                ? 'bg-gold-950 text-gold-200 border border-gold-950'
                : 'bg-sand-50 hover:bg-gold-100/40 text-sand-800 border border-gold-200/10'
            }`}
          >
            All Notes
          </button>
          
          {listFamilies.map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedScentFamily(fam)}
              className={`px-3 py-1.5 rounded text-xs tracking-wider uppercase font-medium select-none transition-all cursor-pointer ${
                selectedScentFamily === fam
                  ? 'bg-gold-950 text-gold-200 border border-gold-950'
                  : 'bg-sand-50 hover:bg-gold-100/40 text-sand-800 border border-gold-200/10'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Filters drawer control / toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Concentration Filters Dropdown style/toggle */}
          <div className="relative">
            <select
              value={selectedConcentration || ''}
              onChange={(e) => setSelectedConcentration(e.target.value || null)}
              className="appearance-none bg-sand-50 border border-gold-200/20 text-xs text-sand-800 py-2.5 pl-4 pr-10 rounded uppercase font-medium tracking-wider focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer text-left"
            >
              <option value="">All Formulations</option>
              {listConcentrations.map((conc) => (
                <option key={conc} value={conc}>
                  {conc}
                </option>
              ))}
            </select>
            <SlidersHorizontal size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand-500 pointer-events-none" />
          </div>

          {/* Sorters */}
          <div className="relative">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as SortOption)}
              className="appearance-none bg-sand-50 border border-gold-200/20 text-xs text-sand-800 py-2.5 pl-4 pr-10 rounded uppercase font-medium tracking-wider focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer text-left"
            >
              <option value="featured">Featured Coordinates</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: Elite First</option>
            </select>
            <ArrowUpDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand-500 pointer-events-none" />
          </div>

          {(selectedScentFamily || selectedConcentration || activeSort !== 'featured') && (
            <button
              onClick={resetAllFilters}
              className="text-stone-400 hover:text-red-500 p-2.5 rounded hover:bg-red-50/50 transition-all cursor-pointer flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider shrink-0"
              title="Reset current filter criteria"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active filters summary */}
      {(selectedScentFamily || selectedConcentration) && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand-500">
          <span>Active filter coordinates:</span>
          {selectedScentFamily && (
            <span className="bg-gold-50 border border-gold-200/20 text-gold-700 px-2.5 py-1 rounded flex items-center gap-1.5 font-medium">
              Family: {selectedScentFamily}
              <button onClick={() => setSelectedScentFamily(null)} className="hover:text-red-500 cursor-pointer">×</button>
            </span>
          )}
          {selectedConcentration && (
            <span className="bg-gold-50 border border-gold-200/20 text-gold-700 px-2.5 py-1 rounded flex items-center gap-1.5 font-medium">
              Formulation: {selectedConcentration}
              <button onClick={() => setSelectedConcentration(null)} className="hover:text-red-500 cursor-pointer">×</button>
            </span>
          )}
        </div>
      )}

      {/* Product Grid Area */}
      {filteredSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSortedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
              onAddToCartDirect={onAddToCartDirect}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gold-200/10 rounded-lg py-16 px-4 text-center max-w-sm mx-auto shadow-xs">
          <RotateCcw className="text-gold-400 animate-spin mx-auto pb-2" size={36} />
          <h3 className="font-serif text-lg font-medium text-sand-950 mt-4">
            No scent combinations found
          </h3>
          <p className="text-xs text-sand-600 mt-1 max-w-xs mx-auto leading-relaxed">
            There are no formulations matching these precise filter parameters. Retrace your criteria.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-6 bg-gold-950 hover:bg-gold-900 text-gold-200 text-[10px] uppercase tracking-widest font-bold py-3 px-6 rounded transition-all cursor-pointer inline-block"
          >
            Clear Search Criteria
          </button>
        </div>
      )}

    </div>
  );
}
