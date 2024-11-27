"use client";

import { motion } from "framer-motion";

export default function BrochurePage() {
  return (
    <motion.div
      className="min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <main className="container mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Thank You for Your Interest in DirectorsBox
          </h1>
          <p className="text-gray-600 text-lg">
            Please view our exclusive brochure below to learn more about our
            premium networking opportunities.
          </p>
        </motion.div>
        <motion.div
          className="w-full h-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <iframe
            src="https://profici.co.uk/wp-content/uploads/2024/11/Directors-Box-Brochure.pdf"
            className="w-full h-full rounded-lg shadow-lg"
            style={{ border: "none" }}
          />
        </motion.div>
      </main>
    </motion.div>
  );
}
