/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, ChevronDown, User, Heart, ShieldCheck, RefreshCw, Trash2 } from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cart: CartItem[];
  onUpdateCartQty: (itemId: string, qty: number) => void;
  onRemoveCartItem: (itemId: string) => void;
  onOpenCheckout: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedScentFamily: string | null;
  setSelectedScentFamily: (family: string | null) => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  cart,
  onUpdateCartQty,
  onRemoveCartItem,
  onOpenCheckout,
  products,
  onSelectProduct,
  selectedScentFamily,
  setSelectedScentFamily,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Search filter
  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.scentFamily.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.pyramid.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.pyramid.heart.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.pyramid.base.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleFamilySelect = (family: string) => {
    setSelectedScentFamily(family);
    setCurrentPage('shop');
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'E-Boutique' },
    { id: 'shop', label: 'The Collection' },
    { id: 'quiz', label: 'Scent Finder' },
    { id: 'about', label: 'Our Story' },
    { id: 'blog', label: 'The Journal' },
    { id: 'faq', label: 'Concierge & FAQ' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gold-950 text-gold-200 text-xs py-2 px-4 text-center font-serif tracking-widest uppercase border-b border-gold-900/40 select-none z-50 relative">
        Complimentary Private Valet Shipping & Hand-wrapped Samples with all purchases above $150
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-sand-50/90 backdrop-blur-md border-b border-gold-200/20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Hamburger (Mobile) */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-sand-900 hover:text-gold-600 focus:outline-none p-1 cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left: Nav items (Desktop) */}
          <nav className="hidden md:flex space-x-8 items-center font-medium text-xs uppercase tracking-widest text-sand-900/80">
            <div className="relative" onMouseLeave={() => setMegaMenuOpen(false)}>
              <button
                id="mega-menu-trigger"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => {
                  setCurrentPage('shop');
                  setSelectedScentFamily(null);
                }}
                className={`py-3 flex items-center gap-1 hover:text-gold-500 transition-colors pointer-events-auto cursor-pointer ${
                  currentPage === 'shop' ? 'text-gold-600 font-semibold' : ''
                }`}
              >
                The Collection <ChevronDown size={12} className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-0 w-80 bg-white/95 backdrop-blur-xl border border-gold-200/30 shadow-xl p-6 rounded-b"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                  >
                    <div className="text-xs font-bold text-gold-700 tracking-wider border-b border-gold-100 pb-2 mb-3 uppercase">
                      Browse by Scent Family
                    </div>
                    <div className="space-y-3 font-serif">
                      {[
                        { name: 'Woody', desc: 'Sandalwood, rich cedar, tobacco, & crisp papyrus.' },
                        { name: 'Fresh', desc: 'Ocean ozone, mineral salt, key lime, & wild sage.' },
                        { name: 'Floral', desc: 'Dewy Grasse jasmine, delicate gardenia, & rose.' },
                        { name: 'Amber', desc: 'Golden ambergris, vanilla orchid, & sweet saffron.' },
                        { name: 'Oriental', desc: 'Midnight musk, rich black spices, & aged agarwood.' },
                      ].map((fam) => (
                        <button
                          key={fam.name}
                          onClick={() => handleFamilySelect(fam.name)}
                          className="w-full text-left group hover:bg-gold-50/50 p-2 rounded transition-colors cursor-pointer"
                        >
                          <div className="text-sm font-semibold text-sand-950 group-hover:text-gold-600 transition-colors">
                            {fam.name}
                          </div>
                          <div className="text-[11px] text-sand-500 italic mt-0.5 leading-relaxed">
                            {fam.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gold-100/50 text-center">
                      <button
                        onClick={() => {
                          setSelectedScentFamily(null);
                          setCurrentPage('shop');
                          setMegaMenuOpen(false);
                        }}
                        className="text-[10px] text-gold-500 font-bold hover:underline tracking-widest cursor-pointer"
                      >
                        VIEW FULL COMPENDIUM →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.filter(item => item.id !== 'shop').map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  if (item.id === 'quiz') setSelectedScentFamily(null);
                }}
                className={`py-3 hover:text-gold-500 transition-colors cursor-pointer relative ${
                  currentPage === item.id ? 'text-gold-600 font-semibold' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 md:flex-none text-center">
            <button
              onClick={() => {
                setCurrentPage('home');
                setSelectedScentFamily(null);
              }}
              className="font-serif inline-block focus:outline-none cursor-pointer"
            >
              <div className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-sand-950 uppercase">
                Maison d'Aura
              </div>
              <div className="text-[9px] uppercase tracking-[0.4em] text-gold-500/80 -mt-0.5">
                haute parfumerie • grasse & london
              </div>
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button */}
            <button
              id="search-toggle"
              onClick={() => setSearchOpen(true)}
              className="text-sand-900 hover:text-gold-600 p-1 cursor-pointer transition-colors"
              title="Search fragrances"
            >
              <Search size={19} />
            </button>

            {/* Account - Client-only cosmetic indicator */}
            <button
              onClick={() => setCurrentPage('faq')}
              className="hidden sm:inline-block text-sand-900 hover:text-gold-600 p-1 cursor-pointer transition-colors"
              title="Concierge account"
            >
              <User size={19} />
            </button>

            {/* Cart Button */}
            <button
              id="cart-toggle"
              onClick={() => setCartOpen(true)}
              className="relative text-sand-900 hover:text-gold-600 p-1 cursor-pointer transition-colors flex items-center"
              title="Your scent bag"
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-gold-500 text-white font-mono text-[9px] rounded-full h-4.5 w-4.5 flex items-center justify-center font-medium leading-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-sand-950/95 backdrop-blur-xl flex flex-col pt-24 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl mx-auto w-full">
              <div className="flex justify-between items-center border-b border-gold-200/20 pb-4">
                <span className="font-serif text-lg tracking-widest text-gold-300 uppercase">
                  Explore Olfactory Journeys
                </span>
                <button
                  id="close-search"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-gold-200 hover:text-white cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400" size={22} />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search by scent name, notes (rose, oud, cedar), family..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-900/70 border border-gold-500/20 rounded-md py-4 pl-14 pr-6 text-white placeholder-stone-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 font-serif text-lg tracking-wide transition-all"
                  autoFocus
                />
              </div>

              {/* Suggestions */}
              {searchQuery === '' ? (
                <div className="mt-8">
                  <div className="text-xs text-stone-400 tracking-widest uppercase mb-3">
                    Trending Explorations
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Oud Noir', 'Mysore Sandalwood', 'Grasse Jasmin', 'Saffron', 'Vétiver', 'Fresh Marine'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="bg-stone-900 text-gold-200/80 hover:bg-gold-500/10 hover:text-gold-300 border border-gold-500/10 hover:border-gold-500/30 rounded px-3 py-1.5 text-xs tracking-wider transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 overflow-y-auto max-h-[50vh] pr-2 space-y-4">
                  <div className="text-xs text-stone-400 tracking-widest uppercase mb-2">
                    Found {filteredProducts.length} matched creations
                  </div>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex gap-4 p-3 rounded bg-stone-900/30 hover:bg-gold-950/20 border border-gold-500/5 hover:border-gold-500/20 cursor-pointer transition-all group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded border border-gold-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-white font-serif text-base font-semibold group-hover:text-gold-300 transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-gold-300 font-mono text-xs font-semibold">
                            ${p.price}
                          </span>
                        </div>
                        <p className="text-stone-400 text-xs italic">{p.tagline}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          <span className="bg-gold-950/50 text-[10px] text-gold-400 px-2 py-0.5 rounded border border-gold-500/20">
                            {p.scentFamily}
                          </span>
                          <span className="bg-stone-800 text-[10px] text-stone-400 px-2 py-0.5 rounded">
                            {p.concentration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-stone-500 font-serif">
                      No olfactory matches found. Try searching for "Oud", "Sandalwood", or "Jasmine".
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart (Scent Bag) Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                className="w-screen max-w-md bg-sand-50 shadow-2xl flex flex-col border-l border-gold-200/25"
              >
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-gold-200/20 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-gold-600" size={20} />
                    <h2 className="font-serif text-lg font-medium tracking-wide uppercase text-sand-950">
                      Your Scent Bag
                    </h2>
                  </div>
                  <button
                    id="close-cart"
                    onClick={() => setCartOpen(false)}
                    className="text-sand-500 hover:text-sand-950 cursor-pointer p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                      <div className="bg-gold-50 p-5 rounded-full mb-4">
                        <ShoppingBag className="text-gold-400" size={32} />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-sand-950 mb-1">
                        Your bag is currently vacant
                      </h3>
                      <p className="text-sm text-sand-600 mb-6 max-w-xs">
                        Every masterpiece begins with a single note. Find your match or browse our catalog.
                      </p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setCurrentPage('shop');
                          setSelectedScentFamily(null);
                        }}
                        className="bg-gold-950 text-gold-200 text-xs uppercase tracking-widest font-semibold px-6 py-3 hover:bg-gold-900 transition-colors rounded-xs cursor-pointer shadow-xs"
                      >
                        Explore the Compendium
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-gold-100/60 last:border-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded bg-stone-100 cursor-pointer hover:opacity-90 transition-opacity border border-gold-200/10"
                          onClick={() => {
                            onSelectProduct(item.product);
                            setCartOpen(false);
                          }}
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3
                                onClick={() => {
                                  onSelectProduct(item.product);
                                  setCartOpen(false);
                                }}
                                className="font-serif text-base font-semibold text-sand-950 cursor-pointer hover:text-gold-600 transition-colors"
                              >
                                {item.product.name}
                              </h3>
                              <p className="text-xs text-sand-500 italic mt-0.5">
                                {item.product.concentration} · {item.selectedSize}ml
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveCartItem(item.id)}
                              className="text-stone-300 hover:text-red-500 cursor-pointer p-1 transition-colors"
                              title="Remove scent"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gold-200 rounded overflow-hidden bg-white text-xs">
                              <button
                                onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-sand-950 hover:bg-gold-50 cursor-pointer disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 font-mono text-sand-950 font-semibold select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-sand-950 hover:bg-gold-50 cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-sm font-semibold font-mono text-sand-950">
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Drawer Footer */}
                {cart.length > 0 && (
                  <div className="border-t border-gold-200/20 bg-white p-6 space-y-4">
                    <div className="flex justify-between text-base font-serif text-sand-950 font-medium">
                      <span>Subtotal</span>
                      <span className="font-mono font-semibold">${cartTotal}</span>
                    </div>
                    <div className="text-xs text-sand-500 leading-relaxed flex items-start gap-1.5 border border-gold-100 p-2.5 rounded bg-gold-50/20">
                      <ShieldCheck size={14} className="text-gold-600 mt-0.5 shrink-0" />
                      <span>
                        Tax included. Valet Courier Shipping calculated at checkout. Secured and hand-wrapped under Maison observation.
                      </span>
                    </div>

                    <button
                      id="checkout-trigger"
                      onClick={() => {
                        setCartOpen(false);
                        onOpenCheckout();
                      }}
                      className="w-full bg-gold-950 text-gold-200 font-serif font-medium uppercase tracking-widest py-4 hover:bg-gold-900 transition-all rounded shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <span>·</span>
                      <span className="font-mono text-sm">${cartTotal}</span>
                    </button>
                    
                    <button
                      onClick={() => setCartOpen(false)}
                      className="w-full text-center text-[10px] text-sand-600 uppercase tracking-widest hover:text-gold-600 transition-colors font-semibold py-1 cursor-pointer"
                    >
                      CONTINUE SELECTING NOTES
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-4/5 max-w-sm bg-sand-50 h-full flex flex-col p-6 shadow-2xl border-r border-gold-200/20 overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-6 border-b border-gold-200/20">
                <span className="font-serif text-sm tracking-widest text-gold-700 uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sand-900 focus:outline-none cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile menu nav links */}
              <nav className="mt-8 flex flex-col space-y-6 font-serif text-lg tracking-wider text-sand-950 font-medium">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                      setSelectedScentFamily(null);
                    }}
                    className={`text-left capitalize hover:text-gold-600 transition-colors cursor-pointer ${
                      currentPage === item.id ? 'text-gold-600 pl-2 border-l-2 border-gold-500 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Scent Families shortcuts */}
              <div className="mt-12 pt-8 border-t border-gold-200/20">
                <div className="text-[10px] text-sand-500 uppercase tracking-widest mb-4 font-semibold">
                  Scent Portfolios
                </div>
                <div className="flex flex-col space-y-3 font-serif">
                  {['Woody', 'Fresh', 'Floral', 'Amber', 'Oriental'].map((f) => (
                    <button
                      key={f}
                      onClick={() => handleFamilySelect(f)}
                      className="text-left py-1 text-sm text-sand-700 hover:text-gold-600 transition-colors capitalize cursor-pointer"
                    >
                      {f} Collection
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative base footer inside navigation Drawer */}
              <div className="mt-auto pt-10 text-center flex flex-col items-center">
                <div className="font-serif text-base tracking-widest uppercase text-sand-900 mb-1">
                  Maison d'Aura
                </div>
                <div className="text-[8px] uppercase tracking-widest text-gold-500/80">
                  Grasse · London · Paris
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
