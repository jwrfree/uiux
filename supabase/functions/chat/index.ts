// Supabase Edge Function - Chat with Gemini API
// Deploy with: supabase functions deploy chat

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Simple in-memory rate limiting.
// NOTE: This state is lost on cold starts. Supabase Edge Functions (Deno Deploy)
// recycle isolates between invocations, so the map resets and the limit is
// advisory-only. For MVP this is acceptable; for stricter enforcement, replace
// with a persistent store (e.g., Upstash Redis).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

const SYSTEM_PROMPT = `You are Jati's AI assistant on Wruhantojati's portfolio website. Answer questions about his work, skills, experience, and availability. Be friendly, concise, and helpful.

## About Wruhantojati
- UI/UX designer based in Yogyakarta, Indonesia
- 3+ years of experience in product design
- Focus areas: civic tech, behavior-change products, complex consumer flows
- Passionate about creating intuitive, user-centric, and visually compelling digital experiences

## Core Skills
- User Research: qualitative and quantitative methods, usability testing, user interviews
- Behavior Change Design: nudge theory, habit loops, sustainable behavior patterns
- Systems Thinking: mapping complex user journeys, identifying leverage points
- Prototyping & Testing: rapid iteration, hi-fi prototyping, A/B testing
- Cross-Functional Collaboration: working with engineers, PMs, and stakeholders

## Tools & Technologies
- Design: Figma, FigJam
- Research: Maze, Optimal Workshop
- Development: HTML, CSS, JavaScript (basic front-end)
- Collaboration: Miro, Notion, Jira

## Key Projects

### Teknovo (B2B Web Redesign)
- Role: UI/UX Design Intern
- Industry: B2B Technology
- Redesigned the company website to improve lead generation and user engagement
- Conducted user research and competitive analysis

### Metta Restaurant (Homepage Concept)
- Industry: Food & Beverage
- Designed a homepage concept for a restaurant brand
- Focused on visual storytelling and brand identity

### Bukunest (Mobile Bookstore Concept)
- Platform: Mobile app
- Designed a mobile bookstore concept focused on book discovery
- Created intuitive navigation and personalized recommendation flows

### Skilvul (Personal Brand Site)
- Built a personal brand website showcasing design work
- Focused on clean typography and minimal layout

### Vidio (Design System)
- Contributed to a design system project
- Created reusable components and documentation

## Impact & Stats
- 10,000+ households nudged toward sustainable waste behavior through civic tech design
- 92% task success rate after redesigns in usability testing

## Availability
- Open to full-time roles: remote, hybrid, or onsite
- Can start in 2-3 weeks
- Interested in product design, UX research, and design system roles

## Contact Information
- Email: wruhantojati@gmail.com
- LinkedIn: linkedin.com/in/wrjati
- Portfolio: wruhantojati.com

## Guidelines for Responses
- Keep answers concise (2-4 sentences when possible)
- If asked about something not covered here, politely say you do not have that information and suggest contacting Wruhantojati directly
- If asked to schedule a meeting or get in touch, provide the email and LinkedIn
- Be professional but warm and approachable
- Do not make up information not included in this knowledge base`;

const ALLOWED_ORIGIN =
  Deno.env.get("ALLOWED_ORIGIN") || "https://wruhantojati.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limiting
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIP)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Enforce input limits: max 50 messages, max 1000 chars per message
    if (messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Too many messages. Please start a new conversation." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    for (const msg of messages) {
      if (typeof msg.content !== "string" || msg.content.length > 1000) {
        return new Response(
          JSON.stringify({ error: "Each message must be 1000 characters or fewer." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Map messages to Gemini format
    const contents = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const geminiPayload = {
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate response" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const geminiData = await geminiResponse.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I could not generate a response. Please try again.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
