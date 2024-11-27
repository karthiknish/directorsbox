"use client";
import { Button } from "../components/ui/button";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import ExpandableCard from "../components/expandcard";
import Image from "next/image";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const cards = [
    {
      title: "Monthly Expert Sessions",
      description:
        "Learn from seasoned entrepreneurs who share their experiences",
      ctaText: "Learn More",
      src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: () => (
        <p>
          Learn from seasoned entrepreneurs who share both their successes and
          failures - get the real story behind building successful businesses.
        </p>
      ),
    },
    {
      title: "Strategic Partnerships",
      description: "Connect with like-minded business owners",
      ctaText: "Learn More",
      src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: () => (
        <p>
          Connect with like-minded business owners to strengthen and grow your
          business through collaborative opportunities.
        </p>
      ),
    },
    {
      title: "Private Events",
      description: "Access exclusive networking events",
      ctaText: "Learn More",
      src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: () => (
        <p>
          Access exclusive events closed to the public, creating opportunities
          to connect with fellow business leaders in meaningful ways.
        </p>
      ),
    },
    {
      title: "C-Suite Access",
      description: "Consult with experienced executives",
      ctaText: "Learn More",
      src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: () => (
        <p>
          Up to 4 monthly consultation meetings with experienced CFOs, CMOs, and
          CEOs to help guide your business decisions.
        </p>
      ),
    },
  ];
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const scrollToConsultation = () => {
    document
      .getElementById("consultation")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto space-y-16">
        <motion.div
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div className="text-center" variants={fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-2">
              <span className="font-mango text-gray-700 font-normal text-4xl md:text-7xl mt-2">
                DirectorsBox{" "}
                <span className="font-normal font-sans text-xl text-gray-500 ">
                  By Profici
                </span>
              </span>
              <br />
              <br /> Not Just Another Networking Group
            </h1>
          </motion.div>

          <motion.div
            className="relative w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              {!isMobile ? (
                <ReactPlayer
                  url="https://profici.co.uk/wp-content/uploads/2024/11/Revitalize-Business-Networking.mp4"
                  width="100%"
                  height="100%"
                  ref={playerRef}
                  playing={playing}
                  controls={false}
                />
              ) : (
                <ReactPlayer
                  url="https://profici.co.uk/wp-content/uploads/2024/11/Revitalize-Business-Networking-1.mp4"
                  width="100%"
                  height="100%"
                  ref={playerRef}
                  playing={playing}
                  controls={false}
                />
              )}
              <button
                className={`absolute inset-0 flex items-center justify-center ${
                  playing ? "bg-black/0" : "bg-black/30"
                } hover:bg-black/40 transition-colors`}
                onClick={handlePlayPause}
              >
                {playing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl z-10 text-center"
            variants={fadeIn}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Born from 15 years of networking experience, The Director's Box is
              an exclusive private members club designed specifically for
              ambitious business owners. We're different because we understand
              that traditional networking isn't enough - you need real value,
              real connections, and real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button
                size="lg"
                className="w-fit"
                onClick={scrollToConsultation}
              >
                Apply for Membership
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.section
          className="py-24 bg-gray-50 rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Exclusive Member Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Monthly Expert Sessions
                </h3>
                <p className="text-gray-600">
                  Learn from seasoned entrepreneurs who share both their
                  successes and failures - get the real story behind building
                  successful businesses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Private Events</h3>
                <p className="text-gray-600">
                  Access exclusive events closed to the public, creating
                  opportunities to connect with fellow business leaders in
                  meaningful ways.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">C-Suite Access</h3>
                <p className="text-gray-600">
                  Up to 4 monthly consultation meetings with experienced CFOs,
                  CMOs, and CEOs to help guide your business decisions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Strategic Partnerships
                </h3>
                <p className="text-gray-600">
                  Connect with like-minded business owners to strengthen and
                  grow your business through collaborative opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section className="py-24 bg-white rounded-3xl">
          <div className="max-w-4xl mx-auto px-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Explore Our Benefits
            </h2>
          </div>
          <ExpandableCard cards={cards} />
        </motion.section>
        <motion.section
          className="py-24 bg-white rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why Choose The Director's Box?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Curated Network</h3>
                <p className="text-gray-600">
                  Carefully selected members ensuring meaningful connections and
                  collaborations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Results</h3>
                <p className="text-gray-600">
                  Structured networking designed to generate immediate business
                  opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Exclusive Access</h3>
                <p className="text-gray-600">
                  Premium resources and opportunities not available elsewhere
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-24 bg-gray-50 rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How We're Different
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Curated Membership</h3>
                <p className="text-gray-600">
                  We carefully select members to ensure a balanced mix of
                  industries and expertise levels. This creates an environment
                  where meaningful connections can flourish.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Structured Networking
                </h3>
                <p className="text-gray-600">
                  Our events follow a proven format that maximizes valuable
                  interactions. No more awkward small talk - just focused,
                  productive conversations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Ongoing Support</h3>
                <p className="text-gray-600">
                  Beyond events, members receive year-round support through our
                  online platform, resource library, and dedicated relationship
                  managers.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Measurable Results</h3>
                <p className="text-gray-600">
                  We track and measure the success of connections made, ensuring
                  that your membership delivers real business value and ROI.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="consultation"
          className="py-24 bg-black text-white rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Join The Director's Box
            </h2>
            <p className="text-gray-300 mb-6">
              Take the first step towards joining an exclusive community of
              successful business owners. Apply now to see if you qualify for
              membership in this carefully curated group.
            </p>
            <p className="text-gray-400 mb-12 text-sm">
              Limited membership spots available - Apply today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {showButton && (
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => setShowButton(false)}
                >
                  Apply Now
                </Button>
              )}
            </div>
            {!showButton && (
              <div className="gfiframe bg-white border border-gray-200 rounded-xl relative">
                <iframe
                  src="//profici.co.uk/gfembed/?f=1"
                  width="100%"
                  height="600px"
                  frameBorder="0"
                  className="gfiframe"
                  onLoad={(e) => e.target.classList.add("loaded")}
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 iframe-loading">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                </div>
                <style jsx>{`
                  .iframe-loading {
                    opacity: 1;
                  }
                  .loaded + .iframe-loading {
                    opacity: 0;
                    pointer-events: none;
                  }
                `}</style>
              </div>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
