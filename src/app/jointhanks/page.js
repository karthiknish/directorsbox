"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinThanks() {
  return (
    <main className="min-h-screen bg-white">
      <motion.section
        className="py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to{" "}
              <span className="font-mango text-6xl md:text-7xl font-normal">
                DirectorsBox
              </span>
            </h1>

            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Thank you for joining our community!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Your payment has been successfully processed. We're excited to
                have you as a member of DirectorsBox.
              </p>
              <p className="text-gray-600 text-lg">
                You will receive a welcome email shortly with further
                instructions.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://directorsbox.com"
                className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Return to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
