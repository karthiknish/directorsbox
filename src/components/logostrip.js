"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LogoStrip = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logos = [
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-Chelsea_FC.svg_.png",
      alt: "Chelsea FC Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-Procter__Gamble_logo.svg_.png",
      alt: "P&G Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Nike-Logo.png",
      alt: "Nike Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Outlook-doddle-log.jpg",
      alt: "Outlook Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Outlook-OH-Consul.jpg",
      alt: "OH Consul Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/E68CF079-6D16-4EAE-A9E2A2A08D08AC3B_Wauto_H300.png",
      alt: "PwC Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Screenshot-2024-12-17-at-11.56.35 AM.png",
      alt: "Prosper Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/BNI-logo-1.png",
      alt: "BNI Logo",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <motion.div
        className="flex space-x-8 md:space-x-16"
        animate={{
          x: isMobile ? [0, -1000] : [0, -2000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-32 md:w-40 h-20 relative">
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoStrip;
