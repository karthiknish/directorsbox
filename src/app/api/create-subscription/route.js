import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Read logo SVG file
const logoSvg = fs.readFileSync(
  path.join(process.cwd(), "public/logo.svg"),
  "utf8"
);

// Configure nodemailer with DirectorsBox email
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "info@directorsbox.co.uk",
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

// Common email headers to improve deliverability
const commonEmailHeaders = {
  "List-Unsubscribe": "<mailto:info@directorsbox.co.uk?subject=unsubscribe>",
  "X-Priority": "1",
  "X-MSMail-Priority": "High",
  Importance: "high",
  "X-Report-Abuse": "Please report abuse here: info@directorsbox.co.uk",
  "X-Mailer": "DirectorsBox Mailer",
  "Feedback-ID": "SIGNUP:directorsbox:transactional",
  "X-Entity-Ref-ID": "directors-box",
};

async function sendEmail({ to, subject, html, isTransactional = true }) {
  const emailDefaults = {
    from: {
      name: "Directors Box",
      address: "info@directorsbox.co.uk",
    },
    replyTo: "info@directorsbox.co.uk",
    headers: {
      ...commonEmailHeaders,
      "X-Email-Type": isTransactional ? "transactional" : "marketing",
    },
  };

  return transporter.sendMail({
    ...emailDefaults,
    to,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
        </head>
        <body style="margin: 0; padding: 0; word-spacing: normal; background-color: #ffffff;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="text-align: center; padding: 20px;">
              ${logoSvg}
            </div>
            ${html}
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
              <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
              <p>Directors Box | <a href="https://directorsbox.co.uk" style="color: #000; text-decoration: underline;">directorsbox.co.uk</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: html.replace(/<[^>]*>/g, ""), // Strip HTML for plain text version
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, phone } = body;

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];

      // Check for existing active subscriptions
      const existingSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      if (existingSubscriptions.data.length > 0) {
        return NextResponse.json(
          { error: "Customer already has an active subscription" },
          { status: 400 }
        );
      }

      // Check for existing successful £195 payment
      const existingPayments = await stripe.paymentIntents.list({
        customer: customer.id,
        limit: 100,
      });

      console.log(existingPayments.data);

      const hasInitialPayment = existingPayments.data.some(
        (payment) => payment.object === "refund"
      );

      if (hasInitialPayment) {
        return NextResponse.json(
          { error: "Initial payment has already been made for this customer" },
          { status: 400 }
        );
      }
    } else {
      // Create new customer if none exists
      customer = await stripe.customers.create({
        email,
        name,
        phone,
        metadata: {
          joinDate: new Date().toISOString(),
        },
      });
    }

    // Create subscription with initial payment and recurring payment
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      trial_period_days: 30,
    });

    // Create a payment intent for the first month's £195
    const initialPayment = await stripe.paymentIntents.create({
      amount: 19500,
      currency: "gbp",
      customer: customer.id,
      payment_method_types: ["card"],
      metadata: {
        type: "initial_payment",
        customerEmail: email,
        customerName: name,
        subscriptionId: subscription.id,
        requiresWelcomeEmail: "true",
      },
    });

    // Send welcome email to customer
    await sendEmail({
      to: email,
      subject: "Welcome to Directors Box!",
      html: `
        <h2 style="color: #2e7d32;">Welcome to Directors Box!</h2>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 5px;">
          <p>Dear ${name},</p>
          <p>Thank you for subscribing to Directors Box! We're excited to have you on board.</p>
          <p>Your subscription details:</p>
          <ul>
            <li>Initial payment: £195</li>
            <li>Monthly subscription: £2000 (starts after 30-day trial)</li>
            <li>Subscription ID: ${subscription.id}</li>
          </ul>
          <p>If you have any questions, please don't hesitate to contact us at info@directorsbox.co.uk</p>
        </div>
      `,
    });

    // Send notification email about successful subscription creation
    await sendEmail({
      to: "info@directorsbox.co.uk",
      subject: "New Subscription Created - Directors Box",
      html: `
        <h2 style="color: #2e7d32;">New Subscription Created</h2>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 5px;">
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Customer Phone:</strong> ${phone}</p>
          <p><strong>Subscription ID:</strong> ${subscription.id}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-GB", {
            timeZone: "Europe/London",
          })}</p>
        </div>
      `,
    });

    // Return payment details
    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: initialPayment.client_secret,
    });
  } catch (error) {
    console.error("Subscription error:", error);

    // Send notification email about error
    await sendEmail({
      to: "info@directorsbox.co.uk",
      subject: "Subscription Creation Error - Directors Box",
      html: `
        <h2 style="color: #d32f2f;">Error Creating Subscription - Directors Box</h2>
        <div style="background: #ffebee; padding: 20px; border-radius: 5px;">
          <p><strong>Error Message:</strong> ${error.message}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-GB", {
            timeZone: "Europe/London",
          })}</p>
          <p><strong>Stack Trace:</strong></p>
          <pre style="background: #fff; padding: 10px; border-radius: 3px;">${
            error.stack
          }</pre>
        </div>
      `,
    });

    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
