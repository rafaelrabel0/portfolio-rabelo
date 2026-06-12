// Skills, ferramentas e experiência. Fonte: CV.

import type { Localized } from "./profile";

export type SkillGroup = {
  category: Localized;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: { pt: "IA & Automação", en: "AI & Automation" },
    items: [
      "AI Agent Workflows (n8n)",
      "LLM Integration (Claude, GPT-4o)",
      "Prompt Engineering",
      "RAG / Vector Search (Supabase pgvector)",
      "AI Vision (GPT-4o Vision)",
      "Transcrição & Sumarização de Áudio (Whisper)",
      "Make / Zapier",
    ],
  },
  {
    category: { pt: "GTM & Inteligência de CRM", en: "GTM & CRM Intelligence" },
    items: [
      "Pipedrive & Kommo Automation",
      "Cadências por etapa de funil",
      "Follow-up gerado por IA",
      "Briefings pré/pós-call automáticos",
      "Lead Scoring & Qualificação",
      "Meta Lead Ads",
      "Pixel Event Tracking",
      "Orquestração de Webhooks",
    ],
  },
  {
    category: { pt: "Engenharia", en: "Engineering" },
    items: [
      "TypeScript", "JavaScript", "Python",
      "Next.js", "React", "Node.js / NestJS", "FastAPI",
      "PostgreSQL", "SQLite", "Supabase",
      "Redis / BullMQ", "Prisma", "REST API Design", "Stripe",
    ],
  },
  {
    category: { pt: "Dados & Infra", en: "Data & Infra" },
    items: [
      "Data Pipelines", "Cron / ETL Jobs", "SQL",
      "Vector Embeddings (text-embedding-3-small)",
      "Evolution API (WhatsApp)", "ClickUp API",
      "Socket.IO", "Vercel", "Railway",
    ],
  },
  {
    category: { pt: "Práticas", en: "Practices" },
    items: [
      "Product Thinking",
      "End-to-End Shipping",
      "ATS/SEO-aware Content Automation",
      "Bidirectional Tool Sync (ClickUp)",
    ],
  },
];

// Ferramentas para a seção de stack visual (ícones/logos depois em /public/tools)
export const tools = [
  "n8n", "Claude", "OpenAI", "Supabase", "Next.js", "React", "TypeScript",
  "Python", "FastAPI", "NestJS", "PostgreSQL", "Prisma", "Stripe",
  "Evolution API", "Pipedrive", "Kommo", "ClickUp", "Vercel", "Railway", "Tailwind",
];

export type ExperienceItem = {
  role: Localized;
  company: string;
  period: string;
  bullets: Localized[];
};

export const experience: ExperienceItem[] = [
  {
    role: { pt: "Fundador & Engenheiro de Automação com IA", en: "Founder & AI Automation Engineer" },
    company: "Rabelo Co. (Remoto)",
    period: "Abr 2025 – Presente",
    bullets: [
      { pt: "Construiu e colocou em produção agentes de IA em n8n para 7+ negócios, integrando Claude/GPT com WhatsApp (Evolution API) e CRMs (Pipedrive, Kommo) — automatizando qualificação, follow-up e handoff humano com gestão de estado ao vivo.", en: "Built and shipped production AI agents on n8n for 7+ businesses, integrating Claude/GPT with WhatsApp (Evolution API) and CRMs (Pipedrive, Kommo) — automating qualification, follow-up, and human handoff with live state management." },
      { pt: "Engenheirou um motor de cadência de atividades por etapa no Pipedrive (workflow de 128 nós) que cria touchpoints diários por etapa e data — e reverte automaticamente as atividades quando o negócio muda de etapa.", en: "Engineered a stage-aware activity-cadence engine in Pipedrive (128-node n8n workflow) that auto-creates daily touchpoints by funnel stage and date — and automatically rolls back activities when a deal moves stage." },
      { pt: "Automatizou inteligência de CRM pós-call: transcrição Whisper de calls de SDR → resumo GPT → nota logada no negócio do Pipedrive.", en: "Automated post-call CRM intelligence: Whisper transcription of SDR calls → GPT summary → auto-logged note on the Pipedrive deal." },
      { pt: "Arquitetou um sistema híbrido RAG + API (Supabase pgvector, embeddings 1536d) que serve conhecimento estático do vector store e reserva chamadas ao vivo para agendamento — migrando 20 profissionais, 224 serviços e 500 clientes.", en: "Architected a hybrid RAG + API system (Supabase pgvector, 1536-dim embeddings) serving static knowledge from a vector store and reserving live calls for scheduling — migrating 20 professionals, 224 services and 500 clients." },
      { pt: "Construiu um motor de busca semântica (Python, FastAPI, embeddings OpenAI + GPT-4o Vision) sobre 1.266 bibliotecas de modelos 3D, fundindo busca fuzzy + vetorial com verificação visual por IA.", en: "Built a semantic search engine (Python, FastAPI, OpenAI embeddings + GPT-4o Vision) over 1,266 indexed 3D-model libraries, fusing fuzzy + vector search with AI visual verification." },
      { pt: "Entregou um web app financeiro completo (Next.js 15, Supabase, RLS, API REST com chaves) em produção na Vercel, mais um painel de operações em Electron com sync bidirecional do ClickUp em 10+ contas.", en: "Shipped a full financial web app (Next.js 15, Supabase, RLS, REST API with keys) to production on Vercel, plus an Electron ops panel with bidirectional ClickUp sync across 10+ accounts." },
    ],
  },
];
