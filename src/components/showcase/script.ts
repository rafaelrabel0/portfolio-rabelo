// Roteiro único da demo "Na prática": dirige o chat E o funil na mesma timeline.
// Determinístico — espelha o fluxo real (buffer, Whisper, qualificação, eventos).
// {name} nos textos é interpolado com a escolha do visitante.

export type L = { pt: string; en: string };

export type EventKind =
  | "lead_created"
  | "conversation_started"
  | "lead_qualified"
  | "followup_sent"
  | "deal_won";

export type DemoEvent = { kind: EventKind; meta?: string; hero?: boolean };

export type ChoiceOption = {
  label: L;
  /** Mensagem enviada ao escolher (default: o próprio label). */
  text?: L;
  /** Se presente, a resposta vira uma bolha de áudio com essa duração. */
  audio?: string;
  /** Define o nome do lead usado nas interpolações seguintes. */
  name?: string;
};

export type Step =
  | { t: "stage"; label: L }
  | { t: "lead"; text: L; audio?: string }
  | { t: "agent"; text: L }
  | { t: "tool"; text: L; event?: DemoEvent; onlyIfChoice?: { id: string; option: number } }
  | { t: "ambient"; event: DemoEvent }
  | { t: "choice"; id: string; options: ChoiceOption[] };

export type ChoiceStep = Extract<Step, { t: "choice" }>;

export type LogItem = { id: number; kind: "lead" | "agent" | "tool"; text: L; audio?: string };

export const SCRIPT: Step[] = [
  { t: "ambient", event: { kind: "lead_created", meta: "Meta Ads" } },
  { t: "stage", label: { pt: "Contato Inicial", en: "New Lead" } },
  { t: "lead", text: { pt: "Oi! Vocês têm solução pra infiltração na parede?", en: "Hi! Do you have a fix for wall infiltration?" } },
  { t: "tool", text: { pt: "evento: lead_created → dashboard", en: "event: lead_created → dashboard" }, event: { kind: "lead_created", meta: "WhatsApp" } },
  { t: "agent", text: { pt: "Olá! Sou o assistente da loja 😊 Infiltração é chato mesmo — temos sim! Como posso te chamar?", en: "Hello! I'm the store assistant 😊 Infiltration is a pain — we do! What's your name?" } },
  {
    t: "choice",
    id: "name",
    options: [
      { label: { pt: "Maria", en: "Maria" }, name: "Maria" },
      { label: { pt: "Carlos", en: "Carlos" }, name: "Carlos" },
    ],
  },
  { t: "tool", text: { pt: "tool: Nome → Supabase", en: "tool: Name → Supabase" } },
  { t: "stage", label: { pt: "Em Atendimento", en: "In Conversation" } },
  { t: "tool", text: { pt: "evento: conversation_started → dashboard", en: "event: conversation_started → dashboard" }, event: { kind: "conversation_started" } },
  { t: "agent", text: { pt: "Prazer, {name}! Essa área é interna ou externa? E sabe a metragem aproximada?", en: "Nice to meet you, {name}! Is the area indoors or outdoors? Rough size in m²?" } },
  { t: "ambient", event: { kind: "lead_created", meta: "Google" } },
  {
    t: "choice",
    id: "area",
    options: [
      { label: { pt: "🎤 Responder por áudio", en: "🎤 Send a voice note" }, audio: "0:11", text: { pt: "Áudio", en: "Voice note" } },
      { label: { pt: "Parede da varanda, uns 15m²", en: "Balcony wall, about 15m²" } },
    ],
  },
  { t: "tool", text: { pt: "Whisper: “é a parede da varanda, uns 15m²”", en: "Whisper: “it's the balcony wall, about 15m²”" }, onlyIfChoice: { id: "area", option: 0 } },
  { t: "agent", text: { pt: "Perfeito, {name}! Parede externa de ~15m² — já tenho o que preciso. Vou te conectar com um especialista agora 😊", en: "Perfect, {name}! Outdoor wall, ~15m² — that's all I need. Connecting you to a specialist now 😊" } },
  { t: "tool", text: { pt: "tool: Qualificação → nota no CRM", en: "tool: Qualification → CRM note" } },
  { t: "stage", label: { pt: "Qualificado", en: "Qualified" } },
  { t: "tool", text: { pt: "evento: lead_qualified → dashboard", en: "event: lead_qualified → dashboard" }, event: { kind: "lead_qualified" } },
  { t: "ambient", event: { kind: "followup_sent", meta: "FUP 30min" } },
  { t: "ambient", event: { kind: "conversation_started" } },
  { t: "ambient", event: { kind: "deal_won", meta: "{name}", hero: true } },
];

/** Contagens de partida do funil (histórico fictício antes da demo). */
export const BASE: Record<EventKind, number> = {
  lead_created: 128,
  conversation_started: 94,
  lead_qualified: 47,
  followup_sent: 211,
  deal_won: 21,
};
