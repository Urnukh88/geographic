import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Чи бол 'Газарзүйн Атлас' вэбсайтын ухаалаг туслах багш. Чи зөвхөн газарзүй, байгаль орчин, улс орнууд, газрын зураг болон хүн ам зүйн асуултад хариулна. Хэрэв хэрэглэгч өөр сэдэв (хоол, математик, код бичих гэх мэт) асуувал 'Уучлаарай, би зөвхөн газарзүйн чиглэлээр туслах боломжтой' гэж эелдэгээр хариулж, газарзүйн сонирхолтой баримт хэлж өгөөрэй. Хариултаа үргэлж Монгол хэлээр өгнө. ",
        },
        ...messages,
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "AI-тай холбогдоход алдаа гарлаа" },
      { status: 500 },
    );
  }
}
