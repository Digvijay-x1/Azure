import "./globals.css";
import GridTrailEffect from "../components/GridTrialEffect";


export const metadata = {
  title: "Summarize App",
  description: "AI-powered summarizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-[#0c0c1d] text-white overflow-x-hidden">
        {/* 🌌 Background Grid */}
        <GridTrailEffect />

        {/* 🧠 Foreground Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
