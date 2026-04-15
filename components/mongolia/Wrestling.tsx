"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Trophy, Users2, Flame } from "lucide-react";

const wrestlingStats = [
  {
    title: "Засуул",
    desc: "Бөхийн цолыг дуудаж, ам авч, шударга барилдааныг хянадаг.",
    icon: <Users2 size={24} />,
  },
  {
    title: "Цол",
    desc: "Начин, Харцага, Заан, Гарьд, Улсын Арслан, Аварга.",
    icon: <Trophy size={24} />,
  },
  {
    title: "Мэх",
    desc: "600 гаруй үндсэн мэх болон тэдгээрийн хувилбарууд.",
    icon: <Flame size={24} />,
  },
];

export default function WrestlingSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section
      ref={sectionRef}
      id="wrestling"
      className="min-h-screen w-full py-32 bg-[#1A1A1A] text-[#F3EFE7] overflow-hidden relative"
    >
      <motion.div
        style={{ x: textX }}
        className="absolute top-20 left-0 opacity-[0.03] select-none pointer-events-none"
      >
        <h2 className="text-[20rem] font-serif font-bold whitespace-nowrap">
          WRESTLING • BÖKH • STRENGTH • POWER
        </h2>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <div className="grid items-end grid-cols-1 gap-16 mb-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#A68966] font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">
              The Naadam Tradition
            </span>
            <h2 className="mb-8 font-serif font-bold leading-tight text-7xl">
              Эрийн гурван наадам: <br />{" "}
              <span className="text-[#A68966]">Монгол Бөх</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg opacity-60 italic border-l-2 border-[#A68966] pl-8 mb-4 font-light"
          >
            Монгол бөх бол хүч чадал, ухаан бодол, тэсвэр хатуужил, ёс зүйн цогц
            илэрхийлэл юм. Мянга мянган жилийн түүхтэй энэхүү спорт нь
            нүүдэлчдийн эр зоригийн шалгуур юм.
          </motion.p>
        </div>

        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="order-2 space-y-6 lg:col-span-4 lg:order-1">
            {wrestlingStats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex gap-6 items-center"
              >
                <div className="w-14 h-14 bg-[#A68966] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#A68966]/20">
                  {item.icon}
                </div>
                <div>
                  <h4 className="mb-1 font-serif text-xl font-bold">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-50">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="order-1 lg:col-span-8 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative">
                <img
                  src="/mongol-buh.jpg"
                  className="object-cover w-full transition-transform duration-1000 aspect-video group-hover:scale-105"
                  alt="Mongolian Bokh"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-transparent opacity-60" />
              </div>

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -top-6 -right-6 w-48 h-48 bg-[#A68966] rounded-full p-8 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-[#1A1A1A] z-20"
              >
                <Shield size={32} className="mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                  Үлэмж Дархан Аварга
                </p>
              </motion.div>

              <div className="absolute bottom-10 left-10">
                <h3 className="mb-2 font-serif text-4xl font-bold text-white">
                  Дэвээ, Шаваа
                </h3>
                <p className="text-sm text-white/60">
                  Хүчтэнүүд барилдахын өмнө Хангарьд шувууны дүрийг үзүүлэн
                  дэвдэг.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
