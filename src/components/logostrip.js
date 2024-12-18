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
      src: "https://profici.co.uk/wp-content/uploads/2024/12/584825d2cef1014c0b5e49d6-1.png",
      alt: "Barclays Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Stussy-Logo.png",
      alt: "Stussy Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/apple-logo-transparent.png",
      alt: "Apple Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Electronic-Arts-Logo-2006-present.png",
      alt: "EA Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/espn.png",
      alt: "ESPN Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Netflix-Symbol.png",
      alt: "Netflix Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/samsung.png",
      alt: "Samsung Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/british-airways-logo-1997.jpg",
      alt: "British Airways Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/talkSPORT_stacked_small.jpg",
      alt: "TalkSport Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Swatch-Logo.png",
      alt: "Swatch Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Outlook-Emirates.png",
      alt: "Emirates Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-Ogilvy_logo.svg_.png",
      alt: "Ogilvy Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/saatchi-and-saatchi-logo-vector.png",
      alt: "Saatchi Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/chumbak.jpg",
      alt: "Chumbak Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Unilever-SVG-to-PNG.png",
      alt: "Unilever Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/2560px-Tata_Consultancy_Services_Logo.svg_.png",
      alt: "TCS Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/aolf_logo_1.png",
      alt: "AOLF Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-Google_2015_logo.svg_.png",
      alt: "Google Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-Meta-Logo.png",
      alt: "Meta Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/1200px-GSK_logo_2014.svg_.png",
      alt: "GSK Logo",
    },
    {
      src: "https://profici.co.uk/wp-content/uploads/2024/12/Marriott-International-Logo-2016-present-scaled.jpg",
      alt: "Marriott Logo",
    },
  ];

  return (
    <motion.div
      className="w-full overflow-hidden bg-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
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
          <motion.div
            key={index}
            className="flex-shrink-0 w-32 md:w-40 h-20 relative"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            <motion.img
              src={logo.src}
              alt={logo.alt}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: (index * 0.1) % 1, // Stagger effect that repeats every 10 logos
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LogoStrip;
