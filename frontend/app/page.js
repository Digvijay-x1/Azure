"use client";

import { useState } from "react";
import Rotating from "@/components/Rotating";

export default function Home() {
  const [summaryLength, setSummaryLength] = useState(50);

  const handleWebsiteClick = () => alert("Website URL clicked!");
  const handleUploadClick = () => alert("Upload File clicked!");
  const handleSummarizeClick = () => alert("Summarize clicked!");
  const handleDownloadClick = () => alert("Download clicked!");
  const handleCopyClick = () => alert("Copied summary!");

  return (
    <>
     
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4 px-4 text-center md:text-left">
        <div className="w-full md:w-64 h-16 flex items-center justify-center bg-white text-black rounded-lg ">
          <h1 className="text-3xl md:text-4xl font-bold">Summarize</h1>
        </div>

        <Rotating
          texts={["Documents", "URLs", "PDFs", "Much more"]}
          mainClassName="w-full md:w-64 h-16 text-3xl md:text-4xl font-bold text-white flex items-center justify-center bg-[#A78BFA] rounded-lg"
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

    
      <div className="bg-white flex items-start justify-center py-10 md:py-16 px-4">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-6xl">

      
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            
          
            <div className="min-h-[50vh] bg-[#A78BFA] rounded-3xl flex flex-col items-center justify-start p-4 shadow-lg text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
                <span className="font-semibold text-md">Start Typing or</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={handleWebsiteClick}
                    className="bg-[#7D65DF] text-white text-sm font-semibold px-4 py-2 rounded-3xl shadow hover:bg-[#6b46c1] whitespace-nowrap"
                  >
                    Website URL
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="bg-[#7D65DF] text-white text-sm font-semibold px-4 py-2 rounded-3xl shadow hover:bg-[#6b46c1] whitespace-nowrap"
                  >
                    Upload File
                  </button>
                </div>
              </div>

              <div className="bg-[#d9d9d9] mt-4 rounded-2xl w-full flex-1" />
            </div>

           
            <div className="h-auto bg-[#A78BFA] rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-center px-6 py-4 text-white gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-base sm:text-lg font-normal">Short</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                  className="w-24 accent-[#6b46c1]"
                />
                <span className="text-base sm:text-lg font-normal">Long</span>
              </div>

              <button
                onClick={handleSummarizeClick}
                className="bg-[#7D65DF] text-white font-semibold rounded-3xl text-sm px-5 py-2 hover:bg-[#6b46c1]"
              >
                Summarize
              </button>
            </div>
          </div>

       
          <div className="min-h-[55vh] lg:min-h-[65vh] bg-[#A78BFA] w-full lg:w-1/2 rounded-3xl shadow-lg flex flex-col items-center justify-start p-4 text-white">
            <div className="flex justify-start w-full px-2">
              <button className="bg-[#7D65DF] text-white font-semibold text-md px-4 py-2 rounded-3xl shadow">
                Summary
              </button>
            </div>

            <div className="bg-[#d9d9d9] mt-3 rounded-2xl w-full flex-1" />

            <div className="flex flex-wrap justify-end w-full mt-3 gap-2">
              <button
                onClick={handleDownloadClick}
                className="bg-[#7D65DF] text-white text-md px-4 py-2 font-semibold rounded-3xl hover:bg-[#6b46c1]"
              >
                Download
              </button>
              <button
                onClick={handleCopyClick}
                className="bg-[#7D65DF] text-white text-md px-4 py-2 font-semibold rounded-3xl hover:bg-[#6b46c1]"
              >
                Copy
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
