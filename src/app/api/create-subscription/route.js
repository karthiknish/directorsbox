import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing required environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Read logo SVG file
const logoSvg = fs.readFileSync(
  path.join(process.cwd(), "public/logo.png"),
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
    // Verify webhook signature
    const signature = request.headers.get("stripe-signature");
    let event;

    try {
      const rawBody = await request.text();
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const { customerEmail, customerName, subscriptionId } =
        paymentIntent.metadata;

      // Send success email to customer
      await sendEmail({
        to: customerEmail,
        subject: "Payment Successful - Directors Box",
        html: `
          <h2 style="color: #2e7d32;">Payment Successful</h2>
          <div style="background: #e8f5e9; padding: 20px; border-radius: 5px;">
            <p>Dear ${customerName},</p>
            <p>Thank you for your payment. Your subscription is now active.</p>
            <p>Subscription ID: ${subscriptionId}</p>
          </div>
        `,
      });

      // Send notification to admin
      await sendEmail({
        to: "info@directorsbox.co.uk",
        subject: "Payment Successful - Directors Box",
        html: `
          <h2 style="color: #2e7d32;">Payment Successful</h2>
          <div style="background: #e8f5e9; padding: 20px; border-radius: 5px;">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
            <p><strong>Payment Amount:</strong> £${
              paymentIntent.amount / 100
            }</p>
          </div>
        `,
      });

      // After successful subscription creation
      const metaResponse = await fetch("/api/meta-conversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customerEmail,
          name: customerName,
          phone: "",
          eventName: "Purchase",
          value: 195.0,
        }),
      });

      if (!metaResponse.ok) {
        console.error("Failed to send Meta conversion event");
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);

    // Send notification email about error
    await sendEmail({
      to: "info@directorsbox.co.uk",
      subject: "Webhook Error - Directors Box",
      html: `
        <h2 style="color: #d32f2f;">Webhook Error</h2>
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

    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
