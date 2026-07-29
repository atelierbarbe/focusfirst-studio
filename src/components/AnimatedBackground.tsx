"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-cream">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        {/* Diagonal stripe 1 - Cyan */}
        <polygon
          points={`${-800 + scrollY * 0.8},0 ${100 + scrollY * 0.8},0 ${-100 + scrollY * 0.8},1080 ${-1000 + scrollY * 0.8},1080`}
          fill="#00D9FF"
          opacity="0.22"
        />

        {/* Diagonal stripe 2 - Magenta */}
        <polygon
          points={`${200 + scrollY * -0.6},0 ${1100 + scrollY * -0.6},0 ${900 + scrollY * -0.6},1080 ${0 + scrollY * -0.6},1080`}
          fill="#FF00FF"
          opacity="0.18"
        />

        {/* Diagonal stripe 3 - Yellow */}
        <polygon
          points={`${1100 + scrollY * 0.7},0 ${2000 + scrollY * 0.7},0 ${1800 + scrollY * 0.7},1080 ${900 + scrollY * 0.7},1080`}
          fill="#FFD700"
          opacity="0.2"
        />

        {/* Diagonal stripe 4 - Cyan */}
        <polygon
          points={`${2000 + scrollY * -0.5},0 ${2900 + scrollY * -0.5},0 ${2700 + scrollY * -0.5},1080 ${1800 + scrollY * -0.5},1080`}
          fill="#00D9FF"
          opacity="0.15"
        />

        {/* Diagonal stripe 5 - Magenta */}
        <polygon
          points={`${2900 + scrollY * 0.9},0 ${3800 + scrollY * 0.9},0 ${3600 + scrollY * 0.9},1080 ${2700 + scrollY * 0.9},1080`}
          fill="#FF00FF"
          opacity="0.16"
        />

        {/* Diagonal stripe 6 - Yellow */}
        <polygon
          points={`${3800 + scrollY * -0.7},0 ${4700 + scrollY * -0.7},0 ${4500 + scrollY * -0.7},1080 ${3600 + scrollY * -0.7},1080`}
          fill="#FFD700"
          opacity="0.17"
        />
      </svg>
    </div>
  );
}
