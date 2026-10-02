import { NextResponse } from "next/server";
import { clientIp, rateLimit, sameOrigin } from "@/lib/api-security";

// Recebe o pedido de proposta (3 etapas: quem é, o que precisa, prazo e
// investimento) e repassa ao webhook n8n/CRM.
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

  // Whitelist: só os campos do formulário, cada um com teto de tamanho.
  const str = (k: string, max: number) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const pick = (k: string, allowed: string[]) => (allowed.includes(str(k, 40)) ? str(k, 40) : "");
  const NEEDS = ["agente", "crm", "plataforma", "processos", "dados", "outro"];
  const fields = {
    name: str("name", 200),
    role: str("role", 120),
    company: str("company", 200),
    segment: str("segment", 160),
    email: str("email", 200),
    whatsapp: str("whatsapp", 50),
    needs: Array.isArray(data.needs) ? (data.needs as unknown[]).filter((n): n is string => typeof n === "string" && NEEDS.includes(n)) : [],
    pain: str("pain", 3000),
    tools: str("tools", 600),
    budget: pick("budget", ["ate-3k", "3-10k", "10-30k", "30k+", "mensal", "nao-sei"]),
    deadline: pick("deadline", ["urgente", "1-3m", "data", "sem-pressa"]),
    deadlineDate: str("deadlineDate", 200),
    decider: pick("decider", ["eu", "socios", "outro"]),
    history: str("history", 1000),
    // compatibilidade com o formulário antigo e com o chat
    message: str("message", 4000),
  };
  const locale = data.locale === "en" ? "en" : "pt";

  const hasContact = !!fields.email || !!fields.whatsapp;
  const hasNeed = !!fields.pain || !!fields.message;
  if (!fields.name || !hasContact || !hasNeed) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  // Sem consentimento registrado, nada sai daqui (LGPD art. 7º, I).
  if (data.consent !== true) {
    return NextResponse.json({ error: "no_consent" }, { status: 400 });
  }

  const url = process.env.PROPOSAL_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const payload = {
    source: "portfolio",
    event: "proposal_requested",
    ...fields,
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
