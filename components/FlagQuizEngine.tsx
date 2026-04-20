"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
  Flame,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface Country {
  name: { common: string };
  flags: { svg: string };
}

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG = {
  easy: {
    label: "Хялбар",
    time: 30,
    options: 2,
    color: "#6b8a3a",
    bg: "#f0f5e8",
    icon: Shield,
    desc: "2 сонголт · 30 сек",
  },
  medium: {
    label: "Дунд",
    time: 20,
    options: 4,
    color: "#c47c2b",
    bg: "#fdf4e8",
    icon: Zap,
    desc: "4 сонголт · 20 сек",
  },
  hard: {
    label: "Хэцүү",
    time: 10,
    options: 6,
    color: "#c0605a",
    bg: "#fdf0ef",
    icon: Flame,
    desc: "6 сонголт · 10 сек",
  },
};

export default function FlagQuizEngine() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = (type: "correct" | "wrong" | "timeout") => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const setupQuiz = useCallback((data: Country[], diff: Difficulty) => {
    const config = DIFFICULTY_CONFIG[diff];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    const questions = selected.map((correct) => {
      const incorrect = data
        .filter((c) => c.name.common !== correct.name.common)
        .sort(() => 0.5 - Math.random())
        .slice(0, config.options - 1);
      const options = [correct, ...incorrect].sort(() => 0.5 - Math.random());
      return { correct, options };
    });
    setQuizQuestions(questions);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setIsAnswered(false);
    setSelected(null);
    setTimedOut(false);
    setTimeLeft(config.time);
  }, []);

  useEffect(() => {
    if (!difficulty || isAnswered || finished || quizQuestions.length === 0)
      return;
    const config = DIFFICULTY_CONFIG[difficulty];
    setTimeLeft(config.time);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setTimedOut(true);
          setIsAnswered(true);
          setStreak(0);
          playSound("timeout");
          setTimeout(() => {
            if (currentIdx < 9) {
              setCurrentIdx((p) => p + 1);
              setIsAnswered(false);
              setSelected(null);
              setTimedOut(false);
              setTimeLeft(config.time);
            } else {
              setFinished(true);
            }
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [currentIdx, difficulty, finished]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((r) => r.json())
      .then((data) => {
        setAllCountries(data);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer: string) => {
    if (isAnswered || !difficulty) return;
    clearInterval(timerRef.current!);
    const config = DIFFICULTY_CONFIG[difficulty];
    const isCorrect = answer === quizQuestions[currentIdx].correct.name.common;
    setSelected(answer);
    setIsAnswered(true);
    playSound(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((p) => p + 1);
      setStreak((p) => {
        const next = p + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIdx < 9) {
        setCurrentIdx((p) => p + 1);
        setIsAnswered(false);
        setSelected(null);
        setTimedOut(false);
        setTimeLeft(config.time);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const handleStart = (diff: Difficulty) => {
    setDifficulty(diff);
    setupQuiz(allCountries, diff);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#7C4F2F] mb-4" size={48} />
        <p className="font-serif text-[#A68966]">Дэлхийг бэлдэж байна...</p>
      </div>
    );

  if (!difficulty)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-serif font-bold text-[#1A1209] text-center mb-2">
          Түвшин сонгоно уу
        </h2>
        <p className="text-[#A68966] font-serif text-center mb-8">
          Хэр сайн мэдэх вэ?
        </p>
        <div className="flex flex-col gap-4">
          {(
            Object.entries(DIFFICULTY_CONFIG) as [
              Difficulty,
              typeof DIFFICULTY_CONFIG.easy,
            ][]
          ).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStart(key)}
                className="flex items-center gap-5 p-6 bg-white rounded-3xl border-2 border-[#E2D9CC] hover:border-current transition-all text-left shadow-sm"
                style={{ "--hover-color": cfg.color } as any}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
                  style={{ background: cfg.bg }}
                >
                  <Icon size={28} style={{ color: cfg.color }} />
                </div>
                <div className="flex-1">
                  <p className="font-serif font-bold text-xl text-[#1A1209]">
                    {cfg.label}
                  </p>
                  <p
                    className="font-serif text-sm"
                    style={{ color: cfg.color }}
                  >
                    {cfg.desc}
                  </p>
                </div>
                <div
                  className="font-serif text-2xl font-bold"
                  style={{ color: cfg.color }}
                >
                  {key === "easy" ? "😊" : key === "medium" ? "🤔" : "🔥"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );

  if (finished) {
    const cfg = DIFFICULTY_CONFIG[difficulty];
    const pct = Math.round((score / 10) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white rounded-[3rem] border border-[#E2D9CC] shadow-2xl"
      >
        <div
          className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full"
          style={{ background: cfg.bg }}
        >
          <Trophy size={48} style={{ color: cfg.color }} />
        </div>
        <h2 className="text-4xl font-serif text-[#1A1209] mb-2">
          {pct >= 80
            ? "Гайхалтай! 🎉"
            : pct >= 50
              ? "Сайн байна! 👍"
              : "Дахин оролдоорой 💪"}
        </h2>
        <p className="text-[#A68966] text-lg mb-2 font-serif">
          10-аас{" "}
          <span className="text-2xl font-bold" style={{ color: cfg.color }}>
            {score}
          </span>{" "}
          оноо
        </p>
        <p className="text-[#A68966] font-serif mb-8">
          Хамгийн урт streak:{" "}
          <span className="font-bold text-[#7C4F2F]">🔥 {bestStreak}</span>
        </p>

        <div className="w-full bg-[#F2EDE4] rounded-full h-3 mb-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: cfg.color }}
          />
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              setDifficulty(null);
            }}
            className="flex items-center justify-center gap-2 px-10 py-4 font-serif text-white transition-all shadow-lg rounded-2xl hover:opacity-90"
            style={{ background: cfg.color }}
          >
            <RotateCcw size={20} /> Дахин эхлэх
          </button>
          <Link
            href="/"
            className="flex items-center justify-center px-10 py-4 rounded-2xl font-serif bg-[#F2EDE4] text-[#4A3728] hover:bg-[#E2D9CC] transition-all"
          >
            Нүүр хуудас
          </Link>
        </div>
      </motion.div>
    );
  }

  const current = quizQuestions[currentIdx];
  const cfg = DIFFICULTY_CONFIG[difficulty];
  const timePct = (timeLeft / cfg.time) * 100;
  const timerColor =
    timePct > 50 ? "#6b8a3a" : timePct > 25 ? "#c47c2b" : "#c0605a";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A68966] font-bold mb-1">
              Явц
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-36 bg-[#F2EDE4] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: cfg.color }}
                  animate={{ width: `${(currentIdx + 1) * 10}%` }}
                />
              </div>
              <span className="text-sm font-bold" style={{ color: cfg.color }}>
                {currentIdx + 1}/10
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full"
              style={{ background: cfg.bg }}
            >
              <Flame size={16} style={{ color: cfg.color }} />
              <span className="text-sm font-bold" style={{ color: cfg.color }}>
                {streak}
              </span>
            </motion.div>
          )}

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A68966] font-bold">
              Оноо
            </p>
            <p className="text-2xl font-serif font-bold text-[#1A1209]">
              {score}
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#F2EDE4] rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full transition-colors duration-300 rounded-full"
          style={{ width: `${timePct}%`, background: timerColor }}
          animate={{ width: `${timePct}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: cfg.bg }}
        >
          <Clock size={14} style={{ color: cfg.color }} />
          <span className="text-sm font-bold" style={{ color: cfg.color }}>
            {timeLeft}с
          </span>
        </div>
        <span
          className="px-3 py-1 text-xs font-bold rounded-full"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.label} түвшин
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#E2D9CC] shadow-sm"
        >
          <div className="relative aspect-[16/10] w-full max-w-sm mx-auto mb-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={current.correct.flags.svg}
              className="object-cover w-full h-full"
              alt="Улсын далбаа"
            />
            {timedOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="font-serif text-xl font-bold text-white">
                  ⏰ Хугацаа дууслаа!
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-[#A68966] font-serif mb-6 text-sm uppercase tracking-widest">
            Энэ ямар улсын далбаа вэ?
          </p>

          <div
            className={`grid gap-3 ${cfg.options <= 2 ? "grid-cols-2" : cfg.options <= 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
          >
            {current.options.map((opt: Country) => {
              const isCorrect = opt.name.common === current.correct.name.common;
              const isSelected = opt.name.common === selected;

              let btnStyle =
                "border-[#E2D9CC] hover:border-[#7C4F2F] hover:bg-[#FDFBF7] text-[#4A3728]";
              if (isAnswered) {
                if (isCorrect)
                  btnStyle = "border-green-500 bg-green-50 text-green-700";
                else if (isSelected)
                  btnStyle = "border-red-400 bg-red-50 text-red-600 opacity-80";
                else btnStyle = "opacity-30 border-[#E2D9CC]";
              }

              return (
                <motion.button
                  whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: isAnswered ? 1 : 0.97 }}
                  key={opt.name.common}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(opt.name.common)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 font-serif text-sm transition-all text-left ${btnStyle}`}
                >
                  <span>{opt.name.common}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2
                      className="text-green-500 shrink-0"
                      size={20}
                    />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="text-red-400 shrink-0" size={20} />
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
