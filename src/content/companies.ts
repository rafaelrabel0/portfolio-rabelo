// Empresas e seus clientes/serviços. Fonte: Obsidian Vault (Empresas + MOCs de agentes).
// Rabelo Co. é a holding pessoal do Rafael que presta serviço para as demais.

import type { Localized } from "./profile";

export type ClientStatus = "ativo" | "onboarding" | "parcial" | "proposta" | "planejamento";

// Entrega por cliente, sem expor nomes — apenas o que foi fornecido e em que estado.
export type Delivery = {
  label: Localized;
  count?: number;
  status: ClientStatus;
};

export type Company = {
  slug: string;
  name: string;
  focus: Localized;
  description: Localized;
  isHolding?: boolean;
  stack: string[];
  services: Localized[];
  clientCount: number;
  deliveries: Delivery[];
  links?: { label: string; url: string }[];
};

export const companies: Company[] = [
  {
    slug: "rabelo-co",
    name: "Rabelo Co.",
    isHolding: true,
    focus: { pt: "Holding pessoal — agentes de IA, automação e software", en: "Personal holding — AI agents, automation and software" },
    description: {
      pt: "Consultoria independente que entrega agentes de IA, automação e software para múltiplos clientes B2B em varejo de tintas, saúde e beleza. Presta serviço para todas as marcas próprias e clientes externos.",
      en: "Independent consultancy delivering AI agents, automation, and software for multiple B2B clients across paint retail, healthcare, and beauty. Serves all in-house brands and external clients.",
    },
    stack: ["n8n", "Claude / GPT", "Supabase pgvector", "Evolution API", "Next.js", "Python / FastAPI"],
    services: [
      { pt: "Agentes de IA em produção (n8n) com handoff humano", en: "Production AI agents (n8n) with human handoff" },
      { pt: "Automação de CRM e cadências de funil", en: "CRM automation and funnel cadences" },
      { pt: "RAG híbrido + APIs (busca vetorial + ao vivo)", en: "Hybrid RAG + APIs (vector + live search)" },
      { pt: "Web apps de IA ponta a ponta", en: "End-to-end AI web apps" },
    ],
    clientCount: 1,
    deliveries: [
      { label: { pt: "Plataforma SaaS de atendimento com IA", en: "AI service SaaS platform" }, count: 1, status: "ativo" },
      { label: { pt: "Canal WhatsApp (aditivo)", en: "WhatsApp channel (addendum)" }, count: 1, status: "proposta" },
    ],
  },
  {
    slug: "ativos-digitais",
    name: "Ativos Digitais",
    focus: { pt: "Marketing digital, automação e IA para PMEs", en: "Digital marketing, automation and AI for SMBs" },
    description: {
      pt: "Marca de marketing digital e IA. Prioridade 1 da Rabelo Co. Agentes de pré-atendimento e SDR via WhatsApp para qualificação de leads, mais suíte de automação GTM no Pipedrive/Kommo.",
      en: "Digital marketing and AI brand. Rabelo Co.'s top priority. Pre-sales and SDR WhatsApp agents for lead qualification, plus a Pipedrive/Kommo GTM automation suite.",
    },
    stack: ["n8n", "Kommo / Pipedrive", "Evolution API", "OpenAI (GPT + Whisper)", "ClickUp API", "PostgreSQL", "React + NestJS"],
    services: [
      { pt: "Agentes SDR / pré-atendimento via WhatsApp com qualificação consultiva e contorno de objeções", en: "SDR / pre-sales WhatsApp agents with consultative qualification and objection handling" },
      { pt: "Cadência de atividades por etapa no Pipedrive (workflow de 128 nós) com rollback automático", en: "Stage-based activity cadence in Pipedrive (128-node workflow) with automatic rollback" },
      { pt: "Follow-up por IA com copy específica por etapa e disparo multi-instância", en: "AI follow-up with stage-specific copy and multi-instance dispatch" },
      { pt: "Inteligência pós-call: transcrição Whisper → resumo GPT → nota no negócio", en: "Post-call intelligence: Whisper transcription → GPT summary → deal note" },
      { pt: "Triagem de candidatos por IA com pontuação e task no ClickUp", en: "AI candidate screening with scoring and ClickUp task" },
      { pt: "Ingestão de Meta Lead Ads no CRM com disparo segmentado no WhatsApp", en: "Meta Lead Ads ingestion into CRM with segmented WhatsApp dispatch" },
    ],
    clientCount: 6,
    deliveries: [
      { label: { pt: "Agente de IA + Follow Up", en: "AI agent + Follow Up" }, count: 3, status: "ativo" },
      { label: { pt: "Agente de IA + Follow Up", en: "AI agent + Follow Up" }, count: 2, status: "onboarding" },
      { label: { pt: "Agente principal + webhook no CRM", en: "Main agent + CRM webhook" }, count: 1, status: "parcial" },
      { label: { pt: "Dashboard de Vendas IA", en: "AI Sales Dashboard" }, count: 1, status: "ativo" },
    ],
    links: [
      { label: "CRM (produção)", url: "https://ativos-digitais-crm.vercel.app" },
      { label: "E-book (captura)", url: "https://ativosdigitaisebook.lovable.app" },
      { label: "Lead Scoring", url: "https://leadscoringativos.lovable.app" },
    ],
  },
  {
    slug: "rise-doc",
    name: "Rise Doc",
    focus: { pt: "Saúde digital — automação médica e agentes de IA", en: "Digital health — medical automation and AI agents" },
    description: {
      pt: "Marca de saúde digital. Prioridade 2 da Rabelo Co. Agentes de IA por cliente para agendamento, confirmação de presença, lembretes, FAQ e triagem inicial em clínicas e consultórios.",
      en: "Digital health brand. Rabelo Co.'s second priority. Per-client AI agents for scheduling, attendance confirmation, reminders, FAQ and initial triage in clinics and practices.",
    },
    stack: ["n8n", "OpenAI / Claude", "Evolution API", "oAtmos (CRM)"],
    services: [
      { pt: "Agendamento de consultas via WhatsApp", en: "WhatsApp appointment scheduling" },
      { pt: "Confirmação de presença e lembretes automáticos", en: "Attendance confirmation and automatic reminders" },
      { pt: "Respostas a perguntas frequentes e triagem inicial", en: "FAQ answering and initial triage" },
      { pt: "Agente SDR customizado por profissional", en: "Custom SDR agent per professional" },
    ],
    clientCount: 10,
    deliveries: [
      { label: { pt: "Agente de IA (SDR + agendamento)", en: "AI agent (SDR + scheduling)" }, count: 2, status: "ativo" },
      { label: { pt: "Agente de IA (SDR + agendamento)", en: "AI agent (SDR + scheduling)" }, count: 8, status: "onboarding" },
    ],
  },
  {
    slug: "solid-studio",
    name: "Solid Studio",
    focus: { pt: "Impressão 3D e SaaS para makers e profissionais", en: "3D printing and SaaS for makers and pros" },
    description: {
      pt: "Marca de impressão 3D e SaaS. Produtos próprios: o app Solid (gestão para profissionais de impressão 3D) e ferramentas de busca sobre acervos do Telegram.",
      en: "3D printing and SaaS brand. In-house products: the Solid app (management for 3D printing pros) and search tools over Telegram archives.",
    },
    stack: ["Next.js 15", "React 19", "Prisma 7 + Supabase", "Stripe", "NextAuth v5", "Python (Telethon)", "FastAPI"],
    services: [
      { pt: "Solid App — gestão de loja, catálogo, pedidos, estoque e cálculo de custo", en: "Solid App — store, catalog, orders, inventory and cost management" },
      { pt: "Busca semântica sobre bibliotecas 3D do Telegram", en: "Semantic search over Telegram 3D libraries" },
    ],
    clientCount: 0,
    deliveries: [],
    links: [{ label: "solidapp.shop", url: "https://solidapp.shop" }],
  },
];
