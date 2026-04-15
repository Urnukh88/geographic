"use client";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface CulturalCardProps {
  country: any;
  onPlaySound: (soundUrl: string) => void;
  isPlaying: boolean;
}

export default function CulturalCard({
  country,
  onPlaySound,
  isPlaying,
}: CulturalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -15 }}
      className="relative group w-full md:w-[340px] h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl bg-[#1a110a]"
    >
      {/* Үндсэн Соёлын Зураг */}
      <motion.img
        src={country.cultureImage}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-80"
        alt={country.name}
      />

      {/* Давхарлах Хээ (Hover үед гарч ирнэ) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url(${country.pattern})`,
          backgroundSize: "150px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Мэдээлэл */}
      <div className="absolute bottom-0 w-full p-8 text-white">
        <p className="text-xs uppercase tracking-[0.2em] mb-2 text-[#E2D9CC] opacity-80">
          {country.symbol}
        </p>
        <h3 className="mb-3 font-serif text-3xl font-bold">{country.name}</h3>
        <p className="text-sm text-[#E2D9CC] mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {country.description}
        </p>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onPlaySound(country.sound);
          }}
          className="flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors border rounded-full bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/40"
        >
          {isPlaying ? (
            <Pause size={18} fill="white" />
          ) : (
            <Play size={18} fill="white" />
          )}
          {isPlaying ? "Зогсоох" : "Аялгуу сонсох"}
        </motion.button>
      </div>
    </motion.div>
  );
}
