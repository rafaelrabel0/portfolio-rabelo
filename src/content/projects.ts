// Projetos. Fonte: Obsidian (MOCs de cada projeto) + CV.
//
// REGRA: nenhum nome de empresa ou cliente aparece no site. O projeto é
// descrito pelo que faz e pelo setor ("clínicas", "varejo"), nunca por quem
// contratou. Links que expõem o cliente no domínio também ficam de fora.
//
// Os prints antigos mostravam marcas de cliente e a marca "Rabelo Co.". No
// lugar deles, cada projeto descreve o próprio fluxo (`flow`) e a interface
// desenha o diagrama em DOM, na identidade atual.

import type { Localized } from "./profile";

export type ProjectCategory = "produto" | "agente" | "plataforma" | "dados";

export const categoryOrder: ProjectCategory[] = ["produto", "agente", "plataforma", "dados"];

/** Um nó do diagrama: título curto e detalhe em mono. `hot` = o coração do fluxo. */
export type FlowNode = { t: string; s: string; hot?: boolean };

export type Visual =
  | { kind: "image"; src: string; alt: Localized }
  | { kind: "mock"; mock: "uai" | "grudai" | "paroli" | "facefinder" }
  | { kind: "flow" };

export type Project = {
  slug: string;
  category: ProjectCategory;
  name: string;
  /** "own" = produto da deciban; "client" = feito para cliente (sem nome). */
  origin: "own" | "client";
  status: "producao" | "beta" | "dev" | "local";
  year: string;
  featured?: boolean;
  tagline: Localized;
  summary: Localized;
  stack: string[];
  flow: FlowNode[][];
  metrics?: { value: string; label: Localized }[];
  link?: { label: string; url: string };
  visual: Visual;
};

