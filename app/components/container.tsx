import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "article";
}

export const Container = ({ children, variant }: Props) => (
  <div className={`container px-4 py-4 md:py-6 lg:py-8 ${variant ?? ""}`}>
    {children}
  </div>
);
