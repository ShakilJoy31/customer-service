"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import navbarLogo from "@/assets/Home/hsbc-logo.png";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { Menu, X, Eye, EyeOff, Lock } from "lucide-react";
import LanguageSwitcher from "../reusable-components/LanguageSwitcher";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function PublicNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProceed = () => {
    setIsLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      if (password === "iamsifat") {
        setShowModal(false);
        setPassword("");
        router.push("/customize-contact");
      } else {
        alert("Incorrect password. Please try again.");
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProceed();
    }
  };


  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    }
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 dark:bg-[#050117]/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent border-b border-transparent"
          } `}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push("/")}
            className="cursor-pointer flex-shrink-0 w-32 md:w-40"
          >
            <Image
              src={navbarLogo}
              alt="Logo"
              width={160}
              height={64}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Desktop Right Side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center space-x-4"
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-md text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Customize Contact
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex lg:hidden items-center space-x-3"
          >
            <div className="hidden xs:flex items-center space-x-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors ${isScrolled
                ? "text-gray-700 dark:text-gray-300"
                : "text-white"
                }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="transform transition-transform duration-300 rotate-90" />
              ) : (
                <Menu size={24} className="transform transition-transform duration-300" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col space-y-3">
                <motion.div
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  className="pt-2"
                >
                  <Button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-600 w-full to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-md text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    Customize Contact
                  </Button>
                </motion.div>
                <div className="flex xs:hidden items-center justify-between pt-4">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Password Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Authentication Required
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Please enter the password to access the customization panel
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button
                  onClick={handleProceed}
                  disabled={!password || isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </Button>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}