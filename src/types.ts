/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // For default size (e.g., 100ml)
  sizes: {
    ml: number;
    price: number;
  }[];
  scentFamily: 'Woody' | 'Floral' | 'Fresh' | 'Amber' | 'Oriental';
  concentration: 'Eau de Parfum' | 'Extrait de Parfum' | 'Oud Intense';
  volumePercent: number; // e.g., 82% vol
  pyramid: NotePyramid;
  primaryColor: string; // Tailwind color class or hex background for abstract representation
  secondaryColor: string;
  images: string[]; // High-res images
  matchTags: string[]; // for quiz logic
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  story: string; // Luxurious behind-the-scent text
}

export interface CartItem {
  id: string; // productItem_size
  product: Product;
  selectedSize: number;
  price: number;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    description: string;
    tags: string[]; // matches against matchTags
    image?: string; // Optional elegant visual icon style
    vibe: string; // Visual flavor
  }[];
}

export interface OrderDetails {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    zip: string;
    phone: string;
    email: string;
  };
  shippingMethod: 'standard' | 'express' | 'valet';
  paymentCard: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[]; // multi-paragraph luxury content
}
