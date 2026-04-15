"use client";
import { useState, useEffect } from "react";
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
  Compass,
  Mountain,
  Waves,
  Building2,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { topics, categories } from "@/lib/data";
import { notFound } from "next/navigation";

export default function TopicDetail({ params }: { params: { slug: string } }) {
  const [aiContent, setAiContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  let currentTopic: any = null;
  let parentCategory: any = null;

  Object.keys(topics).forEach((catSlug) => {
    const found = topics[catSlug].find((t: any) => t.slug === params.slug);
    if (found) {
      currentTopic = found;
      parentCategory = categories.find((c) => c.slug === catSlug);
    }
  });

  useEffect(() => {
    if (currentTopic) {
      generateDetailedContent();
    }
  }, [params.slug]);

  const generateDetailedContent = async () => {
    setLoading(true);
    setAiContent("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Чи газарзүйн сонирхолтой баримт тайлбарлагч. Мэдээллийг өгөхдөө: 1. Зөвхөн Монгол хэлээр. 2. Хамгийн сонирхолтой 5 баримтыг сонгож, тус бүрийг нэг богино өгүүлбэрээр тайлбарла. 3. Нийт 80-90 үгэнд багтаа. 4. Баримт бүрийг шинэ мөрөөс '-' тэмдэгтээр эхлүүлж, цэгцтэй бич.",
              },
              {
                role: "user",
                content: `"${currentTopic.title}" сэдвээр хамгийн сонирхолтой 5 баримтыг бичнэ үү.`,
              },
            ],
          }),
        },
      );

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      const finalContent = data.choices[0].message.content;
      setAiContent(finalContent);
    } catch (err: any) {
      console.error(err);
      setAiContent("Мэдээлэл ачаалахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentTopic) notFound();

  const getIcon = () => {
    if (params.slug.includes("river")) return <Waves size={32} />;
    if (params.slug.includes("mountain")) return <Mountain size={32} />;
    if (params.slug.includes("city") || params.slug.includes("population"))
      return <Building2 size={32} />;
    return <Compass size={32} />;
  };

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto space-y-12 bg-[#FDFBF7]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href={`/category/${parentCategory?.slug}`}
          className="flex items-center gap-2 text-[#7A6A58] hover:text-[#7C4F2F] font-bold text-sm bg-white px-4 py-2 rounded-full border border-[#E2D9CC] shadow-sm w-fit"
        >
          <ArrowLeft size={16} /> {parentCategory?.name} руу буцах
        </Link>
      </motion.div>

      <div className="space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white text-[#7C4F2F] shadow-xl border border-[#F0EAE0]">
          {getIcon()}
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-[#1A1209] tracking-tight">
          {currentTopic.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] border border-[#E2D9CC] shadow-sm min-h-[500px]"
          >
            <div className="flex items-center gap-3 mb-8 text-[#7C4F2F] border-b border-[#F0EAE0] pb-6">
              <BookOpen size={28} />
              <h2 className="text-2xl font-serif font-bold italic text-[#1A1209]">
                Дэлгэрэнгүй судалгаа
              </h2>
            </div>

            {loading && aiContent === "" ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="animate-spin text-[#7C4F2F]" size={40} />
                <p className="text-[#7A6A58] font-serif animate-pulse">
                  Мэдлэгийн сангаас мэдээлэл хайж байна...
                </p>
              </div>
            ) : (
              <div className="prose prose-stone max-w-none">
                <p className="text-[#4A3F35] leading-relaxed text-lg whitespace-pre-line font-serif">
                  {aiContent}
                  {loading && (
                    <span className="inline-block w-1.5 h-5 ml-1 bg-[#7C4F2F] animate-pulse align-middle" />
                  )}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1209] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="mb-4 font-serif text-2xl italic">
                Мэдлэгээ шалгах
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-gray-400">
                Энэхүү сэдвийг бүрэн судалж дууссан бол тестээ эхлүүлээрэй.
              </p>
              <Link
                href={{
                  pathname: "/quiz",
                  query: { category: parentCategory?.slug },
                }}
                className="bg-[#7C4F2F] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#92623D] transition-all"
              >
                Тест рүү үсрэх <ArrowRight size={18} />
              </Link>
            </div>
            <TrendingUp
              className="absolute text-white -right-4 -bottom-4 opacity-5"
              size={150}
            />
          </motion.div>

          <div className="bg-[#F8F5F0] p-8 rounded-[3rem] border border-[#E2D9CC]">
            <h4 className="font-serif font-bold text-[#1A1209] mb-6 flex items-center gap-2">
              <Info size={18} className="text-[#7C4F2F]" /> Төвлөрөх баримтууд
            </h4>
            <div className="space-y-4">
              {currentTopic.facts.slice(0, 3).map((f: string, i: number) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl text-xs text-[#4A3F35] border border-[#E2D9CC] leading-relaxed shadow-sm"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
