"use client";
import { categories } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-serif text-[#1A1209] mb-3">Судлах</h1>
        <p className="text-[#7A6A58]">
          Газарзүйн бүх ангиллуудыг эндээс сонгон гүнзгийрүүлэн судлаарай.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/category/${cat.slug}`} className="group">
              <div className="h-full p-8 rounded-[32px] bg-white border border-[#E2D9CC] hover:border-[#7C4F2F] hover:shadow-xl hover:shadow-[#7C4F2F]/5 transition-all flex flex-col items-start gap-6 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-500">
                  {cat.icon}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#F8F5F0] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1A1209] mb-2 group-hover:text-[#7C4F2F] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#7A6A58] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center text-[#7C4F2F] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Судлах →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
