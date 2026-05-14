import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "edge";

// Simple in-memory rate limiter (resets on cold start, acceptable for edge)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;

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

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getTextFromUIMessage(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return "";
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export async function POST(request: Request) {
  // Check API key configuration
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Chat service is not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Rate limiting
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required and must not be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enforce input limits: max 50 messages
    if (messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Too many messages. Please start a new conversation." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate message content length (UIMessage format uses parts array)
    for (const msg of messages) {
      const text = getTextFromUIMessage(msg);
      if (text.length > 1000) {
        return new Response(
          JSON.stringify({ error: "Each message must be 1000 characters or fewer." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Convert UIMessages to ModelMessages for streamText
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-2.0-flash"),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
