"use client";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  Car,
  ShoppingBag,
  GraduationCap,
  HeadphonesIcon,
  Headphones,
  PhoneCall,
  Stethoscope,
  Gem,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Perks({ scrollToConsultation }) {
  const perks = [
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Airport Lounge Access",
      description: "Complimentary access to premium airport lounges worldwide",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Car Rental",
      description: "Preferential rates on car rentals globally",
    },
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: "Concierge Service",
      description: "Premium concierge assistance",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Flight Discounts",
      description: "Special rates on business and first-class flights",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Oxford Courses",
      description: "Exclusive access to Oxford College courses",
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Boodles Experience",
      description: "Personalised shopping experience at Boodles",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Union 22 Experience",
      description: "Personalised shopping experience at Union 22",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Podcast Feature",
      description: "Opportunity to appear on The Profici Podcast",
    },
    {
      icon: <Hotel className="w-6 h-6" />,
      title: "Premium Hotels",
      description: "Exclusive discounts at luxury hotels and resorts",
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Private GP Access",
      description: "Private Same Day GP Appointments",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Retail Discounts",
      description: "Access to discounts across 1000+ premium retailers",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Business Mentoring",
      description: "Mentoring sessions with industry leaders",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] rounded-xl overflow-hidden"
          >
            <img
              src="https://profici.co.uk/wp-content/uploads/2024/12/Upload-Image-for-Sharpening.png"
              alt="Membership Benefits"
              className="object-cover w-full h-full rounded-xl"
            />
          </motion.div>

          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Membership Perks
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-black p-3 rounded-lg text-white">
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{perk.title}</h3>
                    <p className="text-gray-600 text-sm">{perk.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="flex justify-center mt-12">
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
                    scrollToConsultation();
                  }}
                >
                  Enquire Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
