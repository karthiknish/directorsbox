import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
  "Feedback-ID": "CANCEL:directorsbox:transactional",
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
            ${html}
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
              <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
              <p>Directors Box | <a href="https://directorsbox.co.uk" style="color: #000; text-decoration: underline;">directorsbox.co.uk</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: html.replace(/<[^>]*>/g, ""),
  });
}

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

    // Get all active subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 100,
    });

    console.log("Found active subscriptions:", subscriptions.data);

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "No active subscriptions found for this customer" },
        { status: 404 }
      );
    }

    // Cancel all active subscriptions except the most recent one
    if (subscriptions.data.length > 1) {
      const [latestSubscription, ...olderSubscriptions] = subscriptions.data;

      // Immediately cancel older subscriptions
      for (const sub of olderSubscriptions) {
        await stripe.subscriptions.cancel(sub.id);
      }

      // Continue with the latest subscription
      if (latestSubscription.cancel_at_period_end) {
        return NextResponse.json(
          {
            error: "Latest subscription is already scheduled for cancellation",
          },
          { status: 400 }
        );
      }

      // Cancel the latest subscription at period end
      const subscription = await stripe.subscriptions.update(
        latestSubscription.id,
        {
          cancel_at_period_end: true,
        }
      );

      // Send cancellation confirmation email to customer
      await sendEmail({
        to: email,
        subject: "Subscription Cancellation Confirmation - Directors Box",
        html: `
          <h2 style="color: #333; text-align: center;">Subscription Cancellation Confirmation</h2>
          
          <p style="color: #666;">Dear ${
            customer.name || "Valued Customer"
          },</p>
          
          <p style="color: #666;">We're sorry to see you go. This email confirms that your Directors Box subscription has been scheduled for cancellation.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Cancellation Details:</h3>
            <ul style="color: #666; list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Your subscription will remain active until: ${new Date(
                subscription.current_period_end * 1000
              ).toLocaleDateString("en-GB")}</li>
              <li style="margin-bottom: 10px;">• You will continue to have full access until this date</li>
              <li style="margin-bottom: 10px;">• No further payments will be taken after this date</li>
            </ul>
          </div>
          
          <p style="color: #666;">If you change your mind or have any questions, please contact us at info@directorsbox.co.uk</p>
        `,
      });

      // Send notification to admin
      await sendEmail({
        to: "info@directorsbox.co.uk",
        subject: "Subscription Cancellation Notice - Directors Box",
        html: `
          <h2 style="color: #333;">Subscription Cancellation Notice</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Customer Name:</strong> ${customer.name || "N/A"}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Subscription ID:</strong> ${subscription.id}</p>
            <p><strong>Current Period End:</strong> ${new Date(
              subscription.current_period_end * 1000
            ).toLocaleString("en-GB")}</p>
            <p><strong>Cancellation Date:</strong> ${new Date().toLocaleString(
              "en-GB"
            )}</p>
            <p><strong>Note:</strong> Multiple active subscriptions were found and older ones were cancelled immediately.</p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        message:
          "All subscriptions handled - latest subscription scheduled for cancellation",
        data: {
          cancelAt: subscription.cancel_at,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
          cancelledOlder: olderSubscriptions.length,
        },
      });
    } else {
      // Handle single subscription case
      const subscription = subscriptions.data[0];

      if (subscription.cancel_at_period_end) {
        return NextResponse.json(
          { error: "Subscription is already scheduled for cancellation" },
          { status: 400 }
        );
      }

      const updatedSubscription = await stripe.subscriptions.update(
        subscription.id,
        {
          cancel_at_period_end: true,
        }
      );

      // Send cancellation confirmation email to customer
      await sendEmail({
        to: email,
        subject: "Subscription Cancellation Confirmation - Directors Box",
        html: `
          <h2 style="color: #333; text-align: center;">Subscription Cancellation Confirmation</h2>
          
          <p style="color: #666;">Dear ${
            customer.name || "Valued Customer"
          },</p>
          
          <p style="color: #666;">We're sorry to see you go. This email confirms that your Directors Box subscription has been scheduled for cancellation.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Cancellation Details:</h3>
            <ul style="color: #666; list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Your subscription will remain active until: ${new Date(
                updatedSubscription.current_period_end * 1000
              ).toLocaleDateString("en-GB")}</li>
              <li style="margin-bottom: 10px;">• You will continue to have full access until this date</li>
              <li style="margin-bottom: 10px;">• No further payments will be taken after this date</li>
            </ul>
          </div>
          
          <p style="color: #666;">If you change your mind or have any questions, please contact us at info@directorsbox.co.uk</p>
        `,
      });

      // Send notification to admin
      await sendEmail({
        to: "info@directorsbox.co.uk",
        subject: "Subscription Cancellation Notice - Directors Box",
        html: `
          <h2 style="color: #333;">Subscription Cancellation Notice</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Customer Name:</strong> ${customer.name || "N/A"}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Subscription ID:</strong> ${updatedSubscription.id}</p>
            <p><strong>Current Period End:</strong> ${new Date(
              updatedSubscription.current_period_end * 1000
            ).toLocaleString("en-GB")}</p>
            <p><strong>Cancellation Date:</strong> ${new Date().toLocaleString(
              "en-GB"
            )}</p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        message: "Subscription scheduled for cancellation",
        data: {
          cancelAt: updatedSubscription.cancel_at,
          currentPeriodEnd: updatedSubscription.current_period_end,
          status: updatedSubscription.status,
        },
      });
    }
  } catch (error) {
    console.error("Cancellation error details:", error);

    // Send error notification to admin
    await sendEmail({
      to: "info@directorsbox.co.uk",
      subject: "Subscription Cancellation Error - Directors Box",
      html: `
        <h2 style="color: #d32f2f;">Error Cancelling Subscription</h2>
        <div style="background: #ffebee; padding: 20px; border-radius: 5px;">
          <p><strong>Error Message:</strong> ${error.message}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-GB")}</p>
          <p><strong>Stack Trace:</strong></p>
          <pre style="background: #fff; padding: 10px; border-radius: 3px;">${
            error.stack
          }</pre>
        </div>
      `,
    });

    return NextResponse.json(
      {
        error: "Failed to cancel subscription",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
