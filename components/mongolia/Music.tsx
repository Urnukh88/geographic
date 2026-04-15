"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Wind, Mic2, Quote, Volume2, VolumeX } from "lucide-react";

export default function LongSongSection() {
  const containerRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audioRef.current?.play().catch(() => {
            console.log("Browser blocked autoplay. User interaction needed.");
          });
          setIsPlaying(true);
        } else {
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="long-song"
      ref={containerRef}
      className="min-h-[120vh] w-full py-32 bg-[#2C1F14] text-[#F3EFE7] overflow-hidden relative"
    >
      <audio ref={audioRef} loop>
        <source src="/audio/long-song.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0 flex flex-col justify-center gap-10 pointer-events-none select-none opacity-5">
        <motion.h2
          style={{ x: x1 }}
          className="text-[15rem] font-serif whitespace-nowrap"
        >
          URTIIN DUU • MONGOLIAN LONG SONG • URTIIN DUU
        </motion.h2>
        <motion.h2
          style={{ x: x2 }}
          className="text-[15rem] font-serif whitespace-nowrap"
        >
          TRADITIONAL MUSIC • CULTURE • NOMADIC MELODY
        </motion.h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <motion.button
          onClick={toggleAudio}
          className="absolute top-0 flex items-center gap-3 px-6 py-3 transition-all border rounded-full right-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isPlaying ? "Playing Melody" : "Music Paused"}
          </span>
        </motion.button>

        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#A68966]" />
              <span className="text-[#A68966] font-bold tracking-[0.4em] text-[10px] uppercase">
                UNESCO World Heritage
              </span>
            </div>
            <h2 className="mb-10 font-serif font-bold leading-tight text-7xl">
              Уртын дуу: <br />{" "}
              <span className="text-[#A68966]">Тэнгэрийн аялгуу</span>
            </h2>
            <p className="mb-10 text-lg italic font-light leading-relaxed opacity-70">
              "Уртын дуу бол хүний сэтгэл болон байгаль дэлхийн хүйн холбоог
              илэрхийлэгч дэлхийн хамгийн баялаг техниктэй дууны төрөл юм."
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Шуранхай",
                  desc: "Уртын дууны хамгийн хүнд, гоёмсог техникийн илэрхийлэл.",
                  icon: <Wind size={20} />,
                },
                {
                  title: "Төвлөрөл",
                  desc: "Сэтгэл санааг ариусгах, бясалгалын шинж чанартай аялгуу.",
                  icon: <Mic2 size={20} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 p-6 transition-colors border rounded-3xl bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <div className="text-[#A68966]">{item.icon}</div>
                  <div>
                    <h4 className="mb-1 font-bold">{item.title}</h4>
                    <p className="text-xs opacity-50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative z-10 rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl"
            >
              <img
                src="/urtiin-duu.jpeg"
                className={`w-full aspect-[4/5] object-cover transition-all duration-1000 ${isPlaying ? "grayscale-0 scale-105" : "grayscale"}`}
                alt="Mongolian Singer"
              />
            </motion.div>

            <div className="absolute z-20 flex items-end h-20 gap-1 -translate-x-1/2 -bottom-10 left-1/2">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    isPlaying ? { height: [20, 60, 30, 80, 20] } : { height: 5 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 1.5 + Math.random(),
                    ease: "easeInOut",
                  }}
                  className="w-1.5 bg-[#A68966] rounded-full opacity-60"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
