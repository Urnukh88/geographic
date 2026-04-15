"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { awardXP } from "@/lib/exp";
import QuizRunner from "@/components/QuizRunner";
import { Swords, Loader2 } from "lucide-react";

function AcceptChallengeContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useUser();

  const fromId = params.get("from");
  const fromName = params.get("name") || "Найз";

  const [started, setStarted] = useState(false);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  const startChallenge = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("challenges")
      .insert({
        challenger_id: fromId,
        challenger_name: fromName,
        challenged_id: user.id,
        challenged_name: user.fullName || "Судлаач",
        status: "active",
      })
      .select()
      .single();

    if (data) {
      setChallengeId(data.id);
      setStarted(true);
    }
  };

  const onFinish = async (score: number, total: number) => {
    if (!challengeId || !user) return;

    await supabase
      .from("challenges")
      .update({ challenged_score: score, status: "done" })
      .eq("id", challengeId);

    const isPerfect = score === total;
    await awardXP(
      user.id,
      isPerfect ? "QUIZ_PERFECT" : "CHALLENGE_PARTICIPATE",
    );

    router.push("/challenge");
  };

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 border border-[#E2D9CC] text-center shadow-sm">
          <div className="w-20 h-20 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#7C4F2F]">
            <Swords size={40} />
          </div>
          <h2 className="text-3xl font-serif text-[#1A1209] mb-4 tracking-tight">
            {fromName} таныг дуудлаа!
          </h2>
          <p className="text-[#7A6A58] text-base mb-10 font-serif italic">
            "Газарзүйн мэдлэгээ сорьж, хэн нь жинхэнэ атлас болохыг
            харуулцгаая."
          </p>
          <button
            onClick={startChallenge}
            className="w-full bg-[#7C4F2F] text-white py-5 rounded-2xl font-serif text-lg font-bold hover:bg-[#5C3820] transition-all active:scale-95 shadow-lg shadow-[#7C4F2F]/20"
          >
            Сорилтыг эхлүүлэх
          </button>
        </div>
      </div>
    );
  }

  return <QuizRunner onFinish={onFinish} />;
}

export default function AcceptChallengePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2 className="animate-spin text-[#7C4F2F]" size={32} />
        </div>
      }
    >
      <AcceptChallengeContent />
    </Suspense>
  );
}
