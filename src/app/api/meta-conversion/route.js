import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

if (!process.env.META_ACCESS_TOKEN || !process.env.META_PIXEL_ID) {
  throw new Error("Missing required Meta environment variables");
}

async function sendToMetaAPI(eventData) {
  const url = `https://graph.facebook.com/v17.0/${process.env.META_PIXEL_ID}/events`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [eventData],
      access_token: process.env.META_ACCESS_TOKEN,
    }),
  });

  return response.json();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, phone, eventName = "Lead", value = 0.0 } = body;

    const eventData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        em: [email ? hashData(email.toLowerCase()) : undefined],
        ph: [phone ? hashData(phone) : undefined],
        fn: [name ? hashData(name.split(" ")[0].toLowerCase()) : undefined],
        ln: [
          name
            ? hashData(name.split(" ").slice(1).join(" ").toLowerCase())
            : undefined,
        ],
      },
      custom_data: {
        currency: "GBP",
        value: value,
        content_name: "Directors Box Enquiry",
        content_category: "Membership",
        status: "initiated",
      },
    };

    const result = await sendToMetaAPI(eventData);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Meta Conversion API Error:", error);
    return NextResponse.json(
      { error: "Failed to send conversion event" },
      { status: 500 }
    );
  }
}

// Helper function to hash data (you should use a proper hashing function)
function hashData(data) {
  return CryptoJS.SHA256(data).toString();
}
