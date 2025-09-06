"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    ref.current.style.transform = `
      rotateY(${x * 20}deg)
      rotateX(${y * -20}deg)
    `;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease",
      }}
    >
      {children}
    </motion.div>
  );
};