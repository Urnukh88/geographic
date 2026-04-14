import { getLeaderboard, getUserRank } from "@/lib/exp";
import { supabase } from "@/lib/supabase";
import { Trophy, Flame, Star, Medal } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function LeaderboardPage() {
  const user = await currentUser();
  const userId = user?.id;

  const leaderboard = await getLeaderboard(20);
  const myRank = userId ? await getUserRank(userId) : null;

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return (
      <span className="text-sm font-bold text-[#A68966]">#{index + 1}</span>
    );
  };

  const getRankBg = (index: number) => {
    if (index === 0) return "bg-yellow-50 border-yellow-200";
    if (index === 1) return "bg-gray-50 border-gray-200";
    if (index === 2) return "bg-amber-50 border-amber-200";
    return "bg-white border-[#E8DDD0]";
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-serif font-bold text-[#2C1F14]">
            Тэргүүлэгчид
          </h1>
        </div>
        <p className="text-[#A68966] text-sm">
          Хамгийн их судалсан хэрэглэгчид
        </p>

        {myRank && (
          <div className="mt-4 p-4 bg-[#2C1F14] rounded-xl text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Таны байр</span>
            </div>
            <span className="text-2xl font-bold">#{myRank}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {leaderboard.length === 0 ? (
          <div className="text-center py-16 text-[#A68966]">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Одоохондоо мэдээлэл байхгүй байна</p>
            <p className="mt-1 text-sm">Анхны хэрэглэгч болоорой!</p>
          </div>
        ) : (
          leaderboard.map((entry: any, index: number) => {
            const isMe = user?.id === entry.userId;
            const profile = Array.isArray(entry.profiles)
              ? entry.profiles[0]
              : entry.profiles;

            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${getRankBg(index)} ${
                  isMe ? "ring-2 ring-[#2C1F14]" : ""
                }`}
              >
                <div className="flex justify-center w-8">
                  {getRankIcon(index)}
                </div>

                <div className="w-10 h-10 rounded-full bg-[#2C1F14] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {profile?.display_name?.[0]?.toUpperCase() ??
                    profile?.username?.[0]?.toUpperCase() ??
                    "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#2C1F14] truncate">
                    {profile?.display_name ?? profile?.username ?? "Хэрэглэгч"}
                    {isMe && (
                      <span className="ml-2 text-xs bg-[#2C1F14] text-white px-2 py-0.5 rounded-full">
                        Та
                      </span>
                    )}
                  </p>
                  {entry.streak_days > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-[#A68966]">
                        {entry.streak_days} өдрийн streak
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#2C1F14] text-lg">
                    {entry.total_xp.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#A68966]">XP</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
