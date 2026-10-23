import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/api-security";

// Lista de novidades central (sites de apps *.deciban.com.br). Valida no
// servidor, grava o texto do aceite no servidor e inscreve pela função
// lista_inscrever do Supabase. Duplicado devolve 200 igual, sem revelar existência.

const ACEITE_VERSAO = "2026-10-23";
const NOMES: Record<string, string> = {
  uai: "uai?",
  grudi: "grudí",
  sistere: "Sistere",
  limiar: "Limiar",
  borajogar: "Bora Jogar?!",
  cinefeed: "CineFeed",
  facefinder: "Face Finder",
  plin: "Plin",
  mooday: "Mooday",
  deciban: "Deciban",
};

const ALLOWED = new Set([
  "https://deciban.com.br",
  "https://www.deciban.com.br",
  "https://uai.deciban.com.br",
  "https://grudi.deciban.com.br",
  "https://sistere.deciban.com.br",
  "https://limiar.deciban.com.br",
  "https://borajogar.deciban.com.br",
  "https://cinefeed.deciban.com.br",
  "https://facefinder.deciban.com.br",
]);

function allowedOrigin(origin: string): boolean {
  if (ALLOWED.has(origin)) return true;
  // localhost só fora de produção (NODE_ENV !== 'production' ou VERCEL_ENV !== 'production').
  const fora = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV !== "production";
  return fora && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

function respond(body: unknown, status: number, origin: string | null) {
  const headers: Record<string, string> = { Vary: "Origin", "Cache-Control": "no-store" };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !allowedOrigin(origin)) return respond({ erro: "origem_bloqueada" }, 403, null);
  const headers: Record<string, string> = { Vary: "Origin" };
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !allowedOrigin(origin)) return respond({ erro: "origem_bloqueada" }, 403, null);

  if (!rateLimit(`lista:${clientIp(req)}`, 5, 600_000)) return respond({ erro: "muitas_tentativas" }, 429, origin);

  let data: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("formato");
    data = parsed as Record<string, unknown>;
  } catch {
    return respond({ erro: "json_invalido" }, 400, origin);
  }

  // Honeypot: robô preencheu; finge sucesso e não grava.
  if (typeof data.empresa === "string" && data.empresa.trim() !== "") return respond({ ok: true }, 200, origin);

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond({ erro: "email_invalido" }, 400, origin);
  if (data.aceite !== true) return respond({ erro: "sem_aceite" }, 400, origin);
  const produto = typeof data.produto === "string" ? data.produto.trim().toLowerCase() : "";
  if (!Object.prototype.hasOwnProperty.call(NOMES, produto)) return respond({ erro: "produto_invalido" }, 400, origin);

  const idioma = data.idioma === "en" ? "en" : "pt";
  const origemRaw = typeof data.origem === "string" ? data.origem.trim().slice(0, 40) : "";

  // Chave pública + segredo: só dá para chamar a função que inscreve (supabase/lista_espera.sql).
  // A tabela mora num esquema que a API não expõe; nenhuma chave de serviço passa por aqui.
  const base = process.env.LISTA_SUPABASE_URL;
  const key = process.env.LISTA_SUPABASE_ANON_KEY;
  const segredo = process.env.LISTA_SEGREDO;
  if (!base || !key || !segredo) return respond({ erro: "indisponivel" }, 503, origin);

  try {
    const res = await fetch(`${base.replace(/\/+$/, "")}/rest/v1/rpc/lista_inscrever`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({
        p_segredo: segredo,
        p_email: email,
        p_produto: produto,
        p_idioma: idioma,
        p_origem: origemRaw || null,
        p_aceite_texto: `Quero receber novidades do ${NOMES[produto]} por e-mail. Li a política de privacidade.`,
        p_aceite_versao: ACEITE_VERSAO,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[lista] supabase respondeu ${res.status}`);
      return respond({ erro: "indisponivel" }, 503, origin);
    }
  } catch (e) {
    console.error(`[lista] falha ao chamar supabase: ${e instanceof Error ? e.name : "erro"}`);
    return respond({ erro: "indisponivel" }, 503, origin);
  }

  return respond({ ok: true }, 200, origin);
}
