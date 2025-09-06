"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import backgroundImage from "@/assets/Home/home-banner.jpg";

const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }, // ✅ fixed ease
    },
};

export default function HomeBanner() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center">
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
            <div className="relative z-10 text-center px-4">
                <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl md:text-5xl font-bold text-white leading-snug"
                >
                    Orgado – eCommerce React, Next Js Template
                </motion.h1>

                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="text-white/90 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
                >
                    Orgado – React, Next Js Template is a creative & unique design based
                    on the latest technology. All files are clearly organized we believe
                    it will be easy to use and edit them. This Template is well organized
                    and very easy to customize. It’s easy to use and navigate as well.
                    Compatible with Desktop, Laptop, Tablet,
                </motion.p>

                <motion.button
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.9, duration: 1.8, ease: "easeOut" }}
                    className="mt-8 px-6 py-3 bg-white text-gray-900 font-medium rounded-md shadow 
             relative overflow-hidden transition-all duration-500 group hover:cursor-pointer"
                >
                    <span className="absolute inset-0 bg-gray-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></span>
                    <span className="relative z-10 group-hover:text-white">EXPLORE DEMOS ↓</span>
                </motion.button>


            </div>
        </section>
    );
}
