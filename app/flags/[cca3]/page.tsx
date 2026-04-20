"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  Coins,
  Languages,
  Clock,
  Globe2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function CountryPage() {
  const { cca3 } = useParams();
  const router = useRouter();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${cca3}?fields=name,flags,capital,region,subregion,population,currencies,languages,timezones,cca3,latlng,area,borders`,
        );
        const data = await res.json();
        setCountry(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (cca3) fetchCountry();

    const s = localStorage.getItem("savedCountries");
    if (s) {
      const arr = JSON.parse(s);
      setSaved(arr.includes(cca3));
    }
  }, [cca3]);

  const toggleSave = () => {
    const s = localStorage.getItem("savedCountries");
    const arr: string[] = s ? JSON.parse(s) : [];
    const next = saved
      ? arr.filter((c) => c !== cca3)
      : [...arr, cca3 as string];
    localStorage.setItem("savedCountries", JSON.stringify(next));
    setSaved(!saved);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#7C4F2F]">
        <Loader2 className="mb-4 animate-spin" size={48} />
        <p className="font-serif">Ачаалж байна...</p>
      </div>
    );

  if (!country)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="font-serif text-[#A68966]">Улс олдсонгүй.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-[#7C4F2F] font-serif underline"
        >
          Буцах
        </button>
      </div>
    );

  const lat = country.latlng?.[0] || 0;
  const lng = country.latlng?.[1] || 0;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 8}%2C${lat - 8}%2C${lng + 8}%2C${lat + 8}&layer=mapnik&marker=${lat}%2C${lng}`;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c: any) => `${c.name} (${c.symbol || ""})`)
        .join(", ")
    : "—";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "—";

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="max-w-5xl px-8 py-10 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#7C4F2F] font-serif font-semibold hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={20} /> Далбааны жагсаалт руу буцах
          </button>
          <button
            onClick={toggleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-serif font-semibold text-sm transition-all ${
              saved
                ? "bg-[#7C4F2F] text-white shadow-lg"
                : "bg-white border-2 border-[#E2D9CC] text-[#A68966] hover:border-[#7C4F2F]"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill={saved ? "currentColor" : "none"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {saved ? "Хадгалсан" : "Хадгалах"}
          </button>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2D9CC] mb-6">
          <div className="relative h-64 overflow-hidden">
            <img
              src={country.flags?.svg}
              alt={country.name?.common}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
              <h1 className="text-5xl font-serif font-bold text-[#1A1209]">
                {country.name?.common}
              </h1>
              <p className="text-[#A68966] font-serif mt-1">
                {country.name?.official}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <div className="bg-white rounded-3xl border border-[#E2D9CC] p-8 shadow-sm">
            <h2 className="font-serif font-bold text-[#1A1209] text-xl mb-6">
              Үндсэн мэдээлэл
            </h2>
            <div className="space-y-5">
              <InfoItem
                icon={<MapPin size={18} />}
                label="Нийслэл"
                value={country.capital?.[0]}
              />
              <InfoItem
                icon={<Globe2 size={18} />}
                label="Бүс нутаг"
                value={`${country.region} — ${country.subregion || ""}`}
              />
              <InfoItem
                icon={<Users size={18} />}
                label="Хүн ам"
                value={country.population?.toLocaleString()}
              />
              <InfoItem
                icon={<Coins size={18} />}
                label="Валют"
                value={currencies}
              />
              <InfoItem
                icon={<Languages size={18} />}
                label="Хэл"
                value={languages}
              />
              <InfoItem
                icon={<Clock size={18} />}
                label="Цагийн бүс"
                value={country.timezones?.[0]}
              />
              {country.area && (
                <InfoItem
                  icon={<Globe2 size={18} />}
                  label="Талбай"
                  value={`${country.area.toLocaleString()} км²`}
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2D9CC] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#E2D9CC]">
              <h2 className="font-serif font-bold text-[#1A1209] text-xl">
                🗺️ Газрын зураг
              </h2>
              <p className="text-sm text-[#A68966] font-serif mt-1">
                OpenStreetMap
              </p>
            </div>
            <iframe
              src={mapUrl}
              width="100%"
              height="340"
              style={{ border: "none" }}
              title={`${country.name?.common} газрын зураг`}
              loading="lazy"
            />
          </div>
        </div>

        {country.borders && country.borders.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#E2D9CC] p-8 shadow-sm mb-4">
            <h2 className="font-serif font-bold text-[#1A1209] text-xl mb-4">
              🌐 Хил залгаа улсууд
            </h2>
            <div className="flex flex-wrap gap-3">
              {country.borders.map((code: string) => (
                <button
                  key={code}
                  onClick={() => router.push(`/flags/${code}`)}
                  className="px-5 py-2.5 bg-[#F2EDE4] text-[#7C4F2F] rounded-full font-serif font-semibold text-sm hover:bg-[#7C4F2F] hover:text-white transition-all"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() =>
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent((country.name?.common || "") + " national anthem")}`,
              "_blank",
            )
          }
          className="flex items-center justify-center gap-3 w-full bg-white border-2 border-[#E2D9CC] text-[#7C4F2F] py-4 rounded-2xl font-serif font-semibold hover:border-[#7C4F2F] hover:bg-[#F2EDE4] transition-all mb-4"
        >
          🎵 Үндэсний дуулал сонсох
        </button>

        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name?.common || "")}`,
              "_blank",
            )
          }
          className="flex items-center justify-center gap-3 w-full bg-[#7C4F2F] text-white py-4 rounded-2xl font-serif font-semibold hover:bg-[#5C3820] transition-all shadow-lg"
        >
          <Globe2 size={20} /> Google Maps дээр харах
        </button>
      </div>
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
      <div className="p-2.5 bg-[#F2EDE4] rounded-xl text-[#7C4F2F] shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#A68966] font-bold">
          {label}
        </p>
        <p className="text-[#2C1F14] font-serif font-medium leading-tight">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
