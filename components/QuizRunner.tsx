// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import useSound from "use-sound";
// import Link from "next/link";
// import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";

// interface QuizRunnerProps {
//   onFinish: (score: number, total: number) => void;
// }

// const QUESTIONS = [
//   {
//     id: 1,
//     text: "Дэлхийн хамгийн том далай аль нь вэ?",
//     options: ["Атлантын", "Номхон", "Энэтхэгийн", "Хойд мөсөн"],
//     correct: 1,
//   },
//   {
//     id: 2,
//     text: "Монгол улсын хамгийн өндөр цэг аль вэ?",
//     options: ["Хүйтэн оргил", "Мөнххайрхан", "Богд хан", "Отгонтэнгэр"],
//     correct: 0,
//   },
//   {
//     id: 3,
//     text: "Европ болон Ази тивийг заагладаг уул?",
//     options: ["Гималай", "Альп", "Урал", "Андын нуруу"],
//     correct: 2,
//   },
// ];

// export default function QuizRunner({ onFinish }: QuizRunnerProps) {
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const [playCorrect] = useSound("http://localhost:3000/sounds/correct.mp3", {
//     volume: 0.5,
//     interrupt: true,
//   });
//   const [playWrong] = useSound("http://localhost:3000/sounds/wrong.mp3", {
//     volume: 0.5,
//     interrupt: true,
//   });

//   const currentQuestion = QUESTIONS[currentIdx];

//   const moveToNext = (finalScore: number) => {
//     if (currentIdx < QUESTIONS.length - 1) {
//       setCurrentIdx((prev) => prev + 1);
//       setSelected(null);
//       setIsAnswered(false);
//     } else {
//       setIsFinished(true);
//       onFinish(finalScore, QUESTIONS.length);
//     }
//   };

//   const handleAnswer = (index: number) => {
//     if (isAnswered) return;

//     setSelected(index);
//     setIsAnswered(true);

//     const isCorrect = index === currentQuestion.correct;
//     const newScore = isCorrect ? score + 1 : score;

//     if (isCorrect) {
//       setScore(newScore);
//       if (playCorrect) playCorrect();
//     } else {
//       if (playWrong) playWrong();
//     }

//     setTimeout(() => {
//       moveToNext(newScore);
//     }, 1500);
//   };

//   const handleNextManual = () => {
//     moveToNext(score);
//   };

//   if (!mounted) return null;

//   if (isFinished) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="max-w-md mx-auto mt-20 text-center p-10 bg-white rounded-[2.5rem] border border-[#E2D9CC] shadow-xl shadow-[#7C4F2F]/5"
//       >
//         <div className="w-20 h-20 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6">
//           <Trophy className="text-[#7C4F2F]" size={40} />
//         </div>
//         <h2 className="text-3xl font-serif text-[#1A1209] mb-2">
//           Амжилттай дууслаа!
//         </h2>
//         <p className="text-[#A68966] font-serif mb-8 text-lg">
//           Таны оноо:{" "}
//           <span className="text-[#7C4F2F] font-bold">
//             {score}/{QUESTIONS.length}
//           </span>
//         </p>
//         <Link
//           href="/"
//           className="inline-block w-full bg-[#1A1209] text-white py-4 rounded-2xl font-serif hover:bg-black transition-all"
//         >
//           Нүүр хуудас руу буцах
//         </Link>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="max-w-2xl px-6 pb-20 mx-auto mt-10">
//       <div className="mb-8">
//         <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#A68966] font-black mb-2">
//           <span>
//             Асуулт {currentIdx + 1} / {QUESTIONS.length}
//           </span>
//           <span>Оноо: {score}</span>
//         </div>
//         <div className="h-1.5 w-full bg-[#F2EDE4] rounded-full overflow-hidden">
//           <motion.div
//             className="h-full bg-[#7C4F2F]"
//             initial={{ width: 0 }}
//             animate={{
//               width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
//             }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIdx}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           className="bg-white rounded-[2rem] p-8 md:p-12 border border-[#E2D9CC] shadow-sm"
//         >
//           <h3 className="text-2xl md:text-3xl font-serif text-[#1A1209] mb-10 leading-snug">
//             {currentQuestion.text}
//           </h3>

//           <div className="space-y-3">
//             {currentQuestion.options.map((option, idx) => {
//               const isCorrect = idx === currentQuestion.correct;
//               const isSelected = idx === selected;

//               let variant =
//                 "border-[#E2D9CC] text-[#4A3728] hover:bg-[#FDFBF7]";
//               if (isAnswered) {
//                 if (isCorrect)
//                   variant =
//                     "border-green-500 bg-green-50 text-green-700 shadow-sm";
//                 else if (isSelected)
//                   variant = "border-red-500 bg-red-50 text-red-700 opacity-80";
//                 else variant = "border-[#E2D9CC] text-[#A68966] opacity-40";
//               }

//               return (
//                 <button
//                   key={idx}
//                   disabled={isAnswered}
//                   onClick={() => handleAnswer(idx)}
//                   className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border-2 text-left font-serif text-lg transition-all ${variant}`}
//                 >
//                   <span>{option}</span>
//                   {isAnswered && isCorrect && (
//                     <CheckCircle2 size={20} className="text-green-500" />
//                   )}
//                   {isAnswered && isSelected && !isCorrect && (
//                     <XCircle size={20} className="text-red-500" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {isAnswered && (
//             <motion.button
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               onClick={handleNextManual}
//               className="mt-10 w-full flex items-center justify-center gap-2 bg-[#7C4F2F] text-white py-4 rounded-2xl font-serif text-lg hover:bg-[#5C3820] transition-all"
//             >
//               {currentIdx === QUESTIONS.length - 1
//                 ? "Дуусгах"
//                 : "Дараагийн асуулт"}
//               <ArrowRight size={20} />
//             </motion.button>
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";

interface QuizRunnerProps {
  onFinish: (score: number, total: number) => void;
}

const QUESTIONS = [
  {
    id: 1,
    text: "Дэлхийн хамгийн том далай аль нь вэ?",
    options: ["Атлантын", "Номхон", "Энэтхэгийн", "Хойд мөсөн"],
    correct: 1,
  },
  {
    id: 2,
    text: "Монгол улсын хамгийн өндөр цэг аль вэ?",
    options: ["Хүйтэн оргил", "Мөнххайрхан", "Богд хан", "Отгонтэнгэр"],
    correct: 0,
  },
  {
    id: 3,
    text: "Европ болон Ази тивийг заагладаг уул?",
    options: ["Гималай", "Альп", "Урал", "Андын нуруу"],
    correct: 2,
  },
];

export default function QuizRunner({ onFinish }: QuizRunnerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Дуу тоглуулах функц
  const playSound = (isCorrect: boolean) => {
    const audio = new Audio(
      isCorrect ? "/sounds/correct.mp3" : "/sounds/wrong.mp3",
    );
    audio.volume = 0.4;
    audio
      .play()
      .catch((err) => console.error("Дуу тоглуулахад алдаа гарлаа:", err));
  };

  const currentQuestion = QUESTIONS[currentIdx];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    setSelected(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correct;
    const newScore = isCorrect ? score + 1 : score;

    // Дуу тоглуулах
    playSound(isCorrect);

    if (isCorrect) {
      setScore(newScore);
    }

    // 1.5 секундын дараа автоматаар шилжинэ
    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setSelected(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        onFinish(newScore, QUESTIONS.length);
      }
    }, 1500);
  };

  const handleNextManual = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onFinish(score, QUESTIONS.length);
    }
  };

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mt-20 text-center p-10 bg-white rounded-[2.5rem] border border-[#E2D9CC] shadow-xl shadow-[#7C4F2F]/5"
      >
        <div className="w-20 h-20 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="text-[#7C4F2F]" size={40} />
        </div>
        <h2 className="text-3xl font-serif text-[#1A1209] mb-2">
          Амжилттай дууслаа!
        </h2>
        <p className="text-[#A68966] font-serif mb-8 text-lg">
          Таны оноо:{" "}
          <span className="text-[#7C4F2F] font-bold">
            {score}/{QUESTIONS.length}
          </span>
        </p>
        <Link
          href="/"
          className="inline-block w-full bg-[#1A1209] text-white py-4 rounded-2xl font-serif hover:bg-black transition-all"
        >
          Нүүр хуудас руу буцах
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl px-6 pb-20 mx-auto mt-10">
      <div className="mb-8">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#A68966] font-black mb-2">
          <span>
            Асуулт {currentIdx + 1} / {QUESTIONS.length}
          </span>
          <span>Оноо: {score}</span>
        </div>
        <div className="h-1.5 w-full bg-[#F2EDE4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#7C4F2F]"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 border border-[#E2D9CC] shadow-sm"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-[#1A1209] mb-10 leading-snug">
            {currentQuestion.text}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correct;
              const isSelected = idx === selected;

              let variant =
                "border-[#E2D9CC] text-[#4A3728] hover:bg-[#FDFBF7]";
              if (isAnswered) {
                if (isCorrect)
                  variant =
                    "border-green-500 bg-green-50 text-green-700 shadow-sm";
                else if (isSelected)
                  variant = "border-red-500 bg-red-50 text-red-700 opacity-80";
                else variant = "border-[#E2D9CC] text-[#A68966] opacity-40";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border-2 text-left font-serif text-lg transition-all ${variant}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 size={20} className="text-green-500" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNextManual}
              className="mt-10 w-full flex items-center justify-center gap-2 bg-[#7C4F2F] text-white py-4 rounded-2xl font-serif text-lg hover:bg-[#5C3820] transition-all"
            >
              {currentIdx === QUESTIONS.length - 1
                ? "Дуусгах"
                : "Дараагийн асуулт"}
              <ArrowRight size={20} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
