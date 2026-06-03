/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Sparkles, CheckCircle2, Ticket, ArrowLeft, RefreshCw, Milestone } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
  onCloseCheckout: () => void;
}

export default function Checkout({ cart, onClearCart, onCloseCheckout }: CheckoutProps) {
  const [step, setStep] = useState<number>(1); // 1 = Shipping, 2 = Payment, 3 = Processing Loading, 4 = Success
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'valet'>('express');
  const [loadingStepText, setLoadingStepText] = useState('Initiating validation...');

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Cart prices calculations
  const cartSubtot = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const appliedDiscount = promoApplied ? Math.round(cartSubtot * discountPercent) : 0;
  
  // Shipping fees
  const shippingCosts = {
    standard: 0,
    express: 15,
    valet: 45
  };
  const deliveryCost = cartSubtot > 150 && shippingMethod !== 'valet' ? 0 : shippingCosts[shippingMethod];
  
  const taxCost = Math.round((cartSubtot - appliedDiscount) * 0.08); // 8% mock sales tax
  const checkoutTotal = cartSubtot - appliedDiscount + deliveryCost + taxCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAISONAURA' || promoCode.trim().toUpperCase() === 'AURA20') {
      setPromoApplied(true);
      setDiscountPercent(0.20); // 20% discount
    } else {
      alert("This olfactory promo code is vacant. Try using 'MAISONAURA' for 20% savings.");
    }
  };

  const handleStartProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Processing loading step

    const statuses = [
      "Securing private transaction ledger...",
      "Assigning master courier valet coordinate...",
      "Registering hand-poured batch numbers...",
      "Wax-sealing botanical gift case...",
      "Logging digital invoice details..."
    ];

    statuses.forEach((msg, idx) => {
      setTimeout(() => {
        setLoadingStepText(msg);
        if (idx === statuses.length - 1) {
          setTimeout(() => {
            setStep(4); // Success step!
          }, 800);
        }
      }, (idx + 1) * 900);
    });
  };

  const generateMockOrderId = () => {
    return `MA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const [orderId] = useState(generateMockOrderId());

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      
      {/* Checkout Success Step */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-gold-400 max-w-2xl mx-auto rounded-lg p-8 md:p-14 text-center space-y-6 shadow-2xl"
        >
          <div className="flex flex-col items-center select-none">
            <div className="w-16 h-16 bg-gold-50 border border-gold-200 text-gold-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={36} className="animate-bounce" />
            </div>
            <h2 className="font-serif text-3xl font-light text-sand-950 uppercase tracking-widest">
              Order Placed Successfully
            </h2>
            <p className="text-gold-600 font-serif text-xs uppercase tracking-widest mt-1">
              Your scent is secured inside our vaults
            </p>
          </div>

          <p className="text-xs text-sand-600 leading-relaxed max-w-md mx-auto">
            Thank you, <strong>{firstName || "Honored Scent Companion"}</strong>. We have registered your transaction under reference <strong>{orderId}</strong>. A courier matching schedule has been dispatched to <strong>{email || "your registration email"}</strong>.
          </p>

          <div className="bg-sand-50 p-5 rounded border border-gold-100 text-left space-y-3.5 max-w-md mx-auto">
            <h4 className="font-serif text-xs font-semibold tracking-wider text-sand-950 uppercase border-b border-gold-100 pb-2">
              Order Coordinates & Invoice
            </h4>
            <div className="space-y-1.5 text-xs text-sand-700">
              <div className="flex justify-between font-mono">
                <span>Transaction Ref:</span>
                <span className="font-semibold text-sand-950">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Address:</span>
                <span className="font-semibold text-sand-950 text-right">
                  {address}, {city} · {zip}
                </span>
              </div>
              <div className="flex justify-between font-serif">
                <span>Method Selected:</span>
                <span className="font-semibold text-gold-700 uppercase tracking-wider">
                  {shippingMethod === 'valet' ? 'Boutique Valet' : shippingMethod === 'express' ? 'Royal Express' : 'Standard'}
                </span>
              </div>
              <div className="flex justify-between font-mono font-bold text-sand-950 pt-2 border-t border-gold-100 border-dashed">
                <span>Total Secured:</span>
                <span>${checkoutTotal}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                onClearCart();
                onCloseCheckout();
              }}
              className="bg-gold-950 hover:bg-gold-900 text-gold-200 text-xs font-bold uppercase tracking-widest py-4 px-10 rounded transition-all cursor-pointer shadow-md"
            >
              Return to E-Boutique
            </button>
          </div>
        </motion.div>
      )}

      {/* Checkout Processing Loader */}
      {step === 3 && (
        <div className="bg-white border border-gold-200/25 max-w-md mx-auto rounded p-12 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center min-h-[350px]">
          <RefreshCw className="animate-spin text-gold-500" size={44} />
          <h3 className="font-serif text-xl font-light text-sand-950 uppercase tracking-widest">
            Securing Your Coordinates
          </h3>
          <p className="text-xs text-sand-500 font-medium italic animate-pulse">
            {loadingStepText}
          </p>
        </div>
      )}

      {/* Steps 1 & 2 layout */}
      {(step === 1 || step === 2) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Checkout Input Panel (col-span-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-gold-200/25 rounded-md shadow-lg space-y-8">
            <div className="flex items-center justify-between border-b border-gold-100 pb-4">
              <button
                onClick={() => {
                  if (step === 2) setStep(1);
                  else onCloseCheckout();
                }}
                className="text-xs uppercase font-bold tracking-wider text-sand-500 hover:text-gold-600 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={12} />
                <span>Retrace Steps</span>
              </button>

              <div className="text-xs font-bold text-gold-700 uppercase tracking-widest">
                Stage {step} of 2
              </div>
            </div>

            {/* Stage Indicator Headers */}
            <div className="flex justify-around bg-sand-50 py-3 rounded text-xs tracking-wider uppercase font-semibold text-sand-500 border border-gold-100/50">
              <span className={step === 1 ? 'text-gold-600 font-bold' : ''}>01. Shipping</span>
              <span className="text-gold-300">•</span>
              <span className={step === 2 ? 'text-gold-600 font-bold' : ''}>02. Secured Payment</span>
            </div>

            {/* STEP 1: Shipping Details Form */}
            {step === 1 && (
              <form onSubmit={() => setStep(2)} className="space-y-6">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-sand-950 mb-4 border-b border-gold-50 pb-2">
                  Recipient Courier Coordinates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Eleanor"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Vance"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Email Coordinate</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. eleanor.vance@example.com"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 20 7946 0958"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 45 Jermyn St"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Suite / Apt (Opt)</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="e.g. Studio 4"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. London"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Country</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none"
                      disabled
                      value="United Kingdom"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Postcode / ZIP</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="e.g. SW1Y 6HP"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                {/* Scent Valet Courier Selector */}
                <div className="space-y-3 pt-4">
                  <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold block">
                    Select Scent Logistics Courier
                  </label>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'standard', name: "Maison Standard", price: "Free", days: "4-6 Business Days", desc: "Eco-conscious land delivery inside recyclable card pouches." },
                      { id: 'express', name: "Royal Scent Courier (Express)", price: "$15 or Free > $150", days: "1-2 Business Days", desc: "Premium climate-controlled priority courier. Recommended." },
                      { id: 'valet', name: "Maison white-glove Valet Service", price: "$45", days: "Same-Day / Next-Day Scheduled", desc: "Delivered personally by scheduling a Maison valet, hand-delivered inside luxury satin fabric carrier." }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setShippingMethod(m.id as any)}
                        className={`w-full p-4 rounded text-left border flex items-center justify-between transition-all select-none cursor-pointer ${
                          shippingMethod === m.id
                            ? 'bg-gold-50/50 border-gold-500 ring-1 ring-gold-500'
                            : 'bg-white border-gold-200/20 hover:bg-gold-50/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            shippingMethod === m.id ? 'border-gold-600 bg-gold-600 text-white' : 'border-gold-300'
                          }`}>
                            {shippingMethod === m.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-sand-950 uppercase tracking-wide">
                              {m.name}
                            </div>
                            <p className="text-[11px] text-sand-600 leading-normal font-light mt-0.5 max-w-sm">
                              {m.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-sand-950">{m.price}</span>
                          <div className="text-[10px] text-sand-400 font-mono mt-0.5">{m.days}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-950 hover:bg-gold-900 text-gold-200 text-xs font-serif uppercase tracking-[0.2em] font-medium py-4 rounded transition-all cursor-pointer shadow-md"
                >
                  Continue to Secure Payment Codecs
                </button>
              </form>
            )}

            {/* STEP 2: Secured Card Billing Code */}
            {step === 2 && (
              <form onSubmit={handleStartProcessing} className="space-y-6">
                <div className="flex items-center gap-1.5 border-b border-gold-50 pb-2">
                  <CreditCard className="text-gold-600" size={18} />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-sand-950">
                    Secured Card Transaction Codec
                  </h3>
                </div>

                <div className="bg-gold-50 border border-gold-200/25 p-3.5 rounded flex items-center gap-3">
                  <ShieldCheck className="text-gold-500 shrink-0" size={24} />
                  <div>
                    <div className="text-xs font-bold text-sand-950">Secure Vault Protection</div>
                    <div className="text-[10px] text-sand-500 leading-normal max-w-xs pt-0.5">
                      Your numeric identity details are encrypted instantly using 256-bit bank codecs. Maison d'Aura servers hold no card coordinates.
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Holder Name (Exactly as shown)</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="e.g. ELEANOR L VANCE"
                    className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none font-mono uppercase focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Card Numeric Identity (16 Digits)</label>
                  <input
                    type="text"
                    pattern="\d{16}"
                    maxLength={16}
                    required
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value.replace(/\D/g, ''));
                    }}
                    placeholder="4500 0000 0000 9999"
                    className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none font-mono focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none font-mono focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-sand-500 uppercase tracking-widest font-bold">Security CVC Code</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      pattern="\d{3}"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full bg-sand-50 border border-gold-200/20 rounded p-2.5 text-xs text-sand-950 focus:outline-none font-mono focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-950 hover:bg-gold-900 text-gold-200 text-xs font-serif uppercase tracking-[0.2em] font-medium py-4 rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={14} className="text-gold-300 animate-pulse" />
                  <span>Authorize Transaction · ${checkoutTotal}</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Scent Bag Summary Column (col-span-12 lg:col-span-5) */}
          <div className="lg:col-span-5 bg-stone-900 border border-gold-500/10 text-white rounded p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-lg font-light text-gold-200 uppercase tracking-widest border-b border-gold-500/10 pb-3">
              Olfactory Cart Coordinates
            </h3>

            {/* Small list */}
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 border-b border-gold-500/10 pb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded border border-gold-500/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-serif text-white font-medium">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-400 italic">
                        {item.product.scentFamily} · {item.selectedSize}ml · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-gold-300 font-bold">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo application block */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (MAISONAURA)"
                className="flex-1 bg-stone-950 border border-gold-500/10 text-[10px] font-mono tracking-widest rounded px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
              <button
                type="submit"
                className="bg-gold-500 text-white text-[10px] tracking-widest uppercase font-bold px-4 py-2 hover:bg-gold-400 rounded transition-colors cursor-pointer shrink-0"
              >
                APPLY
              </button>
            </form>

            {promoApplied && (
              <div className="text-[10px] text-gold-300 font-bold tracking-wider flex items-center justify-between border border-gold-500/20 bg-gold-950/20 p-2 rounded">
                <span>✓ CODE ACTIVE: 20% COMPENDIUM SAVINGS</span>
                <span>-${appliedDiscount}</span>
              </div>
            )}

            {/* Ledger breakdown */}
            <div className="space-y-2 text-xs text-stone-400 font-mono py-2">
              <div className="flex justify-between">
                <span>Porfolio Subtotal:</span>
                <span className="text-white">${cartSubtot}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-gold-400">
                  <span>Secret Savings (20%):</span>
                  <span>-${appliedDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Scent Logistics ({shippingMethod}):</span>
                <span className="text-white">
                  {deliveryCost === 0 ? "Complimentary" : `$${deliveryCost}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Grasse Agriculture Tax (8%):</span>
                <span className="text-white">${taxCost}</span>
              </div>

              <div className="h-[1px] bg-gold-500/20 my-4" />

              <div className="flex justify-between font-serif text-base text-gold-200 font-bold pt-1">
                <span>Grand Scent Valuation:</span>
                <span className="font-mono text-white">${checkoutTotal}</span>
              </div>
            </div>

            <div className="bg-stone-950 border border-gold-500/5 p-3 rounded text-[9px] text-stone-500 leading-normal flex items-start gap-1.5 select-none">
              <ShieldCheck size={12} className="text-gold-600 mt-0.5 shrink-0" />
              <span>
                Your parcel is wrapped inside thick recyclable linen cartons. Free corresponding travel tester vials allow safe testing before opening the grand container.
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
