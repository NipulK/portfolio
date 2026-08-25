import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

const requests = new Map<string, { count: number; expires: number }>();

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const existing = requests.get(ip);

  if (existing && existing.expires > now && existing.count >= 3) {
    return NextResponse.json(
      { message: "Please wait before sending another message." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form fields." },
      { status: 400 },
    );
  }

  // Silently accept bot submissions without forwarding them.
  if (parsed.data.company) {
    return NextResponse.json({ message: "Thanks—your message has been sent." });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("Contact form: WEB3FORMS_ACCESS_KEY is not configured.");
    return NextResponse.json(
      { message: "Message delivery is not configured yet. Please use GitHub or LinkedIn." },
      { status: 503 },
    );
  }

  requests.set(ip, {
    count: existing && existing.expires > now ? existing.count + 1 : 1,
    expires: now + 60 * 60 * 1000,
  });

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: parsed.data.name,
        email: parsed.data.email,
        subject: `[Portfolio] ${parsed.data.subject}`,
        message: parsed.data.message,
        from_name: "Nipul Kanishka Portfolio",
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    const result = (await response.json().catch(() => ({}))) as Web3FormsResponse;
    if (!response.ok || result.success !== true) {
      console.error("Contact form provider rejected the message:", result.message ?? response.status);
      return NextResponse.json(
        { message: "The message could not be sent. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Thanks—your message has been sent." });
  } catch (error) {
    console.error("Contact form provider request failed:", error);
    return NextResponse.json(
      { message: "The message service is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
