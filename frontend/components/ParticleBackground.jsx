"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    // load the slim version for performance
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent", // no background, keeps your UI visible
          },
        },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 100, // number of particles
            density: {
              enable: true,
              area: 800,
            },
          },
          color: { value: "#000000ff" }, // purple color
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,         // ✅ connects nearby particles
            distance: 150,        // distance between connections
            color: "#000000ff",     // line color
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // particles move away when hovered
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.5,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
