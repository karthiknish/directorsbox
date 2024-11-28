"use client";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function ThankYou() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-6">
            Thank You for Your Application
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            We appreciate your interest in joining The Directors Box. Our
            membership committee will carefully review your application and
            contact you within the next few business days to discuss the next
            steps in the membership process.
          </p>

          <p className="text-gray-500 mb-12">
            While you wait, you're welcome to return to our homepage to learn
            more about our exclusive events and networking opportunities.
          </p>

          <Link className="z-10" href="https://directorsbox.co.uk/">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
