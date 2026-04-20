"use client";

import { useState, useEffect, useCallback } from "react";
import type React from "react";

const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;

interface Category {
  id: string;
  label: string;
  name: string;
  query: string;
  color: string;
  bg: string;
}

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
  readCount?: number;
  translatedTitle?: string;
  translatedDescription?: string;
}

const CATEGORIES: Category[] = [
  {
    id: "world",
    label: "🌍",
    name: "Дэлхий",
    query: "world news",
    color: "#5c8a6e",
    bg: "#edf5f0",
  },
  {
    id: "mongolia",
    label: "🇲🇳",
    name: "Монгол",
    query: "Mongolia",
    color: "#C4182A",
    bg: "#fdedef",
  },
  {
    id: "disaster",
    label: "🌋",
    name: "Гамшиг",
    query: "earthquake tsunami disaster flood",
    color: "#4a7fa8",
    bg: "#eef4fa",
  },
  {
    id: "health",
    label: "🏥",
    name: "Эрүүл мэнд",
    query: "health virus disease outbreak",
    color: "#c0605a",
    bg: "#fdf0ef",
  },
  {
    id: "space",
    label: "🚀",
    name: "Сансар",
    query: "space NASA SpaceX astronomy",
    color: "#3d3a8a",
    bg: "#eeeefa",
  },
  {
    id: "animals",
    label: "🦁",
    name: "Амьтад",
    query: "animals wildlife nature endangered",
    color: "#6b8a3a",
    bg: "#f0f5e8",
  },
  {
    id: "sports",
    label: "⚽",
    name: "Спорт",
    query: "sports championship football",
    color: "#c47c2b",
    bg: "#fdf4e8",
  },
  {
    id: "tech",
    label: "🎮",
    name: "Технологи",
    query: "technology AI smartphone innovation",
    color: "#1a7a8a",
    bg: "#e8f5f7",
  },
  {
    id: "history",
    label: "🏺",
    name: "Түүх & Нээлт",
    query: "archaeology discovery ancient history",
    color: "#8a5a2a",
    bg: "#f7f0e8",
  },
  {
    id: "science",
    label: "🔬",
    name: "Шинжлэх ух",
    query: "science research discovery",
    color: "#7a5fa8",
    bg: "#f3f0fb",
  },
];

const DATE_FILTERS = [
  { id: "any", label: "Бүгд" },
  { id: "today", label: "Өнөөдөр" },
  { id: "week", label: "7 хоног" },
  { id: "month", label: "Энэ сар" },
];

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}м өмнө`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}ц өмнө`;
  return `${Math.floor(diff / 86400)}өд өмнө`;
}

function isWithinDate(dateStr: string, filter: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime();
  const day = 86400000;
  if (filter === "today") return diff < day;
  if (filter === "week") return diff < day * 7;
  if (filter === "month") return diff < day * 30;
  return true;
}

