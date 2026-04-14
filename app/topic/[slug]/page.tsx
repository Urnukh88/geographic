"use client";
import {
  Users,
  Globe,
  TrendingUp,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Info,
  BookOpen,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { topics, categories } from "@/lib/data";
import { notFound } from "next/navigation";

export default function TopicDetail({ params }: { params: { slug: string } }) {
  // Бүх категориос хайж тухайн сэдвийг олох
  let currentTopic: any = null;
  let parentCategory: any = null;

  Object.keys(topics).forEach((catSlug) => {
    const found = topics[catSlug].find((t: any) => t.slug === params.slug);
    if (found) {
      currentTopic = found;
      parentCategory = categories.find((c) => c.slug === catSlug);
    }
  });

  if (!currentTopic) notFound();

  // Хүн амын сэдэв мөн эсэхийг шалгах
  const isPopulation = params.slug === "world-population";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header / Navigation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href={`/category/${parentCategory?.slug || ""}`}
          className="flex items-center gap-2 text-[#7A6A58] hover:text-[#7C4F2F] transition-all group w-fit"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {parentCategory?.name || "Ангилал"} руу буцах
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F8F5F0] text-[#7C4F2F] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-[#1A1209]">
          {currentTopic.title}
        </h1>
        <p className="text-[#7A6A58] max-w-2xl mx-auto text-lg leading-relaxed">
          {currentTopic.description}
        </p>
      </motion.div>

      {isPopulation ? (
        /* Дэлхийн хүн амын тусгай дизайн */
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#1A1209] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
            >
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                Одоогийн хүн ам
              </h3>
              <div className="text-4xl font-bold font-mono">8,104,210,342</div>
              <p className="text-green-400 text-xs mt-2 flex items-center gap-1 font-sans">
                <TrendingUp size={14} /> +0.88% жилийн өсөлт
              </p>
              <Users
                className="absolute right-[-10px] bottom-[-10px] opacity-10"
                size={120}
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-[#E2D9CC] p-8 rounded-3xl shadow-sm relative overflow-hidden"
            >
              <h3 className="text-[#7A6A58] text-sm uppercase tracking-widest mb-2">
                Дундаж наслалт
              </h3>
              <div className="text-4xl font-bold text-[#1A1209]">73.4 нас</div>
              <p className="text-[#7A6A58] text-xs mt-2">
                Дэлхийн дундаж (2024)
              </p>
              <Activity
                className="absolute right-[-10px] bottom-[-10px] text-[#7C4F2F] opacity-5"
                size={100}
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#7C4F2F] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
            >
              <h3 className="text-white/70 text-sm uppercase tracking-widest mb-2">
                Хамгийн их хүн амтай
              </h3>
              <div className="text-2xl font-bold">Энэтхэг улс</div>
              <p className="text-white/60 text-xs mt-2">
                1.428 тэрбум хүн амтай
              </p>
              <MapPin
                className="absolute right-[-10px] bottom-[-10px] opacity-20"
                size={100}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#E2D9CC]">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#1A1209] mb-4">
                  Хүн амын бөөгнөрөл
                </h2>
                <p className="text-[#7A6A58] leading-relaxed italic border-l-4 border-[#7C4F2F] pl-4">
                  "Дэлхийн хүн ам жигд бус тархсан байдаг. Нийт хүмүүсийн 90% нь
                  дэлхийн хуурай газрын ердөө 10%-д нь амьдардаг."
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Хотжилт", value: "57%" },
                  { label: "Залуу үе (0-14 нас)", value: "25%" },
                  { label: "Ажиллах хүчин", value: "65%" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-[#1A1209] uppercase tracking-wide">
                      <span>{item.label}</span>
                      <span className="text-[#7C4F2F]">{item.value}</span>
                    </div>
                    <div className="h-3 bg-[#F0EAE0] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.value }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#7C4F2F]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7C4F2F] to-[#C4A882] rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-[#F8F5F0] rounded-3xl p-10 flex flex-col items-center justify-center border border-[#E2D9CC] aspect-square lg:aspect-video">
                <Globe
                  className="text-[#7C4F2F] mb-4 animate-spin-slow"
                  size={64}
                />
                <p className="text-[#1A1209] font-serif font-bold text-center">
                  Интерактив Газрын зураг
                </p>
                <p className="text-[#7A6A58] text-sm text-center mt-2 px-6">
                  Удахгүй: Улс орнуудын хүн амын нягтаршлыг харах боломжтой
                  болно.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Бусад сэдвүүдэд харагдах ерөнхий дизайн */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentTopic.facts.map((fact: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-[#E2D9CC] flex gap-4 items-start"
            >
              <div className="p-2 bg-[#F8F5F0] rounded-lg text-[#7C4F2F]">
                <Info size={20} />
              </div>
              <p className="text-[#1A1209] leading-relaxed">{fact}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer Action */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#F8F5F0] p-8 rounded-3xl border border-[#E2D9CC] text-center"
      >
        <h3 className="text-xl font-serif text-[#1A1209] mb-4">
          Мэдлэгээ баталгаажуулах уу?
        </h3>
        <Link
          href={`/quiz/${parentCategory?.slug || ""}`}
          className="inline-flex items-center gap-2 bg-[#7C4F2F] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#5D3A22] transition-colors shadow-lg shadow-orange-900/10"
        >
          Энэ ангиллын тестийг эхлүүлэх <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
}
