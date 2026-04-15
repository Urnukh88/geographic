"use client";
import { motion } from "framer-motion";
import { Droplets, Shield, Sun, Leaf } from "lucide-react";

const dairyData = [
  {
    name: "Айраг",
    title: "The Spirit of Steppe",
    desc: "Гүүний сүүгээр исгэсэн, эрүүл мэндэд нэн тустай Монголчуудын уламжлалт ундаа.",
    icon: <Droplets className="text-[#A68966]" />,
    image: "/airag.jpg",
  },
  {
    name: "Ааруул",
    title: "Vitamin of the Sun",
    desc: "Нарны гэрэлд хатаасан сүүн бүтээгдэхүүн. Шүд болон ясны бэхжилтэд онцгой ач холбогдолтой.",
    icon: <Sun className="text-[#A68966]" />,
    image: "/aaruul.jpg",
  },
  {
    name: "Өрөм",
    title: "The Golden Cream",
    desc: "Сүүг хөөрүүлж авсан зөөлөн дээж. Монгол зочломтгой ёсны салшгүй нэг хэсэг.",
    icon: <Shield className="text-[#A68966]" />,
    image: "/urum.jpeg",
  },
];

export default function DairySection() {
  return (
    <section
      id="dairy"
      className="min-h-screen w-full py-32 bg-[#FDFBF7] flex items-center justify-center"
    >
      <div className="w-full max-w-[1200px] px-10">
        <div className="flex flex-col items-end justify-between mb-20 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[#A68966] font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">
              White Food Heritage
            </span>
            <h2 className="text-6xl font-serif font-bold text-[#2C1F14] mb-6">
              Цагаан идээ
            </h2>
            <p className="text-[#6B5645] text-lg leading-relaxed opacity-80">
              Монголчууд малын сүүг "Цагаан идээ" хэмээн дээдэлдэг. Энэ нь
              зөвхөн хоол хүнс биш, эрүүл мэнд, урт наслалтын нууц юм.
            </p>
          </motion.div>
          <div className="hidden md:block w-32 h-[1px] bg-[#A68966] mb-4 opacity-30" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {dairyData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -15,
                boxShadow: "0 30px 60px -12px rgba(166, 137, 102, 0.15)",
              }}
              className="bg-white rounded-[3rem] p-4 border border-[#E2D9CC]/30 flex flex-col h-full"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 relative">
                <img
                  src={item.image}
                  className="object-cover w-full h-full"
                  alt={item.name}
                />
                <div className="absolute p-3 shadow-sm top-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl">
                  {item.icon}
                </div>
              </div>

              <div className="px-6 pb-8">
                <h3 className="text-2xl font-serif font-bold text-[#2C1F14] mb-2">
                  {item.name}
                </h3>
                <p className="text-[#A68966] text-[10px] font-bold uppercase tracking-widest mb-4">
                  {item.title}
                </p>
                <p className="text-sm text-[#6B5645] leading-relaxed opacity-80">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 p-10 bg-[#F9F6F0] rounded-[3rem] border border-[#E2D9CC]/50 flex items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-[#2C1F14] rounded-full flex items-center justify-center shrink-0">
            <Leaf className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#2C1F14] mb-1">
              Эрүүл мэндийн ач холбогдол
            </h4>
            <p className="text-sm text-[#6B5645] leading-relaxed">
              Цагаан идээ нь хүний биеийн дархлааг дэмжих, кальциар хангах, хоол
              боловсруулах системийг цэвэрлэх байгалийн шилдэг бүтээгдэхүүн юм.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
