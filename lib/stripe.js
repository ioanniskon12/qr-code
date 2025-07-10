// lib/stripe.js
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const plans = {
  FREE: {
    name: 'Free',
    price: 0,
    features: {
      maxEvents: 5,
      maxPhotosPerEvent: 100,
      storageDays: 30,
      passwordProtection: false,
      downloads: false
    }
  },
  SINGLE: {
    name: 'Single Event',
    price: 10000, // €100 in cents
    priceId: process.env.STRIPE_SINGLE_PRICE_ID,
    features: {
      maxEvents: 1,
      maxPhotosPerEvent: 500,
      storageDays: 365,
      passwordProtection: true,
      downloads: true
    }
  },
  MULTI: {
    name: 'Multiple Events',
    price: 20000, // €200 in cents
    priceId: process.env.STRIPE_MULTI_PRICE_ID,
    features: {
      maxEvents: -1, // unlimited
      maxPhotosPerEvent: -1, // unlimited
      storageDays: -1, // unlimited
      passwordProtection: true,
      downloads: true,
      adminTools: true
    }
  }
};
