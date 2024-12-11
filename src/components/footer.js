"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
          &copy; {currentYear}{" "}
          <a href="https://profici.co.uk" className="hover:underline">
            Profici
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
