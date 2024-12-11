"use client";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full py-6 z-10 relative bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-40" /> {/* Spacer */}
        <Link
          href="https://directorsbox.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mx-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
        >
          <span
            className="font-mango text-gray-700 font-normal text-5xl  mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            DirectorsBox{" "}
          </span>
          <span className="text-xs font-sans text-gray-500"> By Profici</span>
        </Link>
        <div className="w-40" /> {/* Spacer */}
      </div>
    </header>
  );
};

export default Header;
