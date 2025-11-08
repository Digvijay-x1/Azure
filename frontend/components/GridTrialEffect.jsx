"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GridTrailEffect() {
  const rows = 20;
  const cols = 35;
  const [hoveredCells, setHoveredCells] = useState(new Set());

  const handleHover = (index) => {
    setHoveredCells((prev) => {
      const next = new Set(prev).add(index);
      setTimeout(() => {
        setHoveredCells((p) => {
          const updated = new Set(p);
          updated.delete(index);
          return updated;
        });
      }, 800);
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 z-0 grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => handleHover(i)}
          className="border border-transparent pointer-events-auto"
          animate={{
            borderColor: hoveredCells.has(i)
              ? "rgba(139, 92, 246, 0.5)"
              : "rgba(139, 92, 246, 0.05)",
            opacity: hoveredCells.has(i) ? 1 : 0.07,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
