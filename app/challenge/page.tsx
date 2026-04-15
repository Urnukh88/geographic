"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Swords, Copy, Check } from "lucide-react";

export default function ChallengePage() {
  const { user } = useUser();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [myLink, setMyLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const link = `${window.location.origin}/challenge/accept?from=${user.id}&name=${encodeURIComponent(user.fullName || "Судлаач")}`;
      setMyLink(link);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("challenges")
      .select("*")
      .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .then(({ data }) => setChallenges(data || []));
  }, [user]);

  const copyLink = () => {
    if (!myLink) return;
    navigator.clipboard.writeText(myLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl px-4 py-8 mx-auto">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EDE5D8] flex items-center justify-center mx-auto mb-4">
          <Swords size={28} className="text-[#7C4F2F]" />
        </div>
        <h1 className="text-4xl font-serif text-[#1A1209] mb-2">Өрсөлдөх</h1>
        <p className="text-[#7A6A58]">
          Найздаа холбоос илгээж тестээр өрсөлдөөрэй
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2D9CC] p-6 mb-6 shadow-sm">
        <h2 className="font-serif text-[#1A1209] font-semibold mb-3">
          Найздаа илгээх холбоос
        </h2>
        <div className="flex gap-2">
          <div className="flex-1 bg-[#F5F0E8] rounded-xl px-4 py-3 text-xs text-[#7A6A58] font-mono truncate border border-[#E2D9CC]/50">
            {myLink || "Холбоос бэлдэж байна..."}
          </div>
          <button
            onClick={copyLink}
            disabled={!myLink}
            className="bg-[#7C4F2F] text-white px-4 py-3 rounded-xl hover:bg-[#5C3820] transition-colors flex items-center gap-2 text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Хуулагдлаа" : "Хуулах"}
          </button>
        </div>
        <p className="text-xs text-[#7A6A58] mt-3 font-serif italic">
          Найз тань холбоосыг нээж тест өгөхөд таны оноотой харьцуулагдах болно.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2D9CC] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#F0EAE0] bg-slate-50/50">
          <h2 className="font-serif text-[#1A1209] font-semibold">
            Өрсөлдөөний түүх
          </h2>
        </div>

        <div className="divide-y divide-[#F0EAE0]">
          {challenges.length === 0 ? (
            <div className="text-center py-12 text-[#7A6A58] font-serif text-sm">
              Одоогоор өрсөлдөөн бүртгэгдээгүй байна.
            </div>
          ) : (
            challenges.map((c) => {
              const isChallenger = c.challenger_id === user?.id;
              const myScore = isChallenger
                ? c.challenger_score
                : c.challenged_score;
              const theirScore = isChallenger
                ? c.challenged_score
                : c.challenger_score;
              const theirName = isChallenger
                ? c.challenged_name
                : c.challenger_name;

              const isCompleted = myScore !== null && theirScore !== null;
              const won = isCompleted && myScore > theirScore;
              const draw = isCompleted && myScore === theirScore;

              return (
                <div
                  key={c.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
                >
                  <span className="flex justify-center w-8 text-2xl">
                    {c.status === "pending"
                      ? "⏳"
                      : won
                        ? "🏆"
                        : draw
                          ? "🤝"
                          : "😔"}
                  </span>
                  <div className="flex-1">
                    <p className="font-serif text-[#1A1209] text-sm font-semibold">
                      {theirName || "Найз"}
                    </p>
                    <p className="text-xs text-[#7A6A58]">
                      {c.category || "Бүх сэдэв"}
                    </p>
                  </div>
                  <div className="text-right">
                    {c.status === "pending" ? (
                      <span className="font-serif text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                        Хүлээгдэж буй
                      </span>
                    ) : (
                      <span
                        className={`font-serif font-bold text-sm ${
                          won
                            ? "text-green-600"
                            : draw
                              ? "text-blue-600"
                              : "text-red-500"
                        }`}
                      >
                        {myScore} — {theirScore}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
