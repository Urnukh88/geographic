"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  Globe2,
  Languages,
  Coins,
  Search,
  X,
  ArrowLeftRight,
  Loader2,
  Sparkles,
} from "lucide-react";

const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;

const MONGOLIAN_NAMES: Record<string, string> = {
  Mongolia: "Монгол",
  China: "Хятад",
  Russia: "Орос",
  "United States": "Америк",
  Japan: "Япон",
  "South Korea": "Солонгос",
  Germany: "Герман",
  France: "Франц",
  "United Kingdom": "Их Британи",
  Australia: "Австрали",
  Canada: "Канад",
  India: "Энэтхэг",
  Brazil: "Бразил",
  Kazakhstan: "Казахстан",
  Turkey: "Турк",
  Egypt: "Египет",
  "South Africa": "Өмнөд Африк",
  Argentina: "Аргентин",
  Mexico: "Мексик",
  Italy: "Итали",
  Spain: "Испани",
  Ukraine: "Украин",
  Poland: "Польш",
  "North Korea": "Хойд Солонгос",
  "Saudi Arabia": "Саудын Араб",
  Iran: "Иран",
  Iraq: "Ирак",
  Afghanistan: "Афганистан",
  Pakistan: "Пакистан",
  Indonesia: "Индонез",
  Thailand: "Тайланд",
  Vietnam: "Вьетнам",
  Sweden: "Швед",
  Norway: "Норвеги",
  Finland: "Финланд",
  Denmark: "Дани",
  Netherlands: "Нидерланд",
  Belgium: "Бельги",
  Switzerland: "Швейцари",
  Austria: "Австри",
  Greece: "Грек",
  Portugal: "Португал",
  Romania: "Румын",
  Hungary: "Унгар",
  Belarus: "Беларусь",
  Kyrgyzstan: "Кыргызстан",
  Tajikistan: "Тажикистан",
  Uzbekistan: "Узбекистан",
  Turkmenistan: "Туркменистан",
  Azerbaijan: "Азербайжан",
  Georgia: "Гүрж",
  Armenia: "Армени",
  Nepal: "Непал",
  Myanmar: "Мьянмар",
  Cambodia: "Камбож",
  Malaysia: "Малайз",
  Philippines: "Филиппин",
  Singapore: "Сингапур",
  "New Zealand": "Шинэ Зеланд",
  Kenya: "Кени",
  Nigeria: "Нигери",
  Ethiopia: "Этиоп",
  Morocco: "Марокко",
  Algeria: "Алжир",
  Tunisia: "Тунис",
  Ghana: "Гана",
  Tanzania: "Танзани",
  Uganda: "Уганда",
  Sudan: "Судан",
  Cameroon: "Камерун",
  Cuba: "Куба",
  Colombia: "Колумби",
  Chile: "Чили",
  Peru: "Перу",
  Venezuela: "Венесуэль",
  Ecuador: "Эквадор",
  Bolivia: "Болив",
  Paraguay: "Парагвай",
  Uruguay: "Уругвай",
  Israel: "Израиль",
  Jordan: "Иордан",
  Lebanon: "Ливан",
  Syria: "Сири",
  Yemen: "Йемен",
  Qatar: "Катар",
  Kuwait: "Кувейт",
  Bahrain: "Бахрейн",
  Oman: "Оман",
  "United Arab Emirates": "АНЭУ",
};

interface Country {
  name: { common: string; official: string };
  flags: { svg: string };
  capital: string[];
  region: string;
  population: number;
  area: number;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  car: { side: string };
  cca3: string;
}

interface AIInsight {
  food: string;
  climate: string;
  fact: string;
  verdict: string;
}

