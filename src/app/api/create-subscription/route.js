import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, phone } = body;

    // Create or get customer
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        joinDate: new Date().toISOString(),
      },
    });

    // Create subscription with initial payment and recurring payment
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Monthly £2000 price ID
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      trial_period_days: 30, // This gives time to collect the first payment separately
    });

    // Create a payment intent for the first month's £195
    const initialPayment = await stripe.paymentIntents.create({
      amount: 19500, // Amount in pence (£195.00)
      currency: "gbp",
      customer: customer.id,
      payment_method_types: ["card"],
      metadata: {
        type: "initial_payment",
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: initialPayment.client_secret,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
