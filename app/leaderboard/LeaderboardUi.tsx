"use client";
import { motion } from "framer-motion";
import { Trophy, Flame, Zap } from "lucide-react";

const medals = ["🥇", "🥈", "🥉"];

export default function LeaderboardUI({
  leaderboard,
  userId,
  user,
  myRank,
  myXP,
}: any) {
  const top3 = leaderboard.slice(0, 3);
  const podiumOrder = [1, 0, 2];

  return (
    <div className="max-w-2xl px-4 py-6 mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#EDE5D8] border-2 border-[#C4A882] flex items-center justify-center mx-auto mb-4">
          <Trophy size={28} className="text-[#7C4F2F]" />
        </div>
        <h1 className="text-4xl font-serif text-[#1A1209] mb-1">
          Тэргүүлэгчид
        </h1>
        <p className="text-[#7A6A58] text-sm">XP цуглуулж дэлхийг эзэл</p>
      </motion.div>

      {userId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif font-bold text-[#2C1F14]">
              #{myRank ?? "—"}
            </p>
            <p className="text-[10px] text-[#7A6A58] mt-1 uppercase tracking-wider">
              Таны байр
            </p>
          </div>
          <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif font-bold text-[#7C4F2F]">
              {myXP?.total_xp ?? 0}
            </p>
            <p className="text-[10px] text-[#7A6A58] mt-1 uppercase tracking-wider">
              Нийт XP
            </p>
            <div className="h-1 bg-[#E2D9CC] rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(((myXP?.total_xp ?? 0) / (leaderboard[0]?.total_xp || 1)) * 100, 100)}%`,
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                className="h-full bg-[#7C4F2F] rounded-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 text-center">
            <motion.p
              animate={{
                scale: (myXP?.streak_days ?? 0) > 0 ? [1, 1.15, 1] : 1,
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-serif text-2xl font-bold text-amber-600"
            >
              🔥 {myXP?.streak_days ?? 0}
            </motion.p>
            <p className="text-[10px] text-[#7A6A58] mt-1 uppercase tracking-wider">
              Streak
            </p>
          </div>
        </motion.div>
      )}

      {top3.length >= 3 && (
        <div className="grid items-end grid-cols-3 gap-3">
          {podiumOrder.map((i) => {
            const entry = top3[i];
            if (!entry) return null;
            const isMe = userId === entry.user_id;
            const configs = [
              {
                bg: "bg-[#7C4F2F]",
                text: "text-white",
                sub: "text-white/70",
                mt: "",
                label: "1-р байр",
              },
              {
                bg: "bg-white border border-[#E2D9CC]",
                text: "text-[#1A1209]",
                sub: "text-[#7A6A58]",
                mt: "mt-6",
                label: "2-р байр",
              },
              {
                bg: "bg-white border border-[#E2D9CC]",
                text: "text-[#1A1209]",
                sub: "text-[#7A6A58]",
                mt: "mt-8",
                label: "3-р байр",
              },
            ];
            const c = configs[i];

            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{ y: -6 }}
                className={`${c.bg} ${c.mt} rounded-2xl p-4 text-center`}
              >
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-serif font-bold text-lg
                  ${i === 0 ? "bg-white/20 text-white" : "bg-[#EDE5D8] text-[#7C4F2F]"}`}
                >
                  {isMe && user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      className="object-cover w-12 h-12 rounded-full"
                      alt=""
                    />
                  ) : entry.user_id === userId ? (
                    user?.name?.[0]
                  ) : (
                    `${i + 1}`
                  )}
                </div>
                <div className="mb-1 text-2xl">{medals[i]}</div>
                <p
                  className={`text-xs font-semibold font-serif truncate ${c.text}`}
                >
                  {isMe ? user?.name || "Та" : `Судлаач ${i + 1}`}
                </p>
                <div
                  className={`flex items-center justify-center gap-1 mt-2 text-sm font-bold
                  ${i === 0 ? "text-white/90" : "text-[#7C4F2F]"}`}
                >
                  <Zap
                    size={12}
                    className={i === 0 ? "text-yellow-300" : "text-yellow-500"}
                  />
                  {entry.total_xp} XP
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-[#E2D9CC] rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-[#F0EAE0] flex justify-between items-center">
          <span className="text-[10px] font-bold text-[#7A6A58] uppercase tracking-widest">
            Бүх судлаачид
          </span>
          <span className="text-[10px] text-[#7A6A58]">
            {leaderboard.length} судлаач
          </span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-16 text-[#7A6A58]">
            <Trophy size={40} className="mx-auto mb-3 opacity-20" />
            <p className="font-serif text-sm">Тест өгөөд анхны байр эзэл!</p>
          </div>
        ) : (
          leaderboard.map((entry: any, index: number) => {
            const isMe = userId === entry.user_id;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.06 }}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-[#FAF7F3] last:border-0 transition-colors
                  ${isMe ? "bg-[#F5EDE4]" : "hover:bg-[#FAF7F2]"}`}
              >
                <div className="w-7 text-center text-sm font-bold text-[#7A6A58] flex-shrink-0">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold border-2
                  ${
                    isMe
                      ? "bg-[#7C4F2F] text-white border-[#5C3820]"
                      : "bg-[#EDE5D8] text-[#7C4F2F] border-[#C4A882]"
                  }`}
                >
                  {isMe && user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      className="object-cover rounded-full w-9 h-9"
                      alt=""
                    />
                  ) : isMe ? (
                    user?.name?.[0]
                  ) : (
                    `${index + 1}`
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold font-serif truncate ${isMe ? "text-[#7C4F2F]" : "text-[#1A1209]"}`}
                  >
                    {isMe ? user?.name || "Та" : `Судлаач ${index + 1}`}
                    {isMe && (
                      <span className="ml-2 text-[9px] bg-[#7C4F2F] text-white px-1.5 py-0.5 rounded-full">
                        Та
                      </span>
                    )}
                  </p>
                  {entry.streak_days > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 mt-0.5">
                      <Flame size={10} className="animate-pulse" />
                      {entry.streak_days} өдрийн streak
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 text-right">
                  <div
                    className={`flex items-center gap-1 justify-end font-bold text-sm
                    ${isMe ? "text-[#5C3820]" : "text-[#7C4F2F]"}`}
                  >
                    <Zap
                      size={13}
                      className="text-yellow-500 fill-yellow-400"
                    />
                    {entry.total_xp.toLocaleString()}
                  </div>
                  <p className="text-[9px] text-[#7A6A58] uppercase tracking-wider">
                    XP
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
