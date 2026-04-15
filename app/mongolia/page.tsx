"use client";
import { motion } from "framer-motion";
import HistorySection from "@/components/mongolia/HistorySection";
import LivestockSection from "@/components/mongolia/LivestockSection";
import GerSection from "@/components/mongolia/MongolGer";
import CultureSection from "@/components/mongolia/CultureSection";
import DairySection from "@/components/mongolia/TsagaanIdee";
import LongSongSection from "@/components/mongolia/Music";
import HangaiSection from "@/components/mongolia/HangaiSection";
import GobiSection from "@/components/mongolia/GobiSection";
import WrestlingSection from "@/components/mongolia/Wrestling";
import ClothingSection from "@/components/mongolia/Deel";
import ArcherySection from "@/components/mongolia/ArcherySection";
import HorseRacingSection from "@/components/mongolia/HorseRacing";
import { ChevronRight } from "lucide-react";

export default function MongoliaFinalPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { name: "Түүх & Хаад", id: "history" },
    { name: "Мал аж ахуй", id: "livestock" },
    { name: "Монгол гэр", id: "ger" },
    { name: "Ёс заншил", id: "culture" },
    { name: "Цагаан идээ", id: "dairy" },
    { name: "Уртын дуу", id: "long-song" },
    { name: "Хангай", id: "hangai" },
    { name: "Говь", id: "gobi" },
    { name: "Монгол Бөx", id: "wrestling" },
    { name: "Үндэсний хувцас", id: "clothing" },
    { name: "Сур харваа", id: "archery" },
    { name: "Морь уралдаан", id: "horse-racing" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] relative font-sans scroll-smooth">
      <section className="relative flex items-center justify-center w-full h-screen px-12 lg:px-20">
        <div className="grid items-center w-full grid-cols-1 gap-16 max-w-7xl lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#7C4F2F]" />
              <span className="text-[#A68966] font-bold tracking-[0.4em] text-[10px] uppercase">
                Үндэсний өв соёл
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-serif font-bold text-[#2C1F14] leading-[1.1] mb-8">
              Монгол <br /> <span className="text-[#7C4F2F]">Улс</span>
            </h1>

            <p className="text-xl text-[#6B5645] leading-relaxed max-w-lg mb-12 opacity-80">
              Мөнх хөх тэнгэрийн доорх нүүдэлчин соёл иргэншил, агуу түүх болон
              эртний уламжлалт өв соёлын ертөнцөөр аялаарай.
            </p>

            <div className="grid max-w-lg grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center justify-between px-6 py-4 bg-white border border-[#E2D9CC] rounded-full hover:border-[#7C4F2F] hover:shadow-lg transition-all text-left"
                >
                  <span className="font-bold text-[#2C1F14] group-hover:text-[#7C4F2F] text-[13px]">
                    {item.name}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-[#7C4F2F] opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative aspect-square w-full max-w-[450px] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img
                src="/mongol.jpg"
                className="object-cover w-full h-full"
                alt="Mongolia"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#7C4F2F] text-white p-8 rounded-[3rem] shadow-2xl max-w-[260px] z-10">
              <p className="font-serif text-sm italic leading-relaxed">
                "Бидний бие мөхөвч, бидний төр улс үүр үүрд мөнхөрнө."
              </p>
              <p className="mt-4 text-[9px] font-bold opacity-50 uppercase tracking-[0.2em]">
                Их Эзэн Чингис Хаан
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <HistorySection />
      <LivestockSection />
      <GerSection />
      <CultureSection />
      <DairySection />
      <LongSongSection />
      <HangaiSection />
      <GobiSection />
      <WrestlingSection />
      <ClothingSection />
      <ArcherySection />
      <HorseRacingSection />
    </div>
  );
}
