"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Globe2, Loader2 } from "lucide-react";

export default function FlagsPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Бүгд");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const router = useRouter();

  const regions = ["Бүгд", "Asia", "Europe", "Americas", "Africa", "Oceania"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,currencies,languages,timezones,cca3",
        );
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCountries(
            data.sort((a: any, b: any) =>
              (a.name?.common || "").localeCompare(b.name?.common || ""),
            ),
          );
        }
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const s = localStorage.getItem("savedCountries");
    if (s) setSaved(JSON.parse(s));
  }, []);

  const toggleSave = (cca3: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved((prev) => {
      const next = prev.includes(cca3)
        ? prev.filter((c) => c !== cca3)
        : [...prev, cca3];
      localStorage.setItem("savedCountries", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const name = c.name?.common?.toLowerCase() || "";
      const matchesSearch = name.includes(search.toLowerCase());
      const matchesRegion =
        selectedRegion === "Бүгд" || c.region === selectedRegion;
      const matchesSaved = !showSaved || saved.includes(c.cca3);
      return matchesSearch && matchesRegion && matchesSaved;
    });
  }, [search, selectedRegion, countries, showSaved, saved]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#7C4F2F]">
        <Loader2 className="mb-4 animate-spin" size={48} />
        <p className="font-serif">Атлас мэдээллийг ачаалж байна...</p>
      </div>
    );

  return (
    <div className="min-h-screen px-6 py-10 mx-auto max-w-7xl">
      <div className="mb-12 space-y-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h1 className="text-4xl font-serif text-[#1A1209] flex items-center gap-3 font-bold">
            <Globe2 className="text-[#7C4F2F]" /> Атлас Судлах
          </h1>
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]"
              size={20}
            />
            <input
              type="text"
              placeholder="Улсын нэрээр хайх..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E2D9CC] bg-white focus:ring-2 focus:ring-[#7C4F2F]/20 outline-none font-serif shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-6 py-2.5 rounded-full font-serif text-sm transition-all ${
                selectedRegion === r
                  ? "bg-[#7C4F2F] text-white shadow-lg"
                  : "bg-white border border-[#E2D9CC] text-[#A68966] hover:border-[#7C4F2F]"
              }`}
            >
              {r === "Asia"
                ? "Ази"
                : r === "Europe"
                  ? "Европ"
                  : r === "Americas"
                    ? "Америк"
                    : r === "Africa"
                      ? "Африка"
                      : r === "Oceania"
                        ? "Номхон далай"
                        : r}
            </button>
          ))}

          <button
            onClick={() => setShowSaved(!showSaved)}
            className={`px-6 py-2.5 rounded-full font-serif text-sm transition-all flex items-center gap-2 ${
              showSaved
                ? "bg-[#7C4F2F] text-white shadow-lg"
                : "bg-white border border-[#E2D9CC] text-[#A68966] hover:border-[#7C4F2F]"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              stroke={showSaved ? "white" : "#7C4F2F"}
              strokeWidth="2"
              fill={showSaved ? "white" : "none"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Хадгалсан
            {saved.length > 0 && (
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${showSaved ? "bg-white/20" : "bg-[#F2EDE4]"}`}
              >
                {saved.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {showSaved && saved.length === 0 && (
        <div className="py-20 text-center">
          <div className="flex justify-center mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              stroke="#7C4F2F"
              strokeWidth="1.5"
              fill="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p className="font-serif text-[#A68966]">
            Хадгалсан улс байхгүй байна
          </p>
          <p className="font-serif text-sm text-[#C4A882] mt-2">
            Улсын карт дээрх зүрх товч дарж хадгална уу
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((country) => (
          <motion.div
            key={country.cca3}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            onClick={() => router.push(`/flags/${country.cca3}`)}
            className="group bg-white rounded-3xl border border-[#E2D9CC] overflow-hidden cursor-pointer transition-all relative"
          >
            <button
              onClick={(e) => toggleSave(country.cca3, e)}
              className="absolute z-10 flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-sm top-3 right-3 bg-white/90 backdrop-blur hover:scale-110"
            >
              <span className="text-base">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke="#7C4F2F"
                  strokeWidth="2"
                  fill={saved.includes(country.cca3) ? "#7C4F2F" : "none"}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
            </button>

            <div className="aspect-[16/10] overflow-hidden bg-[#F2EDE4]">
              <img
                src={country.flags?.svg}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                alt={country.name?.common}
              />
            </div>
            <div className="p-5 font-serif">
              <h3 className="text-lg text-[#1A1209] font-bold mb-1">
                {country.name?.common}
              </h3>
              <p className="text-sm text-[#A68966]">
                {country.capital?.[0] || "—"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
