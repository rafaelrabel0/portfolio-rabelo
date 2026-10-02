// Experiência em linha do tempo — cada marco é uma "página" do calendário da
// cena de Experiência. Datas conferidas no vault (CV, MOCs e changelogs).
// Sem nome de empresa contratante: o marco diz o que foi feito e o setor.

import type { Localized } from "./profile";

export type Milestone = {
  /** Mês que a página do calendário abre (1–12) e ano. */
  month: number;
  year: number;
  /** Dia marcado no calendário, quando o marco tem data exata. */
  day?: number;
  /** Rótulo do período ("Abr 2022 – Dez 2023"). */
  period: Localized;
  kicker: Localized;
  title: Localized;
  text: Localized;
  tags: string[];
};

export const timeline: Milestone[] = [
  {
    month: 4,
    year: 2022,
    period: { pt: "Abr 2022 — Dez 2023", en: "Apr 2022 — Dec 2023" },
    kicker: { pt: "O começo", en: "The start" },
    title: { pt: "Vendas B2B", en: "B2B sales" },
    text: {
      pt: "Balcão e contas empresariais no varejo de ferramentas e construção: orçamento, follow-up e o canal online junto da loja. É daqui que vêm os critérios de qualificação que os agentes usam hoje.",
      en: "Counter and business accounts in tools and construction retail: quotes, follow-up and the online channel next to the store. This is where the qualification criteria my agents use today come from.",
    },
    tags: ["B2B", "orçamentos", "follow-up"],
  },
  {
    month: 2,
    year: 2024,
    period: { pt: "2024 — dez 2027", en: "2024 — Dec 2027" },
    kicker: { pt: "Formação", en: "Education" },
    title: { pt: "Engenharia de Software", en: "Software Engineering" },
    text: {
      pt: "Bacharelado em andamento. Em paralelo, inglês certificado em nível C2 (EF SET, maio de 2024).",
      en: "B.Sc. in progress. Alongside it, English certified at C2 level (EF SET, May 2024).",
    },
    tags: ["bacharelado", "inglês C2"],
  },
  {
    month: 4,
    year: 2025,
    period: { pt: "Abr 2025", en: "Apr 2025" },
    kicker: { pt: "Fundação", en: "Founding" },
    title: { pt: "Nasce a empresa — e os primeiros agentes em produção", en: "The company is born — and the first agents ship" },
    text: {
      pt: "Primeiros agentes de IA em n8n ligando Claude e GPT ao WhatsApp: qualificação consultiva, follow-up e passagem para humano com estado ao vivo.",
      en: "First AI agents on n8n wiring Claude and GPT into WhatsApp: consultative qualification, follow-up and human handoff with live state.",
    },
    tags: ["n8n", "WhatsApp", "agentes"],
  },
  {
    month: 10,
    year: 2025,
    period: { pt: "2025 — 2026", en: "2025 — 2026" },
    kicker: { pt: "Escala", en: "Scale" },
    title: { pt: "Suíte de GTM e funil medido", en: "GTM suite and a measured funnel" },
    text: {
      pt: "Motor de cadência de 128 nós no CRM, inteligência pós-call com Whisper e um painel de funil alimentado por eventos. Mais de 7 negócios B2B atendidos e 20 contas em onboarding.",
      en: "A 128-node cadence engine in the CRM, post-call intelligence with Whisper and an event-fed funnel dashboard. 7+ B2B businesses served and 20 accounts onboarded.",
    },
    tags: ["CRM", "Whisper", "eventos"],
  },
  {
    month: 4,
    year: 2026,
    day: 29,
    period: { pt: "Abr 2026", en: "Apr 2026" },
    kicker: { pt: "Primeiro app", en: "First app" },
    title: { pt: "O primeiro aplicativo próprio", en: "The first in-house app" },
    text: {
      pt: "FIA, um web app de finanças com API REST e RLS, entra em produção. No mesmo semestre, RAG híbrido com pgvector migra 20 profissionais, 224 serviços e 500 clientes.",
      en: "FIA, a finance web app with a REST API and RLS, goes live. The same semester, a hybrid RAG on pgvector migrates 20 professionals, 224 services and 500 clients.",
    },
    tags: ["Next.js", "Supabase", "RAG"],
  },
  {
    month: 7,
    year: 2026,
    day: 2,
    period: { pt: "Jul 2026", en: "Jul 2026" },
    kicker: { pt: "Plataformas", en: "Platforms" },
    title: { pt: "SaaS para clientes e um cofre próprio", en: "SaaS for clients and a vault of my own" },
    text: {
      pt: "Plataforma de aprovação e publicação de conteúdo, agenda clínica, CRM multi-tenant com agente. Em casa, nasce o <пароли/>, cofre de senhas 100% local.",
      en: "A content approval and publishing platform, a clinic calendar, a multi-tenant CRM with an agent. At home, <пароли/> is born: a 100% local password vault.",
    },
    tags: ["multi-tenant", "RLS", "AES-256"],
  },
  {
    month: 8,
    year: 2026,
    period: { pt: "Ago 2026", en: "Aug 2026" },
    kicker: { pt: "Visão computacional", en: "Computer vision" },
    title: { pt: "Face Finder em produção", en: "Face Finder goes live" },
    text: {
      pt: "3.995 fotos e 15.681 rostos indexados em 20 minutos, sem erro. A pessoa manda uma selfie e recebe as próprias fotos em menos de um segundo.",
      en: "3,995 photos and 15,681 faces indexed in 20 minutes, zero errors. Send a selfie, get your photos back in under a second.",
    },
    tags: ["ONNX", "pgvector", "HNSW"],
  },
  {
    month: 9,
    year: 2026,
    day: 17,
    period: { pt: "17 set 2026", en: "Sep 17, 2026" },
    kicker: { pt: "Profissionalização", en: "Going pro" },
    title: { pt: "Rabelo Co. vira deciban", en: "Rabelo Co. becomes deciban" },
    text: {
      pt: "O nome troca o sobrenome por aquilo que a empresa faz: decidir com evidência. Identidade nova, manual de marca e os primeiros apps de desktop — Grudaí e uai?, que abre beta fechado no dia 29.",
      en: "The name swaps a surname for what the company does: deciding on evidence. A new identity, a brand manual and the first desktop apps — Grudaí and uai?, which opens a closed beta on the 29th.",
    },
    tags: ["marca", "Tauri", "beta"],
  },
  {
    month: 10,
    year: 2026,
    period: { pt: "Hoje", en: "Today" },
    kicker: { pt: "Agora", en: "Now" },
    title: { pt: "deciban em operação", en: "deciban in operation" },
    text: {
      pt: "Agentes, plataformas e produtos próprios em produção. Aberto a vagas de AI Automation Engineer e a novos projetos pela deciban.",
      en: "Agents, platforms and in-house products in production. Open to AI Automation Engineer roles and to new projects through deciban.",
    },
    tags: ["disponível"],
  },
];
