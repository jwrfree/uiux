import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Enforce input limits: max 50 messages, max 1000 chars per message
    if (messages.length > 50) {
      return NextResponse.json(
        { error: "Too many messages. Please start a new conversation." },
        { status: 400 }
      );
    }

    for (const msg of messages) {
      if (
        typeof msg.content !== "string" ||
        msg.content.length > 1000
      ) {
        return NextResponse.json(
          { error: "Each message must be 1000 characters or fewer." },
          { status: 400 }
        );
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Chat service is not configured" },
        { status: 503 }
      );
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase Edge Function error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from AI service" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
