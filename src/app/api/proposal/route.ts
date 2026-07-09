import { NextResponse } from "next/server";
import { clientIp, rateLimit, sameOrigin } from "@/lib/api-security";

// Recebe o form "Solicitar proposta" e repassa para o webhook n8n/CRM.
// Configurar PROPOSAL_WEBHOOK_URL no ambiente (Vercel). Sem ela, responde 503
// e o front oferece o fallback de WhatsApp.

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  // 5 envios / 10 min por IP.
  if (!rateLimit(`proposal:${clientIp(req)}`, 5, 600_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: campo invisível preenchido = bot. Responde ok sem repassar.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const whatsapp = typeof data.whatsapp === "string" ? data.whatsapp.trim() : "";
  const company = typeof data.company === "string" ? data.company.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const locale = data.locale === "en" ? "en" : "pt";

  if (!name || !message || (!email && !whatsapp)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const url = process.env.PROPOSAL_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const payload = {
    source: "portfolio",
    event: "proposal_requested",
    name: name.slice(0, 200),
    email: email.slice(0, 200),
    whatsapp: whatsapp.slice(0, 50),
    company: company.slice(0, 200),
    message: message.slice(0, 4000),
    locale,
    // Registro do consentimento LGPD dado no form (art. 8º, §1º).
    consent: data.consent === true,
    consentTs: typeof data.consentTs === "string" ? data.consentTs.slice(0, 40) : "",
    ts: new Date().toISOString(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
