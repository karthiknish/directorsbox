"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinThanks() {
  return (
    <main className="min-h-screen bg-white">
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose max-w-none"
          >
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome to{" "}
                <span className="font-mango text-6xl md:text-7xl font-normal block mt-2">
                  DirectorsBox
                </span>
              </h1>
            </header>

            <div className="space-y-6 mb-12">
              <p className="text-gray-600">Hey,</p>

              <p className="text-gray-600 font-medium text-lg">
                Welcome to The Directors Box!
              </p>

              <p className="text-gray-600">
                We are thrilled to have you on board as a valued member of our
                exclusive, discreet private members group. Our mission is to
                help business owners like yourself connect with like-minded
                individuals, fostering meaningful relationships and
                collaborations.
              </p>

              <p className="text-gray-600">
                We'd love to get to know more about you and your business needs,
                as well as explore how we can support your goals. Additionally,
                we're excited to share details about our upcoming events and
                opportunities tailored to our members.
              </p>

              <div className="py-4">
                <p className="text-gray-600 mb-4">
                  To arrange a call with myself and our Managing Director,
                  Anthony O'Brien please use the link below to book a time that
                  works for you:
                </p>

                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    <Link
                      href="https://calendly.com/profici-/60min"
                      className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Book a call with Anthony O'Brien
                    </Link>
                  </motion.div>
                </div>
              </div>

              <p className="text-gray-600">
                We look forward to speaking with you and helping you make the
                most of your membership with The Directors Box.
              </p>

              <div className="pt-4">
                <p className="text-gray-600">
                  Best regards,
                  <br />
                  <span className="font-medium">Sophie</span>
                </p>
              </div>
            </div>

            <footer className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="https://directorsbox.co.uk"
                  className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Return to Homepage
                </Link>
              </motion.div>
            </footer>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
