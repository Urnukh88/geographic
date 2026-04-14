"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { awardXP } from "@/lib/exp";
import {
  Mountain,
  Users,
  Cloud,
  Flag,
  Waves,
  Map,
  Gem,
  Building2,
  Globe,
  Brain,
  ChevronRight,
  Loader2,
  Star,
} from "lucide-react";

const categoryList = [
  {
    slug: "all",
    name: "Бүх сэдэв",
    desc: "Бүх ангиллаас асуулт гарна",
    icon: Globe,
  },
  {
    slug: "physical",
    name: "Физик газарзүй",
    desc: "Уулс, гол мөрөн, газрын хэлбэр",
    icon: Mountain,
  },
  {
    slug: "human",
    name: "Хүний газарзүй",
    desc: "Хүн ам, соёл, нийгэм",
    icon: Users,
  },
  {
    slug: "climate",
    name: "Уур амьсгал",
    desc: "Цаг агаар, уур амьсгалын бүс",
    icon: Cloud,
  },
  {
    slug: "countries",
    name: "Улс орнууд",
    desc: "Дэлхийн улс орнууд, нийслэл",
    icon: Flag,
  },
  {
    slug: "ocean",
    name: "Далай тэнгис",
    desc: "Далай, тэнгис, усны сан",
    icon: Waves,
  },
  {
    slug: "maps",
    name: "Газрын зураг",
    desc: "Бүс нутаг, зураглал",
    icon: Map,
  },
  {
    slug: "nature",
    name: "Байгалийн нөөц",
    desc: "Ашигт малтмал, нөөц баялаг",
    icon: Gem,
  },
  {
    slug: "cities",
    name: "Хот суурин",
    desc: "Том хотууд, хүн ам",
    icon: Building2,
  },
];

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function QuizPage() {
  const { user, isLoaded } = useUser();
  const [selected, setSelected] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState("");
  const [xpGained, setXpGained] = useState<number | null>(null); // ← XP toast

  const categoryName =
    categoryList.find((c) => c.slug === selected)?.name || "";

  const startQuiz = async () => {
    setLoading(true);
    setError("");
    setXpGained(null);
    try {
      const prompt =
        selected === "all"
          ? `Дэлхийн газарзүйн талаар монгол хэл дээр 10 олон сонголттой асуулт үүсгэ.`
          : `"${categoryName}" сэдвээр монгол хэл дээр 10 олон сонголттой газарзүйн асуулт үүсгэ.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-mini",
            max_tokens: 1000,
            messages: [
              {
                role: "system",
                content: `Чи газарзүйн тестийн асуулт үүсгэгч. Заавал зөвхөн JSON array буцаа, өөр юм бичихгүй, markdown ашиглахгүй.
      Формат:
     [{"question":"...","options":["А","Б","В","Г"],"correct":0,"explanation":"..."}]
      "correct" нь зөв хариултын index (0-3).
      Асуултууд заавал:
     - Дунд сургуулийн сурагчдад ойлгомжтой байх
     - Тодорхой, ойлгомжтой асуулт байх
     - 4 хариулт нь тодорхой ялгаатай байх
     - Монгол болон дэлхийн газарзүйн үндсэн мэдлэг шаардах`,
              },
              { role: "user", content: prompt },
            ],
          }),
        },
      );
      const data = await response.json();
      const text = String(data.choices[0].message.content);
      const parsed: Question[] = JSON.parse(
        text.replace(/```json|```/g, "").trim(),
      );
      setQuestions(parsed);
      setCurrentQ(0);
      setAnswers([]);
      setChosenAnswer(null);
      setShowExplanation(false);
      setShowResult(false);
    } catch (err) {
      setQuestions([
        {
          question: "Алдаа гарлаа",
          options: [String(err), "", "", ""],
          correct: 0,
          explanation: String(err),
        },
      ]);
      setShowResult(true);
    }
    setLoading(false);
  };

  const handleAnswer = (idx: number) => {
    if (chosenAnswer !== null) return;
    setChosenAnswer(idx);
    setShowExplanation(true);
  };

  const saveResult = async (finalScore: number) => {
    if (!user) return;

    // Quiz үр дүн хадгалах
    const { error } = await supabase.from("quiz_results").insert([
      {
        user_id: user.id,
        category: categoryName,
        score: finalScore,
        total_questions: questions.length,
      },
    ]);

    if (error) {
      console.error("Дата хадгалахад алдаа гарлаа:", error.message);
    }

    // ← XP нэмэх
    const isPerfect = finalScore === questions.length;
    const gained = await awardXP(
      user.id,
      isPerfect ? "QUIZ_PERFECT" : "QUIZ_COMPLETE",
    );
    setXpGained(gained);
  };

  const handleNext = async () => {
    const newAnswers = [...answers, chosenAnswer!];
    setAnswers(newAnswers);

    if (currentQ + 1 >= questions.length) {
      const finalScore = newAnswers.filter(
        (a, i) => a === questions[i]?.correct,
      ).length;
      await saveResult(finalScore);
      setShowResult(true);
    } else {
      setCurrentQ(currentQ + 1);
      setChosenAnswer(null);
      setShowExplanation(false);
    }
  };

  if (!isLoaded) return <Loader2 className="mx-auto mt-20 animate-spin" />;

  const current = questions[currentQ];
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-white rounded-2xl p-10 border border-[#E2D9CC]">
          <div className="mb-4 text-5xl">
            {score >= questions.length * 0.8
              ? "🏆"
              : score >= questions.length * 0.5
                ? "👍"
                : "📚"}
          </div>
          <h2 className="text-3xl font-serif text-[#1A1209] mb-2">Дууслаа!</h2>
          <div className="text-6xl font-serif text-[#7C4F2F] mb-2">
            {score}/{questions.length}
          </div>
          <p className="text-[#7A6A58] text-sm mb-4">
            {Math.round((score / questions.length) * 100)}% зөв хариулсан
          </p>

          {/* ← XP мэдэгдэл */}
          {xpGained !== null && (
            <div className="flex items-center justify-center gap-2 bg-[#FFF8EC] border border-[#F0D080] rounded-xl px-5 py-3 mb-6 text-[#7C4F2F]">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span className="font-serif font-semibold">
                +{xpGained} XP олгогдлоо!
              </span>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setQuestions([]);
                setSelected(null);
                setXpGained(null);
              }}
              className="border border-[#C4A882] text-[#7C4F2F] px-5 py-2.5 rounded-lg font-serif text-sm hover:bg-[#EDE5D8] transition-colors"
            >
              Дахин сонгох
            </button>
            <button
              onClick={startQuiz}
              className="bg-[#7C4F2F] text-white px-5 py-2.5 rounded-lg font-serif text-sm hover:bg-[#5C3820] transition-colors"
            >
              Шинэ асуулт
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length > 0 && current) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6 text-sm text-[#7A6A58]">
          <span className="font-serif">
            {currentQ + 1} / {questions.length}
          </span>
          <div className="flex-1 mx-4 h-2 bg-[#E2D9CC] rounded-full">
            <div
              className="h-2 bg-[#7C4F2F] rounded-full transition-all"
              style={{ width: `${(currentQ / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-serif text-[#7C4F2F]">{categoryName}</span>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC] mb-4">
          <h2 className="text-xl font-serif text-[#1A1209] mb-6 leading-relaxed">
            {current.question}
          </h2>
          <div className="flex flex-col gap-3">
            {current.options.map((opt, idx) => {
              let style =
                "border border-[#E2D9CC] text-[#1A1209] hover:bg-[#F5F0E8] cursor-pointer";
              if (chosenAnswer !== null) {
                if (idx === current.correct)
                  style =
                    "border-2 border-green-500 bg-green-50 text-green-800";
                else if (idx === chosenAnswer)
                  style = "border-2 border-red-400 bg-red-50 text-red-800";
                else style = "border border-[#E2D9CC] text-[#AAA] opacity-50";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`p-4 rounded-xl text-left font-serif text-sm transition-all ${style}`}
                >
                  <span className="mr-2 font-bold">
                    {["А", "Б", "В", "Г"][idx]}.
                  </span>{" "}
                  {opt}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-[#F5F0E8] rounded-xl text-sm text-[#7A6A58] font-serif leading-relaxed">
              💡 {current.explanation}
            </div>
          )}
        </div>
        {chosenAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-[#7C4F2F] text-white py-3 rounded-xl font-serif hover:bg-[#5C3820] transition-colors flex items-center justify-center gap-2"
          >
            {currentQ + 1 >= questions.length ? "Дуусгах" : "Дараагийн асуулт"}{" "}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EDE5D8] flex items-center justify-center mx-auto mb-4">
          <Brain size={28} className="text-[#7C4F2F]" />
        </div>
        <h1 className="text-4xl font-serif text-[#1A1209] mb-2">
          Тест шалгалт
        </h1>
        <p className="text-[#7A6A58]">AI асуултуудыг автоматаар үүсгэнэ</p>
      </div>
      {error && (
        <div className="p-4 mb-4 font-serif text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
          {error}
        </div>
      )}
      <div className="bg-white rounded-2xl p-6 border border-[#E2D9CC] mb-4">
        <h2 className="font-serif text-[#1A1209] mb-4 font-semibold">
          Сэдэв сонгох
        </h2>
        <div className="flex flex-col gap-2">
          {categoryList.map(({ slug, name, desc, icon: Icon }) => (
            <button
              key={slug}
              onClick={() => setSelected(slug)}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all border ${
                selected === slug
                  ? "border-[#7C4F2F] bg-[#F5EDE4]"
                  : "border-[#E2D9CC] hover:bg-[#F9F5EF]"
              }`}
            >
              <Icon size={18} className="text-[#7C4F2F]" />
              <div>
                <p className="font-serif text-[#1A1209] text-sm font-medium">
                  {name}
                </p>
                <p className="text-[#7A6A58] text-xs">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <button
          onClick={startQuiz}
          disabled={loading}
          className="w-full bg-[#7C4F2F] text-white py-3.5 rounded-xl font-serif hover:bg-[#5C3820] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> AI асуулт үүсгэж
              байна...
            </>
          ) : (
            "Тест эхлүүлэх"
          )}
        </button>
      )}
    </div>
  );
}
