"use client";

import { useState } from "react";
import Rotating from "../components/Rotating";
import dynamic from "next/dynamic";

// Load visual components (disable SSR)
const ParticleBackground = dynamic(() => import("../components/ParticleBackground"), { ssr: false });
const ThreeModel = dynamic(() => import("../components/ThreeModel"), { ssr: false });

export default function Home() {
  const [summaryLength, setSummaryLength] = useState(50);

  // Button Handlers
  const handleWebsiteClick = () => alert("Website URL clicked!");
  const handleUploadClick = () => alert("Upload File clicked!");
  const handleSummarizeClick = () => alert("Summarize clicked!");
  const handleDownloadClick = () => alert("Download clicked!");
  const handleCopyClick = () => alert("Copied summary!");

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start text-white">
      {/* Background visuals */}
      <ParticleBackground />
      <ThreeModel modelPath="/models/quantum_cube.glb" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-6 text-center md:text-left">
          <div className="w-full md:w-72 h-16 flex items-center justify-center bg-white text-black rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold">Summarize</h1>
          </div>

          <Rotating
            texts={["Documents", "URLs", "PDFs", "Research Papers"]}
            mainClassName="w-full md:w-72 h-16 text-3xl font-bold text-white flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl shadow-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-[1400px] py-16 gap-12">
          {/* LEFT: Input Section */}
          <div className="flex flex-col gap-6 w-full lg:w-[48%]">
            {/* Input Box */}
            <div className="min-h-[60vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl flex flex-col items-center justify-start p-8 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
                <span className="font-semibold text-md text-gray-200">Start Typing or</span>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleWebsiteClick}
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-sm font-semibold px-5 py-2 rounded-3xl shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:opacity-90 transition-all duration-200"
                  >
                    Website URL
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-sm font-semibold px-5 py-2 rounded-3xl shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:opacity-90 transition-all duration-200"
                  >
                    Upload File
                  </button>
                </div>
              </div>
              <div className="bg-white/20 mt-6 rounded-2xl w-full flex-1 border border-white/10 shadow-inner" />
            </div>

            {/* Slider + Button */}
            <div className="h-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-center px-8 py-5 text-white gap-6">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-base sm:text-lg font-normal text-gray-200">Short</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                  className="w-32 accent-[#8b5cf6]"
                />
                <span className="text-base sm:text-lg font-normal text-gray-200">Long</span>
              </div>
              <button
                onClick={handleSummarizeClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-semibold rounded-3xl text-sm px-7 py-2 hover:opacity-90 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-200 shadow-md"
              >
                Summarize
              </button>
            </div>
          </div>

          {/* RIGHT: Summary Section */}
          <div className="min-h-[65vh] w-full lg:w-[48%] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-start p-8 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
            <div className="flex justify-start w-full px-2">
              <button className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-semibold text-md px-5 py-2 rounded-3xl shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:opacity-90 transition-all duration-200">
                Summary
              </button>
            </div>

            <div className="bg-white/20 mt-6 rounded-2xl w-full flex-1 border border-white/10 shadow-inner" />

            <div className="flex flex-wrap justify-end w-full mt-5 gap-3">
              <button
                onClick={handleDownloadClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-md px-5 py-2 font-semibold rounded-3xl hover:opacity-90 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-200 shadow-md"
              >
                Download
              </button>
              <button
                onClick={handleCopyClick}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-md px-5 py-2 font-semibold rounded-3xl hover:opacity-90 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-200 shadow-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <section className="w-full bg-white py-16 px-6 text-center rounded-t-3xl mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#7D65DF] mb-12">
            How it Works?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#A78BFA] rounded-3xl shadow-lg p-6 text-white flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-3">Input Your Text</h3>
              <p className="text-sm mb-4 text-center">
                Type or upload your files to start summarizing instantly.
              </p>
              <button className="bg-[#7D65DF] px-4 py-2 rounded-3xl text-sm font-semibold hover:bg-[#6b46c1] transition-all duration-200">
                Upload Files
              </button>
            </div>

            <div className="bg-[#A78BFA] rounded-3xl shadow-lg p-6 text-white flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-3">Choose Summary Options</h3>
              <p className="text-sm mb-4 text-center">
                Adjust the summary length or customize preferences.
              </p>
              <input type="range" className="w-24 accent-[#6b46c1]" />
            </div>

            <div className="bg-[#A78BFA] rounded-3xl shadow-lg p-6 text-white flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-3">Get AI-Generated Summary</h3>
              <p className="text-sm mb-4 text-center">
                Let our AI process your text and generate a concise summary.
              </p>
              <button className="bg-[#7D65DF] px-4 py-2 rounded-3xl text-sm font-semibold hover:bg-[#6b46c1] transition-all duration-200">
                Summarize
              </button>
            </div>

            <div className="bg-[#A78BFA] rounded-3xl shadow-lg p-6 text-white flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-3">Export or Share</h3>
              <p className="text-sm mb-4 text-center">
                Download or copy the summary to use it anywhere.
              </p>
              <button className="bg-[#7D65DF] px-4 py-2 rounded-3xl text-sm font-semibold hover:bg-[#6b46c1] transition-all duration-200">
                Export
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}