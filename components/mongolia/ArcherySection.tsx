"use client";
import { motion } from "framer-motion";
import { Target, CircleDot, Wind } from "lucide-react";

export default function ArcherySection() {
  return (
    <section
      id="archery"
      className="min-h-screen w-full py-32 bg-[#FDFBF7] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img
                src="/sur-harvaa.jpg"
                className="object-cover w-full h-full"
                alt="Archery"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#7C4F2F] text-white p-8 rounded-[3rem] shadow-2xl">
              <p className="font-serif text-2xl italic">Уухай!</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#7C4F2F]" />
              <span className="text-[#A68966] font-bold tracking-[0.4em] text-[10px] uppercase">
                Мэргэн Харваа
              </span>
            </div>

            <h2 className="text-7xl font-serif font-bold text-[#2C1F14] leading-[1.1] mb-8">
              Сур <br /> <span className="text-[#7C4F2F]">Харваа</span>
            </h2>

            <p className="text-xl text-[#6B5645] leading-relaxed mb-12 opacity-80">
              Монгол сур харваа бол эрхий мэргэн харваачдын цэц мэргэн, хараа
              болон сэтгэл зүйн төвлөрлийн гайхамшигт нэгдэл юм.
            </p>

            <div className="space-y-4">
              {[
                { t: "Эвэр Нум", i: <Target size={18} /> },
                { t: "Уухайлах Ёс", i: <CircleDot size={18} /> },
                { t: "Зурхайн Оноо", i: <Wind size={18} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-5 bg-white border border-[#E2D9CC] rounded-3xl group hover:border-[#7C4F2F] transition-all"
                >
                  <div className="text-[#7C4F2F]">{item.i}</div>
                  <span className="font-bold text-[#2C1F14]">{item.t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
