"use client";
import React, { useEffect } from "react";

export const AnimateInContainer = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Array.prototype.slice
        .call(document.querySelectorAll(".animate"))
        .forEach((el: HTMLElement, i) => {
          setTimeout(() => {
            el.classList.remove("animate__in");
          }, 500 * i);
        });
    }
  }, []);
  return <></>;
};
