"use client";
import { Button } from "../components/ui/button";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableCard from "../components/expandcard";
import VideoReel from "../components/reel";
import Pdf from "../components/pdf";
import { sendGTMEvent } from "@next/third-parties/google";
export default function Home() {
  const [playingStates, setPlayingStates] = useState({
    mainVideo: false,
    video1: false,
    video2: false,
    video3: false,
  });
  const playerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const cards = [
    {
      title: "Donna Scully",
      description: "Director, Carpenters Group",
      ctaText: "Learn More",
      src: "https://profici.co.uk/wp-content/uploads/2024/11/Donna-Scully-Business-Breakfast.jpg",
      content: () => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          A business breakfast featuring Donna Scully, joint Owner/Director at
          Carpenters Group - one of the UK's leading providers of insurance and
          legal services. With 30 years of industry experience, Donna was
          recently recognised as one of Insurance Business UK's Elite Women 2023
          and secured a place as one of only 13 UK representatives on their
          global 100 list. During this session, she shared valuable insights
          from her remarkable career and provided expert advice for business
          growth and success.
        </motion.p>
      ),
    },
    {
      title: "Paul Smith Jr",
      description: "Former British Super Middleweight Champion",
      ctaText: "Learn More",
      src: "https://profici.co.uk/wp-content/uploads/2024/11/Paul-Smith-Directors-Box.png",
      content: () => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          A business breakfast featuring Paul Smith Jnr, a former British Super
          Middleweight Champion with an impressive career from 2003 to 2017.
          Paul claimed the British super-middleweight title twice and challenged
          for the WBO super-middleweight title, facing the division's top
          fighters. With a formidable 58% knockout percentage across his career,
          Paul dominated his opponents through technical skill and raw power.
          Known for his resilience and tenacity in the ring, Paul shared
          valuable insights from his remarkable journey in professional boxing
          and provided expert advice on achieving success through determination
          and perseverance.
        </motion.p>
      ),
    },
    {
      title: "Matt Lumb",
      description: "Former CEO, Tangle Teezer & Warpaint For Men",
      ctaText: "Learn More",
      src: "https://profici.co.uk/wp-content/uploads/2022/04/Matt-Lumb-img.jpg",
      content: () => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          A business breakfast featuring Matt Lumb, an accomplished CEO with a
          proven track record of scaling businesses from startups to
          multi-million-pound enterprises. As the former CEO of Tangle Teezer
          and Warpaint For Men, Matt brings invaluable insights into business
          growth, leadership, and successful scaling strategies. During this
          session, he shared his extensive experience in transforming innovative
          ideas into thriving businesses and navigating the challenges of rapid
          business expansion.
        </motion.p>
      ),
    },
    {
      title: "Dan Abrahams",
      description: "Elite Sport Psychologist",
      ctaText: "Learn More",
      src: "https://profici.co.uk/wp-content/uploads/2024/11/Dan-Abrahams-Sports-Psychologist-1.jpg",
      content: () => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          A business breakfast featuring Dan Abrahams, one of the UK's leading
          Sport Psychologists. Dan works with individuals, teams, coaches and
          organisations globally, including mentoring football superstar Jude
          Bellingham. Known for demystifying sport psychology and creating
          simple-to-use performance techniques, Dan is the author of four
          best-selling sport psychology books and founder of both the Dan
          Abrahams Soccer Academy and The Sport Psych Show podcast. During this
          session, he shared insights from his extensive experience working with
          elite athletes and how these principles can be applied to business
          success.
        </motion.p>
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

  const handlePlayPause = (videoId) => {
    setPlayingStates((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <motion.div
      className="min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <main className="container mx-auto space-y-16">
        <motion.div
          className="flex flex-col items-center gap-8 py-12 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div className="text-center" variants={fadeIn}>
            <motion.h1
              className="text-4xl md:text-4xl font-bold leading-tight text-gray-900 mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discreet. Confidential. Exclusive
            </motion.h1>
          </motion.div>

          <motion.div
            className="relative w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {!isMobile ? (
                <ReactPlayer
                  url="https://profici.co.uk/wp-content/uploads/2024/11/Directors-Box-Landing.mp4"
                  width="100%"
                  height="100%"
                  ref={playerRef}
                  playing={playingStates.mainVideo}
                  controls={false}
                />
              ) : (
                <ReactPlayer
                  url="https://profici.co.uk/wp-content/uploads/2024/11/Directors-Box-Mobile.mp4"
                  width="100%"
                  height="100%"
                  ref={playerRef}
                  playing={playingStates.mainVideo}
                  controls={false}
                />
              )}
              <motion.button
                className={`absolute inset-0 flex items-center justify-center ${
                  playingStates.mainVideo ? "bg-black/0" : "bg-black/30"
                } hover:bg-black/40 transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause("mainVideo");
                }}
                whileTap={{ scale: 0.95 }}
              >
                {playingStates.mainVideo ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </motion.svg>
                ) : (
                  <>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-12 z-10 h-12"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                      />
                    </motion.svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl z-10 text-center"
            variants={fadeIn}
          >
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Born from the realisation that Traditional Networking Events fall
              short, The Directors Box is an Exclusive Private Members' Club
              created for Ambitious Business Leaders, offering a Sophisticated
              Platform where Genuine Value, Meaningful Connections, and
              Impactful Results converge.
              <br /> Experience a New Standard in Community Building—designed to
              elevate your Professional Success.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-fit"
                  data-scroll-trigger="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href =
                      "https://buy.stripe.com/dR63fIdWicIwf8A7ss";
                  }}
                >
                  Apply for Membership
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.section
          className="py-24 bg-gray-50 rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Exclusive Member Benefits
              <span className="block text-xl mt-2 text-gray-600">
                Included in your £2,000 monthly membership
              </span>
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">VIP Events</h3>
                </div>
                <p className="text-gray-600">
                  Access exclusive private events including business breakfasts,
                  networking dinners, and VIP sporting events. Connect with
                  fellow business leaders in intimate settings designed for
                  meaningful relationship building.
                </p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">Concierge Service</h3>
                </div>
                <p className="text-gray-600">
                  Access exclusive concierge services including priority
                  restaurant reservations, luxury travel planning, wealth
                  advisory, and property investment consultation. Our dedicated
                  team ensures white-glove service and privileged access across
                  all offerings.
                </p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">C-Suite Repository</h3>
                </div>
                <p className="text-gray-600">
                  Get Exclusive access to Our C-suite worth £1500 for free. Gain
                  insights from seasoned industry veterans with a proven track
                  record of success. Enjoy 4 high-level business consultancy and
                  integration sessions with our network of distinguished CFOs,
                  CEOs, and CMOs.
                </p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-800"
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
                  <h3 className="text-xl font-bold">Strategic Partnerships</h3>
                </div>
                <p className="text-gray-600">
                  Connect with like-minded business owners through our strategic
                  partnership program. We facilitate meaningful connections
                  between complementary businesses, enabling joint ventures and
                  resource sharing. Access our network of vetted business
                  leaders to create opportunities for growth.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="py-12  rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Past Spotlight Events
            </motion.h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              We regularly host exclusive business breakfasts and networking
              events featuring accomplished industry leaders. Our past speakers
              include senior executives from leading insurance and legal
              services firms, professional athletes, and other successful
              business leaders across various sectors. These intimate events
              provide valuable insights, expert advice, and networking
              opportunities for our members.
            </p>
            <ExpandableCard cards={cards} />
          </div>
        </motion.section>

        <motion.section
          className="2xl:py-24 py-12 bg-white rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose The{" "}
              <span className="font-mango text-5xl md:text-7xl font-normal">
                DirectorsBox
              </span>
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Strategic Advisory</h3>
                <p className="text-gray-600">
                  Access our elite panel of industry veterans and thought
                  leaders who provide personalised guidance to optimise your
                  business strategy
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              </motion.div>
            </motion.div>
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
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Your Journey from Membership
            </motion.h2>
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 md:left-1/2" />

              <div className="space-y-12">
                <motion.div className="relative grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-16">
                    <motion.div
                      className="bg-white p-8 rounded-xl shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-4">
                        Founder Introduction
                      </h3>
                      <p className="text-gray-600">
                        Begin with a personal induction call with our founder.
                        This is your opportunity to share your business journey,
                        discuss your goals, and understand how The DirectorsBox
                        can accelerate your success. We'll ensure there's a
                        perfect fit between your aspirations and our community.
                      </p>
                    </motion.div>
                  </div>
                  <div className="hidden md:block" />
                  {/* Circle marker */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-sm">1</span>
                  </div>
                </motion.div>

                <motion.div className="relative grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="hidden md:block" />
                  <div className="md:pl-16">
                    <motion.div
                      className="bg-white p-8 rounded-xl shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-4">C-Suite Access</h3>
                      <p className="text-gray-600">
                        Upon acceptance, gain direct access to our network of
                        distinguished C-suite executives, successful
                        entrepreneurs and industry leaders. Benefit from regular
                        one-on-one consultations, mentoring sessions, and
                        strategic guidance from experienced business veterans
                        who have built and scaled successful companies.
                      </p>
                    </motion.div>
                  </div>
                  {/* Circle marker */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-sm">2</span>
                  </div>
                </motion.div>

                <motion.div className="relative grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-16">
                    <motion.div
                      className="bg-white p-8 rounded-xl shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-4">
                        Exclusive Events
                      </h3>
                      <p className="text-gray-600">
                        Start receiving invitations to our exclusive member-only
                        events, including intimate business breakfasts with
                        industry leaders, strategic networking sessions, and
                        expert-led workshops. Each event is carefully designed
                        to deliver maximum value and foster meaningful
                        connections.
                      </p>
                    </motion.div>
                  </div>
                  <div className="hidden md:block" />
                  {/* Circle marker */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-sm">3</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <motion.div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Voices of Success
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Step into the world of Directors Box through the eyes of our
            members. Real stories, real impact, real transformation.
          </motion.p>
        </motion.div>
        <VideoReel
          videos={[
            "https://profici.co.uk/wp-content/uploads/2024/11/DMR-Event-Video-1.mp4",
            "https://profici.co.uk/wp-content/uploads/2024/11/Jamie-DB-Event-Testimonial-1.mp4",
            "https://profici.co.uk/wp-content/uploads/2024/11/DMR-Event-1-CC-1-1.mp4",
          ]}
          posters={[
            "https://profici.co.uk/wp-content/uploads/2024/11/Alisha-Thumb.png",
            "https://profici.co.uk/wp-content/uploads/2024/11/dan-summers-thumb.png",
            "https://profici.co.uk/wp-content/uploads/2024/11/Daniel-Thumb.png",
          ]}
        />
        <Pdf />
        <motion.section
          id="consultation"
          className="py-24 bg-black text-white rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Join The Directors Box
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Take the first step towards joining an exclusive community of
              successful business owners. You can apply to see if you qualify
              for membership in this carefully curated group.
            </motion.p>
            <motion.p
              className="text-gray-400 mb-12 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Limited membership spots available - Apply today
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {showButton && (
                  <>
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => {
                        sendGTMEvent({ event: "enquire_button_click" });
                        setShowButton(false);
                      }}
                    >
                      Enquire Now
                    </Button>
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => {
                        sendGTMEvent({ event: "payment_button_click" });
                        setShowButton(false);
                        window.location.href =
                          "https://buy.stripe.com/dR63fIdWicIwf8A7ss";
                      }}
                    >
                      Join Today for £195
                    </Button>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {!showButton && (
                <motion.div
                  className="gfiframe bg-white border border-gray-200 rounded-xl relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe
                    src={`//profici.co.uk/gfembed/?f=10${window.location.search}`}
                    width="100%"
                    height="900px"
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
