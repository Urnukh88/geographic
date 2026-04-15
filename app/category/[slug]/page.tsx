"use client";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Trophy,
  ArrowRight,
  Star,
  Map as MapIcon,
} from "lucide-react";
import Link from "next/link";
import { categories, topics } from "@/lib/data";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryTopics = topics[params.slug] || [];

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[#7A6A58] text-sm mb-8 hover:text-[#7C4F2F] transition-all group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />{" "}
          Буцах
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-white border border-[#E2D9CC] p-8 md:p-10 shadow-sm"
          >
            <div className="relative z-10">
              <span className="block mb-4 text-5xl animate-bounce-slow">
                {category.icon}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#1A1209] mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-[#7A6A58] leading-relaxed max-w-xl">
                {category.description} Энэхүү ангилалд багтсан сэдвүүдийг
                судалж, өөрийн мэдлэгээ тэлээрэй.
              </p>
            </div>

            <MapIcon
              size={180}
              className="absolute right-[-20px] bottom-[-20px] text-[#7C4F2F] opacity-5 -rotate-12"
            />
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#1A1209] flex items-center gap-2">
                <BookOpen size={22} className="text-[#7C4F2F]" /> Судлах сэдвүүд
              </h2>
              <span className="text-sm text-[#7A6A58] bg-[#EDE5D8] px-3 py-1 rounded-full">
                {categoryTopics.length} хичээл
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {categoryTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-2xl p-6 border border-[#E2D9CC] hover:border-[#7C4F2F] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg text-[#1A1209] group-hover:text-[#7C4F2F] transition-colors">
                      {topic.title}
                    </h3>
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  </div>

                  <p className="text-[#7A6A58] text-sm mb-4 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {topic.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] uppercase tracking-wider bg-[#F8F5F0] text-[#7C4F2F] px-2 py-1 rounded-md font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 space-y-2">
                    {topic.facts.slice(0, 2).map((fact, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2 text-xs text-[#4A3F35]"
                      >
                        <span className="text-[#4A7C59] mt-0.5">●</span> {fact}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/topic/${topic.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F8F5F0] text-[#7C4F2F] font-serif text-sm group-hover:bg-[#7C4F2F] group-hover:text-white transition-all cursor-pointer"
                  >
                    Дэлгэрэнгүй үзэх <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {categoryTopics.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#C4A882]">
                <p className="font-serif text-[#7A6A58] text-lg">
                  Удахгүй шинэ сэдвүүд нэмэгдэнэ...
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1A1209] rounded-3xl p-6 text-white relative overflow-hidden group shadow-lg">
            <div className="relative z-10">
              <h3 className="mb-2 font-serif text-xl">Мэдлэгээ шалгах уу?</h3>
              <p className="mb-6 text-sm text-gray-400">
                Тухайн ангиллын асуултуудад хариулж XP оноо цуглуулаарай.
              </p>
              <Link
                href={`/quiz?category=${params.slug}`}
                className="inline-flex items-center gap-2 bg-[#7C4F2F] px-6 py-3 rounded-xl font-serif text-sm hover:bg-[#96633E] transition-all w-full justify-center"
              >
                Тест эхлүүлэх <ArrowRight size={16} />
              </Link>
            </div>
            <Trophy
              size={100}
              className="absolute right-[-20px] top-[-20px] text-white opacity-10 group-hover:rotate-12 transition-transform"
            />
          </div>

          <div className="bg-[#FFF9F2] p-6 rounded-3xl border border-[#F0DDD0]">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Lightbulb size={20} className="animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase">
                Та мэдсэн үү?
              </span>
            </div>
            <p className="text-[#7A6A58] text-sm leading-relaxed italic">
              "
              {categoryTopics[0]?.facts[0] ||
                "Газарзүй бол дэлхий ертөнцийг таних хамгийн том цонх юм."}
              "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
