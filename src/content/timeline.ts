// Linha do tempo da experiência — marcos, não cargos. A seção antes listava um
// único emprego com seis bullets soltos; o percurso conta melhor a evolução.
//
// ATENÇÃO: os agrupamentos por período foram montados a partir das datas das
// notas do vault (Rise Doc 04/2026, agentes Ativos 05/2026, Unymos 07/2026,
// Elevra e Face Finder 08/2026) e do "Abr 2025 – Presente" do CV. Conferir os
// rótulos antes de tratar como definitivo.

import type { Localized } from "./profile";

export type Milestone = {
  label: Localized;
  title: Localized;
  bullets: Localized[];
};

export const timeline: Milestone[] = [
  {
    label: { pt: "Abr 2025 — início", en: "Apr 2025 — start" },
    title: {
      pt: "Rabelo Co. — do comercial para a engenharia",
      en: "Rabelo Co. — from sales into engineering",
    },
    bullets: [
      {
        pt: "Primeiros agentes de IA em n8n colocados em produção, integrando Claude/GPT ao WhatsApp via Evolution API: qualificação consultiva, follow-up e handoff para humano com estado ao vivo.",
        en: "First production AI agents on n8n, wiring Claude/GPT into WhatsApp through the Evolution API: consultative qualification, follow-up and human handoff with live state.",
      },
      {
        pt: "A vivência em vendas virou o diferencial técnico: os critérios de qualificação e o tom de voz saem da operação real, não de um prompt genérico.",
        en: "Time spent in sales became the technical edge: qualification criteria and tone of voice come from the real operation, not a generic prompt.",
      },
    ],
  },
  {
    label: { pt: "2025 – 2026", en: "2025 – 2026" },
    title: {
      pt: "Suíte de GTM e observabilidade do funil",
      en: "GTM suite and funnel observability",
    },
    bullets: [
      {
        pt: "Motor de cadência de atividades por etapa no Pipedrive (workflow de 128 nós) que cria touchpoints por etapa e data — e reverte as atividades quando o negócio muda de etapa.",
        en: "Stage-aware activity cadence engine in Pipedrive (128-node workflow) creating touchpoints per stage and date — and rolling activities back when a deal changes stage.",
      },
      {
        pt: "Inteligência pós-call automática: transcrição Whisper da call de SDR → resumo GPT → nota logada no negócio.",
        en: "Automated post-call intelligence: Whisper transcription of the SDR call → GPT summary → note logged on the deal.",
      },
      {
        pt: "Dashboard de funil alimentado por eventos via edge function autenticada por cliente — cada agente novo entra com três workflows emissores.",
        en: "Event-fed funnel dashboard through a per-client authenticated edge function — each new agent plugs in with three emitter workflows.",
      },
    ],
  },
  {
    label: { pt: "1º semestre 2026", en: "H1 2026" },
    title: {
      pt: "RAG híbrido e produtos próprios",
      en: "Hybrid RAG and in-house products",
    },
    bullets: [
      {
        pt: "Arquitetura RAG + API (Supabase pgvector, embeddings 1536d) servindo conhecimento estático do vector store e reservando chamadas ao vivo para agendamento — migração de 20 profissionais, 224 serviços e 500 clientes.",
        en: "RAG + API architecture (Supabase pgvector, 1536-dim embeddings) serving static knowledge from the vector store and reserving live calls for scheduling — migrated 20 professionals, 224 services and 500 clients.",
      },
      {
        pt: "Produtos próprios em produção: um web app financeiro completo (Next.js, Supabase com RLS, API REST com chaves) e um PWA de gestão para impressão 3D.",
        en: "In-house products shipped: a full personal-finance web app (Next.js, Supabase with RLS, REST API with keys) and a management PWA for 3D printing.",
      },
      {
        pt: "Motor de busca semântica sobre 1.266 bibliotecas de modelos 3D, fundindo busca fuzzy e vetorial com verificação visual por GPT-4o Vision.",
        en: "Semantic search engine over 1,266 indexed 3D-model libraries, fusing fuzzy and vector search with GPT-4o Vision visual verification.",
      },
    ],
  },
  {
    label: { pt: "2º semestre 2026", en: "H2 2026" },
    title: {
      pt: "Plataformas SaaS e visão computacional",
      en: "SaaS platforms and computer vision",
    },
    bullets: [
      {
        pt: "Plataforma de aprovação e publicação de conteúdo em produção (Next.js 16 + Supabase + Meta Graph API): o cliente aprova por link público e o app agenda e publica na rede.",
        en: "Content approval and publishing platform in production (Next.js 16 + Supabase + Meta Graph API): the client approves through a public link and the app schedules and publishes to the network.",
      },
      {
        pt: "CRM multi-tenant com agente de IA dentro da mesma plataforma — chat público, captura de lead e guardrails de CFM/LGPD, com custo por conversa medido contra a API antes de subir.",
        en: "Multi-tenant CRM with an AI agent inside the same platform — public chat, lead capture and CFM/LGPD guardrails, with per-conversation cost measured against the API before shipping.",
      },
      {
        pt: "Busca por reconhecimento facial em produção: 3.995 fotos indexadas, 15.681 rostos, ONNX Runtime na GPU e pgvector com índice HNSW — a pessoa manda uma selfie e recebe as fotos em que aparece em menos de um segundo.",
        en: "Face-recognition search in production: 3,995 photos indexed, 15,681 faces, ONNX Runtime on GPU and pgvector with an HNSW index — send a selfie, get your photos back in under a second.",
      },
      {
        pt: "Assistente virtual de IA com demo ao vivo (n8n + Whisper + GPT), interpretando texto, áudio e imagem para qualificar e agendar.",
        en: "AI virtual assistant with a live demo (n8n + Whisper + GPT), handling text, audio and images to qualify and schedule.",
      },
    ],
  },
];
