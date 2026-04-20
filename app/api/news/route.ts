import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "world news";
  const lang = searchParams.get("lang") || "en";

  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&max=10&apikey=${process.env.GNEWS_API_KEY}`,
  );
  const data = await res.json();
  return NextResponse.json(data);
}
