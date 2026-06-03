/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Sparkles, Star, ShoppingBag, Eye, Heart, RefreshCw } from 'lucide-react';
import { CartItem, Product } from './types';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ScentQuiz from './components/ScentQuiz';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedScentFamily, setSelectedScentFamily] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Initialize cart from localStorage on first loading coordinates
  useEffect(() => {
    const savedCart = localStorage.getItem('aura-scent-bag-coordinates');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart coordinates", e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('aura-scent-bag-coordinates', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product, sizeMl: number) => {
    const itemId = `${product.id}_${sizeMl}`;
    const selectedSizeObj = product.sizes.find((s) => s.ml === sizeMl);
    const itemPrice = selectedSizeObj ? selectedSizeObj.price : product.price;

    const existingIdx = cart.findIndex((i) => i.id === itemId);
    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        selectedSize: sizeMl,
        price: itemPrice,
        quantity: 1,
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleUpdateCartQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    const updated = cart.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item));
    saveCart(updated);
  };

  const handleRemoveCartItem = (itemId: string) => {
    const updated = cart.filter((item) => item.id !== itemId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleSelectProductFromGrid = (p: Product) => {
    setSelectedProduct(p);
    setCurrentPage('detail');
    window.scrollTo({ top: 0 });
  };

  // Home Categories Quick navigation
  const homeCategories = [
    { name: 'Woody', tag: 'Mysore sandalwood & dry papyrus', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Fresh', tag: 'Salty tides & pink grapefruit', image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600' },
    { name: 'Floral', tag: 'Grasse jasmine blooms & rose', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
    { name: 'Amber', tag: 'Warm ambergris & golden saffron', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 select-text">
      
      {/* Premium Header Nav Bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveCartItem={handleRemoveCartItem}
        onOpenCheckout={() => {
          setIsCheckoutOpen(true);
          setCurrentPage('checkout');
          window.scrollTo({ top: 0 });
        }}
        products={PRODUCTS}
        onSelectProduct={handleSelectProductFromGrid}
        selectedScentFamily={selectedScentFamily}
        setSelectedScentFamily={setSelectedScentFamily}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* PAGE 1: Luxury Homepage Experience */}
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16 pb-16"
            >
              {/* Grand Hero Slide carousel */}
              <Hero
                onStartQuiz={() => setCurrentPage('quiz')}
                onGoToShop={() => {
                  setSelectedScentFamily(null);
                  setCurrentPage('shop');
                }}
              />

              {/* Bestseller Spotlights Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-gold-250/20 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-600 tracking-[0.2em] font-serif block">
                      The Maison Elite
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-sand-950 uppercase tracking-widest mt-1">
                      Our Highly Coveted Creations
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedScentFamily(null);
                      setCurrentPage('shop');
                      window.scrollTo({ top: 0 });
                    }}
                    className="text-[10px] text-gold-600 font-bold uppercase tracking-widest hover:underline flex items-center gap-1.5 mt-3 sm:mt-0 cursor-pointer"
                  >
                    <span>View all olfactory designs</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-lg overflow-hidden border border-gold-200/5 hover:border-gold-300 shadow-xs flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Image panel */}
                      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[9px] text-sand-900 font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-gold-200/5">
                          {product.concentration}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10px] text-gold-600 uppercase tracking-widest font-bold">
                              {product.scentFamily} Note family
                            </span>
                            <div className="flex items-center gap-0.5 text-gold-500 font-mono text-[10px]">
                              <Star size={10} fill="currentColor" />
                              <span className="font-bold">{product.rating}</span>
                            </div>
                          </div>

                          <h4
                            onClick={() => handleSelectProductFromGrid(product)}
                            className="font-serif text-lg font-light text-sand-950 uppercase tracking-wide group-hover:text-gold-600 cursor-pointer pt-1"
                          >
                            {product.name}
                          </h4>
                          <p className="text-xs text-sand-500 italic font-serif">{product.tagline}</p>
                          <p className="text-xs text-sand-600 font-light mt-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gold-150/40">
                          <span className="text-sm font-serif font-semibold text-sand-950 font-mono">${product.price}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectProductFromGrid(product)}
                              className="text-[9px] bg-sand-50 text-sand-800 border border-gold-200/10 hover:border-gold-300 font-bold px-3 py-1.5 rounded uppercase tracking-wider cursor-pointer"
                            >
                              Explore
                            </button>
                            <button
                              onClick={() => handleAddToCart(product, product.sizes[0].ml)}
                              className="text-[9px] bg-gold-500 hover:bg-gold-400 text-white font-bold px-3 py-1.5 rounded uppercase tracking-wider cursor-pointer"
                            >
                              Add Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scent finder Quiz CTA Ribbon */}
              <section className="bg-gradient-to-r from-stone-950 to-gold-950 text-gold-200 py-16 px-4 md:px-12 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-black/10" />
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-gold-500/25">
                    <Sparkles className="text-gold-400 cursor-pointer animate-pulse" size={20} />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-white font-light uppercase tracking-widest max-w-2xl leading-tight">
                    Find Your Molecular signature
                  </h3>
                  <p className="text-xs md:text-sm text-sand-200 font-light max-w-md mx-auto leading-relaxed">
                    Undergo our House Alchemist's 6-question digital consultant profile. We map your wardrobe, atmospheres, and profile weight coordinates directly to our catalog.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedScentFamily(null);
                      setCurrentPage('quiz');
                      window.scrollTo({ top: 0 });
                    }}
                    className="bg-gold-500 hover:bg-gold-400 text-white font-serif text-xs uppercase tracking-[0.2em] font-medium py-3.5 px-8 rounded transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    Initiate Consultation
                  </button>
                </div>
              </section>

              {/* Portfolio Categories showcase */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <h3 className="font-serif text-2xl uppercase tracking-widest text-sand-950 font-light">
                    The Atmospheric Portfolios
                  </h3>
                  <p className="text-xs text-sand-500 uppercase tracking-widest font-semibold">
                    Select a core coordinate range to browse our compendium
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {homeCategories.map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() => {
                        setSelectedScentFamily(cat.name);
                        setCurrentPage('shop');
                        window.scrollTo({ top: 0 });
                      }}
                      className="group relative aspect-square rounded-lg overflow-hidden border border-gold-200/10 cursor-pointer shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10 transition-colors group-hover:from-stone-950/90" />
                      <img
                        src={cat.image}
                        alt={`${cat.name} Portfolio`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 z-20 space-y-0.5">
                        <h4 className="text-white font-serif text-lg font-light uppercase tracking-wider">
                          {cat.name} portfolio
                        </h4>
                        <p className="text-[11px] text-gold-300 font-light italic">
                          {cat.tag}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Client Review spotlight */}
              <section className="bg-sand-100/60 border-t border-b border-gold-200/5 py-14">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                  <div className="flex justify-center text-gold-500 gap-1 select-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-lg md:text-2xl italic text-sand-950 leading-relaxed font-medium">
                    "Maison d'Aura is a profound, glorious disruption to standard synthetics. Wearing 'L'Ombre d'Or' is like wrapping myself in twilight and ancient memoirs. It doesn't scream; it commands rooms through absolute whisper."
                  </blockquote>
                  <div className="text-xs uppercase tracking-widest font-bold text-gold-600 font-sans">
                    — Julian V., Elite Member & Collector
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* PAGE 2: Scent Quiz Component */}
          {currentPage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScentQuiz
                products={PRODUCTS}
                onAddToCart={(product, size) => handleAddToCart(product, size)}
                onSelectProduct={(p) => handleSelectProductFromGrid(p)}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          )}

          {/* PAGE 3: Rich Catalogue Compendium Grid */}
          {currentPage === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductGrid
                products={PRODUCTS}
                onSelectProduct={handleSelectProductFromGrid}
                onAddToCartDirect={handleAddToCart}
                selectedScentFamily={selectedScentFamily}
                setSelectedScentFamily={setSelectedScentFamily}
              />
            </motion.div>
          )}

          {/* PAGE 4: Detailed Notes view */}
          {currentPage === 'detail' && selectedProduct && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductDetail
                product={selectedProduct}
                onBack={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 350 });
                }}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {/* PAGE 5: Brand Story About page */}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <About />
            </motion.div>
          )}

          {/* PAGE 6: Blog Sourcing files */}
          {currentPage === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Blog />
            </motion.div>
          )}

          {/* PAGE 7: FAQ concierge */}
          {currentPage === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FAQ />
            </motion.div>
          )}

          {/* PAGE 8: Secured Checkout Multi-step */}
          {currentPage === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Checkout
                cart={cart}
                onClearCart={handleClearCart}
                onCloseCheckout={() => {
                  setCurrentPage('home');
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        setSelectedScentFamily={setSelectedScentFamily}
      />

    </div>
  );
}
