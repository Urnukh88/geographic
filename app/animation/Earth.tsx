"use client";
import React from "react";
import { motion } from "framer-motion";

export default function EarthScene() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Дэлхийн гэрэлтэлт (Glow effect) */}
      <div className="absolute w-64 h-64 rounded-full bg-[#7C4F2F] opacity-20 blur-3xl animate-pulse" />

      {/* Дэлхийн бөмбөрцөг */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.5),0_0_50px_rgba(124,79,47,0.2)] border-2 border-[#E2D9CC]/30">
        {/* Эргэлддэг текстур зураг */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-0 left-0 h-full w-[200%] bg-cover bg-repeat-x"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')`,
            backgroundSize: "50% 100%",
          }}
        />

        {/* Сүүдэр болон гүн (Atmosphere overlay) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_20px_rgba(255,255,255,0.2),inset_-10px_-10px_20px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  );
}
