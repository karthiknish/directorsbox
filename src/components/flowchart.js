"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Calendar,
  Users,
  Briefcase,
  Megaphone,
  Building2,
  HeartHandshake,
} from "lucide-react";

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

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-6" : "flex-row"
        } items-center justify-center`}
      >
        {/* Initial Decision */}
        <motion.div
          className="flex items-center bg-black text-white rounded-lg p-4 w-48 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span>Decision to Join Directors Box</span>
        </motion.div>

        {/* Arrow or Spacer */}
        {!isMobile ? (
          <motion.div
            className="flex items-center mx-4"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center my-2"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        )}

        {/* Joining Fee */}
        <motion.div
          className="flex items-center gap-2 bg-black text-white rounded-lg p-4 w-48 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span>One-time Joining Fee £195</span>
        </motion.div>

        {/* Arrow or Spacer */}
        {!isMobile ? (
          <motion.div
            className="flex items-center mx-4"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center my-2"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        )}

        {/* Monthly Fee */}
        <motion.div
          className="flex items-center gap-2 bg-black text-white rounded-lg p-4 w-48 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <span>Monthly Fee £2000</span>
        </motion.div>

        {/* Arrow to Benefits */}
        {!isMobile ? (
          <motion.div
            className="flex items-center mx-4"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center my-2"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        )}

        {/* Benefits Section */}
        <div className={`${isMobile ? "mt-6" : "ml-12"}`}>
          <div className="grid grid-cols-1 gap-4">
            {[
              { text: "Luxury Monthly Events", icon: Calendar },
              { text: "Networking Opportunities", icon: Users },
              {
                text: "Business Consultations with C-suite Executives",
                icon: Briefcase,
              },
              { text: "Access to Keynote Speakers", icon: Megaphone },
              { text: "Award-winning Business Consultancy", icon: Building2 },
              { text: "Bespoke Concierge Services", icon: HeartHandshake },
            ].map(({ text, icon: Icon }, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-black text-white rounded-lg p-4 w-64"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
