// Projetos em destaque. Fonte: CV + Obsidian. Lista evolutiva — lapidar depois.

import type { Localized } from "./profile";

/** Agrupamento na seção de projetos e na página /projetos. */
export type ProjectCategory = "agente" | "saas" | "plataforma" | "outros";

/** Ordem das categorias na home e em /projetos. */
export const categoryOrder = ["agente", "saas", "plataforma", "outros"] as const;

export type Project = {
  slug: string;
  category: ProjectCategory;
  name: string;
  company: string;
  status: "producao" | "dev" | "funcional" | "planejamento";
  featured: boolean;
  tagline: Localized;
  problem: Localized;
  solution: Localized;
  result?: Localized;
  stack: string[];
  metrics?: { value: string; label: Localized }[];
  links?: { label: string; url: string }[];
  // imagem/print: preencher depois em /public/projects/<slug>.*
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "agente-sdr-whatsapp",
    category: "agente",
    image: "/projects/agente-sdr-whatsapp.webp",
    name: "Agente SDR WhatsApp Multimodal",
    company: "Ativos Digitais",
    status: "producao",
    featured: true,
    tagline: { pt: "Atendimento, qualificação e follow-up por IA no WhatsApp — 24/7", en: "AI-powered WhatsApp service, qualification and follow-up — 24/7" },
    problem: { pt: "Leads chegando pelo WhatsApp a qualquer hora, sem qualificação, sem registro no CRM e sem follow-up consistente — pipeline evaporando em silêncio.", en: "Leads arriving on WhatsApp at any hour with no qualification, no CRM record and no consistent follow-up — pipeline silently evaporating." },
    solution: { pt: "Agente n8n multimodal (texto, áudio via Whisper e imagem via Vision) com buffer de mensagens em Redis, memória de conversa em Postgres e cadastro de leads no Supabase. Qualifica de forma consultiva, move etapas e tags no Kommo, usa tools dedicadas (qualificação, atualização de nome, handoff humano) e emite eventos para o dashboard. Follow-ups em cascata (10 min → 14 dias) encerram o atendimento sem resposta e retomam a conversa se o lead responder.", en: "Multimodal n8n agent (text, audio via Whisper, image via Vision) with a Redis message buffer, Postgres chat memory and Supabase lead registry. Qualifies consultatively, moves Kommo stages and tags, uses dedicated tools (qualification, name update, human handoff) and emits funnel events to the dashboard. Cascading follow-ups (10 min → 14 days) auto-close silent conversations and resume them when the lead replies." },
    result: { pt: "Em produção em múltiplas operações de clientes; atendimento 24/7 com handoff IA→humano e funil rastreado de ponta a ponta.", en: "Live across multiple client operations; 24/7 service with AI→human handoff and an end-to-end tracked funnel." },
    stack: ["n8n (9 workflows)", "OpenAI (GPT-4o + Whisper + Vision)", "Kommo CRM", "Evolution API", "Redis", "Supabase", "Postgres"],
    metrics: [
      { value: "24/7", label: { pt: "Atendimento", en: "Coverage" } },
      { value: "9", label: { pt: "Workflows orquestrados", en: "Orchestrated workflows" } },
      { value: "107", label: { pt: "Nós no agente principal", en: "Nodes in the main agent" } },
    ],
  },
  {
    slug: "dashboard-vendas-ia",
    category: "plataforma",
    image: "/projects/dashboard-vendas-ia.webp",
    name: "Dashboard de Vendas IA",
    company: "Ativos Digitais",
    status: "producao",
    featured: false,
    tagline: { pt: "Funil em tempo real dos atendimentos feitos pela IA", en: "Real-time funnel of AI-handled conversations" },
    problem: { pt: "Gestores sem visibilidade do que os agentes de IA faziam no funil — atendimentos, qualificações e follow-ups invisíveis.", en: "Managers had zero visibility into what the AI agents were doing in the funnel — conversations, qualifications and follow-ups were invisible." },
    solution: { pt: "Dashboard alimentado por eventos dos workflows n8n via edge function autenticada com token por cliente (lead_created, conversation_started, lead_qualified, followup_sent, deal_won…). KPIs, funil de conversão, timeline por lead, ranking de vendedores e metas com celebrações.", en: "Dashboard fed by n8n workflow events through an edge function authenticated with a per-client token (lead_created, conversation_started, lead_qualified, followup_sent, deal_won…). KPIs, conversion funnel, per-lead timeline, sales leaderboard and goals with celebrations." },
    result: { pt: "Contrato de eventos genérico: cada agente novo entra no dashboard com 3 workflows emissores apontando para o mesmo endpoint.", en: "Generic event contract: each new agent plugs into the dashboard with 3 emitter workflows pointing at the same endpoint." },
    stack: ["React + Vite", "TypeScript", "shadcn/ui", "Supabase (Edge Functions)", "Recharts", "n8n"],
  },
  {
    slug: "kelly-rag-beauty",
    category: "agente",
    image: "/projects/kelly-rag-beauty.webp",
    name: "Agente RAG de Agendamento",
    company: "Rabelo Co. / Rise Doc",
    status: "producao",
    featured: true,
    tagline: { pt: "Agente de agendamento e conhecimento para salão", en: "Scheduling and knowledge agent for a salon" },
    problem: { pt: "Salão precisava de atendimento e agendamento 24/7 sem inflar custo e latência de API.", en: "Salon needed 24/7 service and scheduling without blowing up API cost and latency." },
    solution: { pt: "RAG híbrido: informação estática servida de um vector store e API ao vivo reservada só para agenda. Cron diário de ingestão de embeddings e handoff IA→humano. Engenharia reversa de uma API de terceiros não documentada (auth Cognito, endpoints de relatório).", en: "Hybrid RAG: static info served from a vector store, live API reserved only for scheduling. Daily embedding ingestion cron and AI→human handoff. Reverse-engineered an undocumented third-party API (Cognito auth, report endpoints)." },
    result: { pt: "Migração de 20 profissionais, 224 serviços e 500 clientes para o novo schema; latência e custo de resposta reduzidos.", en: "Migrated 20 professionals, 224 services and 500 clients to the new schema; cut response latency and cost." },
    stack: ["n8n", "Supabase pgvector", "OpenAI (text-embedding-3-small, 1536d)", "Cognito/Avec API"],
    metrics: [
      { value: "20", label: { pt: "Profissionais migrados", en: "Professionals migrated" } },
      { value: "224", label: { pt: "Serviços", en: "Services" } },
      { value: "500", label: { pt: "Clientes", en: "Clients" } },
    ],
  },
  {
    slug: "ativos-gtm-suite",
    category: "plataforma",
    image: "/projects/ativos-gtm-suite.webp",
    name: "Suíte GTM no CRM",
    company: "Ativos Digitais",
    status: "producao",
    featured: false,
    tagline: { pt: "Automação GTM ponta a ponta no Pipedrive/Kommo", en: "End-to-end GTM automation on Pipedrive/Kommo" },
    problem: { pt: "Time comercial perdia pipeline por falta de cadência, follow-up e contexto pós-call.", en: "Sales team lost pipeline due to missing cadence, follow-up and post-call context." },
    solution: { pt: "Cadência de atividades por etapa com rollback, follow-up por IA, resumos de call por Whisper logados no negócio, triagem de candidatos no ClickUp e ingestão de Meta Lead Ads com disparo segmentado no WhatsApp.", en: "Stage-based activity cadence with rollback, AI follow-up, Whisper call summaries logged to deals, candidate screening into ClickUp, and Meta Lead Ads ingestion with segmented WhatsApp dispatch." },
    stack: ["n8n (128 nós)", "Pipedrive", "Kommo", "ClickUp", "Evolution API", "OpenAI (GPT + Whisper)", "Meta Lead Ads"],
    links: [{ label: "CRM", url: "https://ativos-digitais-crm.vercel.app" }],
  },
  {
    slug: "fia",
    category: "saas",
    image: "/projects/fia.webp",
    name: "FIA — Financial Intelligence Assistant",
    company: "Rabelo Co.",
    status: "producao",
    featured: false,
    tagline: { pt: "Web app de finanças pessoais em produção", en: "Full personal-finance web app in production" },
    problem: { pt: "Gestão de finanças pessoais dispersa, sem API para automação.", en: "Scattered personal finance management with no API for automation." },
    solution: { pt: "App completo: despesas recorrentes, parcelas, metas, sync de taxas do BCB (CDI/Selic/IPCA), simulador de investimento e API REST versionada com chaves de API consumida por automação externa em n8n.", en: "Full app: recurring expenses, installments, goals, BCB rate sync (CDI/Selic/IPCA), investment simulator, and a versioned REST API with API keys consumed by external n8n automation." },
    stack: ["Next.js 15", "Supabase (RLS)", "Tailwind", "Vercel"],
    links: [{ label: "GitHub", url: "https://github.com/rafaelrabel0/fia" }],
  },
  {
    slug: "telegram-3d-search",
    category: "plataforma",
    image: "/projects/telegram-3d-search.webp",
    name: "Telegram 3D Search",
    company: "Solid Studio",
    status: "funcional",
    featured: false,
    tagline: { pt: "Busca semântica com verificação visual por IA", en: "Semantic search with AI visual verification" },
    problem: { pt: "Acervos de modelos 3D espalhados por ~60 grupos do Telegram, impossível de buscar.", en: "3D model archives scattered across ~60 Telegram groups, impossible to search." },
    solution: { pt: "Motor de busca que funde busca fuzzy + vetorial sobre 1.266 bibliotecas indexadas, com verificação visual por GPT-4o Vision antes de confirmar o match e download sob demanda.", en: "Search engine fusing fuzzy + vector search over 1,266 indexed libraries, with GPT-4o Vision visual verification before confirming a match and on-demand download." },
    metrics: [{ value: "1.266", label: { pt: "Bibliotecas indexadas", en: "Indexed libraries" } }, { value: "~60", label: { pt: "Grupos varridos", en: "Groups swept" } }],
    stack: ["Python", "FastAPI", "SQLite FTS5", "OpenAI Vision"],
  },
  {
    slug: "lead-scoring-funnels",
    category: "outros",
    image: "/projects/ebook-ativos.webp",
    name: "Lead Scoring Funnels",
    company: "Ativos Digitais",
    status: "producao",
    featured: false,
    tagline: { pt: "Captura que pontua e roteia leads", en: "Capture pages that score and route leads" },
    problem: { pt: "Leads frios entrando no pipeline sem qualificação prévia.", en: "Cold leads entering the pipeline without prior qualification." },
    solution: { pt: "Páginas de captura com roteamento condicional, Meta Pixel e entrega de ativos por webhook — qualifica por receita e fit antes de chegar ao comercial (qualificado → booking, não qualificado → nutrição).", en: "Capture pages with conditional routing, Meta Pixel and webhook-driven asset delivery — qualifies by revenue and fit before sales (qualified → booking, unqualified → nurture)." },
    stack: ["Webhooks", "Meta Pixel", "WhatsApp", "Lovable"],
    links: [{ label: "E-book", url: "https://ativosdigitaisebook.lovable.app" }],
  },
  {
    slug: "vetlideres",
    category: "saas",
    image: "/projects/vetlideres.webp",
    name: "Plataforma de Atendimento Inteligente",
    company: "Rabelo Co.",
    status: "producao",
    featured: false,
    tagline: { pt: "SaaS com IA para o setor veterinário", en: "AI SaaS for the veterinary sector" },
    problem: { pt: "Atendimento veterinário sem plataforma inteligente unificada.", en: "Veterinary service without a unified intelligent platform." },
    solution: { pt: "Plataforma web (SaaS) com IA dedicada, interface estilo ChatGPT/Claude, auth/DB/realtime no Supabase e edge functions (criação de usuário, transcrição de áudio). Aditivo de canal WhatsApp em proposta.", en: "Web platform (SaaS) with dedicated AI, ChatGPT/Claude-style interface, Supabase auth/DB/realtime and edge functions (user creation, audio transcription). WhatsApp channel addendum proposed." },
    stack: ["Vite + React 18", "TypeScript", "shadcn/ui + Tailwind", "Supabase", "n8n", "Evolution API"],
  },
  {
    slug: "solid-app",
    category: "saas",
    image: "/projects/solid-app.webp",
    name: "Solid App",
    company: "Solid Studio",
    status: "dev",
    featured: true,
    tagline: { pt: "Gestão para profissionais de impressão 3D", en: "Management for 3D printing pros" },
    problem: { pt: "Profissionais de impressão 3D sem ferramenta de gestão de loja, custo e pedidos.", en: "3D printing pros without a tool for store, cost and order management." },
    solution: { pt: "PWA de gestão: loja, catálogo, pedidos, estoque e cálculo de custo, com pagamentos Stripe e auth NextAuth v5.", en: "Management PWA: store, catalog, orders, inventory and cost calculation, with Stripe payments and NextAuth v5 auth." },
    stack: ["Next.js 15", "React 19", "Prisma 7 + Supabase", "Stripe", "NextAuth v5"],
    links: [{ label: "solidapp.shop", url: "https://solidapp.shop" }],
  },
  {
    slug: "face-finder",
    category: "plataforma",
    image: "/projects/face-finder.webp",
    name: "Face Finder",
    company: "Rabelo Co.",
    status: "producao",
    featured: true,
    tagline: { pt: "Uma selfie devolve todas as suas fotos do evento", en: "One selfie returns every photo you appear in" },
    problem: { pt: "Acervo de casamento com quase 4 mil fotos no Dropbox: ninguém acha as próprias sem varrer o álbum inteiro.", en: "A wedding archive of nearly 4,000 photos on Dropbox: nobody finds their own without scrolling the whole album." },
    solution: { pt: "Indexação do acervo com detecção e embedding facial (ONNX Runtime na GPU), busca por similaridade em pgvector com índice HNSW e PWA mobile onde a pessoa tira a selfie e baixa o ZIP. A selfie não é armazenada e o consentimento é pedido antes do scan.", en: "Archive indexed with face detection and embeddings (ONNX Runtime on GPU), similarity search in pgvector with an HNSW index, and a mobile PWA where the person takes a selfie and downloads a ZIP. The selfie is never stored and consent is asked before the scan." },
    result: { pt: "3.995 fotos e 15.681 rostos indexados em ~20 minutos, zero erros, busca abaixo de 1 segundo. No ar em produção.", en: "3,995 photos and 15,681 faces indexed in ~20 minutes, zero errors, sub-second search. Live in production." },
    stack: ["Python", "ONNX Runtime (GPU)", "Supabase pgvector (HNSW)", "PWA", "Vercel", "Dropbox API"],
    metrics: [
      { value: "3.995", label: { pt: "Fotos indexadas", en: "Photos indexed" } },
      { value: "15.681", label: { pt: "Rostos", en: "Faces" } },
      { value: "<1s", label: { pt: "Busca", en: "Search" } },
    ],
    links: [{ label: "ache-suas-fotos.vercel.app", url: "https://ache-suas-fotos.vercel.app" }],
  },
  {
    slug: "risedoc-plataforma",
    category: "saas",
    image: "/projects/risedoc-plataforma.webp",
    name: "Plataforma de Aprovação e Publicação",
    company: "Rise Doc",
    status: "producao",
    featured: true,
    tagline: { pt: "O cliente aprova por link e o app publica sozinho", en: "The client approves by link and the app publishes on its own" },
    problem: { pt: "Aprovação de conteúdo por WhatsApp e e-mail: sem histórico, sem prazo e com publicação manual em cada rede.", en: "Content approval over WhatsApp and email: no history, no deadline, and manual publishing on every network." },
    solution: { pt: "SaaS multi-tenant onde cada cliente revisa os posts por um link público e, ao aprovar, o app agenda e publica via Meta Graph API. Papéis separados para agência e cliente, RLS por projeto e trilha de aprovação auditável.", en: "Multi-tenant SaaS where each client reviews posts through a public link and, on approval, the app schedules and publishes via the Meta Graph API. Separate agency and client roles, per-project RLS and an auditable approval trail." },
    stack: ["Next.js 16", "Supabase (RLS)", "Meta Graph API", "Vercel"],
    links: [{ label: "app.risedoc.com.br", url: "https://app.risedoc.com.br" }],
  },
  {
    slug: "crm-risedoc",
    category: "agente",
    image: "/projects/crm-risedoc.webp",
    name: "CRM multi-tenant com agente de IA",
    company: "Rise Doc",
    status: "dev",
    featured: true,
    tagline: { pt: "Chat público que qualifica e entrega o lead ao painel", en: "Public chat that qualifies and drops the lead into the panel" },
    problem: { pt: "Cada clínica atendida precisava de um canal de entrada próprio, com o cuidado que dado de saúde exige.", en: "Every clinic needed its own inbound channel, handled with the care health data demands." },
    solution: { pt: "Módulo de CRM dentro da própria plataforma: chat público com agente de IA, captura de lead, guardrails de CFM e LGPD e registro de consentimento. O custo por conversa foi medido contra a API antes de subir, para caber no teto acordado.", en: "A CRM module inside the platform itself: public chat with an AI agent, lead capture, CFM and LGPD guardrails and consent logging. Per-conversation cost was measured against the API before shipping, to fit the agreed ceiling." },
    stack: ["Next.js", "AI SDK", "gpt-5-mini", "Supabase (RLS por tenant)"],
  },
  {
    slug: "assistente-virtual-ia",
    category: "agente",
    image: "/projects/lia.webp",
    name: "Assistente Virtual de IA",
    company: "Rabelo Co.",
    status: "producao",
    featured: false,
    tagline: { pt: "Secretária virtual que atende, qualifica e agenda", en: "Virtual assistant that answers, qualifies and books" },
    problem: { pt: "Negócio de serviço perdendo lead por demora na primeira resposta e sem ninguém para agendar fora do horário.", en: "A service business losing leads to slow first replies, with nobody to book appointments after hours." },
    solution: { pt: "Agente em n8n que interpreta texto, áudio (Whisper) e imagem, qualifica, agenda e retém — apresentado numa página com demo de chat ao vivo conectada ao fluxo real, para o cliente testar antes de contratar.", en: "An n8n agent that handles text, audio (Whisper) and images, qualifies, books and retains — presented on a page with a live chat demo wired to the real flow, so the client can try it before buying." },
    stack: ["n8n", "OpenAI (Whisper + GPT-4o-mini)", "Postgres", "Redis", "Supabase Storage"],
  },
  {
    slug: "relatorio-cs-tickets",
    category: "agente",
    image: "/projects/agente-sdr-whatsapp.webp",
    name: "Agente de Relatório de Customer Success",
    company: "Ativos Digitais",
    status: "dev",
    featured: false,
    tagline: { pt: "Um mês de tickets vira relatório de sucesso do cliente", en: "A month of tickets becomes a customer-success report" },
    problem: { pt: "Volume de tickets no helpdesk sem leitura de negócio: ninguém sabia por que os clientes abriam chamado nem onde estava o risco de churn.", en: "Helpdesk ticket volume with no business reading: nobody knew why clients opened tickets or where churn risk was." },
    solution: { pt: "Agente em n8n que coleta os tickets do mês pela API do helpdesk e gera um relatório por cliente — motivos de abertura, abertos/fechados/resolvidos, assuntos recorrentes, riscos e oportunidades. Foco em sucesso do cliente, não em suporte.", en: "An n8n agent that pulls the month's tickets through the helpdesk API and generates a per-client report — reasons for contact, open/closed/resolved counts, recurring subjects, risks and opportunities. Customer success, not support metrics." },
    stack: ["n8n", "Zoho Desk API", "OpenAI"],
  },
];
