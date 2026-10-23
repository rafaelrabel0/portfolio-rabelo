// Projetos. Fonte: Obsidian (MOCs de cada projeto) + CV.
//
// REGRA: nenhum nome de empresa ou cliente aparece no site. O projeto é
// descrito pelo que faz e pelo setor ("clínicas", "varejo"), nunca por quem
// contratou. Links que expõem o cliente no domínio também ficam de fora.
//
// Produto com site oficial aparece pela TELA INICIAL DO SITE (captura em
// public/projects/sites/, refeita quando o site mudar) e leva ao site. Projeto
// de cliente nunca aparece por print (mostrava marca de cliente):
// - agente: o fluxo (`flow`) e, ao apontar, uma conversa ilustrativa (`chat`);
// - plataforma: um rascunho de tela em cinza (`sketch`) e a jornada em
//   linguagem simples (`journey`) — quem lê é cliente, não engenheiro;
// - dados: o fluxo.

import type { Localized } from "./profile";

export type ProjectCategory = "produto" | "agente" | "plataforma" | "dados";

export const categoryOrder: ProjectCategory[] = ["produto", "agente", "plataforma", "dados"];

/** Um nó do diagrama: título curto e detalhe em mono. `hot` = o coração do fluxo. */
export type FlowNode = { t: string; s: string; hot?: boolean };

export type Visual =
  /** Tela inicial do site oficial, capturada (public/projects/sites/). */
  | { kind: "site"; src: string }
  /** Interface desenhada em HTML — só para quem não tem site público. */
  | { kind: "mock"; mock: "paroli" }
  /** Diagrama do fluxo (agentes, dados). */
  | { kind: "flow" }
  /** Rascunho de tela em cinza (plataformas de cliente). */
  | { kind: "sketch"; sketch: SketchKind };

export type SketchKind = "approval" | "calendar" | "crm" | "chat" | "pipeline";

/** Uma fala da conversa ilustrativa: `in` = quem escreve, `out` = o agente,
 *  `note` = o que o sistema fez por trás. `audio` = duração de um áudio. */
export type ChatLine = { who: "in" | "out" | "note"; text: Localized; audio?: string };

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
  /** Nós do diagrama — só para quem é mostrado pelo fluxo. */
  flow?: FlowNode[][];
  /** Conversa ilustrativa do agente (dados fictícios). */
  chat?: ChatLine[];
  /** Jornada da plataforma em linguagem simples, passo a passo. */
  journey?: Localized[];
  metrics?: { value: string; label: Localized }[];
  link?: { label: string; url: string };
  visual: Visual;
};

