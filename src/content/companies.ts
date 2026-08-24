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
  /** O que mudou na operação depois das automações — aparece no hover do card. */
  improvements: Localized[];
  links?: { label: string; url: string }[];
};

export const companies: Company[] = [
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
    improvements: [
      { pt: "Lead que chegava de madrugada passou a ser atendido e qualificado na hora, já registrado no CRM.", en: "Leads arriving at 3 a.m. started getting answered and qualified on the spot, already logged in the CRM." },
      { pt: "O follow-up deixou de depender de alguém lembrar: a cadência por etapa cria os touchpoints e desfaz sozinha quando o negócio muda de etapa.", en: "Follow-up stopped depending on someone remembering: the stage cadence creates the touchpoints and rolls itself back when the deal moves." },
      { pt: "Call de SDR virou contexto: transcrição e resumo caem como nota no negócio, sem ninguém digitar.", en: "SDR calls turned into context: transcript and summary land as a deal note with nobody typing." },
      { pt: "A gestão passou a ver o funil da IA em tempo real, por evento, em vez de perguntar como foi a semana.", en: "Management started seeing the AI funnel in real time, event by event, instead of asking how the week went." },
    ],
    links: [
      { label: "CRM (produção)", url: "https://ativos-digitais-crm.vercel.app" },
      { label: "E-book (captura)", url: "https://ativosdigitaisebook.lovable.app" },
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
    clientCount: 7,
    deliveries: [
      { label: { pt: "Agente de IA (SDR + agendamento)", en: "AI agent (SDR + scheduling)" }, count: 2, status: "ativo" },
      { label: { pt: "Agente de IA (SDR + agendamento)", en: "AI agent (SDR + scheduling)" }, count: 5, status: "onboarding" },
      { label: { pt: "Plataforma de aprovação e publicação", en: "Approval and publishing platform" }, count: 1, status: "ativo" },
      { label: { pt: "CRM multi-tenant com agente de IA", en: "Multi-tenant CRM with AI agent" }, count: 1, status: "planejamento" },
    ],
    improvements: [
      { pt: "Agendamento, confirmação de presença e lembrete saíram da secretária e passaram para o agente — inclusive fora do horário.", en: "Booking, attendance confirmation and reminders moved off the front desk and onto the agent — after hours included." },
      { pt: "Aprovação de conteúdo saiu do WhatsApp para um link com trilha auditável, e a publicação na rede virou automática.", en: "Content approval moved from WhatsApp to a link with an auditable trail, and publishing to the network became automatic." },
      { pt: "Dúvida frequente e triagem inicial deixaram de formar fila: são respondidas na hora, com guardrails de CFM e LGPD.", en: "FAQs and initial triage stopped forming a queue: they're answered instantly, with CFM and LGPD guardrails." },
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
    improvements: [
      { pt: "Acervo espalhado por dezenas de grupos virou busca única, com a IA conferindo visualmente o resultado antes de entregar.", en: "An archive scattered across dozens of groups became a single search, with AI visually checking the result before delivering it." },
      { pt: "Loja, catálogo, pedido, estoque e cálculo de custo passaram a viver num app só, em vez de planilha e caderno.", en: "Store, catalog, orders, inventory and cost calculation moved into a single app, instead of spreadsheets and notebooks." },
    ],
    links: [{ label: "solidapp.shop", url: "https://solidapp.shop" }],
  },
  {
    slug: "elevra",
    name: "Elevra",
    focus: { pt: "Assistentes virtuais de IA para negócios de serviço", en: "AI virtual assistants for service businesses" },
    description: {
      pt: "Marca de assistentes virtuais de IA: atendimento, qualificação e agendamento automáticos para negócios de serviço, com demo ao vivo antes da contratação.",
      en: "AI virtual assistant brand: automatic answering, qualification and scheduling for service businesses, with a live demo before signing.",
    },
    stack: ["n8n", "OpenAI (Whisper + GPT-4o-mini)", "Dify", "Go High Level", "Postgres", "Redis", "Stripe"],
    services: [
      { pt: "Assistente virtual que atende, qualifica, agenda e retém", en: "Virtual assistant that answers, qualifies, books and retains" },
      { pt: "Leitura de texto, áudio e imagem na mesma conversa", en: "Text, audio and image handled in one conversation" },
      { pt: "Template de SDR de pré-qualificação em Dify + Go High Level", en: "Pre-qualification SDR template on Dify + Go High Level" },
    ],
    clientCount: 1,
    deliveries: [
      { label: { pt: "Assistente virtual com demo ao vivo", en: "Virtual assistant with live demo" }, count: 1, status: "ativo" },
      { label: { pt: "Template SDR (Dify + GHL)", en: "SDR template (Dify + GHL)" }, count: 1, status: "planejamento" },
    ],
    improvements: [
      { pt: "A primeira resposta ao lead deixou de depender de horário comercial — cai em segundos, a qualquer hora.", en: "The first reply to a lead stopped depending on business hours — it lands in seconds, any time." },
      { pt: "Áudio e foto de cliente pararam de virar gargalo: o agente transcreve e interpreta na mesma conversa.", en: "Customer voice notes and photos stopped being a bottleneck: the agent transcribes and reads them in the same conversation." },
      { pt: "A proposta virou demo: o cliente conversa com o agente antes de decidir, em vez de ler um PDF.", en: "The proposal became a demo: the client talks to the agent before deciding, instead of reading a PDF." },
    ],
  },
  {
    slug: "unymos",
    name: "Unymos",
    focus: { pt: "Customer success a partir dos tickets de suporte", en: "Customer success out of support tickets" },
    description: {
      pt: "Operação com volume alto de tickets no helpdesk e nenhuma leitura de negócio em cima deles. A automação transforma um mês de tickets em relatório de sucesso do cliente.",
      en: "An operation with high helpdesk ticket volume and no business reading on top of it. The automation turns a month of tickets into a customer-success report.",
    },
    stack: ["n8n", "Zoho Desk API", "OpenAI"],
    services: [
      { pt: "Relatório mensal de Customer Success por cliente", en: "Monthly per-client customer-success report" },
      { pt: "Agrupamento dos motivos de abertura de ticket", en: "Grouping of ticket reasons" },
      { pt: "Sinalização de risco de churn e de oportunidade", en: "Churn risk and opportunity flagging" },
    ],
    clientCount: 1,
    deliveries: [
      { label: { pt: "Agente de relatório de CS", en: "CS report agent" }, count: 1, status: "onboarding" },
    ],
    improvements: [
      { pt: "Volume de ticket virou leitura de negócio: por que o cliente procurou, o que repete e onde está o risco.", en: "Ticket volume became a business reading: why the client reached out, what repeats and where the risk is." },
      { pt: "O relatório mensal que era compilado à mão passou a sair pronto, por cliente.", en: "The monthly report that used to be compiled by hand now comes out ready, per client." },
    ],
  },
  {
    slug: "vetlideres",
    name: "VetLíderes",
    focus: { pt: "Plataforma de atendimento com IA para o setor veterinário", en: "AI service platform for the veterinary sector" },
    description: {
      pt: "Setor veterinário sem plataforma unificada de atendimento. Entrega de um SaaS com IA dedicada, interface de chat e canal de WhatsApp em aditivo.",
      en: "Veterinary sector with no unified service platform. Delivered a SaaS with dedicated AI, a chat interface and a WhatsApp channel as an addendum.",
    },
    stack: ["Vite + React 18", "TypeScript", "Supabase", "n8n", "Evolution API"],
    services: [
      { pt: "Plataforma web com IA dedicada ao contexto do setor", en: "Web platform with AI dedicated to the sector's context" },
      { pt: "Transcrição de áudio e criação de usuários por edge function", en: "Audio transcription and user creation through edge functions" },
    ],
    clientCount: 1,
    deliveries: [
      { label: { pt: "Plataforma SaaS de atendimento com IA", en: "AI service SaaS platform" }, count: 1, status: "ativo" },
      { label: { pt: "Canal WhatsApp (aditivo)", en: "WhatsApp channel (addendum)" }, count: 1, status: "proposta" },
    ],
    improvements: [
      { pt: "A equipe passou a ter um só lugar para o atendimento, em vez de conversa espalhada por aplicativo pessoal.", en: "The team got a single place for service, instead of conversations scattered across personal apps." },
      { pt: "Áudio de cliente virou texto pesquisável no histórico do profissional.", en: "Customer voice notes became searchable text in the professional's history." },
    ],
  },
];
