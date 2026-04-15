"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Trophy, Shield, Music4 } from "lucide-react";

export default function HorseRacingSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const horseX = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const bgSkew = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section
      ref={containerRef}
      id="horse-racing"
      className="min-h-[120vh] w-full py-32 bg-[#432818] text-[#FDF8F1] overflow-hidden relative"
    >
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none select-none opacity-10">
        <motion.h2
          style={{ x: horseX, skewX: bgSkew }}
          className="text-[18rem] font-black italic whitespace-nowrap leading-none"
        >
          KHIIMORI • SPEED • MONGOLIAN HORSE • TOOS MANARNA
        </motion.h2>
        <motion.h2
          style={{ x: useTransform(scrollYProgress, [0, 1], [300, -300]) }}
          className="text-[15rem] font-serif opacity-50 whitespace-nowrap leading-none"
        >
          ХУРДАН ХҮЛЭГ • АЖНАЙ • ШАШАН • ГИЙНГОО
        </motion.h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-[#D4A373] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,163,115,0.4)]"
          >
            <Shield className="text-[#432818]" size={32} />
          </motion.div>

          <h2 className="mb-6 font-serif italic font-bold tracking-tighter text-8xl md:text-9xl">
            Хийморь <br /> <span className="text-[#D4A373]">Төгөлдөр</span>
          </h2>
          <div className="w-32 h-[2px] bg-[#D4A373] mb-8" />
          <p className="max-w-xl text-lg font-light leading-relaxed opacity-70">
            "Эмээлт морио эзгүй орхидоггүй, эртний ёсоо мартаж болдоггүй" <br />
            Монгол наадмын хамгийн эрч хүчтэй, сүр жавхлант хэсэг.
          </p>
        </div>

        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            {[
              {
                t: "Гийнгоо",
                d: "Хүүхдийн цээл хоолой, морины зориг хүчийг бадраах аялгуу.",
                i: <Music4 />,
              },
              {
                t: "Уяа сойлго",
                d: "Өвсний сор, усны тунгалаг, уяачийн эрдэм хосолсон агшин.",
                i: <Zap />,
              },
              {
                t: "Аман хүзүү",
                d: "Түрүү морины дараах хурдан хүлэгт өгөх хүндэт цол.",
                i: <Trophy />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] flex gap-6 items-center"
              >
                <div className="text-[#D4A373]">{item.i}</div>
                <div>
                  <h4 className="mb-1 text-xl font-bold">{item.t}</h4>
                  <p className="text-[11px] opacity-50 leading-tight uppercase tracking-widest">
                    {item.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative lg:col-span-8">
            <motion.div
              style={{ skewY: useTransform(scrollYProgress, [0, 1], [-5, 5]) }}
              className="relative rounded-[3rem] overflow-hidden border-[1px] border-white/20 shadow-2xl"
            >
              <img
                src="/mori-uraldan.jpeg"
                className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                alt="Mongolian Horse Racing"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#432818] via-transparent to-transparent opacity-60" />
            </motion.div>

            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i,
                  ease: "linear",
                }}
                className="absolute bg-white/20 h-[1px] w-40"
                style={{ top: `${20 * i + 10}%`, left: `${10 * i}%` }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pt-20 mt-32 border-t border-white/10"
        >
          <div className="text-[12rem] font-black opacity-5 absolute -bottom-10 pointer-events-none">
            НААДАМ
          </div>
          <p className="text-4xl font-serif italic text-[#D4A373] mb-4">
            "Түмний эх"
          </p>
          <p className="text-xs tracking-[1em] uppercase opacity-40">
            Spirit of the Steppe
          </p>
        </motion.div>
      </div>
    </section>
  );
}
