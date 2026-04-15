"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe2,
  X,
  MapPin,
  Users,
  Coins,
  Languages,
  ExternalLink,
  Clock,
  Loader2,
} from "lucide-react";

export default function FlagsPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Бүгд");
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  const regions = ["Бүгд", "Asia", "Europe", "Americas", "Africa", "Oceania"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const url =
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,currencies,languages,timezones,cca3";

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          const sorted = data.sort((a: any, b: any) =>
            (a.name?.common || "").localeCompare(b.name?.common || ""),
          );
          setCountries(sorted);
        }
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const name = c.name?.common?.toLowerCase() || "";
      const matchesSearch = name.includes(search.toLowerCase());
      const matchesRegion =
        selectedRegion === "Бүгд" || c.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion, countries]);

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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((country) => (
          <motion.div
            layoutId={country.cca3}
            key={country.cca3}
            onClick={() => setSelectedCountry(country)}
            className="group bg-white rounded-3xl border border-[#E2D9CC] overflow-hidden hover:shadow-xl cursor-pointer transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#F2EDE4]">
              <img
                src={country.flags?.svg}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                alt=""
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

      <AnimatePresence>
        {selectedCountry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              layoutId={selectedCountry.cca3}
              className="bg-[#FDFBF7] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCountry(null)}
                className="absolute right-6 top-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-[#1A1209] hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="aspect-[2/1] w-full relative">
                <img
                  src={selectedCountry.flags?.svg}
                  className="object-cover w-full h-full shadow-inner"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
              </div>

              <div className="relative p-8 -mt-20 font-serif md:p-12">
                <div className="mb-8">
                  <h2 className="text-4xl text-[#1A1209] mb-1 font-bold">
                    {selectedCountry.name?.common}
                  </h2>
                  <p className="text-[#A68966]">
                    {selectedCountry.name?.official}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Нийслэл"
                    value={selectedCountry.capital?.[0]}
                  />

                  <InfoItem
                    icon={<Users size={18} />}
                    label="Хүн ам"
                    value={
                      selectedCountry.population
                        ? selectedCountry.population.toLocaleString()
                        : "Мэдээлэлгүй"
                    }
                  />
                  <InfoItem
                    icon={<Coins size={18} />}
                    label="Валют"
                    value={
                      selectedCountry.currencies
                        ? Object.values(selectedCountry.currencies)
                            .map((c: any) => c.name || "—")
                            .join(", ")
                        : "—"
                    }
                  />
                  <InfoItem
                    icon={<Languages size={18} />}
                    label="Хэл"
                    value={
                      selectedCountry.languages
                        ? Object.values(selectedCountry.languages).join(", ")
                        : "—"
                    }
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Цагийн бүс"
                    value={selectedCountry.timezones?.[0]}
                  />
                  <InfoItem
                    icon={<Globe2 size={18} />}
                    label="Дэд бүс"
                    value={selectedCountry.subregion}
                  />
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCountry.name?.common || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#7C4F2F] text-white py-4 rounded-2xl font-serif hover:bg-[#5C3820] transition-all shadow-lg"
                >
                  <ExternalLink size={20} /> Google Maps дээр харах
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2.5 bg-[#F2EDE4] rounded-xl text-[#7C4F2F]">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#A68966] font-bold">
          {label}
        </p>
        <p className="text-[#2C1F14] font-medium leading-tight">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
