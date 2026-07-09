// Nó "Formatar resposta" (Code, Run Once for Each Item ou All Items — usa o 1º).
// O agente responde o contrato em JSON puro; aqui garantimos { reply, status,
// stage?, tool? } para o site e extraímos o lead para o IF "Lead finalizado?".
// Cole este arquivo inteiro no nó Code do workflow ativo.

const raw = String($json.output ?? $json.text ?? '');

function tryParse(s) {
  try {
    const v = JSON.parse(s);
    return v && typeof v === 'object' ? v : null;
  } catch (e) {
    return null;
  }
}

// 1) sem cercas de markdown; 2) parse direto; 3) parse do trecho {...};
// 4) reparo de quebras de linha reais dentro de strings (modelo escorregou).
const clean = raw.replace(/```json|```/g, '').trim();
let out = tryParse(clean);
if (!out) {
  const m = clean.match(/\{[\s\S]*\}/);
  if (m) out = tryParse(m[0]) ?? tryParse(m[0].replace(/\r/g, '').replace(/\n/g, '\\n'));
}

if (!out || typeof out.reply !== 'string' || !out.reply.trim()) {
  out = { reply: clean, status: 'qualifying' };
}

const status = ['qualifying', 'qualified', 'finalized'].includes(out.status) ? out.status : 'qualifying';
const res = { reply: String(out.reply).slice(0, 4000), status };
if (out.stage) res.stage = String(out.stage).slice(0, 120);
// A tool de finalização é o sinal definitivo de fim de atendimento.
if (out.tool) {
  res.tool = String(out.tool).slice(0, 120);
  if (res.tool === 'finalizar_atendimento') res.status = 'finalized';
}

// Lead coletado pelo agente (qualified/finalized) + dados da sessão.
if (out.lead && typeof out.lead === 'object') {
  const src = $('Entrada').first().json;
  const pick = (k) => (typeof out.lead[k] === 'string' ? out.lead[k].slice(0, 400) : '');
  res.lead = {
    name: pick('name'), company: pick('company'), niche: pick('niche'),
    email: pick('email'), whatsapp: pick('whatsapp'), channel: pick('channel'),
    volume: pick('volume'), pain: pick('pain'), goal: pick('goal'), summary: pick('summary'),
    sessionId: src.sessionId, mode: src.mode, locale: src.locale,
    ts: new Date().toISOString(),
  };
}

return [{ json: res }];
