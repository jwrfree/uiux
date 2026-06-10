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

    const ALLOWED_ROLES = new Set(["user", "assistant"]);
    for (const msg of messages) {
      // MED-01: Validate role (defense in depth — Edge Function also validates)
      if (!ALLOWED_ROLES.has(msg.role)) {
        return NextResponse.json(
          { error: "Invalid message role." },
          { status: 400 }
        );
      }
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

    // CRIT-01: Use server-only env var (no NEXT_PUBLIC_ prefix) to prevent
    // the anon key from being bundled into client-side JavaScript.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY
      ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // fallback for gradual migration

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
        "apikey": supabaseKey,
      },
      // MED-03: Strip [SHOW_CONTACT] tag from user messages before sending to AI
      body: JSON.stringify({
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.role === "user"
            ? m.content.replace(/\[SHOW_CONTACT\]/gi, "").trim()
            : m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase Edge Function error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from AI service" },
        { status: response.status }
      );
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
