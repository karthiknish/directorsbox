"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
const Header = () => {
  return (
    <header className="w-full py-12 z-10 relative bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-40" /> {/* Spacer */}
        <Link
          href="https://directorsbox.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mx-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
        >
          <Image src="/logo.svg" alt="DirectorsBox" width={200} height={200} />
        </Link>
        <div className="w-40" /> {/* Spacer */}
      </div>
    </header>
  );
};

export default Header;
