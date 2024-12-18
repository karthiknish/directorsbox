"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
const Header = () => {
  return (
    <motion.header
      className="w-full py-12 z-10 relative bg-white border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-40" /> {/* Spacer */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Link
            href="https://directorsbox.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 mx-4 md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <Image
              src="/logo.svg"
              alt="DirectorsBox"
              width={200}
              height={200}
            />
          </Link>
        </motion.div>
        <div className="w-40" /> {/* Spacer */}
      </div>
    </motion.header>
  );
};

export default Header;
