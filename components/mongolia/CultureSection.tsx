"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Sun, Heart, ShieldCheck, Stars } from "lucide-react";

const traditions = [
  {
    title: "Ахмадаа хүндэтгэх",
    desc: "Монголчууд ахмад хүний үгийг сонсож, суудлаа тавьж өгөх, мэндлэх хүндэтгэх ёсыг хамгийн түрүүнд тавьдаг.",
    icon: <Users size={24} />,
    delay: 0.1,
  },
  {
    title: "Байгаль дэлхийгээ хайрлах",
    desc: "Уул усны эхийг бохирдуулахгүй байх, ан амьтныг зүй зохистой агнах гэх мэт байгальтайгаа зохицон амьдрах ёс.",
    icon: <Sun size={24} />,
    delay: 0.2,
  },
  {
    title: "Зочломтгой зан",
    desc: "Гэрт ирсэн хэнд ч цай, хоол барих нь Монгол хүний заавал биелүүлэх ёс бөгөөд энэ нь нүүдэлчдийн нөхөрлөлийн үндэс юм.",
    icon: <Heart size={24} />,
    delay: 0.3,
  },
  {
    title: "Цээрлэх ёсон",
    desc: "Босгон дээр гишгэхгүй байх, галд ус хийхгүй байх гэх мэт амьдралын зөв хэвшил, зан үйлийг зааж өгдөг цээрүүд.",
    icon: <ShieldCheck size={24} />,
    delay: 0.4,
  },
];

export default function CultureSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="min-h-screen w-full py-32 bg-[#1A120B] text-[#F3EFE7] overflow-hidden flex items-center justify-center relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7C4F2F] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3C2A21] blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-[1200px] px-10 relative z-10">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-6">
              <Stars className="text-[#A68966]" size={18} />
              <span className="text-[#A68966] font-bold tracking-[0.5em] text-[10px] uppercase">
                Heritage & Values
              </span>
            </div>
            <h2 className="mb-8 font-serif font-bold leading-tight text-7xl">
              Өвлөгдөн ирсэн <br />{" "}
              <span className="text-[#A68966]">Үнэт зүйлс</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#A68966] opacity-30" />
          </motion.div>
        </div>

        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-12">
          <motion.div style={{ y: imgY }} className="relative lg:col-span-5">
            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 aspect-[4/5] relative group">
              <img
                src="/ahmad-nastan.jpg"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                alt="Culture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-transparent opacity-60" />

              <div className="absolute p-6 border bottom-10 left-10 right-10 backdrop-blur-md bg-white/5 rounded-3xl border-white/10">
                <p className="font-serif text-sm italic opacity-80">
                  "Монгол хүн ёсоо алдвал төрөө алдана."
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-[#7C4F2F] rounded-full flex items-center justify-center p-6 text-center shadow-2xl z-20 border border-white/10"
            >
              <p className="text-white text-[11px] font-serif leading-tight">
                Эртний <br /> Монгол <br /> Сургаал
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: textY }}
            className="grid grid-cols-1 gap-6 lg:col-span-7 md:grid-cols-2"
          >
            {traditions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: item.delay, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(166, 137, 102, 0.4)",
                }}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all cursor-default group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#7C4F2F]/20 flex items-center justify-center mb-8 group-hover:bg-[#7C4F2F] transition-colors duration-500">
                  <div className="text-[#A68966] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h4 className="mb-4 font-serif text-xl font-bold">
                  {item.title}
                </h4>
                <p className="text-sm font-light leading-relaxed opacity-50">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
