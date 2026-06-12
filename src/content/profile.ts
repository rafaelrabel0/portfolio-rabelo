// Perfil pessoal — Rafael Rabelo. Fonte de verdade: CV + Obsidian Vault.
// Campos factuais são language-agnostic; textos com { pt, en } são traduzíveis.

export type Localized = { pt: string; en: string };

export const profile = {
  name: "Rafael Rabelo de Souza",
  shortName: "Rafael Rabelo",
  company: "Rabelo Co.",
  role: {
    pt: "Engenheiro de AI Ops / Automação — Agentes de IA · Automação de Workflows · Ferramentas de GTM",
    en: "AI Ops / Automation Engineer — AI Agents · Workflow Automation · GTM Tooling",
  } satisfies Localized,
  headline: {
    pt: "Construo agentes de IA e automações em produção que viram receita.",
    en: "I build production AI agents and automations that turn into revenue.",
  } satisfies Localized,
  summary: {
    pt: "Engenheiro de Automação com IA e fundador da Rabelo Co. Construo agentes de IA, workflows de automação e pipelines de dados que transformam contexto de negócio em ferramentas mensuráveis de receita. Atuo de ponta a ponta: orquestração de agentes em n8n, integração de LLMs (Claude, GPT), RAG com bancos vetoriais, automação de CRM e web apps de IA entregues do início ao fim. Fico naturalmente na interseção entre vendas, produto e engenharia de IA. Inglês C2 (certificado EF SET).",
    en: "AI Automation Engineer and founder of Rabelo Co., building production AI agents, automation workflows, and data pipelines that turn business context into measurable revenue tools. Hands-on across the full stack: n8n agent orchestration, LLM integration (Claude, GPT), RAG with vector databases, CRM automation, and AI-powered web apps shipped end to end. I sit at the intersection of sales, product, and AI engineering. English C2 (EF SET Certified).",
  } satisfies Localized,
  location: { pt: "Remoto · Brasil", en: "Remote · Brazil" } satisfies Localized,
  availability: {
    pt: "Disponível para oportunidades",
    en: "Open to opportunities",
  } satisfies Localized,
  contact: {
    email: "dev.rabelo03@gmail.com",
    phone: "+55 62 99207-9570",
    github: "https://github.com/rafaelrabel0",
    githubHandle: "rafaelrabel0",
    liveWork: ["solidapp.shop", "terrasen.life"],
  },
  stats: [
    { value: "7+", label: { pt: "Negócios B2B atendidos", en: "B2B clients served" } },
    { value: "20+", label: { pt: "Contas em onboarding", en: "Accounts onboarded" } },
    { value: "40+", label: { pt: "Skills & ferramentas", en: "Skills & tools" } },
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
