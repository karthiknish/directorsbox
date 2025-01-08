"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinThanks() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You for Joining!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We're excited to have you as part of our community. You'll receive a
            confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
