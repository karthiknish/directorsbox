import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: "No customer found with this email" },
        { status: 404 }
      );
    }

    const customer = customers.data[0];

    // Get all subscriptions for the customer (not just active ones)
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 100, // Increased limit to find any subscription
    });

    console.log("Found subscriptions:", subscriptions.data);

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "No subscriptions found for this customer" },
        { status: 404 }
      );
    }

    // Find the most recent subscription
    const latestSubscription = subscriptions.data[0]; // Stripe returns most recent first

    console.log("Latest subscription status:", latestSubscription.status);

    // Check if subscription can be cancelled
    if (latestSubscription.status === "canceled") {
      return NextResponse.json(
        { error: "Subscription is already cancelled" },
        { status: 400 }
      );
    }

    if (latestSubscription.cancel_at_period_end) {
      return NextResponse.json(
        { error: "Subscription is already scheduled for cancellation" },
        { status: 400 }
      );
    }

    // Cancel the subscription at period end
    const subscription = await stripe.subscriptions.update(
      latestSubscription.id,
      {
        cancel_at_period_end: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Subscription scheduled for cancellation",
      data: {
        cancelAt: subscription.cancel_at,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error("Cancellation error details:", error);
    return NextResponse.json(
      {
        error: "Failed to cancel subscription",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
