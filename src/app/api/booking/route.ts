import { NextResponse } from "next/server";
import { clientIp, rateLimit, sameOrigin } from "@/lib/api-security";

// Pedido de horário da agenda (/servicos#agenda). Valida no servidor as mesmas
// regras da tela — dia útil, de hoje em diante, entre 9h e 17h de Brasília,
// 30/45/60 min — e repassa ao webhook. BOOKING_WEBHOOK_URL tem prioridade;
// sem ela, vai para o PROPOSAL_WEBHOOK_URL com event "meeting_requested".
// Sem nenhum dos dois, 503: a tela oferece o mesmo pedido por e-mail.

const OPEN = 9 * 60;
const CLOSE = 17 * 60;

function todayBrt() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  // 5 pedidos / 10 min por IP.
  if (!rateLimit(`booking:${clientIp(req)}`, 5, 600_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const str = (k: string, max: number) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const name = str("name", 200);
  const email = str("email", 200);
  const topic = str("topic", 500);
  const date = str("date", 10);
  const time = str("time", 5);
  const duration = Number(data.duration);
  const locale = data.locale === "en" ? "en" : "pt";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (data.consent !== true) return NextResponse.json({ error: "no_consent" }, { status: 400 });
  if (![30, 45, 60].includes(duration)) return NextResponse.json({ error: "invalid_slot" }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return NextResponse.json({ error: "invalid_slot" }, { status: 400 });

  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const start = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
  const now = todayBrt();
  const valid =
    weekday !== 0 &&
    weekday !== 6 &&
    start % 30 === 0 &&
    start >= OPEN &&
    start + duration <= CLOSE &&
    (date > now.date || (date === now.date && start >= now.min + 60));
  if (!valid) return NextResponse.json({ error: "invalid_slot" }, { status: 400 });

  const url = process.env.BOOKING_WEBHOOK_URL || process.env.PROPOSAL_WEBHOOK_URL;
  if (!url) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "portfolio",
        event: "meeting_requested",
        name,
        email,
        topic,
        date,
        time,
        timezone: "America/Sao_Paulo",
        duration,
        locale,
        consent: true,
        consentTs: str("consentTs", 40),
        ts: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
