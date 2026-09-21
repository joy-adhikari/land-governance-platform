"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PlantPath = ({ side }: { side: "left" | "right" }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress (0 to 1) into stroke offset (100 to 0)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const smoothPathLength = useSpring(pathLength, { stiffness: 100, damping: 30 });

  // Mirror the path for the right side
  const scaleX = side === "right" ? -1 : 1;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 h-full w-24 pointer-events-none z-50 overflow-hidden"
      style={{
        left: side === "left" ? 0 : "auto",
        right: side === "right" ? 0 : "auto",
        transform: `scaleX(${scaleX})`
      }}
    >
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-primary/30"
      >
        <motion.path
          d="M 20 1000 C 20 800, 60 700, 20 500 C -20 300, 60 200, 20 0"
          stroke="currentColor"
          strokeLinecap="round"
          style={{
            pathLength: smoothPathLength,
            color: "var(--primary)",
            opacity: 0.4
          }}
        />
        {/* Adding some "leaves" that appear as the plant grows */}
        {[...Array(10)].map((_, i) => (
          <Leaf key={i} index={i} progress={smoothPathLength} />
        ))}
      </svg>
    </div>
  );
};

const Leaf = ({ index, progress }: { index: number, progress: any }) => {
  // Each leaf appears at a different scroll percentage
  const start = index * 0.1;
  const end = start + 0.05;

  return (
    <motion.path
      d={`M 20 ${1000 - index * 100} Q 30 ${980 - index * 100}, 40 ${1000 - index * 100}`}
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      style={{
        opacity: useTransform(progress, [start, end], [0, 0.4]),
        color: "var(--primary)"
      }}
    />
  );
};

export default function ScrollPlants() {
  return (
    <>
      <PlantPath side="left" />
      <PlantPath side="right" />
    </>
  );
}
