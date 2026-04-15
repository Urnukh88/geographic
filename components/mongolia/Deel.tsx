"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Scissors, Sparkles, Palette, Layers } from "lucide-react";

const clothingDetails = [
  {
    title: "Дээл",
    desc: "Нүүдэлчдийн амьдралын хэв маягт зохицсон, олон зууны түүхтэй үндсэн хувцас.",
    icon: <Layers size={20} />,
  },
  {
    title: "Угалз хээ",
    desc: "Ханан хээ, угалз, өлзий хээ зэрэг бэлгэдлийн гүн утга агуулсан чимэглэлүүд.",
    icon: <Palette size={20} />,
  },
  {
    title: "Торго & Махна",
    desc: "Чанарлаг торго, дурдан, ангийн үсээр урласан тансаг хийц.",
    icon: <Sparkles size={20} />,
  },
];

export default function ClothingSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      id="clothing"
      className="min-h-screen w-full py-32 bg-[#F9F6F0] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="relative mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#A68966] font-bold tracking-[0.6em] text-[10px] uppercase block mb-4">
              The Art of Nomadic Fashion
            </span>
            <h2 className="text-7xl font-serif font-bold text-[#2C1F14] leading-tight">
              Үндэсний <span className="text-[#7C4F2F]">Хувцас</span>
            </h2>
          </motion.div>

          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#7C4F2F] opacity-10 -z-10" />
        </div>

        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {clothingDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ x: 20, backgroundColor: "#fff" }}
                className="p-8 rounded-[2.5rem] bg-white/50 border border-[#E2D9CC]/50 shadow-sm transition-all flex gap-6 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7C4F2F]/10 flex items-center justify-center text-[#7C4F2F] group-hover:bg-[#7C4F2F] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#2C1F14] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#6B5645] leading-relaxed opacity-70">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative lg:col-span-7">
            <motion.div style={{ y: textY }} className="relative z-10">
              <div className="rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-[15px] border-white aspect-[4/5]">
                <img
                  src="/deel.jpg"
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                  alt="Mongolian Deel"
                />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 w-44 h-44 bg-[#2C1F14] rounded-full p-8 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white"
              >
                <Scissors className="text-[#A68966] mb-2" size={24} />
                <p className="text-white text-[9px] font-bold uppercase tracking-widest leading-tight">
                  Handcrafted Tradition
                </p>
              </motion.div>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#A68966] opacity-[0.03] rounded-full blur-[100px] -z-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-32 md:grid-cols-4">
          {[
            {
              label: "Эмэгтэй",
              img: "/emegtei-deel.jpg",
            },
            {
              label: "Зах",
              img: "/deel-zah.jpeg",
            },
            {
              label: "Бүс",
              img: "/deel-bvs.jpeg",
            },
            {
              label: "Малгай",
              img: "/malgai.jpeg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative h-64 overflow-hidden shadow-lg cursor-pointer group rounded-3xl"
            >
              <img
                src={item.img}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-125"
                alt={item.label}
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                <span className="font-serif text-xl italic text-white">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
