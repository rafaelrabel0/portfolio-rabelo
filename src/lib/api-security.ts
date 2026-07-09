// Proteções das rotas de API que recebem dados pessoais (LGPD art. 46:
// medidas técnicas de segurança). Rate limit em memória por IP e checagem de
// origem. Em serverless o Map é por instância — suficiente como primeira
// barreira contra abuso/flood sem adicionar infraestrutura.

const buckets = new Map<string, { count: number; resetAt: number }>();

function sweep(now: number) {
  if (buckets.size < 2000) return;
  for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "unknown";
}

/** true = dentro do limite; false = bloquear (429). */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= max;
}

/** Só aceita chamadas do próprio site (Origin/Referer ausentes também passam —
 *  server-to-server e agentes antigos —, mas cross-site de navegador não). */
export function sameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  if (!source) return true;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}
