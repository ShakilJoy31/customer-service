"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import navbarLogo from "@/assets/Home/demo_logo.png";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../reusable-components/LanguageSwitcher";
import { motion, AnimatePresence, Variants } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/projects" },
  { name: "About Us", path: "/affiliate" },
  { name: "Login", path: "/login" },
  { name: "Terms & Condition", path: "/technology" },
];

export default function PublicNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Check if current path matches a nav link or is a subpath
  const isActiveLink = (linkPath: string) => {
    if (linkPath === "/") {
      return pathname === "/";
    }

    // For Projects - match /projects and /projects/project-details/*
    if (linkPath === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/project-details/");
    }

    // For Services - match /service and /service/service-details/*
    if (linkPath === "/service") {
      return pathname === "/service" || pathname.startsWith("/service/service-details/");
    }

    // For other links
    return pathname.startsWith(linkPath);
  };

  // Animation variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
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

  return (
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

        {/* Desktop Navigation */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center space-x-1"
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              variants={itemVariants}
              className="relative"
            >
              <Link
                href={link.path}
                className={`relative px-4 py-2 font-medium transition-colors duration-300 ${isActiveLink(link.path)
                  ? `${isScrolled ? 'text-black dark:text-white ' : 'text-white'} `
                  : `${isScrolled ? 'text-gray-800 dark:text-gray-300 hover:text-gray-600' : 'text-white'} `
                  }`}
              >
                {link.name}
                {isActiveLink(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? 'bg-black dark:bg-white' : 'bg-white'}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.nav>



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
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-md text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Contact Us
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
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
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
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden "
          >
            <div className="px-4 py-4 flex flex-col space-y-3 h-screen">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActiveLink(link.path)
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={mobileItemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: navLinks.length * 0.1 }}
                className=""
              >
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 rounded-lg text-black dark:text-white font-medium transition-all duration-300"
                >
                  Contact Us
                </Link>
              </motion.div>
              <div className="flex xs:hidden items-center justify-between pt-4 ">

                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}