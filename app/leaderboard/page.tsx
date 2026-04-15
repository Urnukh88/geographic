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
