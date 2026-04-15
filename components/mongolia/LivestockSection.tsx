"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const livestockData = [
  {
    name: "Морь",
    title: "'Эрдэнэт хүлэг'",
    desc: "Монгол хүний хамгийн дотны анд, хурд хүч, эр зоригийн бэлгэдэл.",
    image: "mori.jpeg",
    color: "bg-[#FDFBF7]",
    icon: "🐎",
  },
  {
    name: "Тэмээ",
    title: "'Говийн гайхамшиг'",
    desc: "Говь цөлийн хүнд нөхцөлд тэсвэртэй, алтан говийн чимэг.",
    image: "/temee.jpeg",
    color: "bg-[#F3EFE7]",
    icon: "🐫",
  },
  {
    name: "Үхэр",
    title: "'Өгөөж баян'",
    desc: "Өгөөж шимээрээ тэжээгч, уул тал нутгийн баялаг.",
    image: "/uher.jpeg",
    color: "bg-[#FDFBF7]",
    icon: "🐄",
  },
  {
    name: "Хонь",
    title: "'Хишиг буян'",
    desc: "Хүнсний гол эх үүсвэр, эртний нүүдэлчдийн хишиг буян.",
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80",
    color: "bg-[#F3EFE7]",
    icon: "🐑",
  },
  {
    name: "Ямаа",
    title: "'Ноолуурын эх'",
    desc: "Дэлхийд гайхагдсан ноолуурын үнэт түүхий эд, сор.",
    image: "/ymaa.jpg",
    color: "bg-[#FDFBF7]",
    icon: "🐐",
  },
];

export default function LivestockSection() {
  return (
    <section
      id="livestock"
      className="min-h-screen w-full py-24 px-12 lg:px-20 bg-[#F9F6F0]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative w-full h-[400px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
          <img
            src="/nuudel.jpg"
            className="object-cover w-full h-full"
            alt="Livestock Banner"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <span className="text-[#A68966] font-bold tracking-[0.3em] text-[10px] uppercase mb-4">
              Heritage Hub
            </span>
            <h2 className="mb-4 font-serif text-6xl font-bold text-white">
              Мал аж ахуй & <br /> Нүүдэлчин соёл
            </h2>
            <p className="max-w-xl text-lg italic text-white/70">
              "Таван хошуу мал: The living heartbeat of the nomadic steppe,
              sustaining life and spirit for millennia."
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mb-12">
          <div>
            <h3 className="text-4xl font-serif font-bold text-[#2C1F14]">
              Таван хошуу мал
            </h3>
            <p className="text-[#A68966] text-sm mt-2">
              The Five Noble Breeds of the Steppe
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#A68966] uppercase tracking-widest opacity-60">
            5 Artifacts found
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {livestockData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${item.color} p-8 rounded-[2.5rem] border border-[#E2D9CC]/50 shadow-sm hover:shadow-xl transition-all group`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="text-2xl font-serif font-bold text-[#2C1F14]">
                  {item.name}
                </h4>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <img
                  src={item.image}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  alt={item.name}
                />
              </div>

              <h5 className="font-bold text-[#7C4F2F] text-sm mb-2">
                {item.title}
              </h5>
              <p className="text-[#6B5645] text-sm leading-relaxed mb-6 opacity-80">
                {item.desc}
              </p>

              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2C1F14] group-hover:text-[#7C4F2F] transition-colors">
                Дэлгэрэнгүй{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
