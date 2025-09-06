"use client";

import React from "react";

export const CardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
};