import { NextResponse } from "next/server";
import type { AgentReply, AgentStatus } from "@/lib/chat";

// Ponte do chat ao vivo: valida a mensagem do visitante e repassa ao agente
// n8n (CHAT_WEBHOOK_URL, modo request/response). Sem a env, responde 503 e o
// front mostra o fallback de WhatsApp. O n8n mantém a memória por sessionId e
// responde { reply, status, stage?, tool? } — aceita também { output } (saída
// padrão do nó AI Agent).

const STATUSES: AgentStatus[] = ["qualifying", "qualified", "finalized"];
const CONTROL_ACTIONS = ["confirm_send", "edit_answers"];
const MAX_MEDIA_B64 = 3_500_000; // ~2.6MB reais — abaixo do limite de body da Vercel

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function parseMessage(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== "object" || raw === null) return null;
  const m = raw as Record<string, unknown>;
  switch (m.type) {
    case "text": {
      const text = str(m.text, 2000).trim();
      return text ? { type: "text", text } : null;
    }
    case "image":
    case "audio": {
      const data = typeof m.data === "string" ? m.data : "";
      if (!data || data.length > MAX_MEDIA_B64) return null;
      const out: Record<string, unknown> = { type: m.type, data, mimeType: str(m.mimeType, 60) };
      if (m.type === "audio") out.duration = typeof m.duration === "number" ? Math.min(600, Math.max(0, m.duration)) : 0;
      return out;
    }
    case "control": {
      const action = str(m.action, 40);
      return CONTROL_ACTIONS.includes(action) ? { type: "control", action } : null;
    }
    default:
      return null;
  }
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const sessionId = str(data.sessionId, 64).trim();
  const mode = data.mode === "proposal" ? "proposal" : "practice";
  const locale = data.locale === "en" ? "en" : "pt";
  const message = parseMessage(data.message);

  if (!sessionId || !message) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const url = process.env.CHAT_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const payload = {
    source: "portfolio",
    event: "chat_message",
    sessionId,
    mode,
    locale,
    message,
    ts: new Date().toISOString(),
  };

  let upstream: unknown;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }
    upstream = await res.json();
  } catch {
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }

  // n8n pode responder objeto único ou array de items.
  const u = (Array.isArray(upstream) ? upstream[0] : upstream) as Record<string, unknown> | null;
  let reply = str(u?.reply, 4000) || str(u?.output, 4000);
  let status = STATUSES.includes(u?.status as AgentStatus) ? (u?.status as AgentStatus) : "qualifying";
  let stage = str(u?.stage, 120);
  let tool = str(u?.tool, 120);

  // Defesa em profundidade: se o workflow repassar a saída crua do agente
  // (o contrato JSON como texto, com ou sem cerca ```json), parseia aqui —
  // senão o JSON vaza para o balão do chat.
  const fenced = reply.replace(/```json|```/g, "").trim();
  if (fenced.startsWith("{") && fenced.includes('"reply"')) {
    try {
      const m = fenced.match(/\{[\s\S]*\}/);
      const parsed = m ? (JSON.parse(m[0]) as Record<string, unknown>) : null;
      if (parsed && typeof parsed.reply === "string" && parsed.reply.trim()) {
        reply = parsed.reply.slice(0, 4000);
        // Campos de topo do upstream têm precedência quando presentes.
        if (!str(u?.status, 40)) status = STATUSES.includes(parsed.status as AgentStatus) ? (parsed.status as AgentStatus) : "qualifying";
        if (!stage) stage = str(parsed.stage, 120);
        if (!tool) tool = str(parsed.tool, 120);
      }
    } catch {
      // texto segue como está; só normaliza os \n literais abaixo
    }
  }
  // \n literais (string não parseada) viram quebras reais para as multi-bolhas.
  reply = reply.replace(/\\n/g, "\n");

  if (!reply && status === "qualifying") {
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }

  const out: AgentReply = { reply, status };
  if (stage) out.stage = stage;
  if (tool) out.tool = tool;
  return NextResponse.json(out);
}
