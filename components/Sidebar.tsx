"use client";

import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Trophy,
  Compass,
  Map,
  Swords,
  Flag,
  Gamepad2,
  Mountain,
  Newspaper,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Нүүр хуудас", icon: Home },
  { href: "/mongolia", label: "Монгол", icon: Mountain },
  { href: "/flags", label: "Далбаанууд", icon: Flag },
  { href: "/flag-quiz", label: "Далбаа таах", icon: Gamepad2 },
  { href: "/compare", label: "Харьцуулах", icon: ArrowLeftRight },
  { href: "/explore", label: "Судлах", icon: Compass },
  { href: "/quiz", label: "Тест шалгалт", icon: BookOpen },
  { href: "/challenge", label: "Өрсөлдөх", icon: Swords },
  { href: "/leaderboard", label: "Тэргүүлэгчид", icon: Trophy },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-[#E2D9CC] bg-[#FDFBF7] px-5 py-10 text-[#4A3728]">
      <div className="px-2 mb-10">
        <div className="flex items-center gap-3 mb-2 text-[#7C4F2F]">
          <Map size={28} strokeWidth={2.5} />
          <h1 className="text-2xl font-serif font-bold text-[#2C1F14] tracking-tight">
            Атлас
          </h1>
        </div>
        <p className="text-[10px] text-[#A68966] uppercase tracking-[0.2em] font-bold">
          Дэлхийг судлаарай
        </p>
      </div>

      <nav className="flex flex-col gap-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm transition-all duration-300 group ${
                active
                  ? "bg-[#7C4F2F] text-[#FDFBF7] shadow-lg shadow-[#7C4F2F]/20"
                  : "text-[#6B5645] hover:bg-[#F2EDE4] hover:text-[#2C1F14]"
              }`}
            >
              <Icon
                size={20}
                className={
                  active
                    ? "text-[#FDFBF7]"
                    : "text-[#A68966] group-hover:text-[#7C4F2F]"
                }
              />
              <span
                className={`font-serif font-medium ${
                  active ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}

        <div className="px-2 mt-3 mb-1">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#C4A882] font-bold">
            Мэдээ
          </p>
        </div>

        <Link
          href="/GeoNewsSidebar"
          className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm transition-all duration-300 group ${
            pathname.startsWith("/GeoNewsSidebar")
              ? "bg-[#7C4F2F] text-[#FDFBF7] shadow-lg shadow-[#7C4F2F]/20"
              : "text-[#6B5645] hover:bg-[#F2EDE4] hover:text-[#2C1F14]"
          }`}
        >
          <Newspaper
            size={20}
            className={
              pathname.startsWith("/GeoNewsSidebar")
                ? "text-[#FDFBF7]"
                : "text-[#A68966] group-hover:text-[#7C4F2F]"
            }
          />
          <div className="flex flex-col">
            <span
              className={`font-serif font-medium leading-tight ${
                pathname.startsWith("/GeoNewsSidebar")
                  ? "opacity-100"
                  : "opacity-80 group-hover:opacity-100"
              }`}
            >
              Дэлхийн мэдээ
            </span>
            <span className="text-[10px] opacity-50 font-normal">
              ● Шинэчлэгдэж байна
            </span>
          </div>
        </Link>
      </nav>

      <div className="px-2 mt-auto">
        <div className="relative p-6 rounded-[2rem] bg-[#F2EDE4]/60 border border-[#E2D9CC] overflow-hidden group">
          <div className="absolute -right-2 -top-2 text-[#7C4F2F]/5 group-hover:scale-110 transition-transform">
            <Compass size={80} />
          </div>
          <p className="relative z-10 text-[11px] leading-relaxed text-[#8C745A] font-serif italic">
            "Дэлхий ертөнц бол уншаагүй байгаа ном юм."
          </p>
          <div className="mt-3 h-0.5 w-8 bg-[#7C4F2F]/30 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
