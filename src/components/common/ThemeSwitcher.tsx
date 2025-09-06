"use client";

import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useTheme } from "@/hooks/useThemeContext";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { translate } = useCustomTranslator();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  
  const itemVariants = {
    closed: { x: -10, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const iconVariants = {
    light: { rotate: 0, scale: 1 },
    dark: { rotate: 90, scale: 1.1 }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <motion.button
        onClick={toggleOpen}
        className="inline-flex items-center justify-center p-2 cursor-pointer rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <motion.div
          animate={theme === "dark" ? "dark" : "light"}
          variants={iconVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative w-5 h-5"
        >
          <Sun className="absolute inset-0 w-full h-full rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute inset-0 w-full h-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              <motion.button
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.1 }}
                className={`flex items-center w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:cursor-pointer ${
                  theme === "light" 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleThemeChange("light")}
              >
                <Sun className="w-4 h-4 mr-3" />
                {translate("লাইট", "Light")}
              </motion.button>

              <motion.button
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.15 }}
                className={`flex items-center w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:cursor-pointer ${
                  theme === "dark" 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleThemeChange("dark")}
              >
                <Moon className="w-4 h-4 mr-3" />
                {translate("ডার্ক", "Dark")}
              </motion.button>

              <motion.button
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.2 }}
                className={`flex items-center w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:cursor-pointer ${
                  theme === "system" 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleThemeChange("system")}
              >
                <Monitor className="w-4 h-4 mr-3" />
                {translate("সিস্টেম", "System")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;