"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface Country {
  name: { common: string };
  flags: { svg: string };
}

export default function FlagQuizEngine() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Дуу тоглуулах функц
  const playSound = (isCorrect: boolean) => {
    const audio = new Audio(
      isCorrect ? "/sounds/correct.mp3" : "/sounds/wrong.mp3",
    );
    audio.volume = 0.4;
    audio.play().catch(() => console.log("Дууны файл олдсонгүй"));
  };

  // Тоглоомын асуулт бэлдэх
  const setupQuiz = useCallback((data: Country[]) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selectedCountries = shuffled.slice(0, 10);

    const questions = selectedCountries.map((correctCountry) => {
      const incorrect = data
        .filter((c) => c.name.common !== correctCountry.name.common)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [correctCountry, ...incorrect].sort(
        () => 0.5 - Math.random(),
      );
      return { correct: correctCountry, options };
    });

    setQuizQuestions(questions);
    setCurrentIdx(0);
    setScore(0);
    setFinished(false);
    setIsAnswered(false);
    setSelected(null);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
        setupQuiz(data);
        setLoading(false);
      });
  }, [setupQuiz]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const isCorrect = answer === quizQuestions[currentIdx].correct.name.common;
    setSelected(answer);
    setIsAnswered(true);
    playSound(isCorrect);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIdx < 9) {
        setCurrentIdx((prev) => prev + 1);
        setIsAnswered(false);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#7C4F2F] mb-4" size={48} />
        <p className="font-serif text-[#A68966] animate-pulse">
          Дэлхийг бэлдэж байна...
        </p>
      </div>
    );

  if (finished)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white rounded-[3rem] border border-[#E2D9CC] shadow-2xl shadow-[#7C4F2F]/10"
      >
        <div className="w-24 h-24 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="text-[#7C4F2F]" size={48} />
        </div>
        <h2 className="text-4xl font-serif text-[#1A1209] mb-2">Гайхалтай!</h2>
        <p className="text-[#A68966] text-xl mb-8 font-serif">
          Та 10-аас{" "}
          <span className="text-[#7C4F2F] font-bold text-2xl">{score}</span>{" "}
          оноо авлаа.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setupQuiz(allCountries)}
            className="flex items-center justify-center gap-2 bg-[#7C4F2F] text-white px-10 py-4 rounded-2xl font-serif hover:bg-[#5C3820] transition-all shadow-lg shadow-[#7C4F2F]/20"
          >
            <RotateCcw size={20} /> Дахин эхлэх
          </button>
          <Link
            href="/"
            className="flex items-center justify-center bg-[#F2EDE4] text-[#4A3728] px-10 py-4 rounded-2xl font-serif hover:bg-[#E2D9CC] transition-all"
          >
            Нүүр хуудас
          </Link>
        </div>
      </motion.div>
    );

  const current = quizQuestions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="flex items-end justify-between px-2 mb-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A68966] font-bold">
            Явц
          </span>
          <div className="flex items-center gap-3">
            <div className="h-2 w-48 bg-[#F2EDE4] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#7C4F2F]"
                initial={{ width: 0 }}
                animate={{ width: `${(currentIdx + 1) * 10}%` }}
              />
            </div>
            <span className="text-[#7C4F2F] font-bold text-sm">
              {currentIdx + 1}/10
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A68966] font-bold">
            Оноо
          </span>
          <p className="text-2xl font-serif font-bold text-[#1A1209]">
            {score}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E2D9CC] shadow-sm relative overflow-hidden"
        >
          {/* Flag Display */}
          <div className="relative aspect-[16/10] w-full max-w-md mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
            <img
              src={current.correct.flags.svg}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              alt="Улсын далбаа"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {current.options.map((opt: Country) => {
              const isCorrect = opt.name.common === current.correct.name.common;
              const isSelected = opt.name.common === selected;

              let btnClass =
                "border-[#E2D9CC] hover:border-[#7C4F2F] hover:bg-[#FDFBF7] text-[#4A3728]";

              if (isAnswered) {
                if (isCorrect)
                  btnClass =
                    "border-green-500 bg-green-50 text-green-700 shadow-sm";
                else if (isSelected)
                  btnClass = "border-red-500 bg-red-50 text-red-700 opacity-80";
                else btnClass = "opacity-40 border-[#E2D9CC]";
              }

              return (
                <motion.button
                  whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  key={opt.name.common}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(opt.name.common)}
                  className={`group relative flex items-center justify-between p-6 rounded-2xl border-2 font-serif text-lg transition-all text-left ${btnClass}`}
                >
                  <span className="relative z-10">{opt.name.common}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="text-green-500" size={24} />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