export const projects: Project[] = [
  // ------------------------------------------------------------ destaques
  {
    slug: "uai",
    category: "produto",
    name: "uai?",
    origin: "own",
    status: "beta",
    year: "2026",
    featured: true,
    tagline: {
      pt: "O tradutor de bolso que mora do lado do cursor",
      en: "The pocket translator that lives next to your cursor",
    },
    summary: {
      pt: "App de fundo para Windows: selecionou um texto em qualquer programa e parou, aparece a tradução, a moeda convertida e o atalho para pesquisar ou perguntar à IA. Leitura da seleção por UI Automation em ~20 ms, com plano B que devolve a área de transferência intacta. Beta fechado com site, trailer, convites e atualização automática.",
      en: "A Windows background app: select text in any program and pause, and the translation, the converted currency and a shortcut to search or ask the AI appear. Selection is read through UI Automation in ~20 ms, with a fallback that leaves the clipboard untouched. Closed beta with site, trailer, invites and auto-update.",
    },
    stack: ["Rust", "Tauri 2", "UI Automation", "Next.js", "Supabase", "OpenAI"],
    flow: [
      [{ t: "Seleção", s: "qualquer app" }],
      [{ t: "UI Automation", s: "~20 ms", hot: true }, { t: "Plano B", s: "Ctrl+Insert" }],
      [{ t: "Tradução", s: "+ moeda" }, { t: "IA", s: "explicar · responder" }],
      [{ t: "Ilha", s: "junto ao cursor" }],
    ],
    metrics: [
      { value: "~20ms", label: { pt: "Leitura da seleção", en: "Selection read" } },
      { value: "42MB", label: { pt: "Em repouso (era 465)", en: "Idle (was 465)" } },
    ],
    link: { label: "uai-beta.vercel.app", url: "https://uai-beta.vercel.app" },
    visual: { kind: "mock", mock: "uai" },
  },
  {
    slug: "face-finder",
    category: "produto",
    name: "Face Finder",
    origin: "own",
    status: "producao",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Uma selfie devolve todas as fotos em que você aparece",
      en: "One selfie returns every photo you appear in",
    },
    summary: {
      pt: "Busca por reconhecimento facial num acervo de evento: detecção e embedding de rosto em ONNX Runtime na GPU, similaridade em pgvector com índice HNSW e um PWA onde o convidado tira a selfie e baixa o ZIP. A selfie não é armazenada e o consentimento vem antes do scan. Demo pública com as fotos do próprio visitante.",
      en: "Face-recognition search over an event archive: face detection and embeddings on ONNX Runtime (GPU), similarity in pgvector with an HNSW index, and a PWA where a guest takes a selfie and downloads a ZIP. The selfie is never stored and consent comes before the scan. Public demo using the visitor's own photos.",
    },
    stack: ["Python", "ONNX Runtime (GPU)", "pgvector · HNSW", "PWA", "Vercel"],
    flow: [
      [{ t: "Acervo", s: "3.995 fotos" }],
      [{ t: "Detecção", s: "ONNX · GPU", hot: true }],
      [{ t: "Embeddings", s: "15.681 rostos" }],
      [{ t: "pgvector", s: "HNSW" }, { t: "Selfie", s: "não armazenada" }],
      [{ t: "ZIP", s: "< 1 s" }],
    ],
    metrics: [
      { value: "3.995", label: { pt: "Fotos indexadas", en: "Photos indexed" } },
      { value: "15.681", label: { pt: "Rostos", en: "Faces" } },
      { value: "<1s", label: { pt: "Busca", en: "Search" } },
    ],
    link: { label: "ache-suas-fotos.vercel.app/demo", url: "https://ache-suas-fotos.vercel.app/demo" },
    visual: { kind: "mock", mock: "facefinder" },
  },
  {
    slug: "grudai",
    category: "produto",
    name: "Grudaí",
    origin: "own",
    status: "beta",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Notas que grudam por cima do computador",
      en: "Notes that stick on top of your computer",
    },
    summary: {
      pt: "Quadro de notas que roda em segundo plano: abre por atalho ou por um ponto flutuante, e cada nota pode ser fixada solta na tela, por cima de qualquer janela. Formatação detectada sozinha, nota com senha cifrada pelo Windows, lembretes que fazem a nota saltar na hora certa e captura rápida pelo atalho.",
      en: "A notes board that runs in the background: it opens from a shortcut or a floating dot, and any note can be pinned loose on screen, above every window. Auto-detected formatting, password-protected notes encrypted by Windows, reminders that make a note pop up on time, and quick capture from the shortcut.",
    },
    stack: ["Tauri 2", "Rust", "TypeScript", "Vite", "DPAPI"],
    flow: [
      [{ t: "Atalho", s: "ou ponto flutuante" }],
      [{ t: "Captura", s: "rápida", hot: true }],
      [{ t: "Nota", s: "formato automático" }, { t: "Cofre", s: "DPAPI" }],
      [{ t: "Fixar", s: "por cima de tudo" }, { t: "Lembrete", s: "salta na tela" }],
    ],
    visual: { kind: "mock", mock: "grudai" },
  },
  {
    slug: "paroli",
    category: "produto",
    name: "<пароли/>",
    origin: "own",
    status: "local",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Cofre de senhas 100% local, que virou o painel da operação",
      en: "A 100% local password vault that became the operations hub",
    },
    summary: {
      pt: "Gerenciador de senhas que nunca sai da máquina: AES-256-GCM, chave derivada da senha mestra e nada em nuvem. Cresceu para hub pessoal: módulos de clientes, tarefas, finanças e agente pessoal, com cofre de credenciais isolado por cliente. Projeto pessoal, sem link público — a interface fala por ele.",
      en: "A password manager that never leaves the machine: AES-256-GCM, a key derived from the master password and nothing in the cloud. It grew into a personal hub: clients, tasks, finance and a personal agent, with a credentials vault isolated per client. A personal project with no public link — the interface speaks for it.",
    },
    stack: ["Next.js 16", "React 19", "better-sqlite3", "AES-256-GCM", "Tailwind v4"],
    flow: [
      [{ t: "Senha mestra", s: "nunca salva" }],
      [{ t: "Derivação", s: "chave", hot: true }],
      [{ t: "AES-256-GCM", s: "por item" }],
      [{ t: "SQLite", s: "local" }, { t: "Clientes", s: "cofre isolado" }],
    ],
    visual: { kind: "mock", mock: "paroli" },
  },

  // ------------------------------------------------------------ agentes
  {
    slug: "agente-sdr",
    category: "agente",
    name: "Agente SDR multimodal no WhatsApp",
    origin: "client",
    status: "producao",
    year: "2025",
    tagline: { pt: "Atende, qualifica e faz follow-up 24/7 — e passa para humano na hora certa", en: "Answers, qualifies and follows up 24/7 — and hands off to a human at the right time" },
    summary: {
      pt: "Agente em n8n que entende texto, áudio (Whisper) e imagem (Vision), com buffer de mensagens, memória de conversa e cadastro de lead. Move etapas no CRM, chama tools de qualificação e handoff e emite eventos para o painel. Follow-ups em cascata de 10 minutos a 14 dias.",
      en: "An n8n agent that understands text, audio (Whisper) and images (Vision), with message buffering, conversation memory and lead registry. It moves CRM stages, calls qualification and handoff tools and emits events to the dashboard. Cascading follow-ups from 10 minutes to 14 days.",
    },
    stack: ["n8n", "GPT-4o", "Whisper", "Evolution API", "Redis", "Postgres"],
    flow: [
      [{ t: "WhatsApp", s: "Evolution API" }],
      [{ t: "Buffer", s: "Redis" }],
      [{ t: "Agente", s: "GPT-4o", hot: true }, { t: "Áudio", s: "Whisper" }, { t: "Imagem", s: "Vision" }],
      [{ t: "Memória", s: "Postgres" }, { t: "Leads", s: "Supabase" }],
      [{ t: "CRM", s: "etapas + tags" }, { t: "Follow-up", s: "10 min → 14 d" }],
    ],
    metrics: [
      { value: "24/7", label: { pt: "Atendimento", en: "Coverage" } },
      { value: "9", label: { pt: "Workflows", en: "Workflows" } },
      { value: "107", label: { pt: "Nós no agente", en: "Agent nodes" } },
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "agente-rag",
    category: "agente",
    name: "Agente RAG de agendamento",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "Conhecimento no banco vetorial, agenda ao vivo só quando precisa", en: "Knowledge in the vector store, live calendar only when needed" },
    summary: {
      pt: "RAG híbrido para um salão: o que é estático sai do vector store e a API ao vivo fica reservada para a agenda, cortando custo e latência. Ingestão diária de embeddings, handoff para humano e engenharia reversa de uma API de terceiros sem documentação.",
      en: "Hybrid RAG for a salon: static knowledge comes from the vector store and the live API is reserved for scheduling, cutting cost and latency. Daily embedding ingestion, human handoff and reverse engineering of an undocumented third-party API.",
    },
    stack: ["n8n", "pgvector", "text-embedding-3-small", "Cognito"],
    flow: [
      [{ t: "Pergunta", s: "WhatsApp" }],
      [{ t: "Roteador", s: "estático ou ao vivo", hot: true }],
      [{ t: "pgvector", s: "1536d" }, { t: "API da agenda", s: "auth Cognito" }],
      [{ t: "Resposta", s: "+ handoff" }, { t: "Cron", s: "reingestão" }],
    ],
    metrics: [
      { value: "20", label: { pt: "Profissionais", en: "Professionals" } },
      { value: "224", label: { pt: "Serviços", en: "Services" } },
      { value: "500", label: { pt: "Clientes migrados", en: "Clients migrated" } },
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "onboarding-conversa",
    category: "agente",
    name: "Onboarding por conversa com IA",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "No lugar do formulário, uma conversa que vira dossiê", en: "Instead of a form, a conversation that becomes a dossier" },
    summary: {
      pt: "O cliente novo conversa com uma IA por link tokenizado em vez de preencher formulário. A conversa vira um dossiê estruturado com resumo, cai como tarefa no gerenciador da equipe e alimenta o prompt do agente de atendimento daquele cliente.",
      en: "New clients talk to an AI through a tokenized link instead of filling out a form. The conversation becomes a structured dossier with a summary, lands as a task in the team's manager and feeds the prompt of that client's service agent.",
    },
    stack: ["Next.js", "AI SDK", "Supabase", "ClickUp API"],
    flow: [
      [{ t: "Link", s: "tokenizado" }],
      [{ t: "Conversa", s: "IA humanizada", hot: true }],
      [{ t: "Dossiê", s: ".md + resumo" }],
      [{ t: "Tarefa", s: "na equipe" }, { t: "Prompt", s: "do agente" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "assistente-virtual",
    category: "agente",
    name: "Assistente virtual com demo ao vivo",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "Secretária virtual que atende, qualifica e agenda — testável antes de contratar", en: "A virtual assistant that answers, qualifies and books — testable before buying" },
    summary: {
      pt: "Agente que interpreta texto, áudio e imagem, qualifica, agenda e retém. Apresentado numa página com chat ao vivo ligado ao fluxo real, para o cliente testar o produto antes de assinar.",
      en: "An agent that handles text, audio and images, qualifies, books and retains. Presented on a page with a live chat wired to the real flow, so the client can try it before signing.",
    },
    stack: ["n8n", "GPT-4o-mini", "Whisper", "Postgres", "Redis"],
    flow: [
      [{ t: "Mensagem", s: "texto · áudio · foto" }],
      [{ t: "Agente", s: "GPT-4o-mini", hot: true }],
      [{ t: "Qualifica", s: "critérios" }, { t: "Agenda", s: "horários" }],
      [{ t: "Demo pública", s: "fluxo real" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "relatorio-cs",
    category: "agente",
    name: "Relatório de sucesso do cliente por agente",
    origin: "client",
    status: "dev",
    year: "2026",
    tagline: { pt: "Um mês de chamados vira leitura de negócio", en: "A month of tickets becomes a business reading" },
    summary: {
      pt: "Agente que coleta os chamados do mês pela API do helpdesk e escreve um relatório por cliente: motivos de contato, abertos e resolvidos, assuntos recorrentes, riscos de cancelamento e oportunidades.",
      en: "An agent that pulls the month's tickets from the helpdesk API and writes a per-client report: contact reasons, open and resolved counts, recurring subjects, churn risks and opportunities.",
    },
    stack: ["n8n", "Helpdesk API", "OpenAI"],
    flow: [
      [{ t: "Helpdesk", s: "API" }],
      [{ t: "Agrupamento", s: "por cliente" }],
      [{ t: "Leitura", s: "LLM", hot: true }],
      [{ t: "Relatório", s: "riscos · oportunidades" }],
    ],
    visual: { kind: "flow" },
  },

  // ------------------------------------------------------------ plataformas
  {
    slug: "aprovacao-conteudo",
    category: "plataforma",
    name: "Aprovação e publicação de conteúdo",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "O cliente aprova por link e o app publica sozinho", en: "The client approves by link and the app publishes on its own" },
    summary: {
      pt: "SaaS multi-tenant para uma agência de marketing médico: cada cliente revisa os posts por um link público e, ao aprovar, o app agenda e publica pela Meta Graph API. Papéis separados para agência e cliente, RLS por projeto e trilha de aprovação auditável.",
      en: "Multi-tenant SaaS for a medical marketing agency: each client reviews posts through a public link and, on approval, the app schedules and publishes via the Meta Graph API. Separate agency and client roles, per-project RLS and an auditable approval trail.",
    },
    stack: ["Next.js 16", "Supabase (RLS)", "Meta Graph API", "Vercel"],
    flow: [
      [{ t: "Post", s: "agência" }],
      [{ t: "Link público", s: "cliente revisa" }],
      [{ t: "Aprovação", s: "auditável", hot: true }],
      [{ t: "Agenda", s: "data e hora" }, { t: "Graph API", s: "publica" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "agenda-clinica",
    category: "plataforma",
    name: "Agenda clínica mobile-first",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "PWA de agendamento com API pública e espelho no Google Agenda", en: "Scheduling PWA with a public API and Google Calendar mirroring" },
    summary: {
      pt: "Calendário de consultas instalável na tela inicial, pensado para o celular do médico, com API pública para os CRMs que as clínicas já usam e espelhamento no Google Agenda.",
      en: "An appointment calendar installable on the home screen, designed for the doctor's phone, with a public API for the CRMs clinics already use and Google Calendar mirroring.",
    },
    stack: ["Next.js", "PWA", "Supabase", "Google Calendar API"],
    flow: [
      [{ t: "CRM da clínica", s: "API pública" }],
      [{ t: "Agenda", s: "PWA", hot: true }],
      [{ t: "Google Agenda", s: "espelho" }, { t: "Celular", s: "tela inicial" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "crm-agente",
    category: "plataforma",
    name: "CRM multi-tenant com agente de IA",
    origin: "client",
    status: "dev",
    year: "2026",
    tagline: { pt: "Chat público que qualifica e entrega o lead ao painel", en: "A public chat that qualifies and drops the lead into the panel" },
    summary: {
      pt: "Módulo de CRM dentro da plataforma: chat público com agente, captura de lead, guardrails de ética médica e LGPD e registro de consentimento. O custo por conversa foi medido contra a API antes de subir, para caber no teto acordado.",
      en: "A CRM module inside the platform: public chat with an agent, lead capture, medical-ethics and LGPD guardrails and consent logging. Per-conversation cost was measured against the API before shipping, to fit the agreed ceiling.",
    },
    stack: ["Next.js", "AI SDK", "gpt-5-mini", "Supabase (RLS por tenant)"],
    flow: [
      [{ t: "Visitante", s: "link público" }],
      [{ t: "Agente", s: "gpt-5-mini", hot: true }, { t: "Guardrails", s: "ética · LGPD" }],
      [{ t: "Consentimento", s: "registrado" }],
      [{ t: "Lead", s: "no painel" }, { t: "Conversas", s: "auditáveis" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "atendimento-vet",
    category: "plataforma",
    name: "Plataforma de atendimento com IA",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "IA dedicada a um setor, com interface de chat própria", en: "A sector-dedicated AI with its own chat interface" },
    summary: {
      pt: "SaaS com IA especializada no setor veterinário: interface no estilo dos grandes chats de IA, autenticação, banco e tempo real no Supabase e edge functions para criação de usuário e transcrição de áudio.",
      en: "SaaS with an AI specialized in the veterinary sector: an interface in the style of major AI chats, Supabase auth, database and realtime, and edge functions for user creation and audio transcription.",
    },
    stack: ["React", "TypeScript", "Supabase", "Edge Functions", "n8n"],
    flow: [
      [{ t: "Painel web", s: "equipe" }],
      [{ t: "IA dedicada", s: "contexto do setor", hot: true }],
      [{ t: "Edge Functions", s: "áudio · usuários" }],
      [{ t: "Histórico", s: "por profissional" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "suite-gtm",
    category: "plataforma",
    name: "Suíte de GTM no CRM",
    origin: "client",
    status: "producao",
    year: "2025",
    tagline: { pt: "O funil trabalhando sozinho: cadência, pós-call e lead ads", en: "The pipeline on autopilot: cadence, post-call and lead ads" },
    summary: {
      pt: "Motor de cadência por etapa com rollback quando o negócio muda de etapa, resumo de call por Whisper registrado no negócio, triagem de candidatos e ingestão de lead ads com disparo segmentado no WhatsApp.",
      en: "A stage-based cadence engine that rolls back when a deal changes stage, Whisper call summaries logged to the deal, candidate screening, and lead-ads ingestion with segmented WhatsApp outreach.",
    },
    stack: ["n8n (128 nós)", "Pipedrive", "Kommo", "Whisper", "Meta Lead Ads"],
    flow: [
      [{ t: "Etapa muda", s: "CRM" }, { t: "Call gravada", s: "SDR" }],
      [{ t: "Cadência", s: "128 nós · rollback", hot: true }, { t: "Whisper → GPT", s: "resumo" }],
      [{ t: "Atividades", s: "por etapa e data" }, { t: "Nota", s: "no negócio" }],
    ],
    metrics: [{ value: "128", label: { pt: "Nós no workflow", en: "Workflow nodes" } }],
    visual: { kind: "flow" },
  },
  {
    slug: "dashboard-funil",
    category: "plataforma",
    name: "Dashboard de funil por eventos",
    origin: "client",
    status: "producao",
    year: "2025",
    tagline: { pt: "O que a IA fez no funil, em tempo real", en: "What the AI did in the funnel, in real time" },
    summary: {
      pt: "Painel alimentado por eventos dos agentes através de uma edge function com token por cliente: KPIs, funil de conversão, linha do tempo por lead, ranking e metas. Contrato genérico: cada agente novo entra com três workflows emissores.",
      en: "A dashboard fed by agent events through an edge function with a per-client token: KPIs, conversion funnel, per-lead timeline, leaderboard and goals. A generic contract: each new agent plugs in with three emitter workflows.",
    },
    stack: ["React", "Supabase Edge Functions", "Recharts", "n8n"],
    flow: [
      [{ t: "Agente", s: "lead_created" }, { t: "CRM", s: "deal_won" }],
      [{ t: "Edge Function", s: "token por cliente", hot: true }],
      [{ t: "Postgres", s: "eventos" }],
      [{ t: "KPIs", s: "funil" }, { t: "Ranking", s: "metas" }],
    ],
    visual: { kind: "flow" },
  },

  // ------------------------------------------------------------ dados & busca
  {
    slug: "fia",
    category: "dados",
    name: "FIA — finanças pessoais",
    origin: "own",
    status: "producao",
    year: "2026",
    tagline: { pt: "O primeiro app próprio: finanças com API para automação", en: "The first in-house app: personal finance with an automation API" },
    summary: {
      pt: "Web app completo: despesas recorrentes, parcelas, metas, taxas do Banco Central sincronizadas (CDI, Selic, IPCA), simulador de investimento e API REST versionada com chaves, consumida por automações externas.",
      en: "A full web app: recurring expenses, installments, goals, synced Central Bank rates (CDI, Selic, IPCA), an investment simulator and a versioned REST API with keys, consumed by external automations.",
    },
    stack: ["Next.js 15", "Supabase (RLS)", "API REST", "Vercel"],
    flow: [
      [{ t: "Banco Central", s: "CDI · Selic · IPCA" }, { t: "Lançamentos", s: "app" }],
      [{ t: "Next.js", s: "Supabase + RLS", hot: true }],
      [{ t: "API REST", s: "chaves versionadas" }],
      [{ t: "Metas", s: "simulador" }, { t: "Automação", s: "externa" }],
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "busca-3d",
    category: "dados",
    name: "Busca semântica com verificação visual",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "1.266 bibliotecas de modelos 3D, achadas por texto e confirmadas pela imagem", en: "1,266 3D-model libraries, found by text and confirmed by image" },
    summary: {
      pt: "Motor que funde busca fuzzy e vetorial sobre acervos espalhados por dezenas de grupos, com verificação visual por GPT-4o Vision antes de confirmar o resultado e download sob demanda.",
      en: "An engine fusing fuzzy and vector search over archives spread across dozens of groups, with GPT-4o Vision visual verification before confirming a match, and on-demand download.",
    },
    stack: ["Python", "FastAPI", "SQLite FTS5", "OpenAI embeddings", "GPT-4o Vision"],
    flow: [
      [{ t: "~60 grupos", s: "varredura" }],
      [{ t: "Indexação", s: "1.266 bibliotecas" }],
      [{ t: "FTS5", s: "fuzzy" }, { t: "Embeddings", s: "vetorial" }],
      [{ t: "Vision", s: "confere a imagem", hot: true }],
      [{ t: "Download", s: "sob demanda" }],
    ],
    metrics: [{ value: "1.266", label: { pt: "Bibliotecas indexadas", en: "Indexed libraries" } }],
    visual: { kind: "flow" },
  },
  {
    slug: "este-site",
    category: "dados",
    name: "Este site",
    origin: "own",
    status: "producao",
    year: "2026",
    tagline: { pt: "Um portfólio que também é projeto: cenas, motor de scroll e agente real", en: "A portfolio that is also a project: scenes, scroll engine and a real agent" },
    summary: {
      pt: "Next.js 16 bilíngue com motor de cenas próprio (scroll suave e progresso por seção, sem biblioteca de animação), assinatura animada da marca em canvas, agente de IA ao vivo, pedido de proposta e agenda. Segurança de API com rate limit, checagem de origem e consentimento LGPD.",
      en: "A bilingual Next.js 16 site with its own scene engine (smooth scroll and per-section progress, no animation library), the brand's animated signature on canvas, a live AI agent, proposal requests and scheduling. API security with rate limiting, origin checks and LGPD consent.",
    },
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Canvas 2D", "n8n"],
    flow: [
      [{ t: "Scroll", s: "roda → alvo" }],
      [{ t: "Motor de cenas", s: "--p por seção", hot: true }],
      [{ t: "CSS", s: "sem re-render" }, { t: "Canvas", s: "marca animada" }],
      [{ t: "Agente", s: "n8n ao vivo" }],
    ],
    visual: { kind: "flow" },
  },
];

export const featured = projects.filter((p) => p.featured);