async function translateArticles(articles: Article[]): Promise<Article[]> {
  try {
    const texts = articles
      .map(
        (a, i) => `${i + 1}. TITLE: ${a.title}\nDESC: ${a.description || ""}`,
      )
      .join("\n\n");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: `Та мэдээний орчуулагч. Дараах мэдээнүүдийг монгол хэлрүү орчуул. 
Яг ийм JSON форматаар хариул, өөр юм бичихгүй:
[{"title":"монгол гарчиг","desc":"монгол тайлбар"}, ...]
Тайлбар байхгүй бол desc-ийг хоосон үлдээ.`,
          },
          { role: "user", content: texts },
        ],
      }),
    });

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || "[]";
    const clean = raw.replace(/```json|```/g, "").trim();
    const translated: { title: string; desc: string }[] = JSON.parse(clean);

    return articles.map((a, i) => ({
      ...a,
      translatedTitle: translated[i]?.title || a.title,
      translatedDescription: translated[i]?.desc || a.description,
    }));
  } catch {
    return articles;
  }
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("any");
  const [isMongol, setIsMongol] = useState(false);
  const [readCounts, setReadCounts] = useState<Record<string, number>>({});

  const fetchNews = useCallback(
    async (cat: Category) => {
      setLoading(true);
      setTranslating(false);
      setError("");
      setArticles([]);
      setExpanded(null);
      setSearch("");
      try {
        const url = `/api/news?q=${encodeURIComponent(cat.query)}&lang=en`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.errors) throw new Error(data.errors[0]);
        const fetched: Article[] = data.articles || [];
        setArticles(fetched);
        setLoading(false);

        if (isMongol && fetched.length > 0) {
          setTranslating(true);
          const translated = await translateArticles(fetched);
          setArticles(translated);
          setTranslating(false);
        }
      } catch {
        setError("Мэдээ ачааллахад алдаа гарлаа.");
        setLoading(false);
      }
    },
    [isMongol],
  );

  const handleToggleMongol = async () => {
    const next = !isMongol;
    setIsMongol(next);
    if (next && articles.length > 0) {
      setTranslating(true);
      const translated = await translateArticles(articles);
      setArticles(translated);
      setTranslating(false);
    }
  };

  useEffect(() => {
    fetchNews(CATEGORIES[0]);
    const style = document.createElement("style");
    style.id = "geo-news-styles";
    style.textContent = [
      ".article-card { transition: all 0.2s ease; }",
      ".article-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.09) !important; }",
      ".cat-pill { transition: all 0.18s ease; cursor: pointer; }",
      ".cat-pill:hover { transform: translateY(-1px); }",
      ".filter-btn { transition: all 0.15s ease; cursor: pointer; border: none; }",
      "@keyframes spin { to { transform: rotate(360deg); } }",
      "@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }",
    ].join("\n");
    if (!document.getElementById("geo-news-styles"))
      document.head.appendChild(style);
    return () => {
      document.getElementById("geo-news-styles")?.remove();
    };
  }, []);

  const handleRead = (url: string) => {
    setReadCounts((prev) => ({ ...prev, [url]: (prev[url] || 0) + 1 }));
    window.open(url, "_blank");
  };

  const getTitle = (a: Article) =>
    isMongol && a.translatedTitle ? a.translatedTitle : a.title;
  const getDesc = (a: Article) =>
    isMongol && a.translatedDescription
      ? a.translatedDescription
      : a.description;

  const filteredArticles = articles
    .filter((a) => isWithinDate(a.publishedAt, dateFilter))
    .filter(
      (a) =>
        search === "" ||
        getTitle(a).toLowerCase().includes(search.toLowerCase()) ||
        a.source.name.toLowerCase().includes(search.toLowerCase()),
    )
    .map((a) => ({ ...a, readCount: readCounts[a.url] || 0 }))
    .sort((a, b) => (b.readCount ?? 0) - (a.readCount ?? 0));

  const accentColor = activeCategory.color;
  const accentBg = activeCategory.bg;

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div
        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        className="max-w-5xl px-8 py-10 mx-auto"
      >
        <div className="mb-8">
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              fontWeight: 700,
              color: "#A68966",
              fontFamily: "monospace",
            }}
          >
            ● LIVE · ДЭЛХИЙН МЭДЭЭ
          </span>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 52,
              fontWeight: 900,
              color: "#1a0f08",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginTop: 6,
            }}
          >
            Дэлхийн{" "}
            <span style={{ color: accentColor, fontStyle: "italic" }}>
              Мэдээ
            </span>
          </h1>
          <p style={{ fontSize: 14, color: "#9b8b7a", marginTop: 8 }}>
            GNews · 10 категори
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                color: "#b0a090",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Мэдээ хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 16px 11px 42px",
                borderRadius: 12,
                border: "1.5px solid #e8e0d8",
                background: "#fff",
                fontSize: 14,
                color: "#2c1810",
                fontFamily: "'Source Serif 4', serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            className="filter-btn"
            onClick={handleToggleMongol}
            disabled={translating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              borderRadius: 12,
              background: isMongol ? accentColor : "#fff",
              color: isMongol ? "#fff" : "#6b5a4e",
              border: `1.5px solid ${isMongol ? accentColor : "#e8e0d8"}`,
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: translating ? "wait" : "pointer",
              boxShadow: isMongol ? `0 4px 16px ${accentColor}30` : "none",
              transition: "all 0.2s",
            }}
          >
            {translating ? (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: isMongol ? "#fff" : accentColor,
                    borderRadius: "50%",
                    animation: "spin 0.75s linear infinite",
                  }}
                />
                Орчуулж байна...
              </>
            ) : (
              <>{isMongol ? "🇬🇧 English" : "🇲🇳 Монгол"}</>
            )}
          </button>

          <div
            style={{
              display: "flex",
              background: "#fff",
              borderRadius: 12,
              border: "1.5px solid #e8e0d8",
              overflow: "hidden",
            }}
          >
            {DATE_FILTERS.map((f) => (
              <button
                key={f.id}
                className="filter-btn"
                onClick={() => setDateFilter(f.id)}
                style={{
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: dateFilter === f.id ? accentColor : "transparent",
                  color: dateFilter === f.id ? "#fff" : "#6b5a4e",
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                className="cat-pill"
                onClick={() => {
                  setActiveCategory(cat);
                  fetchNews(cat);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 18px",
                  borderRadius: 999,
                  border: "none",
                  background: isActive ? cat.color : "#fff",
                  color: isActive ? "#fff" : "#6b5a4e",
                  boxShadow: isActive
                    ? `0 4px 16px ${cat.color}40`
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  fontFamily: "'Source Serif 4', serif",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                <span style={{ fontSize: 16 }}>{cat.label}</span>
                {cat.name}
              </button>
            );
          })}
        </div>

        {!loading && filteredArticles.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              padding: "10px 16px",
              background: accentBg,
              borderRadius: 12,
            }}
          >
            <span style={{ fontSize: 13, color: accentColor, fontWeight: 600 }}>
              📊 {filteredArticles.length} мэдээ
            </span>
            {isMongol && !translating && (
              <span style={{ fontSize: 12, color: accentColor }}>
                🇲🇳орчуулсан
              </span>
            )}
            {search && (
              <span style={{ fontSize: 12, color: "#9b8b7a" }}>
                &ldquo;{search}&rdquo;
              </span>
            )}
            <span
              style={{ marginLeft: "auto", fontSize: 12, color: "#b0a090" }}
            >
              Их уншсан мэдээ дээр харагдана
            </span>
          </div>
        )}

        {(loading || translating) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              gap: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                border: `4px solid #f0ece6`,
                borderTopColor: accentColor,
                borderRadius: "50%",
                animation: "spin 0.75s linear infinite",
              }}
            />
            <p style={{ fontSize: 15, color: "#9b8b7a" }}>
              {translating
                ? "Монгол хэл дээр орчуулж байна..."
                : "Мэдээ татаж байна..."}
            </p>
          </div>
        )}

        {error && !loading && (
          <div
            style={{
              background: "#fff8f8",
              borderRadius: 16,
              padding: 32,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 15, color: "#c0504a", marginBottom: 16 }}>
              ⚠️ {error}
            </p>
            <button
              onClick={() => fetchNews(activeCategory)}
              style={{
                padding: "10px 24px",
                background: accentColor,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Дахин оролдох
            </button>
          </div>
        )}

        {!loading &&
          !translating &&
          !error &&
          filteredArticles.length === 0 &&
          articles.length > 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "#9b8b7a" }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
              <p style={{ fontSize: 15 }}>
                &ldquo;{search}&rdquo; хайлтад тохирох мэдээ олдсонгүй
              </p>
              <button
                onClick={() => setSearch("")}
                style={{
                  marginTop: 16,
                  padding: "8px 20px",
                  background: accentColor,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Хайлт арилгах
              </button>
            </div>
          )}

        {!loading && !translating && filteredArticles.length > 0 && (
          <div
            className="article-card"
            onClick={() => handleRead(filteredArticles[0].url)}
            style={{
              background: "#fff",
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 20,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              cursor: "pointer",
              animation: "fadeUp 0.4s ease both",
            }}
          >
            {filteredArticles[0].image && (
              <div
                style={{
                  position: "relative",
                  height: 280,
                  overflow: "hidden",
                }}
              >
                <img
                  src={filteredArticles[0].image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (
                      e.currentTarget.parentElement as HTMLElement
                    ).style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(0,0,0,0.45)",
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#fff",
                      fontFamily: "monospace",
                      fontWeight: 700,
                    }}
                  >
                    ⭐ ОНЦЛОХ
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: accentColor,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "monospace",
                    }}
                  >
                    {activeCategory.label} {activeCategory.name.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <div style={{ padding: "24px 28px 28px" }}>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#1a0f08",
                  lineHeight: 1.35,
                  marginBottom: 12,
                }}
              >
                {getTitle(filteredArticles[0])}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#7a6a5a",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {getDesc(filteredArticles[0])}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap" as const,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: accentBg,
                    color: accentColor,
                    fontFamily: "monospace",
                  }}
                >
                  {filteredArticles[0].source?.name}
                </span>
                <span style={{ fontSize: 12, color: "#b0a090" }}>
                  {timeAgo(filteredArticles[0].publishedAt)}
                </span>
                {(filteredArticles[0].readCount ?? 0) > 0 && (
                  <span style={{ fontSize: 12, color: "#b0a090" }}>
                    👁 {filteredArticles[0].readCount} удаа уншсан
                  </span>
                )}
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 13,
                    color: accentColor,
                    fontWeight: 600,
                  }}
                >
                  Унших &rarr;
                </span>
              </div>
            </div>
          </div>
        )}

        {!loading && !translating && filteredArticles.length > 1 && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {filteredArticles.slice(1).map((article, i) => (
              <div
                key={i}
                className="article-card"
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  animation: "fadeUp 0.4s ease both",
                  animationDelay: `${i * 50}ms`,
                  border: `2px solid ${expanded === i ? accentColor : "transparent"}`,
                }}
              >
                {article.image && (
                  <div style={{ height: 150, overflow: "hidden" }}>
                    <img
                      src={article.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (
                          e.currentTarget.parentElement as HTMLElement
                        ).style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: "14px 16px 16px" }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1a0f08",
                      lineHeight: 1.45,
                      marginBottom: 10,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    {getTitle(article)}
                  </p>
                  {expanded === i && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "#7a6a5a",
                        lineHeight: 1.65,
                        marginBottom: 10,
                      }}
                    >
                      {getDesc(article)}
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap" as const,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background: accentBg,
                        color: accentColor,
                        fontFamily: "monospace",
                      }}
                    >
                      {article.source?.name}
                    </span>
                    <span style={{ fontSize: 11, color: "#b0a090" }}>
                      {timeAgo(article.publishedAt)}
                    </span>
                    {(article.readCount ?? 0) > 0 && (
                      <span style={{ fontSize: 11, color: "#b0a090" }}>
                        👁 {article.readCount}
                      </span>
                    )}
                    {expanded === i && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginLeft: "auto",
                          fontSize: 12,
                          color: accentColor,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleRead(article.url);
                        }}
                      >
                        Унших &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !translating && articles.length > 0 && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <button
              onClick={() => fetchNews(activeCategory)}
              style={{
                padding: "13px 40px",
                background: accentColor,
                color: "#fff",
                border: "none",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Source Serif 4', serif",
                boxShadow: `0 4px 20px ${accentColor}40`,
              }}
            >
              🔄 Шинэчлэх
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
