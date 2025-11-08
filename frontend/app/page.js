"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Rotating from "../components/Rotating";
// Rotating component placeholder - replace with your actual component
// function Rotating({ texts, rotationInterval = 2000, mainClassName }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % texts.length);
//     }, rotationInterval);
//     return () => clearInterval(timer);
//   }, [texts.length, rotationInterval]);

//   return (
//     <div className={mainClassName}>
//       {texts[index]}
//     </div>
//   );
// }

function GridTrailEffect({ rows = 20, cols = 35, radius = 2 }) {
  const [activeSet, setActiveSet] = useState(new Set());
  const cellSizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(null);
  const timeoutsRef = useRef(new Map());

  // Calculate cell size
  useEffect(() => {
    const calc = () => {
      cellSizeRef.current = {
        w: window.innerWidth / cols,
        h: window.innerHeight / rows,
      };
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [cols, rows]);

  // Handle mouse movement
  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        const { w, h } = cellSizeRef.current;
        if (!w || !h) return;

        const col = Math.floor(x / w);
        const row = Math.floor(y / h);

        const newCells = new Set();
        for (let r = row - radius; r <= row + radius; r++) {
          for (let c = col - radius; c <= col + radius; c++) {
            if (r >= 0 && c >= 0 && r < rows && c < cols) {
              const idx = r * cols + c;
              const dist = Math.hypot(r - row, c - col);
              if (dist <= radius + 0.5) {
                newCells.add(idx);

                // Clear existing timeout for this cell
                if (timeoutsRef.current.has(idx)) {
                  clearTimeout(timeoutsRef.current.get(idx));
                }

                // Set new timeout to fade out
                const timeout = setTimeout(() => {
                  setActiveSet((prev) => {
                    const next = new Set(prev);
                    next.delete(idx);
                    return next;
                  });
                  timeoutsRef.current.delete(idx);
                }, 600);

                timeoutsRef.current.set(idx, timeout);
              }
            }
          }
        }

        setActiveSet((prev) => new Set([...prev, ...newCells]));
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Clean up all timeouts
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, [cols, rows, radius]);

  const cells = useMemo(() => Array.from({ length: rows * cols }), [rows, cols]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        backgroundColor: "#0c0c1d",
      }}
    >
      {cells.map((_, i) => {
        const isActive = activeSet.has(i);
        return (
          <div
            key={i}
            className="w-full h-full transition-all duration-300 ease-out"
            style={{
              border: "1px solid",
              borderColor: isActive
                ? "rgba(139, 92, 246, 0.9)"
                : "rgba(139, 92, 246, 0.15)",
              boxSizing: "border-box",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  const [summaryLength, setSummaryLength] = useState(50);

  const handleWebsiteClick = () => alert("Website URL clicked!");
  const handleUploadClick = () => alert("Upload File clicked!");
  const handleSummarizeClick = () => alert("Summarize clicked!");
  const handleDownloadClick = () => alert("Download clicked!");
  const handleCopyClick = () => alert("Copied summary!");

  return (
    <>
      {/* FIXED GRID BACKGROUND */}
      <GridTrailEffect rows={20} cols={35} radius={2} />

      {/* MAIN PAGE CONTENT */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-start text-white"
        style={{ zIndex: 1 }}
      >
        {/* HEADER */}
          <div className="absolute sm:top-3 left-4 sm:left-8 z-50 select-none">
            <Image
              src="/absola.png"
              alt="Absola Logo"
              width={140}
              height={140}
              priority
              className="object-contain w-[100px] sm:w-[140px] md:w-[180px] lg:w-[200px] h-auto"
            />
          </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 mt-10 px-4">
          <h1 className="text-4xl font-bold text-white">Summarize</h1>
          <Rotating
            texts={["Documents", "URLs", "PDFs", "Research Papers"]}
            mainClassName="
              inline-flex 
              items-center 
              justify-center 
              h-16 
              px-6 
              text-3xl 
              font-bold 
              text-white 
              bg-gradient-to-r 
              from-[#8b5cf6] 
              to-[#7c3aed] 
              rounded-xl 
              border 
              border-white/10 
              backdrop-blur-lg 
              bg-opacity-20
              transition-all 
              duration-400 
              ease-in-out 
              whitespace-nowrap
            "
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        {/* MAIN SECTION */}
        <div className="w-full max-w-[1300px] flex flex-col lg:flex-row justify-between gap-6 py-12 px-6">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-5 w-full lg:w-[48%]">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 min-h-[55vh]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-gray-200 font-medium">Start Typing or</span>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleWebsiteClick}
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  >
                    Website URL
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  >
                    Upload File
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex-1 w-full mt-3" />
            </div>

            {/* SLIDER + BUTTON */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-300 text-sm">Short</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(Number(e.target.value))}
                  className="accent-[#8b5cf6] w-28"
                />
                <span className="text-gray-300 text-sm">Long</span>
              </div>
              <button
                onClick={handleSummarizeClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-6 py-2 rounded-full text-sm font-semibold"
              >
                Summarize
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 w-full lg:w-[48%] min-h-[60vh]">
            <div>
              <button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-4 py-2 rounded-full text-sm font-semibold">
                Summary
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex-1 w-full" />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDownloadClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-4 py-2 rounded-full text-sm font-semibold"
              >
                Download
              </button>
              <button
                onClick={handleCopyClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-4 py-2 rounded-full text-sm font-semibold"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section className="w-full bg-transparent text-center py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b5cf6] mb-12">
            How it Works?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                num: "①",
                title: "Input Your Text",
                desc: "Type or upload your files to start summarizing instantly.",
                btn: "Upload Files",
              },
              {
                num: "②",
                title: "Choose Summary Options",
                desc: "Adjust the summary length or fine-tune your preferences.",
                slider: true,
              },
              {
                num: "③",
                title: "Get AI-Generated Summary",
                desc: "Let our AI analyze your text and produce a concise summary.",
                btn: "Summarize",
              },
              {
                num: "④",
                title: "Export or Share",
                desc: "Download or copy your generated summary to use it anywhere.",
                btn: "Export",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-white"
              >
                <div className="text-[#a78bfa] text-lg font-semibold mb-3">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 mb-4 text-center">
                  {step.desc}
                </p>
                {step.slider ? (
                  <input type="range" className="accent-[#8b5cf6] w-24" />
                ) : (
                  <button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 px-4 py-2 rounded-full text-sm font-semibold">
                    {step.btn}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}