function formatNum(n: number): string {
  if (!n) return "—";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}Т`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}Сая`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}К`;
  return n.toLocaleString();
}

function CountryPicker({
  label,
  countries,
  selected,
  onSelect,
  otherSelected,
}: {
  label: string;
  countries: Country[];
  selected: Country | null;
  onSelect: (c: Country | null) => void;
  otherSelected: Country | null;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = countries
    .filter((c) => c?.name?.common !== otherSelected?.name?.common)
    .filter((c) => {
      const q = search.toLowerCase().trim();
      if (q === "") return true;
      const eng = c.name?.common?.toLowerCase() || "";
      const mon = (MONGOLIAN_NAMES[c.name?.common] || "").toLowerCase();
      return eng.includes(q) || mon.includes(q);
    })
    .slice(0, 8);

  return (
    <div className="relative">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#A68966] font-bold mb-3">
        {label}
      </p>
      {selected ? (
        <div className="bg-white rounded-2xl border-2 border-[#7C4F2F] p-4 flex items-center gap-4">
          <img
            src={selected.flags.svg}
            alt=""
            className="object-cover w-16 h-10 rounded-lg shadow"
          />
          <div className="flex-1">
            <p className="font-serif font-bold text-[#1A1209] text-lg">
              {MONGOLIAN_NAMES[selected.name.common] || selected.name.common}
            </p>
            <p className="text-sm text-[#A68966] font-serif">
              {selected.capital?.[0] || "—"}
            </p>
          </div>
          <button
            onClick={() => {
              onSelect(null);
              setSearch("");
            }}
          >
            <X size={18} className="text-[#A68966] hover:text-[#7C4F2F]" />
          </button>
        </div>
      ) : (
        <div>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]"
              size={18}
            />
            <input
              type="text"
              placeholder="Улс хайх..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#E2D9CC] bg-white font-serif text-[#1A1209] outline-none focus:border-[#7C4F2F] transition-colors"
            />
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute z-20 top-full mt-2 w-full bg-white rounded-2xl border border-[#E2D9CC] shadow-xl overflow-hidden"
              >
                {filtered.length === 0 ? (
                  <p className="p-4 text-[#A68966] font-serif text-sm">
                    Олдсонгүй...
                  </p>
                ) : (
                  filtered.map((c) => (
                    <button
                      key={c.cca3}
                      onMouseDown={() => {
                        onSelect(c);
                        setSearch("");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F7F3EE] transition-colors text-left"
                    >
                      <img
                        src={c.flags.svg}
                        alt=""
                        className="object-cover w-10 h-6 rounded shadow-sm shrink-0"
                      />
                      <div>
                        <p className="font-serif font-semibold text-[#1A1209] text-sm">
                          {MONGOLIAN_NAMES[c.name.common] || c.name.common}
                        </p>
                        <p className="text-xs text-[#A68966]">
                          {c.capital?.[0]}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function CompareBar({
  label,
  icon,
  valA,
  valB,
  rawA,
  rawB,
  unit,
}: {
  label: string;
  icon: React.ReactNode;
  valA: string;
  valB: string;
  rawA: number;
  rawB: number;
  unit?: string;
}) {
  const total = rawA + rawB || 1;
  const pctA = (rawA / total) * 100;
  const pctB = (rawB / total) * 100;
  const winA = rawA > rawB;
  const winB = rawB > rawA;
  return (
    <div className="bg-white rounded-2xl border border-[#E2D9CC] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-[#F2EDE4] rounded-xl text-[#7C4F2F]">{icon}</div>
        <p className="font-serif font-bold text-[#1A1209]">{label}</p>
        {unit && <span className="text-xs text-[#A68966] ml-auto">{unit}</span>}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <p
          className={`font-serif font-bold text-lg flex-1 text-left ${winA ? "text-[#7C4F2F]" : "text-[#A68966]"}`}
        >
          {valA} {winA && "👑"}
        </p>
        <p className="text-xs text-[#A68966] font-serif">VS</p>
        <p
          className={`font-serif font-bold text-lg flex-1 text-right ${winB ? "text-[#7C4F2F]" : "text-[#A68966]"}`}
        >
          {winB && "👑"} {valB}
        </p>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-l-full"
          style={{ background: winA ? "#7C4F2F" : "#D4B896" }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="rounded-r-full"
          style={{ background: winB ? "#4A2C17" : "#D4B896" }}
        />
      </div>
    </div>
  );
}

function TextCompare({
  label,
  icon,
  valA,
  valB,
  flagA,
  flagB,
}: {
  label: string;
  icon: React.ReactNode;
  valA: string;
  valB: string;
  flagA: string;
  flagB: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2D9CC] p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-[#F2EDE4] rounded-lg text-[#7C4F2F]">
          {icon}
        </div>
        <p className="font-serif font-bold text-[#1A1209] text-sm">{label}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <img
            src={flagA}
            alt=""
            className="w-6 h-4 object-cover rounded shrink-0 mt-0.5"
          />
          <p className="text-sm text-[#4A3728] font-serif">{valA || "—"}</p>
        </div>
        <div className="flex items-start gap-2">
          <img
            src={flagB}
            alt=""
            className="w-6 h-4 object-cover rounded shrink-0 mt-0.5"
          />
          <p className="text-sm text-[#4A3728] font-serif">{valB || "—"}</p>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countryA, setCountryA] = useState<Country | null>(null);
  const [countryB, setCountryB] = useState<Country | null>(null);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,area,languages,car,cca3",
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setCountries(
          arr
            .filter((c: any) => c?.name?.common)
            .sort((a: Country, b: Country) =>
              a.name.common.localeCompare(b.name.common),
            ),
        );
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const fetchAI = async (a: Country, b: Country) => {
    setAiLoading(true);
    setAiInsight(null);
    try {
      const nameA = MONGOLIAN_NAMES[a.name.common] || a.name.common;
      const nameB = MONGOLIAN_NAMES[b.name.common] || b.name.common;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content:
                'Монгол хэлээр хариул. Зөвхөн JSON форматаар, өөр юм бичихгүй: {"food_a":"...","food_b":"...","climate_a":"...","climate_b":"...","fact_a":"...","fact_b":"...","verdict":"..."}',
            },
            {
              role: "user",
              content: `${nameA} болон ${nameB} улсыг харьцуул. food_a/b: тус улсын алдартай хоол (1-2 жишээ), climate_a/b: уур амьсгалын товч тайлбар, fact_a/b: нэг гайхалтай баримт, verdict: аль улс аялахад илүү тохиромжтой, яагаад (2 өгүүлбэр).`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiInsight({
        food: `🇦 ${parsed.food_a}\n🇧 ${parsed.food_b}`,
        climate: `🇦 ${parsed.climate_a}\n🇧 ${parsed.climate_b}`,
        fact: `🇦 ${parsed.fact_a}\n🇧 ${parsed.fact_b}`,
        verdict: parsed.verdict,
      });
    } catch {
      setAiInsight({
        food: "—",
        climate: "—",
        fact: "—",
        verdict: "Мэдээлэл авахад алдаа гарлаа.",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const swap = () => {
    const tmp = countryA;
    setCountryA(countryB);
    setCountryB(tmp);
    setAiInsight(null);
  };

  const handleSetA = (c: Country | null) => {
    setCountryA(c);
    setAiInsight(null);
  };
  const handleSetB = (c: Country | null) => {
    setCountryB(c);
    setAiInsight(null);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#7C4F2F] ">
        <Loader2 className="mb-4 animate-spin" size={48} />
        <p className="font-serif">Ачаалж байна...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <p className="mb-4 text-4xl">⚠️</p>
        <p className="font-serif text-[#A68966]">
          Мэдээлэл татахад алдаа гарлаа.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#7C4F2F] text-white rounded-xl font-serif"
        >
          Дахин оролдох
        </button>
      </div>
    );

  const canCompare = countryA && countryB;

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="max-w-4xl px-8 py-10 mx-auto">
        <div className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#A68966] font-bold">
            🆚 Харьцуулах
          </span>
          <h1 className="text-5xl font-serif font-bold text-[#1A1209] mt-1 leading-tight">
            Улс <span className="text-[#7C4F2F] italic">харьцуулах</span>
          </h1>
          <p className="text-[#A68966] font-serif mt-2">
            Хоёр улсыг сонгоод үзүүлэлтүүдийг харьцуул — AI дүгнэлттэй
          </p>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 mb-8">
          <CountryPicker
            label="1-р улс"
            countries={countries}
            selected={countryA}
            onSelect={handleSetA}
            otherSelected={countryB}
          />
          <button
            onClick={swap}
            disabled={!canCompare}
            className="p-3 bg-white rounded-2xl border-2 border-[#E2D9CC] text-[#7C4F2F] hover:border-[#7C4F2F] hover:bg-[#F2EDE4] transition-all disabled:opacity-30 mt-6"
          >
            <ArrowLeftRight size={22} />
          </button>
          <CountryPicker
            label="2-р улс"
            countries={countries}
            selected={countryB}
            onSelect={handleSetB}
            otherSelected={countryA}
          />
        </div>

        <AnimatePresence>
          {canCompare && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[countryA, countryB].map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-[#E2D9CC] overflow-hidden shadow-sm"
                  >
                    <div className="overflow-hidden h-36">
                      <img
                        src={c!.flags.svg}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-serif font-bold text-[#1A1209] text-xl">
                        {MONGOLIAN_NAMES[c!.name.common] || c!.name.common}
                      </p>
                      <p className="text-sm text-[#A68966] font-serif">
                        {c!.capital?.[0] || "—"} · {c!.region}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <CompareBar
                  label="Хүн ам"
                  icon={<Users size={18} />}
                  valA={formatNum(countryA!.population)}
                  valB={formatNum(countryB!.population)}
                  rawA={countryA!.population || 0}
                  rawB={countryB!.population || 0}
                />
                <CompareBar
                  label="Талбай"
                  icon={<MapPin size={18} />}
                  valA={
                    countryA!.area ? `${formatNum(countryA!.area)} км²` : "—"
                  }
                  valB={
                    countryB!.area ? `${formatNum(countryB!.area)} км²` : "—"
                  }
                  rawA={countryA!.area || 0}
                  rawB={countryB!.area || 0}
                  unit="км²"
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextCompare
                    label="Бүс нутаг"
                    icon={<Globe2 size={18} />}
                    valA={countryA!.region}
                    valB={countryB!.region}
                    flagA={countryA!.flags.svg}
                    flagB={countryB!.flags.svg}
                  />
                  <TextCompare
                    label="Хэл"
                    icon={<Languages size={18} />}
                    valA={Object.values(countryA!.languages || {}).join(", ")}
                    valB={Object.values(countryB!.languages || {}).join(", ")}
                    flagA={countryA!.flags.svg}
                    flagB={countryB!.flags.svg}
                  />
                  <TextCompare
                    label="Валют"
                    icon={<Coins size={18} />}
                    valA={Object.values(countryA!.currencies || {})
                      .map((c: any) => `${c.name} (${c.symbol})`)
                      .join(", ")}
                    valB={Object.values(countryB!.currencies || {})
                      .map((c: any) => `${c.name} (${c.symbol})`)
                      .join(", ")}
                    flagA={countryA!.flags.svg}
                    flagB={countryB!.flags.svg}
                  />
                  <TextCompare
                    label="🚗 Замын хөдөлгөөн"
                    icon={<Globe2 size={18} />}
                    valA={
                      countryA!.car?.side === "left"
                        ? "Зүүн тал 🚗"
                        : "Баруун тал 🚗"
                    }
                    valB={
                      countryB!.car?.side === "left"
                        ? "Зүүн тал 🚗"
                        : "Баруун тал 🚗"
                    }
                    flagA={countryA!.flags.svg}
                    flagB={countryB!.flags.svg}
                  />
                </div>
              </div>

              {/* AI Insight */}
              <div className="bg-white rounded-3xl border border-[#E2D9CC] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F2EDE4] rounded-xl text-[#7C4F2F]">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-[#1A1209]">
                        AI Дүгнэлт
                      </p>
                      <p className="text-xs text-[#A68966]">
                        GPT-4o-mini ашиглан
                      </p>
                    </div>
                  </div>
                  {!aiInsight && !aiLoading && (
                    <button
                      onClick={() => fetchAI(countryA!, countryB!)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#7C4F2F] text-white rounded-xl font-serif text-sm font-semibold hover:bg-[#5C3820] transition-all"
                    >
                      <Sparkles size={16} /> Шинжлэх
                    </button>
                  )}
                </div>

                {aiLoading && (
                  <div className="flex items-center justify-center gap-3 py-6">
                    <Loader2
                      className="animate-spin text-[#7C4F2F]"
                      size={24}
                    />
                    <p className="font-serif text-[#A68966]">
                      GPT-4o-mini шинжилж байна...
                    </p>
                  </div>
                )}

                {aiInsight && !aiLoading && (
                  <div className="space-y-4">
                    {[
                      { label: "🍜 Хоол хүнс", val: aiInsight.food },
                      { label: "🌡️ Уур амьсгал", val: aiInsight.climate },
                      { label: "🎯 Сонирхолтой баримт", val: aiInsight.fact },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#F7F3EE] rounded-2xl p-4">
                        <p className="font-serif font-bold text-[#7C4F2F] text-sm mb-2">
                          {row.label}
                        </p>
                        {row.val.split("\n").map((line, j) => (
                          <p
                            key={j}
                            className="font-serif text-sm text-[#4A3728] leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}

                    {/* Verdict */}
                    <div className="bg-[#7C4F2F] rounded-2xl p-5">
                      <p className="mb-2 font-serif text-sm font-bold text-white">
                        📊 Аялагчийн дүгнэлт
                      </p>
                      <p className="font-serif text-[#F2EDE4] text-sm leading-relaxed">
                        {aiInsight.verdict}
                      </p>
                    </div>

                    <button
                      onClick={() => fetchAI(countryA!, countryB!)}
                      className="w-full py-2.5 border-2 border-[#E2D9CC] rounded-xl font-serif text-sm text-[#A68966] hover:border-[#7C4F2F] hover:text-[#7C4F2F] transition-all"
                    >
                      🔄 Дахин шинжлэх
                    </button>
                  </div>
                )}

                {!aiInsight && !aiLoading && (
                  <p className="text-center text-[#A68966] font-serif text-sm py-4">
                    "Шинжлэх" товч дарж AI дүгнэлт авна уу
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!canCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="mb-4 text-6xl">🌍</p>
            <p className="font-serif text-[#A68966] text-lg">
              Дээрээс хоёр улс сонгоно уу
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
