"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function MiniSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results =
    query.trim().length > 1
      ? categories
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.description.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative group">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966] group-focus-within:text-[#7C4F2F] transition-colors"
        />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Сэдэв, улс орнууд хайх..."
          className="w-full pl-12 pr-12 py-3 text-sm rounded-2xl border border-[#E2D9CC] bg-[#F8F5F0] focus:outline-none focus:border-[#7C4F2F] focus:bg-white focus:shadow-lg focus:shadow-[#7C4F2F]/5 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A68966] hover:text-[#1A1209]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-[#E2D9CC] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <div className="py-2">
              <p className="px-4 py-1 text-[10px] font-bold text-[#A68966] uppercase tracking-wider">
                Илэрцүүд
              </p>
              {results.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#F8F5F0] transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#1A1209]">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-[#7A6A58] truncate">
                      {cat.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-[#7A6A58]">
                Уучлаарай, илэрц олдсонгүй 😕
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
