"use client";
import { useState, useEffect, Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
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

function QuizContent() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selected, setSelected] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState("");
  const [xpGained, setXpGained] = useState<number | null>(null);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelected(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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
            model: "gpt-4o-mini",
            max_tokens: 1500,
            messages: [
              {
                role: "system",
                content: `Чи газарзүйн тестийн асуулт үүсгэгч. Заавал зөвхөн JSON array буцаа. Формат: [{"question":"...","options":["А","Б","В","Г"],"correct":0,"explanation":"..."}]`,
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
      setError("Асуулт үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.");
      console.error(err);
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
    await supabase.from("quiz_results").insert([
      {
        user_id: user.id,
        category: categoryName,
        score: finalScore,
        total_questions: questions.length,
      },
    ]);
    const gained = await awardXP(
      user.id,
      finalScore === questions.length ? "QUIZ_PERFECT" : "QUIZ_COMPLETE",
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

  if (!isLoaded)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  const current = questions[currentQ];
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-white rounded-[32px] p-10 border border-[#E2D9CC] shadow-sm">
          <div className="mb-4 text-5xl">
            {score >= 8 ? "🏆" : score >= 5 ? "👍" : "📚"}
          </div>
          <h2 className="text-3xl font-serif text-[#1A1209] mb-2">
            Тест дууслаа!
          </h2>
          <div className="text-6xl font-serif text-[#7C4F2F] mb-4">
            {score}/{questions.length}
          </div>

          {xpGained !== null && (
            <div className="flex items-center justify-center gap-2 bg-[#FFF8EC] border border-[#F0D080] rounded-2xl px-5 py-3 mb-6 text-[#7C4F2F] animate-bounce-slow">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span className="font-bold">+{xpGained} XP цуглууллаа!</span>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setQuestions([]);
                setSelected(null);
                setXpGained(null);
              }}
              className="border border-[#C4A882] text-[#7C4F2F] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#EDE5D8] transition-all"
            >
              Сэдэв солих
            </button>
            <button
              onClick={startQuiz}
              className="bg-[#7C4F2F] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#5C3820] transition-all shadow-md"
            >
              Дахин эхлэх
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length > 0 && current) {
    return (
      <div className="max-w-xl px-4 mx-auto">
        <div className="flex justify-between items-center mb-6 text-xs font-bold uppercase tracking-widest text-[#7A6A58]">
          <span>
            Асуулт {currentQ + 1} / {questions.length}
          </span>
          <span className="text-[#7C4F2F]">{categoryName}</span>
        </div>
        <div className="h-2 bg-[#E2D9CC] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-[#7C4F2F] transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="bg-white rounded-[32px] p-8 border border-[#E2D9CC] mb-6 shadow-sm">
          <h2 className="text-2xl font-serif text-[#1A1209] mb-8 leading-tight">
            {current.question}
          </h2>
          <div className="grid gap-3">
            {current.options.map((opt, idx) => {
              let style =
                "border-[#E2D9CC] bg-white hover:border-[#7C4F2F] hover:bg-[#FDFBF7]";
              if (chosenAnswer !== null) {
                if (idx === current.correct)
                  style =
                    "border-green-500 bg-green-50 text-green-700 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                else if (idx === chosenAnswer)
                  style = "border-red-400 bg-red-50 text-red-700";
                else style = "opacity-40 border-[#E2D9CC]";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`p-5 rounded-2xl text-left font-medium text-sm transition-all border-2 ${style}`}
                >
                  <span className="mr-3 opacity-50">
                    {["А", "Б", "В", "Г"][idx]}
                  </span>{" "}
                  {opt}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div className="mt-6 p-5 bg-[#F8F5F0] rounded-2xl text-sm text-[#7A6A58] leading-relaxed border-l-4 border-[#7C4F2F]">
              <div className="flex items-center gap-2 mb-1 font-bold text-[#7C4F2F] uppercase text-[10px] tracking-tighter">
                <Brain size={14} /> Тайлбар
              </div>
              {current.explanation}
            </div>
          )}
        </div>
        {chosenAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-[#7C4F2F] text-white py-4 rounded-2xl font-bold hover:bg-[#5C3820] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10"
          >
            {currentQ + 1 >= questions.length
              ? "Үр дүнг харах"
              : "Дараагийн асуулт"}{" "}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl px-4 pb-20 mx-auto">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-xl border border-[#F0EAE0] flex items-center justify-center mx-auto mb-6">
          <Brain size={32} className="text-[#7C4F2F]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A1209] mb-4 tracking-tight">
          Тест шалгалт
        </h1>
        <p className="text-[#7A6A58] text-lg font-light">
          Сэдвээ сонгоод AI-аар үүсгэсэн сонирхолтой асуултуудад хариулаарай.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8 md:grid-cols-2">
        {categoryList.map(({ slug, name, desc, icon: Icon }) => (
          <button
            key={slug}
            onClick={() => setSelected(slug)}
            className={`flex items-center gap-4 p-5 rounded-[2rem] text-left transition-all border-2 ${
              selected === slug
                ? "border-[#7C4F2F] bg-[#FDFBF7] shadow-md"
                : "border-transparent bg-white hover:border-[#E2D9CC]"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selected === slug ? "bg-[#7C4F2F] text-white" : "bg-[#F8F5F0] text-[#7C4F2F]"}`}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1A1209] text-sm">{name}</p>
              <p className="text-[#7A6A58] text-[10px] leading-tight mt-0.5">
                {desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <button
          onClick={startQuiz}
          disabled={loading}
          className="w-full bg-[#1A1209] text-white py-5 rounded-[2rem] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Асуулт бэлдэж
              байна...
            </>
          ) : (
            <>
              Тест эхлүүлэх <ChevronRight size={20} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-20">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
