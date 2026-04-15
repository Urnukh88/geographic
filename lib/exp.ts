import { supabase } from "@/lib/supabase";

export const XP_REWARDS = {
  QUIZ_COMPLETE: 10,
  QUIZ_PERFECT: 25,
  CHALLENGE_WIN: 50,
  CHALLENGE_PARTICIPATE: 15,
  DAILY_LOGIN: 3,
} as const;

export type XPReason = keyof typeof XP_REWARDS;

export async function awardXP(userId: string, reason: XPReason) {
  const amount = XP_REWARDS[reason];

  console.log("🎯 awardXP called:", { userId, reason, amount });

  const { error: txError } = await supabase.from("xp_transactions").insert({
    user_id: userId,
    amount,
    reason,
  });
  console.log("xp_transactions insert:", txError ?? "✅ success");

  const { error: rpcError } = await supabase.rpc("increment_xp", {
    p_user_id: userId,
    p_amount: amount,
  });
  console.log("increment_xp rpc:", rpcError ?? "✅ success");

  return amount;
}

export async function getLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from("user_xp")
    .select("user_id, total_xp, weekly_xp, streak_days")
    .order("total_xp", { ascending: false })
    .limit(limit);

  console.log("getLeaderboard:", data, error);
  return data ?? [];
}

export async function getUserRank(userId: string) {
  const { data } = await supabase
    .from("user_xp")
    .select("total_xp")
    .eq("user_id", userId)
    .single();

  if (!data) return null;

  const { count } = await supabase
    .from("user_xp")
    .select("*", { count: "exact", head: true })
    .gt("total_xp", data.total_xp);

  return (count ?? 0) + 1;
}

export async function getUserXP(userId: string) {
  const { data } = await supabase
    .from("user_xp")
    .select("total_xp, weekly_xp, streak_days")
    .eq("user_id", userId)
    .single();

  return data ?? { total_xp: 0, weekly_xp: 0, streak_days: 0 };
}
