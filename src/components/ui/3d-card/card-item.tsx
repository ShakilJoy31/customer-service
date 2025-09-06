"use client";

import { CardItemProps } from "@/types/product/productCard";
import React from "react";



export const CardItem: React.FC<CardItemProps> = ({
  children,
  className,
  translateZ = 0,
  as: Component = "div",
  onClick,
  href,
  target,
  ...props
}) => {
  const style = {
    transform: `translateZ(${translateZ}px)`,
  };

  if (Component === "a") {
    return (
      <a
        href={href}
        target={target}
        className={className}
        style={style}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (Component === "button") {
    return (
      <button
        className={className}
        style={style}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (Component === "p") {
    return (
      <p className={className} style={style} {...props}>
        {children}
      </p>
    );
  }

  return (
    <div className={className} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  );
};