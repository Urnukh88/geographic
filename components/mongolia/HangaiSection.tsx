"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trees, Mountain, Droplets, Cloud } from "lucide-react";

export default function HangaiSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const highlights = [
    {
      title: "Ой мод",
      desc: "Хөвсгөл, Хэнтийн нурууны өтгөн тайга, шинэсэн ой.",
      icon: <Trees className="text-emerald-700" />,
    },
    {
      title: "Тунгалаг ус",
      desc: "Мянга мянган гол горхи, нуур цөөрмийн эх ундарга.",
      icon: <Droplets className="text-blue-600" />,
    },
    {
      title: "Сүрлэг уулс",
      desc: "Мөнх цаст оргилууд болон хад асга бүхий өндөр уулс.",
      icon: <Mountain className="text-slate-600" />,
    },
  ];

  return (
    <section
      ref={ref}
      id="hangai"
      className="min-h-screen w-full py-32 bg-[#F7F9F6] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex flex-col items-end justify-between gap-8 mb-24 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-emerald-800 font-bold tracking-[0.5em] text-[10px] uppercase block mb-4 italic">
              The Alpine Heartland
            </span>
            <h2 className="text-7xl font-serif font-bold text-[#1A2E1A] leading-tight mb-8">
              Хөхөмдөг <br />{" "}
              <span className="text-emerald-700">Хангайн нутаг</span>
            </h2>
            <p className="text-[#4A5D4A] text-lg leading-relaxed opacity-90">
              Хангай бол Монгол орны усны хагалбар, ой хөвч, ан амьтдын диваажин
              юм. Цэнгэг агаар, зүлэг ногоон толгод нь нүүдэлчдийн зуслангийн
              хамгийн таатай бүс юм.
            </p>
          </motion.div>

          <div className="flex gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md text-emerald-700">
              <Cloud size={20} />
            </div>
            <div className="flex items-center justify-center w-12 h-12 font-serif font-bold bg-white rounded-full shadow-md text-emerald-700">
              18°C
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-12 mb-32 lg:grid-cols-12">
          <div className="lg:col-span-8 relative rounded-[4rem] overflow-hidden shadow-2xl group">
            <motion.div
              style={{ y }}
              className="h-[120%] w-full absolute top-[-10%] left-0"
            >
              <img
                src="/huvsgul.webp"
                className="object-cover w-full h-full scale-110"
                alt="Hangai Mountain"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E1A]/60 via-transparent to-transparent" />
            <div className="absolute text-white bottom-12 left-12">
              <h4 className="mb-2 font-serif text-3xl font-bold">
                Хөвсгөл нуур
              </h4>
              <p className="max-w-xs text-sm font-light tracking-wide opacity-80">
                "Монголын Швейцарь" хэмээгдэх хөх сувд, дэлхийн цэвэр усны нөөц.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-[3rem] border border-emerald-100 hover:border-emerald-500 shadow-sm transition-all group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-6 transition-colors duration-500 bg-emerald-50 rounded-2xl group-hover:bg-emerald-700 group-hover:text-white">
                  {item.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-[#1A2E1A] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white ${i % 2 === 0 ? "mt-8" : ""}`}
            >
              <img
                src={`https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400&h=${i % 2 === 0 ? "600" : "400"}`}
                className="object-cover w-full h-full"
                alt="Landscape"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
