"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sun, Wind, Tent, Compass } from "lucide-react";

export default function GobiSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const gobiFeatures = [
    {
      title: "Хонгорын элс",
      desc: "Монгол орны хамгийн том элсэн манхан, 'Дуут элс'.",
      icon: <Wind className="text-[#D4A373]" />,
    },
    {
      title: "Баянзаг",
      desc: "Дэлхийд анх удаа үлэг гүрвэлийн өндөг олдсон 'Улаан эрэг'.",
      icon: <Compass className="text-[#D4A373]" />,
    },
    {
      title: "Тэмээн жин",
      desc: "Говийн хөлөг онгоц хэмээгдэх хоёр бөхт тэмээ.",
      icon: <Sun className="text-[#D4A373]" />,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="gobi"
      className="min-h-screen w-full py-32 bg-[#FDF8F1] overflow-hidden relative"
    >
      <motion.div
        style={{ x }}
        className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none"
      >
        <h2 className="text-[25rem] font-serif font-bold whitespace-nowrap text-[#7C4F2F]">
          GOBI DESERT • THE GOLDEN DUNES • GOBI
        </h2>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#B08968] font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">
              The Golden Horizon
            </span>
            <h2 className="text-7xl md:text-8xl font-serif font-bold text-[#432818] mb-8 leading-tight">
              Алтан шаргал <br /> <span className="text-[#B08968]">Говь</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#B08968] mx-auto opacity-30" />
          </motion.div>
        </div>

        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          <motion.div style={{ scale }} className="relative">
            <div className="rounded-[5rem] rounded-tr-none overflow-hidden shadow-2xl border-[15px] border-white aspect-[5/6] bg-[#E2D9CC]">
              <img
                src="/gobi.jpg"
                className="object-cover w-full h-full"
                alt="Gobi Desert"
              />
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-10 -left-10 w-32 h-32 border border-[#B08968]/20 rounded-full flex items-center justify-center italic text-[#B08968] text-[10px] tracking-widest font-bold"
            >
              • THE GOBI • THE GOBI • THE GOBI
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl text-[#6B5645] leading-relaxed mb-12 italic"
            >
              "Говь бол дэлхийн хамгийн том цөлүүдийн нэг бөгөөд нүүдэлчдийн
              тэсвэр хатуужил, байгалийн хосгүй зохицлын илэрхийлэл юм."
            </motion.p>

            <div className="grid grid-cols-1 gap-4">
              {gobiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-[#E2D9CC]/50 hover:bg-white hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 bg-[#FDF8F1] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#B08968] group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-[#432818] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[#7F5539] opacity-70 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Statistics or Small Note */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 p-12 bg-[#432818] rounded-[4rem] text-[#FDF8F1] flex flex-col md:flex-row justify-around items-center gap-8 text-center"
        >
          <div>
            <h5 className="text-4xl font-serif font-bold mb-2 text-[#D4A373]">
              1.3M
            </h5>
            <p className="text-[10px] uppercase tracking-widest opacity-60">
              Km² Area Size
            </p>
          </div>
          <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
          <div>
            <h5 className="text-4xl font-serif font-bold mb-2 text-[#D4A373]">
              400+
            </h5>
            <p className="text-[10px] uppercase tracking-widest opacity-60">
              Species of Animals
            </p>
          </div>
          <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
          <div>
            <h5 className="text-4xl font-serif font-bold mb-2 text-[#D4A373]">
              -40° to +40°
            </h5>
            <p className="text-[10px] uppercase tracking-widest opacity-60">
              Temperature Range
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
