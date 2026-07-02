// Conteúdo da página comercial /servicos — pacotes, processo e FAQ.
// Sem preços fixos: proposta sob medida via form/agenda. Sem nomes de clientes finais.

import type { Localized } from "@/content/profile";

export type ServicePackage = {
  slug: string;
  name: Localized;
  tagline: Localized;
  items: Localized[];
  stack: string[];
  featured?: boolean;
};

export const services = {
  hero: {
    title: {
      pt: "Agentes de IA que atendem, qualificam e vendem — em produção",
      en: "AI agents that answer, qualify and sell — in production",
    } satisfies Localized,
    subtitle: {
      pt: "Automação de ponta a ponta para times comerciais: agentes SDR no WhatsApp, cadências de CRM e dashboards de funil. Construído, colocado em produção e operado por quem já roda isso em 7+ negócios B2B.",
      en: "End-to-end automation for revenue teams: WhatsApp SDR agents, CRM cadences and funnel dashboards. Built, shipped and operated by someone already running this across 7+ B2B businesses.",
    } satisfies Localized,
  },

  packages: [
    {
      slug: "agente-sdr",
      name: { pt: "Agente SDR no WhatsApp", en: "WhatsApp SDR Agent" },
      tagline: {
        pt: "Atendimento, qualificação e follow-up 24/7 — com handoff para humano na hora certa.",
        en: "24/7 answering, qualification and follow-up — with human handoff at the right moment.",
      },
      items: [
        { pt: "Responde texto, áudio (Whisper) e imagem (Vision)", en: "Handles text, voice notes (Whisper) and images (Vision)" },
        { pt: "Qualifica com critérios do seu negócio e registra tudo no CRM", en: "Qualifies with your business criteria and logs everything to the CRM" },
        { pt: "Follow-up automático com copy por etapa do funil", en: "Automatic follow-up with stage-specific copy" },
        { pt: "Handoff IA → humano com contexto completo da conversa", en: "AI → human handoff with full conversation context" },
      ],
      stack: ["n8n", "GPT-4o / Claude", "Evolution API", "Redis", "Supabase"],
      featured: true,
    },
    {
      slug: "crm-gtm",
      name: { pt: "Automação de CRM & GTM", en: "CRM & GTM Automation" },
      tagline: {
        pt: "Seu funil trabalhando sozinho: cadências, inteligência pós-call e lead ads no CRM.",
        en: "Your pipeline on autopilot: cadences, post-call intelligence and lead ads into the CRM.",
      },
      items: [
        { pt: "Cadência de atividades por etapa (Pipedrive/Kommo) com rollback", en: "Stage-based activity cadences (Pipedrive/Kommo) with rollback" },
        { pt: "Transcrição de calls (Whisper) → resumo GPT → nota no negócio", en: "Call transcription (Whisper) → GPT summary → deal note" },
        { pt: "Ingestão de Meta Lead Ads com disparo segmentado no WhatsApp", en: "Meta Lead Ads ingestion with segmented WhatsApp outreach" },
        { pt: "Dashboard de funil em tempo real alimentado por eventos", en: "Real-time funnel dashboard fed by events" },
      ],
      stack: ["n8n", "Pipedrive / Kommo", "OpenAI", "Meta Lead Ads", "Supabase Edge Functions"],
    },
    {
      slug: "web-apps",
      name: { pt: "Web apps de IA & RAG sob medida", en: "Custom AI web apps & RAG" },
      tagline: {
        pt: "Do banco vetorial ao deploy: apps, portais e busca semântica sobre os seus dados.",
        en: "From vector store to deploy: apps, portals and semantic search over your data.",
      },
      items: [
        { pt: "RAG híbrido: conhecimento estático em vector store + APIs ao vivo", en: "Hybrid RAG: static knowledge in a vector store + live APIs" },
        { pt: "Web apps completos (Next.js + Supabase) entregues em produção", en: "Full web apps (Next.js + Supabase) shipped to production" },
        { pt: "Busca semântica sobre acervos e documentos internos", en: "Semantic search over archives and internal documents" },
        { pt: "APIs REST autenticadas para integrar com o que você já usa", en: "Authenticated REST APIs to integrate with your existing tools" },
      ],
      stack: ["Next.js", "Supabase pgvector", "Python / FastAPI", "OpenAI embeddings", "Vercel"],
    },
  ] satisfies ServicePackage[],

  process: [
    {
      title: { pt: "Discovery", en: "Discovery" },
      desc: { pt: "30 minutos para entender operação, funil e onde a automação paga o investimento.", en: "30 minutes to map your operation, funnel and where automation pays for itself." },
    },
    {
      title: { pt: "Proposta em 48h", en: "Proposal in 48h" },
      desc: { pt: "Escopo fechado, entregáveis, prazo e investimento — sem surpresa no meio do caminho.", en: "Fixed scope, deliverables, timeline and investment — no mid-project surprises." },
    },
    {
      title: { pt: "Build", en: "Build" },
      desc: { pt: "Construção em sprints curtas com demos ao longo do caminho. Produção em 2–4 semanas na maioria dos casos.", en: "Short sprints with demos along the way. Production in 2–4 weeks for most projects." },
    },
    {
      title: { pt: "Operação", en: "Operate" },
      desc: { pt: "Monitoramento, ajustes de prompt e melhoria contínua com base no que o funil mostra.", en: "Monitoring, prompt tuning and continuous improvement driven by funnel data." },
    },
  ],

  faq: [
    {
      q: { pt: "Preciso trocar de CRM ou de número de WhatsApp?", en: "Do I need to switch CRM or WhatsApp number?" },
      a: { pt: "Não. Eu integro com o que você já usa — Pipedrive, Kommo, oAtmos, planilha — e com o seu número atual via Evolution API.", en: "No. I integrate with what you already use — Pipedrive, Kommo, spreadsheets — and with your current number via Evolution API." },
    },
    {
      q: { pt: "Quanto tempo até estar no ar?", en: "How long until it's live?" },
      a: { pt: "Um agente SDR típico entra em produção em 2 a 4 semanas, incluindo ajuste de tom de voz, critérios de qualificação e testes com leads reais.", en: "A typical SDR agent ships in 2–4 weeks, including tone-of-voice tuning, qualification criteria and tests with real leads." },
    },
    {
      q: { pt: "Como funciona o investimento?", en: "How does pricing work?" },
      a: { pt: "Setup do projeto + mensalidade de operação (infra, monitoramento e melhorias). O valor exato vai na proposta, de acordo com o escopo.", en: "Project setup + monthly operation fee (infra, monitoring and improvements). Exact numbers come in the proposal, based on scope." },
    },
    {
      q: { pt: "O agente fala igual robô?", en: "Will the agent sound like a robot?" },
      a: { pt: "Não — o tom de voz é treinado com exemplos reais do seu atendimento, e a demo desta página é o mesmo fluxo que roda com clientes.", en: "No — the tone of voice is trained on real examples from your own conversations. The demo on this page is the same flow running with clients." },
    },
    {
      q: { pt: "E os meus dados?", en: "What about my data?" },
      a: { pt: "Cada cliente tem instância e credenciais isoladas (banco próprio, tokens próprios). Nada de dados compartilhados entre operações.", en: "Each client gets isolated instances and credentials (own database, own tokens). No data shared across operations." },
    },
  ],
};
