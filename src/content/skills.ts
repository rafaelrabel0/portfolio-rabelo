// Skills e ferramentas — cada frente diz COMO é usada no trabalho, não só o
// nome. Fonte: CV, LinkedIn e os projetos do vault.

import type { Localized } from "./profile";

export type Skill = {
  slug: string;
  name: Localized;
  /** Como eu uso — a frase que aparece ao apontar. */
  how: Localized;
  tools: string[];
  /** Onde já está em produção (sem nome de cliente). */
  proof: Localized;
};

export const skills: Skill[] = [
  {
    slug: "agentes",
    name: { pt: "Agentes de IA", en: "AI agents" },
    how: {
      pt: "Atendimento, qualificação e agendamento no WhatsApp e na web, com memória, tools e passagem para humano na hora certa.",
      en: "Service, qualification and booking on WhatsApp and the web, with memory, tools and handoff to a human at the right time.",
    },
    tools: ["n8n", "Claude", "GPT-4o", "AI SDK", "Evolution API"],
    proof: { pt: "Agente SDR multimodal 24/7 em produção", en: "Multimodal SDR agent live 24/7" },
  },
  {
    slug: "gtm",
    name: { pt: "GTM & inteligência de CRM", en: "GTM & CRM intelligence" },
    how: {
      pt: "Automação de Pipedrive e Kommo: cadências por etapa, follow-up gerado por IA e briefings de pré e pós-call registrados no negócio.",
      en: "Pipedrive and Kommo automation: stage-based cadences, AI-generated follow-up and pre and post-call briefings logged on the deal.",
    },
    tools: ["Pipedrive", "Kommo", "n8n", "Whisper", "Meta Lead Ads"],
    proof: { pt: "Motor de cadência de 128 nós com rollback", en: "128-node cadence engine with rollback" },
  },
  {
    slug: "engenharia",
    name: { pt: "Engenharia", en: "Engineering" },
    how: {
      pt: "TypeScript e JavaScript no produto, Python nos dados e na visão computacional, Rust quando o app precisa morar no sistema operacional.",
      en: "TypeScript and JavaScript in the product, Python for data and computer vision, Rust when the app has to live in the operating system.",
    },
    tools: ["TypeScript", "JavaScript", "Python", "Rust", "Node.js"],
    proof: { pt: "Do web app ao app de desktop em produção", en: "From web app to desktop app in production" },
  },
  {
    slug: "dados",
    name: { pt: "Dados & infraestrutura", en: "Data & infrastructure" },
    how: {
      pt: "Pipelines de dados, jobs de ETL por cron, SQL e contratos de eventos que alimentam painéis em tempo real.",
      en: "Data pipelines, cron ETL jobs, SQL and event contracts that feed real-time dashboards.",
    },
    tools: ["PostgreSQL", "Supabase", "Redis", "Vercel", "Railway"],
    proof: { pt: "Painel de funil alimentado por eventos", en: "Event-fed funnel dashboard" },
  },
  {
    slug: "rag",
    name: { pt: "RAG & busca vetorial", en: "RAG & vector search" },
    how: {
      pt: "Conhecimento estático no banco vetorial, chamadas ao vivo só quando precisa — menos custo e menos latência por resposta.",
      en: "Static knowledge in the vector store, live calls only when needed — lower cost and latency per answer.",
    },
    tools: ["pgvector", "HNSW", "text-embedding-3-small", "FTS5"],
    proof: { pt: "500 clientes migrados para RAG híbrido", en: "500 clients migrated to hybrid RAG" },
  },
  {
    slug: "visao",
    name: { pt: "Visão computacional", en: "Computer vision" },
    how: {
      pt: "Detecção e embedding de rosto na GPU, busca por similaridade e verificação visual por modelo de visão antes de confirmar um resultado.",
      en: "Face detection and embeddings on the GPU, similarity search and visual verification by a vision model before confirming a match.",
    },
    tools: ["ONNX Runtime", "GPT-4o Vision", "Python", "pgvector"],
    proof: { pt: "15.681 rostos, busca em menos de 1 s", en: "15,681 faces, sub-second search" },
  },
  {
    slug: "web",
    name: { pt: "Web apps & SaaS", en: "Web apps & SaaS" },
    how: {
      pt: "Plataformas multi-tenant de ponta a ponta: autenticação, RLS por cliente, API REST com chaves e deploy com domínio.",
      en: "End-to-end multi-tenant platforms: authentication, per-client RLS, REST APIs with keys and deploys with a domain.",
    },
    tools: ["Next.js", "React", "Supabase", "Tailwind", "Stripe"],
    proof: { pt: "Aprovação e publicação de conteúdo em produção", en: "Content approval platform in production" },
  },
  {
    slug: "desktop",
    name: { pt: "Apps de desktop", en: "Desktop apps" },
    how: {
      pt: "Apps que vivem em segundo plano no Windows: atalho global, janelas por cima de tudo, leitura de seleção e atualização automática.",
      en: "Apps that live in the background on Windows: global shortcuts, always-on-top windows, selection reading and auto-update.",
    },
    tools: ["Tauri 2", "Rust", "UI Automation", "DPAPI"],
    proof: { pt: "uai? e Grudaí em beta", en: "uai? and Grudaí in beta" },
  },
  {
    slug: "integracoes",
    name: { pt: "Integrações & webhooks", en: "Integrations & webhooks" },
    how: {
      pt: "Conecto o que o cliente já usa — WhatsApp, Meta, CRM, gerenciador de tarefas — e faço engenharia reversa quando a API não tem documentação.",
      en: "I connect what the client already uses — WhatsApp, Meta, CRM, task managers — and reverse-engineer when the API has no docs.",
    },
    tools: ["Evolution API", "Meta Graph API", "ClickUp API", "Webhooks"],
    proof: { pt: "API de terceiros sem documentação encapsulada", en: "Undocumented third-party API wrapped" },
  },
  {
    slug: "workflows",
    name: { pt: "Automação de workflows", en: "Workflow automation" },
    how: {
      pt: "Fluxos seguros para rodar de novo sem duplicar nem deixar registro órfão, com tratamento de erro e retry.",
      en: "Flows that are safe to re-run without duplicating or orphaning records, with error handling and retries.",
    },
    tools: ["n8n", "Make", "Zapier", "Cron"],
    proof: { pt: "9 workflows orquestrados num só agente", en: "9 workflows orchestrated in one agent" },
  },
  {
    slug: "llmops",
    name: { pt: "Engenharia de prompt & custo", en: "Prompt engineering & cost" },
    how: {
      pt: "Saída estruturada em JSON quando a plataforma falha em tool calling, e custo por conversa medido contra a API antes de subir.",
      en: "Structured JSON output when the platform fails at tool calling, and per-conversation cost measured against the API before shipping.",
    },
    tools: ["Claude", "OpenAI", "JSON Schema", "Evals"],
    proof: { pt: "Teto de custo por conversa respeitado", en: "Per-conversation cost ceiling respected" },
  },
  {
    slug: "seguranca",
    name: { pt: "Segurança & LGPD", en: "Security & LGPD" },
    how: {
      pt: "RLS em toda tabela, autorização no servidor, rate limit, consentimento registrado e dados isolados por cliente.",
      en: "RLS on every table, server-side authorization, rate limiting, logged consent and data isolated per client.",
    },
    tools: ["RLS", "Rate limit", "CSP", "LGPD"],
    proof: { pt: "Processo de entrega com gate de segurança", en: "Delivery process with a security gate" },
  },
  {
    slug: "audio",
    name: { pt: "Áudio & transcrição", en: "Audio & transcription" },
    how: {
      pt: "Áudio de WhatsApp e gravação de call viram texto, resumo e nota no CRM sem ninguém digitar.",
      en: "WhatsApp voice notes and call recordings become text, a summary and a CRM note without anyone typing.",
    },
    tools: ["Whisper", "GPT", "MediaRecorder"],
    proof: { pt: "Inteligência pós-call automática", en: "Automated post-call intelligence" },
  },
  {
    slug: "interface",
    name: { pt: "Interface & motion", en: "Interface & motion" },
    how: {
      pt: "Design system, identidade aplicada em código e animação em canvas e CSS — este site é a prova.",
      en: "Design systems, identity applied in code and canvas and CSS animation — this site is the proof.",
    },
    tools: ["Tailwind v4", "Canvas 2D", "CSS scroll", "Figma"],
    proof: { pt: "Marca animada e cenas deste site", en: "This site's animated brand and scenes" },
  },
  {
    slug: "produto",
    name: { pt: "Produto & discovery", en: "Product & discovery" },
    how: {
      pt: "Requisito, protótipo e validação antes de código; proposta com escopo fechado e o que fica de fora por escrito.",
      en: "Requirements, prototype and validation before code; proposals with a fixed scope and what's out written down.",
    },
    tools: ["Discovery", "Protótipo", "Propostas", "Roadmap"],
    proof: { pt: "Proposta em até 48 h úteis", en: "Proposals within 48 business hours" },
  },
  {
    slug: "ingles",
    name: { pt: "Inglês C2", en: "English C2" },
    how: {
      pt: "Trabalho, documentação e reuniões em inglês com fluência — certificado EF SET C2.",
      en: "Work, documentation and meetings in fluent English — EF SET C2 certified.",
    },
    tools: ["EF SET 77/100"],
    proof: { pt: "Projetos e vagas internacionais", en: "International projects and roles" },
  },
];
