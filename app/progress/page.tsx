"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import {
  Target,
  TrendingUp,
  Flame,
  BookOpen,
  Zap,
  Loader2,
  Lock,
} from "lucide-react";

interface QuizResult {
  category: string;
  score: number;
  total_questions: number;
  created_at: string;
}

export default function ProgressPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setResults(data);
      }
      setLoading(false);
    }

    if (isLoaded) {
      fetchProgress();
    }
  }, [user, isLoaded]);

  // 1. Clerk ачаалж байгаа үед
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#7C4F2F]" size={32} />
      </div>
    );
  }

  // 2. Хэрэглэгч нэвтрээгүй үед харагдах хэсэг
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-16 h-16 bg-[#EDE5D8] rounded-full flex items-center justify-center mb-4">
          <Lock className="text-[#7C4F2F]" size={28} />
        </div>
        <h2 className="text-2xl font-serif text-[#1A1209] mb-2">
          Та нэвтрээгүй байна
        </h2>
        <p className="text-[#7A6A58] mb-8 max-w-sm">
          Өөрийн суралцах явц, тестийн оноо болон XP оноогоо цуглуулахын тулд
          системд нэвтэрнэ үү.
        </p>
        <SignInButton mode="modal">
          <button className="bg-[#7C4F2F] text-white px-8 py-3 rounded-xl font-serif hover:bg-[#5C3820] transition-all shadow-lg">
            Одоо нэвтрэх
          </button>
        </SignInButton>
      </div>
    );
  }

  // 3. Дата ачаалж байх үед
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#7C4F2F]" size={32} />
      </div>
    );
  }

  // Тооцооллууд
  const totalQuizzes = results.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          results.reduce(
            (acc, curr) => acc + (curr.score / curr.total_questions) * 100,
            0,
          ) / totalQuizzes,
        )
      : 0;
  const uniqueTopics = new Set(results.map((r) => r.category)).size;
  const totalXP = results.reduce((acc, curr) => acc + curr.score * 10, 0);
  const nextLevelXP = 2000;

  return (
    <div className="max-w-4xl mx-auto duration-500 animate-in fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-[#1A1209] mb-1">Миний ахиц</h1>
        <p className="text-[#7A6A58]">Таны суралцсан мэдлэг, дүн үнэлгээ</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Тест өгсөн", value: totalQuizzes, icon: Target },
          { label: "Дундаж оноо", value: `${avgScore}%`, icon: TrendingUp },
          { label: "Нийт XP", value: totalXP, icon: Flame },
          { label: "Сэдвүүд", value: uniqueTopics, icon: BookOpen },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5 border border-[#E2D9CC] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className="text-[#7C4F2F]" />
            </div>
            <div className="text-3xl font-serif text-[#1A1209] font-bold mb-1">
              {value}
            </div>
            <div className="text-xs text-[#7A6A58]">{label}</div>
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div className="bg-[#EDE5D8] rounded-xl p-6 mb-6 flex items-center justify-between border border-[#D4C9B8]">
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="font-serif font-bold text-[#1A1209]">
              {totalXP >= 1000 ? "Intermediate" : "Beginner"}
            </span>
            <div className="w-10 h-10 rounded-full bg-[#7C4F2F] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
          </div>
          <p className="text-[#7A6A58] text-sm mb-3">
            {totalXP} / {nextLevelXP} XP
          </p>
          <div className="h-3 bg-[#D4C4B0] rounded-full overflow-hidden">
            <div
              className="h-3 bg-[#7C4F2F] rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min((totalXP / nextLevelXP) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent History */}
        <div className="bg-white rounded-xl p-6 border border-[#E2D9CC] shadow-sm">
          <h2 className="font-serif font-semibold text-[#1A1209] mb-4">
            Сүүлийн тестүүд
          </h2>
          <div className="flex flex-col gap-3">
            {results.slice(0, 5).map((q, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-[#F0EAE0] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={14} className="text-[#7C4F2F]" />
                  <div>
                    <p className="text-sm font-serif text-[#1A1209] capitalize">
                      {q.category}
                    </p>
                    <p className="text-xs text-[#7A6A58]">
                      {new Date(q.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold font-serif ${
                    q.score / q.total_questions >= 0.9
                      ? "text-green-600"
                      : "text-[#7C4F2F]"
                  }`}
                >
                  {Math.round((q.score / q.total_questions) * 100)}%
                </span>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-sm text-[#7A6A58] italic py-4">
                Одоогоор тест өгөөгүй байна.
              </p>
            )}
          </div>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-xl p-6 border border-[#E2D9CC] shadow-sm">
          <h2 className="font-serif font-semibold text-[#1A1209] mb-4">
            Дахин давтах сэдвүүд
          </h2>
          <div className="flex flex-col gap-3 mb-5">
            {results
              .filter((r) => r.score / r.total_questions < 0.7)
              .slice(0, 3)
              .map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-[#FFF5EE] rounded-lg border border-[#F0DDD0]"
                >
                  <div className="flex items-center justify-center w-5 h-5 bg-orange-100 rounded-full">
                    <span className="text-xs font-bold text-orange-500">!</span>
                  </div>
                  <span className="text-sm font-serif text-[#1A1209] capitalize">
                    {t.category}
                  </span>
                </div>
              ))}
            {results.length > 0 &&
              results.filter((r) => r.score / r.total_questions < 0.7)
                .length === 0 && (
                <div className="py-4 text-center">
                  <p className="text-sm font-medium text-green-600">
                    Гайхалтай! 🎉
                  </p>
                  <p className="text-xs text-[#7A6A58]">
                    Бүх тестэндээ сайн оноо авсан байна.
                  </p>
                </div>
              )}
            {results.length === 0 && (
              <p className="text-sm text-[#7A6A58] italic py-4">
                Мэдээлэл байхгүй.
              </p>
            )}
          </div>
          <button
            onClick={() => router.push("/quiz")}
            className="block w-full bg-[#7C4F2F] text-white py-3 rounded-xl font-serif text-sm text-center hover:bg-[#5C3820] transition-all active:scale-[0.98]"
          >
            Шинэ тест эхлүүлэх
          </button>
        </div>
      </div>
    </div>
  );
}
