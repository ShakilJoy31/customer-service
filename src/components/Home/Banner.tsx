"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import backgroundImage from "@/assets/Home/background-image.jpg";
import { FaWhatsapp, FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { WiMoonAltNew } from "react-icons/wi";
import { useState, useEffect } from "react";

interface CustomerData {
  whatsApp: string;
  messenger: string;
  telegram: string;
  imo: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  hover: {
    y: -8,
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
};

export default function HomeBanner() {
  const [publicData, setPublicData] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://customer-service-server-theta.vercel.app/get-customer')
      .then(res => res.json())
      .then((data: CustomerData[]) => {
        if (data && data.length > 0) {
          // Use the first customer data (or you can implement logic to get the latest)
          setPublicData(data[0]);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSocialRedirect = (platform: string) => {
    if (!publicData) return;

    const urls = {
      whatsapp: `https://wa.me/${publicData.whatsApp}`,
      messenger: `https://m.me/${publicData.messenger}`,
      telegram: `https://t.me/${publicData.telegram}`,
      imo: `https://imo.im/${publicData.imo}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-5xl font-bold text-white leading-snug"
        >
          আপনাকে স্বাগতম বাংলাদেশের সবচেয়ে বড় ই-ব্যাংকিং প্ল্যাটফর্মে।
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
          className="text-white/90 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        >
          HSBC পরিচালিত ই-ব্যাংকিং ব্যবস্থা একটি নিরাপদ, দ্রুত, সহজ এবং দক্ষ অনলাইন সেবা, যা গ্রাহকদের তাদের ব্যাংক অ্যাকাউন্টে যেকোনো সময়, যেকোনো স্থান থেকে অ্যাক্সেসের সুবিধা প্রদান করে।
        </motion.p>

        {/* Social Media Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 px-4"
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2, staggerChildren: 0.1 }}
        >
          {/* WhatsApp Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer group"
            onClick={() => handleSocialRedirect('whatsapp')}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors duration-300">
                <FaWhatsapp className="text-3xl text-green-400" />
              </div>
              <h3 className="text-white font-medium mt-3">WhatsApp</h3>
              <p className="text-white/70 text-sm mt-1">Message us directly</p>
              {isLoading && (
                <div className="mt-2 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </motion.div>

          {/* Messenger Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer group"
            onClick={() => handleSocialRedirect('messenger')}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                <FaFacebookMessenger className="text-3xl text-blue-400" />
              </div>
              <h3 className="text-white font-medium mt-3">Messenger</h3>
              <p className="text-white/70 text-sm mt-1">Chat with us on FB</p>
              {isLoading && (
                <div className="mt-2 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </motion.div>

          {/* Telegram Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer group"
            onClick={() => handleSocialRedirect('telegram')}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-blue-400/20 group-hover:bg-blue-400/30 transition-colors duration-300">
                <FaTelegram className="text-3xl text-blue-300" />
              </div>
              <h3 className="text-white font-medium mt-3">Telegram</h3>
              <p className="text-white/70 text-sm mt-1">Join our channel</p>
              {isLoading && (
                <div className="mt-2 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </motion.div>

          {/* IMO Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer group"
            onClick={() => handleSocialRedirect('imo')}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                <WiMoonAltNew className="text-3xl text-purple-400" />
              </div>
              <h3 className="text-white font-medium mt-3">IMO</h3>
              <p className="text-white/70 text-sm mt-1">Connect with us</p>
              {isLoading && (
                <div className="mt-2 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}