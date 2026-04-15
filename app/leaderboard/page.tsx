// import { getLeaderboard, getUserRank, getUserXP } from "@/lib/exp";
// import { Trophy, Flame, Star, Medal, Zap } from "lucide-react";
// import { currentUser } from "@clerk/nextjs/server";

// export default async function LeaderboardPage() {
//   const user = await currentUser();
//   const userId = user?.id;

//   const leaderboard = await getLeaderboard(20);
//   const myRank = userId ? await getUserRank(userId) : null;
//   const myXP = userId ? await getUserXP(userId) : null;

//   const getRankIcon = (index: number) => {
//     if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
//     if (index === 1) return <Medal className="w-6 h-6 text-slate-400" />;
//     if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
//     return (
//       <span className="text-sm font-bold text-[#A68966] w-6 text-center">
//         #{index + 1}
//       </span>
//     );
//   };

//   const getRankBg = (index: number, isMe: boolean) => {
//     if (isMe) return "bg-[#2C1F14] text-white border-[#2C1F14]";
//     if (index === 0)
//       return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300";
//     if (index === 1)
//       return "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-300";
//     if (index === 2)
//       return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300";
//     return "bg-white border-[#E8DDD0] hover:border-[#C4A882] hover:bg-[#FAF7F2]";
//   };

//   return (
//     <div className="max-w-2xl p-6 mx-auto space-y-6">
//       <div>
//         <div className="flex items-center gap-3 mb-1">
//           <Trophy className="w-8 h-8 text-yellow-500" />
//           <h1 className="text-3xl font-serif font-bold text-[#2C1F14]">
//             Тэргүүлэгчид
//           </h1>
//         </div>
//         <p className="text-[#A68966] text-sm">
//           Хамгийн их судалсан хэрэглэгчид
//         </p>
//       </div>

//       {userId && (
//         <div className="grid grid-cols-3 gap-3">
//           <div className="bg-white border border-[#E8DDD0] rounded-2xl p-4 text-center">
//             <p className="text-2xl font-serif font-bold text-[#2C1F14]">
//               #{myRank ?? "—"}
//             </p>
//             <p className="text-xs text-[#A68966] mt-1">Таны байр</p>
//           </div>
//           <div className="bg-white border border-[#E8DDD0] rounded-2xl p-4 text-center">
//             <p className="text-2xl font-serif font-bold text-[#7C4F2F]">
//               {myXP?.total_xp ?? 0}
//             </p>
//             <p className="text-xs text-[#A68966] mt-1">Нийт XP</p>
//           </div>
//           <div className="bg-white border border-[#E8DDD0] rounded-2xl p-4 text-center">
//             <p className="font-serif text-2xl font-bold text-orange-500">
//               {myXP?.streak_days ?? 0}
//             </p>
//             <p className="text-xs text-[#A68966] mt-1">Streak 🔥</p>
//           </div>
//         </div>
//       )}

//       <div className="space-y-2">
//         {leaderboard.length === 0 ? (
//           <div className="text-center py-16 text-[#A68966]">
//             <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
//             <p className="font-serif">Одоохондоо мэдээлэл байхгүй байна</p>
//             <p className="mt-1 text-sm">Тест өгөөд анхны байр эзэл!</p>
//           </div>
//         ) : (
//           leaderboard.map((entry: any, index: number) => {
//             const isMe = userId === entry.user_id;
//             const displayName = isMe
//               ? user?.fullName || user?.username || "Та"
//               : `Судлаач ${index + 1}`;
//             const initials = displayName[0]?.toUpperCase() ?? "?";

//             return (
//               <div
//                 key={entry.user_id}
//                 className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${getRankBg(index, isMe)}`}
//               >
//                 <div className="flex justify-center flex-shrink-0 w-8">
//                   {getRankIcon(index)}
//                 </div>

//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
//                     isMe ? "bg-white text-[#2C1F14]" : "bg-[#2C1F14] text-white"
//                   }`}
//                 >
//                   {isMe && user?.imageUrl ? (
//                     <img
//                       src={user.imageUrl}
//                       alt="avatar"
//                       className="object-cover w-10 h-10 rounded-full"
//                     />
//                   ) : (
//                     initials
//                   )}
//                 </div>

//                 {/* Нэр */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <p
//                       className={`font-semibold truncate ${isMe ? "text-white" : "text-[#2C1F14]"}`}
//                     >
//                       {displayName}
//                     </p>
//                     {isMe && (
//                       <span className="text-xs bg-white text-[#2C1F14] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
//                         Та
//                       </span>
//                     )}
//                   </div>
//                   {entry.streak_days > 0 && (
//                     <div className="flex items-center gap-1 mt-0.5">
//                       <Flame className="w-3 h-3 text-orange-400" />
//                       <span
//                         className={`text-xs ${isMe ? "text-white/70" : "text-[#A68966]"}`}
//                       >
//                         {entry.streak_days} өдрийн streak
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-shrink-0 text-right">
//                   <div
//                     className={`flex items-center gap-1 justify-end ${isMe ? "text-white" : "text-[#2C1F14]"}`}
//                   >
//                     <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400" />
//                     <p className="text-lg font-bold">
//                       {entry.total_xp.toLocaleString()}
//                     </p>
//                   </div>
//                   <p
//                     className={`text-xs ${isMe ? "text-white/60" : "text-[#A68966]"}`}
//                   >
//                     XP
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
import { getLeaderboard, getUserRank, getUserXP } from "@/lib/exp";
import { currentUser } from "@clerk/nextjs/server";
import LeaderboardUI from "./LeaderboardUi";

export default async function LeaderboardPage() {
  const user = await currentUser();
  const userId = user?.id ?? null;

  const leaderboard = await getLeaderboard(20);
  const myRank = userId ? await getUserRank(userId) : null;
  const myXP = userId ? await getUserXP(userId) : null;

  const safeUser = user
    ? {
        id: user.id,
        name:
          user.fullName ||
          user.username ||
          user.emailAddresses?.[0]?.emailAddress ||
          "User",
        imageUrl: user.imageUrl,
      }
    : null;

  const safeLeaderboard = leaderboard.map((item: any) => ({
    user_id: item.user_id,
    total_xp: Number(item.total_xp),
    weekly_xp: Number(item.weekly_xp),
    streak_days: Number(item.streak_days),
  }));

  return (
    <LeaderboardUI
      leaderboard={safeLeaderboard}
      userId={userId}
      user={safeUser}
      myRank={myRank}
      myXP={myXP}
    />
  );
}
