"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Flowchart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 py-8 overflow-x-auto"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className={`relative ${isMobile ? "min-w-full" : "min-w-[1000px]"}`}>
        {/* Timeline line and arrows */}
        {!isMobile && (
          <motion.div
            className="absolute left-0 right-0 top-[20px] flex items-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="h-0.5 bg-gray-200 flex-grow relative">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  style={{
                    left: `${(i + 1) * (100 / 6)}%`,
                  }}
                >
                  <div className="w-3 h-3 border-t-2 border-r-2 border-gray-200 transform rotate-45 translate-y-[-4px]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className={`relative ${
            isMobile ? "flex flex-col gap-8" : "flex gap-8"
          } mt-8`}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Step 1 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <span className="text-white text-2xl">DB</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Visit Directors Box</h3>
                <p className="text-gray-600">
                  Learn about our exclusive community and benefits
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Pay Joining Fee</h3>
                <p className="text-gray-600">One-time payment of £195</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Set Up Your Profile</h3>
                <p className="text-gray-600">
                  Tell us about your business and goals
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Schedule Welcome Meeting</h3>
                <p className="text-gray-600">
                  Meet with our team to discuss your goals
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Start Monthly Membership</h3>
                <p className="text-gray-600">£2000 monthly subscription</p>
              </div>
            </div>
          </motion.div>

          {/* Step 6 */}
          <motion.div
            className={`${isMobile ? "w-full" : "flex-1"}`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Attend Events</h3>
                <p className="text-gray-600">
                  Join exclusive networking events and workshops
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
