"use client";

import Image from "next/image";
import backgroundImage from "@/assets/Home/background-image.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaTelegram, FaCheck, FaSpinner } from "react-icons/fa";
import { WiMoonAltNew } from "react-icons/wi";
import { toast, Toaster } from "react-hot-toast";

interface CustomerData {
  whatsApp: string;
  messenger: string;
  telegram: string;
  imo: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CustomizeContact() {
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

  // Initialize formData with empty values, then update when publicData is available
  const [formData, setFormData] = useState({
    whatsapp: "",
    imo: "",
    messenger: "",
    telegram: ""
  });

  // Update formData when publicData changes
  useEffect(() => {
    if (publicData) {
      setFormData({
        whatsapp: publicData.whatsApp || "",
        imo: publicData.imo || "",
        messenger: publicData.messenger || "",
        telegram: publicData.telegram || ""
      });
    }
  }, [publicData]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Prepare the data in the required format
      const requestBody = {
        _id: publicData?._id || "68bc4a21a8749dafbf3c7d7e",
        whatsApp: formData.whatsapp,
        messenger: formData.messenger,
        telegram: formData.telegram,
        imo: formData.imo
      };

      console.log("Sending data:", requestBody);

      // Send PUT request to update contact information
      const response = await fetch("https://customer-service-server-theta.vercel.app/add-customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      
      // Show success message
      // toast.success("Contact information updated successfully!");
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error updating contact information:", error);
      toast.error("Failed to update contact information. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-white text-xl flex items-center">
            <FaSpinner className="animate-spin mr-3" />
            Loading contact information...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
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
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Update Contact Information
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Update your contact details so customers can reach you through your preferred platforms
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8"
        >
          {isSubmitted ? (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Successfully Updated!</h2>
              <p className="text-white/80">Your contact information has been updated.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* WhatsApp Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <FaWhatsapp className="w-5 h-5 text-green-400 mr-2" />
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              {/* IMO Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <WiMoonAltNew className="text-3xl text-purple-400 mr-2" />
                  IMO Number/Username
                </label>
                <input
                  type="text"
                  name="imo"
                  value={formData.imo}
                  onChange={handleInputChange}
                  placeholder="Your IMO username or number"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Messenger Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <FaFacebookMessenger className="w-5 h-5 text-blue-400 mr-2" />
                  Messenger ID
                </label>
                <input
                  type="text"
                  name="messenger"
                  value={formData.messenger}
                  onChange={handleInputChange}
                  placeholder="Your Messenger username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Telegram Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <FaTelegram className="w-5 h-5 text-blue-300 mr-2" />
                  Telegram Username
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="@yourusername"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-gradient-to-r from-cyan-600 hover:cursor-pointer to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isUpdating ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Updating...
                    </div>
                  ) : (
                    "Update Contact Information"
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-white/70 text-sm">
            We respect your privacy. Your information will only be used by customers to contact you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}