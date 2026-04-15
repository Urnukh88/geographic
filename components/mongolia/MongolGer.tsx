"use client";
import { motion } from "framer-motion";
import { Info, Home, Wind, Sun } from "lucide-react";

export default function GerSection() {
  const gerParts = [
    {
      name: "Тооно (Toono)",
      desc: "Гэрийн хамгийн дээд хэсэг бөгөөд нарны цаг, агааржуулалтын үүрэг гүйцэтгэнэ.",
      icon: <Sun size={20} />,
    },
    {
      name: "Хана (Khana)",
      desc: "Гэрийн үндсэн их бие, эвхэгддэг сараалжин бүтэц.",
      icon: <Home size={20} />,
    },
    {
      name: "Үнь (Uni)",
      desc: "Тооно болон ханыг холбож, гэрийн хэлбэрийг баригч урт моднууд.",
      icon: <Wind size={20} />,
    },
  ];

  return (
    <section
      id="ger"
      className="min-h-screen w-full py-24 px-12 lg:px-20 bg-[#FDFBF7]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-20 mb-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#7C4F2F] font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
              Architecture
            </span>
            <h2 className="text-6xl font-serif font-bold text-[#2C1F14] mb-8 leading-tight">
              Mongolian Ger & <br />{" "}
              <span className="text-[#7C4F2F]">Nomadic Culture</span>
            </h2>
            <p className="text-lg text-[#6B5645] leading-relaxed opacity-80 mb-8">
              Гэр бол нүүдэлчин инженерчлэлийн гайхамшиг юм. Хэдхэн минутын
              дотор буулгаж, барьж болдог энэхүү сууц нь байгаль дэлхийтэйгээ
              хамгийн зохицон оршдог архитектурын суут шийдэл юм.
            </p>
          </motion.div>

          <div className="relative">
            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="/mongol-ger.jpg"
                className="object-cover w-full h-full"
                alt="Mongolian Ger"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-32 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <h3 className="text-2xl font-serif font-bold text-[#2C1F14] mb-6">
              Гэрийн бүтэц
            </h3>
            {gerParts.map((part, index) => (
              <motion.div
                key={part.name}
                whileHover={{ x: 10 }}
                className="p-6 bg-white border border-[#E2D9CC] rounded-[2rem] shadow-sm hover:border-[#7C4F2F] transition-all cursor-default"
              >
                <div className="flex items-center gap-4 mb-2 text-[#7C4F2F]">
                  {part.icon}
                  <h4 className="font-bold">{part.name}</h4>
                </div>
                <p className="text-sm text-[#8C745A] leading-relaxed">
                  {part.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative lg:col-span-8">
            <div className="h-full min-h-[500px] rounded-[4rem] overflow-hidden shadow-xl border-8 border-white">
              <img
                src="/gerin-butets.jpeg"
                className="object-cover w-full h-full"
                alt="Inside Ger"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute max-w-sm text-white bottom-10 left-10">
                <h4 className="mb-4 font-serif text-3xl font-bold">
                  Өдөр тутмын амьдрал
                </h4>
                <p className="text-sm italic leading-relaxed opacity-90">
                  Гэр доторх амьдрал нарны хөдөлгөөнөөр зохицуулагддаг. Хойморт
                  хамгийн хүндтэй зочин, зүүн талд эрэгтэйчүүд, баруун талд
                  эмэгтэйчүүдийн эд зүйлс байрладаг.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Нүүдэлчин ёс заншил - Жижиг картууд */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-[#F2EDE4] p-10 rounded-[3rem] text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 bg-white rounded-full shadow-sm">
              🍵
            </div>
            <h5 className="mb-4 font-bold">Sacred Hospitality</h5>
            <p className="text-sm text-[#6B5645] leading-relaxed italic">
              Хээр яваа ямар ч хүнд гэрийн үүд үргэлж нээлттэй бөгөөд халуун
              цай, хоолоор дайлах нь Монгол хүний ёс юм.
            </p>
          </div>
          <div className="bg-[#7C4F2F] p-10 rounded-[3rem] text-center text-white">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 rounded-full bg-white/10">
              🏕️
            </div>
            <h5 className="mb-4 font-bold">Otor (Отор)</h5>
            <p className="text-sm italic leading-relaxed opacity-80">
              Малын бэлчээр дагаж жилд дөрвөн удаа нүүдэллэх нь нүүдэлчин
              амьдралын мөн чанар юм.
            </p>
          </div>
          <div className="bg-[#EAE2D5] p-10 rounded-[3rem] text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 bg-white rounded-full shadow-sm">
              🥛
            </div>
            <h5 className="mb-4 font-bold">Dairy Culture</h5>
            <p className="text-sm text-[#6B5645] leading-relaxed italic">
              Монголчууд таван хошуу малынхаа сүүгээр 30 гаруй төрлийн цагаан
              идээ боловсруулдаг.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
