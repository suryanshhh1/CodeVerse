import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    try {
      const { stream, providerName } = await generateAIResponse(messages, pageContext);

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-AI-Provider': providerName,
        },
      });

    } catch (aiError: any) {
      console.error("AI Generation Error:", aiError);
      return NextResponse.json(
        { error: aiError.message || "Failed to generate AI response." },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("Chat Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || String(error) },
      { status: 500 }
    );
  }
}