export const projects: Project[] = [
  // ------------------------------------------------------------ produtos
  // Ordem pedida pelo Rafael (23/10/2026): uai?, grudí, Sistere e Limiar em
  // destaque na home; o resto dos produtos abre "ver todos".
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
      pt: "Selecione qualquer texto, em qualquer programa do Windows, e pare: a tradução aparece do lado do cursor, com o preço convertido e a IA para explicar ou responder. Leitura da seleção por UI Automation em ~20 ms, com plano B que devolve a área de transferência intacta. Beta fechado por convite, com plano Pro e atualização automática.",
      en: "Select any text, in any Windows program, and pause: the translation shows up next to your cursor, with the price converted and AI to explain or reply. Selection is read through UI Automation in ~20 ms, with a fallback that leaves the clipboard untouched. Invite-only closed beta, with a Pro plan and auto-update.",
    },
    stack: ["Rust", "Tauri 2", "UI Automation", "Next.js", "Supabase", "OpenAI"],
    metrics: [
      { value: "~20ms", label: { pt: "Leitura da seleção", en: "Selection read" } },
      { value: "42MB", label: { pt: "Em repouso (era 465)", en: "Idle (was 465)" } },
    ],
    link: { label: "uai.deciban.com.br", url: "https://uai.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/uai.webp" },
  },
  {
    slug: "grudi",
    category: "produto",
    name: "grudí",
    origin: "own",
    status: "beta",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Suas anotações à vista enquanto você trabalha",
      en: "Your notes in sight while you work",
    },
    summary: {
      pt: "Notas para Windows que ficam visíveis por cima das janelas: lembretes, listas e rascunhos sem precisar abrir, procurar ou alternar de programa. Abre por atalho de qualquer app, fixa a nota solta na tela, faz a nota saltar na hora do lembrete, guarda pasta privada com PIN e se atualiza sozinho. Gratuito e sem conta.",
      en: "Windows notes that stay visible on top of your windows: reminders, lists and drafts without opening, searching or switching apps. Opens from a shortcut in any app, pins a note loose on screen, makes it pop up on time, keeps a PIN-locked private folder and updates itself. Free, no account.",
    },
    stack: ["Tauri 2", "Rust", "TypeScript", "Vite", "DPAPI"],
    link: { label: "grudi.deciban.com.br", url: "https://grudi.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/grudi.webp" },
  },
  {
    slug: "sistere",
    category: "produto",
    name: "Sistere",
    origin: "own",
    status: "dev",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Fique firme. Um quadrado por dia",
      en: "Hold steady. One square a day",
    },
    summary: {
      pt: "App de hábitos para Windows que abre nos hábitos de hoje — a única ação é marcar. Cada dia acende numa grade de calor, a ofensiva conta os dias seguidos (com congelamento semanal) e os relatórios mostram o ano por categoria e por hábito. Sem conta e sem nuvem: tudo fica no computador.",
      en: "A Windows habit app that opens on today's habits — the only action is to check them off. Each day lights up a heat grid, the streak counts consecutive days (with a weekly freeze) and the reports show the year by category and by habit. No account, no cloud: everything stays on your computer.",
    },
    stack: ["Tauri 2", "Rust", "TypeScript", "Local-first"],
    link: { label: "sistere.deciban.com.br", url: "https://sistere.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/sistere.webp" },
  },
  {
    slug: "limiar",
    category: "produto",
    name: "Limiar",
    origin: "own",
    status: "dev",
    year: "2026",
    featured: true,
    tagline: {
      pt: "Veja para onde vai o seu dinheiro",
      en: "See where your money goes",
    },
    summary: {
      pt: "Gestão financeira simples: assinaturas, contas e gastos do dia a dia num lugar só. Mostra o que vence no mês, quanto já saiu e quanto ainda dá para gastar hoje, com limite de gasto, calendário e o total por ano. Sem senha de banco e com tudo guardado no próprio aparelho — computador e iPhone.",
      en: "Simple money management: subscriptions, bills and everyday spending in one place. Shows what's due this month, how much has gone out and how much you can still spend today, with a spending limit, a calendar and the yearly total. No bank password, everything stored on your own device — desktop and iPhone.",
    },
    stack: ["TypeScript", "Tauri 2", "Expo / React Native", "SQLite"],
    link: { label: "limiar.deciban.com.br", url: "https://limiar.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/limiar.webp" },
  },
  {
    slug: "face-finder",
    category: "produto",
    name: "Face Finder",
    origin: "own",
    status: "producao",
    year: "2026",
    tagline: {
      pt: "Uma selfie devolve todas as fotos em que você aparece",
      en: "One selfie returns every photo you appear in",
    },
    summary: {
      pt: "Reconhecimento facial sobre o acervo de um evento: o convidado tira uma selfie e recebe todas as fotos em que aparece. 3.995 fotos e 15.681 rostos indexados com ONNX Runtime na GPU, busca em pgvector com índice HNSW, consentimento antes do scan e nenhuma selfie armazenada. O site tem uma demo para testar com as suas próprias fotos.",
      en: "Face recognition over an event archive: a guest takes a selfie and gets every photo they appear in. 3,995 photos and 15,681 faces indexed with ONNX Runtime on GPU, pgvector search with an HNSW index, consent before the scan and no selfie stored. The site has a demo to try with your own photos.",
    },
    stack: ["Python", "ONNX Runtime (GPU)", "pgvector · HNSW", "PWA", "Vercel"],
    metrics: [
      { value: "3.995", label: { pt: "Fotos indexadas", en: "Photos indexed" } },
      { value: "15.681", label: { pt: "Rostos", en: "Faces" } },
    ],
    link: { label: "facefinder.deciban.com.br", url: "https://facefinder.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/facefinder.webp" },
  },
  {
    slug: "bora-jogar",
    category: "produto",
    name: "Bora Jogar?!",
    origin: "own",
    status: "dev",
    year: "2026",
    tagline: {
      pt: "O grupo decide o jogo, marca a hora e o alarme chama todo mundo",
      en: "The group picks the game, sets the time and the alarm calls everyone",
    },
    summary: {
      pt: "App de comunidade para grupos de amigos: alguém traz um jogo, o grupo avalia, vota e marca a party — e na hora o alarme chama todo mundo. Celular, computador e navegador, com perfis, moderação e convites.",
      en: "A community app for groups of friends: someone brings a game, the group rates it, votes and schedules the party — and when it's time, the alarm calls everyone. Phone, desktop and browser, with profiles, moderation and invites.",
    },
    stack: ["Next.js 16", "Supabase", "Expo / React Native", "Tauri 2"],
    link: { label: "borajogar.deciban.com.br", url: "https://borajogar.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/borajogar.webp" },
  },
  {
    slug: "cinefeed",
    category: "produto",
    name: "CineFeed",
    origin: "own",
    status: "dev",
    year: "2026",
    tagline: {
      pt: "Role trailers, ache onde assistir",
      en: "Scroll trailers, find where to watch",
    },
    summary: {
      pt: "App de iPhone e iPad com um feed vertical de trailers só dos streamings que a pessoa assina. Um toque mostra nota, gênero e onde assistir, e abre o filme no app do streaming. Por cima, um perfil de cinéfilo: nota de 1 a 10, pódio Top 3, rankings, desafio com amigos e cartões para Stories.",
      en: "An iPhone and iPad app with a vertical feed of trailers only from the streaming services you subscribe to. One tap shows the rating, genre and where to watch, and opens the movie in the streaming app. On top, a film-lover profile: 1-to-10 ratings, a Top 3 podium, rankings, friend challenges and Stories cards.",
    },
    stack: ["iPhone e iPad", "React Native", "Next.js (site)"],
    link: { label: "cinefeed.deciban.com.br", url: "https://cinefeed.deciban.com.br" },
    visual: { kind: "site", src: "/projects/sites/cinefeed.webp" },
  },
  {
    slug: "paroli",
    category: "produto",
    name: "<пароли/>",
    origin: "own",
    status: "local",
    year: "2026",
    tagline: {
      pt: "Cofre de senhas 100% local, que virou o painel da operação",
      en: "A 100% local password vault that became the operations hub",
    },
    summary: {
      pt: "Gerenciador de senhas que nunca sai da máquina: AES-256-GCM, chave derivada da senha mestra e nada em nuvem. Cresceu para hub pessoal: clientes, leads do site, tarefas, finanças e agenda, com cofre de credenciais isolado por cliente. Projeto pessoal, sem site público — a interface abaixo é desenhada, com dados fictícios.",
      en: "A password manager that never leaves the machine: AES-256-GCM, a key derived from the master password and nothing in the cloud. It grew into a personal hub: clients, site leads, tasks, finance and calendar, with a credentials vault isolated per client. A personal project with no public site — the interface below is drawn, with fictional data.",
    },
    stack: ["Next.js 16", "React 19", "better-sqlite3", "AES-256-GCM", "Tailwind v4"],
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
    chat: [
      { who: "in", text: { pt: "Oi! Vi o anúncio de vocês. Serve para a minha loja?", en: "Hi! I saw your ad. Does it work for my store?" } },
      { who: "out", text: { pt: "Serve sim! Quantas pessoas atendem o WhatsApp hoje e quantos contatos chegam por dia?", en: "It does! How many people answer WhatsApp today and how many contacts come in per day?" } },
      { who: "in", text: { pt: "Áudio", en: "Voice note" }, audio: "0:14" },
      { who: "out", text: { pt: "Entendi: duas pessoas e uns 80 contatos por dia. Posso marcar 20 minutos com um especialista amanhã às 10h?", en: "Got it: two people and about 80 contacts a day. Can I book 20 minutes with a specialist tomorrow at 10am?" } },
      { who: "note", text: { pt: "lead qualificado · etapa movida no CRM", en: "lead qualified · CRM stage moved" } },
    ],
    metrics: [
      { value: "24/7", label: { pt: "Atendimento", en: "Coverage" } },
      { value: "9", label: { pt: "Workflows", en: "Workflows" } },
      { value: "107", label: { pt: "Nós no agente", en: "Agent nodes" } },
    ],
    visual: { kind: "flow" },
  },
  {
    slug: "agentes-clinicas",
    category: "agente",
    name: "Agentes de atendimento para clínicas",
    origin: "client",
    status: "producao",
    year: "2026",
    tagline: { pt: "Agenda, confirma, lembra e tira dúvida no WhatsApp do consultório", en: "Books, confirms, reminds and answers on the clinic's WhatsApp" },
    summary: {
      pt: "Agentes para consultórios médicos de uma agência de marketing em saúde, um por clínica: agendamento pelo WhatsApp, confirmação de presença, lembretes, perguntas frequentes e triagem inicial. O tom e as regras de cada clínica saem do dossiê de onboarding feito por conversa com IA.",
      en: "Agents for medical practices served by a healthcare marketing agency, one per clinic: WhatsApp booking, attendance confirmation, reminders, FAQs and initial triage. Each clinic's tone and rules come from the onboarding dossier built through an AI conversation.",
    },
    stack: ["n8n", "GPT", "Evolution API", "Postgres"],
    flow: [
      [{ t: "Paciente", s: "WhatsApp" }],
      [{ t: "Agente", s: "regras da clínica", hot: true }],
      [{ t: "Agenda", s: "horários" }, { t: "Triagem", s: "perguntas" }],
      [{ t: "Confirmação", s: "+ lembrete" }, { t: "Equipe", s: "handoff" }],
    ],
    chat: [
      { who: "in", text: { pt: "Boa tarde! Queria marcar uma consulta com a dermatologista.", en: "Good afternoon! I'd like to book an appointment with the dermatologist." } },
      { who: "out", text: { pt: "Claro! Tenho quinta às 14h30 ou sexta às 9h. Qual fica melhor?", en: "Of course! I have Thursday at 2:30pm or Friday at 9am. Which works better?" } },
      { who: "in", text: { pt: "Sexta às 9.", en: "Friday at 9." } },
      { who: "out", text: { pt: "Pronto, sexta às 9h confirmada. Te lembro na véspera — é só responder SIM.", en: "Done, Friday at 9am is confirmed. I'll remind you the day before — just reply YES." } },
      { who: "note", text: { pt: "consulta na agenda · lembrete programado", en: "appointment booked · reminder scheduled" } },
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
    chat: [
      { who: "in", text: { pt: "Vocês fazem luzes? Quanto tempo leva?", en: "Do you do highlights? How long does it take?" } },
      { who: "out", text: { pt: "Fazemos! Leva umas 3 horas, com hidratação no fim. Quer ver os horários?", en: "We do! It takes about 3 hours, with a treatment at the end. Want to see the times?" } },
      { who: "note", text: { pt: "resposta da base · agenda consultada ao vivo", en: "answer from the knowledge base · calendar checked live" } },
      { who: "out", text: { pt: "Sábado tenho 9h ou 10h30. Reservo qual?", en: "Saturday I have 9am or 10:30am. Which one should I book?" } },
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
    chat: [
      { who: "out", text: { pt: "Oi! Para começar: como você descreveria a sua clínica para um paciente novo?", en: "Hi! To start: how would you describe your clinic to a new patient?" } },
      { who: "in", text: { pt: "Atendimento acolhedor, foco em dermatologia estética.", en: "Warm care, focused on aesthetic dermatology." } },
      { who: "out", text: { pt: "Ótimo. E o que os pacientes mais perguntam antes de marcar?", en: "Great. And what do patients ask most before booking?" } },
      { who: "in", text: { pt: "Preço e se aceita convênio.", en: "Price and whether insurance is accepted." } },
      { who: "note", text: { pt: "dossiê gerado · tarefa criada para a equipe", en: "dossier generated · task created for the team" } },
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
    journey: [
      { pt: "A agência sobe os posts do mês", en: "The agency uploads the month's posts" },
      { pt: "O cliente revisa por um link, sem criar conta", en: "The client reviews through a link, no account needed" },
      { pt: "Aprova ou pede ajuste com um toque", en: "Approves or asks for changes with one tap" },
      { pt: "O app publica sozinho na data e hora marcadas", en: "The app publishes on its own at the set date and time" },
    ],
    visual: { kind: "sketch", sketch: "approval" },
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
    journey: [
      { pt: "O paciente marca pelo sistema que a clínica já usa", en: "The patient books through the system the clinic already uses" },
      { pt: "A consulta cai na agenda do médico na hora", en: "The appointment lands on the doctor's calendar right away" },
      { pt: "Aparece também no Google Agenda", en: "It also shows up in Google Calendar" },
      { pt: "O médico vê o dia no celular, como um app", en: "The doctor sees the day on their phone, like an app" },
    ],
    visual: { kind: "sketch", sketch: "calendar" },
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
    journey: [
      { pt: "O visitante abre o chat pelo link da clínica", en: "The visitor opens the chat from the clinic's link" },
      { pt: "O agente tira dúvidas dentro das regras de ética médica", en: "The agent answers questions within medical-ethics rules" },
      { pt: "Pede consentimento antes de guardar o contato", en: "It asks for consent before saving the contact" },
      { pt: "O lead chega ao painel com a conversa inteira", en: "The lead reaches the panel with the whole conversation" },
    ],
    visual: { kind: "sketch", sketch: "crm" },
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
    journey: [
      { pt: "O veterinário entra com a conta da clínica", en: "The vet signs in with the clinic's account" },
      { pt: "Pergunta por texto ou áudio, como num chat de IA", en: "Asks by text or voice, like in an AI chat" },
      { pt: "A IA responde com o contexto do setor", en: "The AI answers with the sector's context" },
      { pt: "O histórico fica salvo para cada profissional", en: "The history is saved for each professional" },
    ],
    visual: { kind: "sketch", sketch: "chat" },
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
    metrics: [{ value: "128", label: { pt: "Nós no workflow", en: "Workflow nodes" } }],
    journey: [
      { pt: "O negócio muda de etapa no CRM", en: "A deal changes stage in the CRM" },
      { pt: "As tarefas da etapa nascem sozinhas — e somem se ele voltar", en: "The stage's tasks create themselves — and vanish if it moves back" },
      { pt: "A ligação gravada vira resumo na ficha do negócio", en: "The recorded call becomes a summary on the deal" },
      { pt: "O lead do anúncio chega já separado no WhatsApp", en: "The ad lead arrives already segmented on WhatsApp" },
    ],
    visual: { kind: "sketch", sketch: "pipeline" },
  },
  {
    slug: "dashboard-funil",
    category: "dados",
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
];

export const featured = projects.filter((p) => p.featured);
