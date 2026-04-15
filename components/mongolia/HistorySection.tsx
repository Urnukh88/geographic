"use client";
import { motion } from "framer-motion";
import { Crown, Landmark, History, ShieldCheck } from "lucide-react";

export default function HistorySection() {
  const stats = [
    { label: "Их Монгол Улс", val: "1206", icon: <Landmark size={20} /> },
    { label: "Эзэнт Гүрэн", val: "33M км²", icon: <Crown size={20} /> },
    { label: "Түүхэн Хаад", val: "37", icon: <History size={20} /> },
  ];

  return (
    <section
      id="history"
      className="min-h-screen w-full py-32 bg-[#121212] text-[#F3EFE7] overflow-hidden flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <h2 className="absolute -top-20 -left-10 text-[12rem] font-black opacity-5 italic select-none">
              KHAN
            </h2>

            <div className="relative aspect-[3/4] w-full max-w-[450px] rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(166,137,102,0.2)] border-[1px] border-white/10">
              <img
                src="Chinggis-Khaan.jpg"
                className="object-cover w-full h-full transition-all duration-1000 grayscale hover:grayscale-0"
                alt="Chinggis Khaan"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-10 -right-4 lg:-right-10 p-8 bg-[#A68966] rounded-[3rem] shadow-2xl border-4 border-[#121212]"
            >
              <ShieldCheck size={32} className="mb-2 text-[#121212]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#121212]">
                The Great Wall Eraser
              </p>
              <h4 className="text-xl font-serif font-bold text-[#121212]">
                Чингис Хаан
              </h4>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#A68966]" />
              <span className="text-[#A68966] font-bold tracking-[0.4em] text-[10px] uppercase">
                The Great Empire
              </span>
            </div>

            <h2 className="text-7xl font-serif font-bold leading-[1.1] mb-8">
              Мөнх Тэнгэрийн <br />{" "}
              <span className="text-[#A68966]">Хүчин Дор</span>
            </h2>

            <p className="text-lg text-[#F3EFE7]/70 leading-relaxed mb-12 font-light italic">
              "Миний бие зүдэрвээс зүдэртугай, миний төр бүү зүдэртугай." -
              Дэлхийн түүхийг өөрчилсөн нүүдэлчдийн агуу их өв соёл.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-6 text-center transition-all border bg-white/5 border-white/10 rounded-3xl hover:bg-white/10"
                >
                  <div className="text-[#A68966] flex justify-center mb-3">
                    {s.icon}
                  </div>
                  <h5 className="text-xl font-bold text-white">{s.val}</h5>
                  <p className="text-[9px] uppercase tracking-widest opacity-50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="p-8 bg-gradient-to-r from-[#A68966]/20 to-transparent border-l-4 border-[#A68966] rounded-r-3xl">
                <h4 className="mb-2 font-serif text-xl font-bold">
                  Нэгдсэн Улс
                </h4>
                <p className="text-sm opacity-60">
                  1206 онд Тэмүүжин Гүрэн дахиныг нэгтгэж Их Монгол Улсыг
                  тунхаглав.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
