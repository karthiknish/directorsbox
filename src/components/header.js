"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "https://profici.co.uk/about/", label: "ABOUT" },
    { href: "https://profici.co.uk/team/", label: "TEAM" },
    { href: "https://profici.co.uk/profici-podcast/", label: "PODCAST" },
    { href: "https://profici.co.uk/contact/", label: "CONTACT" },
  ];

  return (
    <header className="w-full py-6 z-10 relative bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <nav className="hidden md:flex items-center space-x-40">
          {menuItems.slice(0, 2).map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://profici.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mx-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
        >
          <Image
            src="https://profici.co.uk/wp-content/themes/proficinew/assets/images/Proficiblack.svg"
            alt="Profici Logo"
            width={150}
            height={38}
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-40">
          {menuItems.slice(2).map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 flex flex-col items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black hover:text-gray-600 py-2 px-4 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
