// app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Update user plan
    await prisma.user.update({
      where: { email: session.customer_email },
      data: {
        plan: getPlanFromPrice(session.amount_total),
        stripeId: session.customer
      }
    });

    // Create subscription record
    await prisma.subscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: session.subscription || session.id,
        stripeCustomerId: session.customer,
        plan: getPlanFromPrice(session.amount_total),
        status: 'active',
        startDate: new Date()
      }
    });
  }

  return NextResponse.json({ received: true });
}

function getPlanFromPrice(amount) {
  switch (amount) {
    case 10000: // €100
      return 'SINGLE';
    case 20000: // €200
      return 'MULTI';
    default:
      return 'FREE';
  }
}