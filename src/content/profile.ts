// Perfil pessoal — Rafael Rabelo. Fonte de verdade: CV + Obsidian Vault.
// Campos factuais são language-agnostic; textos com { pt, en } são traduzíveis.

export type Localized = { pt: string; en: string };

export const profile = {
  name: "Rafael Rabelo de Souza",
  shortName: "Rafael Rabelo",
  company: "deciban",
  role: {
    pt: "Engenheiro de Produto com IA — Agentes de IA · Produto Full-Stack · Automação",
    en: "AI Product Engineer — AI Agents · Full-Stack Product · Workflow Automation",
  } satisfies Localized,
  headline: {
    pt: "Construo o produto inteiro, com IA dentro — do banco ao app publicado.",
    en: "I build the whole product, with AI inside — data model to shipped app.",
  } satisfies Localized,
  // Linha rotativa do hero — o que eu construo, em ordem de peso comercial.
  // Cada item precisa fazer sentido tanto para recrutador quanto para cliente.
  // Curtos de propósito: entram num display 5xl sem estourar o mobile.
  builds: [
    { pt: "agentes de IA", en: "AI agents" },
    { pt: "plataformas SaaS", en: "SaaS platforms" },
    { pt: "apps para Windows", en: "Windows apps" },
    { pt: "automação de CRM", en: "CRM automation" },
    { pt: "busca semântica", en: "semantic search" },
    { pt: "dashboards de funil", en: "funnel dashboards" },
    { pt: "visão computacional", en: "computer vision" },
  ] satisfies Localized[],
  summary: {
    pt: "Engenheiro de Produto com IA e fundador da deciban. Construo o produto inteiro, não só a camada de IA: modelo de dados, Postgres com RLS, API, interface, app nativo e publicação. Oito produtos próprios e onze sistemas para cliente — agentes de IA, SaaS multi-tenant, apps de Windows em Rust, um PWA de agendamento e um app de iPhone — em cima do trabalho de automação em n8n e RAG que me trouxe até aqui. Desenho o modelo de dados e as regras de permissão antes da primeira tela. Inglês C2 (certificado EF SET).",
    en: "AI Product Engineer and founder of deciban. I build the whole product, not just the AI layer: data model, Postgres with row-level security, API, interface, native app, release. Eight in-house products and eleven client systems — AI agents, multi-tenant SaaS, native Windows apps in Rust, a scheduling PWA and an iOS app — on top of the n8n and RAG automation work that got me here. I design the data model and the permission rules before the first screen. English C2 (EF SET Certified).",
  } satisfies Localized,
  location: { pt: "Remoto · Brasil", en: "Remote · Brazil" } satisfies Localized,
  availability: {
    pt: "Disponível para oportunidades",
    en: "Open to opportunities",
  } satisfies Localized,
  contact: {
    email: "contato@deciban.com.br",
    phone: "+55 62 99207-9570",
    github: "https://github.com/rafaelrabel0",
    githubHandle: "rafaelrabel0",
    linkedin: "https://www.linkedin.com/in/dev-rafael-rabelo",
    linkedinHandle: "dev-rafael-rabelo",
  },
  /** Dados públicos da empresa (rodapé e páginas legais). */
  business: {
    legalName: "Deciban",
    cnpj: "66.323.849/0001-04",
    city: { pt: "São Paulo · SP", en: "São Paulo, Brazil" } satisfies Localized,
    reach: { pt: "Atendimento remoto em todo o Brasil e no exterior", en: "Remote, across Brazil and abroad" } satisfies Localized,
  },
  stats: [
    { value: "7+", label: { pt: "Negócios B2B atendidos", en: "B2B clients served" } },
    { value: "20+", label: { pt: "Contas em onboarding", en: "Accounts onboarded" } },
    { value: "8", label: { pt: "Produtos próprios", en: "In-house products" } },
    { value: "C2", label: { pt: "Inglês (EF SET)", en: "English (EF SET)" } },
  ],
  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "C2 Proficiente (EF SET)", en: "C2 Proficient (EF SET)" } },
  ],
  education: [
    {
      degree: { pt: "Bacharelado em Engenharia de Software", en: "B.Sc. Software Engineering" },
      status: { pt: "Em andamento", en: "In progress" },
      period: "2024 – Dez 2027",
    },
  ],
  certifications: [
    { pt: "EF SET English Certificate — C2 Proficient (77/100), Maio 2024", en: "EF SET English Certificate — C2 Proficient (77/100), May 2024" },
    { pt: "Treinamento técnico em Automação & IA — Escola de Automação, NoCode Academy, Kommetrik", en: "Technical training in Automation & AI — Escola de Automação, NoCode Academy, Kommetrik" },
  ],
};
