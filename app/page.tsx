"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowUpRight,
  Sparkles,
  Mountain,
  Waves,
  Flag,
} from "lucide-react";

// CSS-ээр хийсэн эргэлддэг дэлхий (Background Glow-той)
function EarthScene() {
  return (
    <div className="relative flex items-center justify-center w-full h-full scale-110 md:scale-125">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7C4F2F] opacity-5 blur-[120px] animate-pulse" />
      <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border border-[#E2D9CC]/20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="absolute top-0 left-0 h-full w-[200%] bg-cover bg-repeat-x opacity-80"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')`,
            backgroundSize: "50% 100%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { isLoaded } = useUser();

  if (!isLoaded) return <div className="min-h-screen bg-[#FDFBF7]" />;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-[#FDFBF7]">
      {/* Арын фон дахь эргэлддэг Дэлхий */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <EarthScene />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        {/* 1. Badge - Ертөнцийг танин мэдэх аялал */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#E2D9CC] text-[#7C4F2F] text-[10px] font-black mb-10 uppercase tracking-[0.3em]"
        >
          <Sparkles size={14} />
          <span>Ертөнцийг танин мэдэх аялал</span>
        </motion.div>

        {/* 2. Main Title - Explore Boundless */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-7xl md:text-[9rem] font-serif leading-[0.85] text-[#1A1209] tracking-tighter">
            Explore <br />
            <span className="text-[#7C4F2F] italic font-light ml-10">
              Boundless
            </span>
          </h1>
        </motion.div>

        {/* 3. Ишлэл - "Дэлхий ертөнц бол уншаагүй байгаа ном юм." */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl text-[#7A6A58] text-lg md:text-xl font-serif italic mb-12 text-center leading-relaxed"
        >
          "Дэлхий ертөнц бол уншаагүй байгаа ном юм."
        </motion.p>

        {/* 4. Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-6 mb-20 sm:flex-row"
        >
          <Link
            href="/quiz"
            className="group flex items-center gap-4 bg-[#7C4F2F] text-white px-10 py-5 rounded-2xl shadow-xl hover:bg-[#5C3820] transition-all duration-300 active:scale-95"
          >
            <span className="font-serif text-lg font-bold">Тест эхлүүлэх</span>
            <Compass
              size={24}
              className="transition-transform duration-700 group-hover:rotate-180"
            />
          </Link>

          <Link
            href="/explore"
            className="group flex items-center gap-3 px-10 py-5 rounded-2xl border border-[#E2D9CC] text-[#1A1209] hover:bg-[#F2EDE4] transition-all active:scale-95"
          >
            <span className="font-serif text-lg font-bold">
              Бүх сэдвийг үзэх
            </span>
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>

        {/* 5. Статистик - 8+ Ангилал, 200+ Асуулт... */}
        <div className="grid grid-cols-3 gap-8 md:gap-24 border-t border-[#E2D9CC] pt-12 w-full max-w-3xl">
          <StatItem num="8+" label="Ангилал" />
          <StatItem num="200+" label="Асуулт" />
          <StatItem num="100%" label="Үнэгүй" />
        </div>
      </div>

      {/* Background Floating Elements */}
      <FloatingIcon Icon={Mountain} top="20%" left="15%" delay={0} />
      <FloatingIcon Icon={Waves} top="25%" right="15%" delay={2} />
      <FloatingIcon Icon={Flag} bottom="20%" left="20%" delay={4} />
    </div>
  );
}

function StatItem({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center cursor-default group">
      <motion.p
        whileHover={{ scale: 1.1 }}
        className="text-3xl md:text-5xl font-serif font-bold text-[#1A1209] group-hover:text-[#7C4F2F] transition-colors duration-300"
      >
        {num}
      </motion.p>
      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#A68966] mt-2">
        {label}
      </p>
    </div>
  );
}

function FloatingIcon({ Icon, top, left, right, bottom, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.4, 0.4, 0], y: [0, -40, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute hidden xl:block text-[#7C4F2F]/30"
      style={{ top, left, right, bottom }}
    >
      <Icon size={48} strokeWidth={1} />
    </motion.div>
  );
}
