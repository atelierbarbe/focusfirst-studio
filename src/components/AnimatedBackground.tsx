"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduceMotion]);

  const y = reduceMotion ? 0 : scrollY;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-cream" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <polygon
          points={`${-800 + y * 0.8},0 ${100 + y * 0.8},0 ${-100 + y * 0.8},1080 ${-1000 + y * 0.8},1080`}
          fill="#00D9FF"
          opacity="0.22"
        />
        <polygon
          points={`${200 + y * -0.6},0 ${1100 + y * -0.6},0 ${900 + y * -0.6},1080 ${0 + y * -0.6},1080`}
          fill="#FF00FF"
          opacity="0.18"
        />
        <polygon
          points={`${1100 + y * 0.7},0 ${2000 + y * 0.7},0 ${1800 + y * 0.7},1080 ${900 + y * 0.7},1080`}
          fill="#FFD700"
          opacity="0.2"
        />
        <polygon
          points={`${2000 + y * -0.5},0 ${2900 + y * -0.5},0 ${2700 + y * -0.5},1080 ${1800 + y * -0.5},1080`}
          fill="#00D9FF"
          opacity="0.15"
        />
        <polygon
          points={`${2900 + y * 0.9},0 ${3800 + y * 0.9},0 ${3600 + y * 0.9},1080 ${2700 + y * 0.9},1080`}
          fill="#FF00FF"
          opacity="0.16"
        />
        <polygon
          points={`${3800 + y * -0.7},0 ${4700 + y * -0.7},0 ${4500 + y * -0.7},1080 ${3600 + y * -0.7},1080`}
          fill="#FFD700"
          opacity="0.17"
        />
      </svg>
    </div>
  );
}
