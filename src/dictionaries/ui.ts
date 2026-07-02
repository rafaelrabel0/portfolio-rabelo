import type { Locale } from "@/lib/i18n";

// Strings de UI (navegação, botões, títulos de seção). Conteúdo factual fica em /content.
export const ui = {
  pt: {
    nav: { about: "Sobre", experience: "Experiência", projects: "Projetos", showcase: "Na prática", agents: "Agentes IA", companies: "Empresas", skills: "Skills", contact: "Contato" },
    cta: { downloadCv: "Baixar CV", contact: "Entrar em contato", viewProject: "Ver projeto", email: "Enviar e-mail", availableForWork: "Disponível para oportunidades" },
    sections: {
      aboutTitle: "Sobre",
      experienceTitle: "Experiência",
      projectsTitle: "Projetos em destaque",
      projectsSubtitle: "Sistemas em produção — problema, solução e resultado.",
      showcaseTitle: "Na prática",
      showcaseSubtitle: "Demo interativa de um sistema real em produção — responda como o cliente e veja cada ação do agente virar evento no funil ao lado.",
      showcaseChatCaption: "Reprodução do fluxo real: buffer de mensagens, transcrição de áudio (Whisper), tools de qualificação e movimentação de etapa no CRM.",
      showcaseFunnelCaption: "Cada ação do agente emite um evento via edge function autenticada — o dashboard acompanha o funil em tempo real.",
      companiesTitle: "Empresas & Clientes",
      companiesSubtitle: "Marcas que opero e clientes atendidos pela Rabelo Co.",
      skillsTitle: "Skills & Ferramentas",
      toolsTitle: "Stack & Ferramentas",
      contactTitle: "Vamos conversar",
      contactSubtitle: "Aberto a oportunidades como Engenheiro de Automação com IA.",
    },
    showcase: {
      youAnswer: "Responda como o cliente",
      replay: "Ver de novo",
      doneTitle: "Do primeiro contato à venda — no automático",
      doneSubtitle: "Esse fluxo roda em produção: buffer de mensagens, Whisper, qualificação e CRM. O próximo lead pode ser do seu negócio.",
      cta: "Quero um agente assim",
    },
    labels: { problem: "Problema", solution: "Solução", result: "Resultado", stack: "Stack", services: "Serviços", clients: "Clientes", segment: "Segmento", status: "Status", live: "Produção", scrollToExplore: "Role para explorar" },
    status: { ativo: "Ativo", onboarding: "Onboarding", parcial: "Parcial", proposta: "Proposta", planejamento: "Planejamento", producao: "Produção", dev: "Em dev", funcional: "Funcional" },
  },
  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", showcase: "In practice", agents: "AI Agents", companies: "Companies", skills: "Skills", contact: "Contact" },
    cta: { downloadCv: "Download CV", contact: "Get in touch", viewProject: "View project", email: "Send email", availableForWork: "Open to opportunities" },
    sections: {
      aboutTitle: "About",
      experienceTitle: "Experience",
      projectsTitle: "Selected work",
      projectsSubtitle: "Production systems — problem, solution and result.",
      showcaseTitle: "In practice",
      showcaseSubtitle: "Interactive demo of a real production system — reply as the customer and watch every agent action become a funnel event.",
      showcaseChatCaption: "Replays the real flow: message buffering, audio transcription (Whisper), qualification tools and CRM stage moves.",
      showcaseFunnelCaption: "Every agent action emits an event through an authenticated edge function — the dashboard tracks the funnel in real time.",
      companiesTitle: "Companies & Clients",
      companiesSubtitle: "Brands I operate and clients served through Rabelo Co.",
      skillsTitle: "Skills & Tools",
      toolsTitle: "Stack & Tools",
      contactTitle: "Let's talk",
      contactSubtitle: "Open to opportunities as an AI Automation Engineer.",
    },
    showcase: {
      youAnswer: "Reply as the customer",
      replay: "Watch again",
      doneTitle: "From first contact to closed deal — on autopilot",
      doneSubtitle: "This flow runs in production: message buffering, Whisper, qualification and CRM. The next lead could be yours.",
      cta: "I want an agent like this",
    },
    labels: { problem: "Problem", solution: "Solution", result: "Result", stack: "Stack", services: "Services", clients: "Clients", segment: "Segment", status: "Status", live: "Live", scrollToExplore: "Scroll to explore" },
    status: { ativo: "Active", onboarding: "Onboarding", parcial: "Partial", proposta: "Proposal", planejamento: "Planning", producao: "Live", dev: "In dev", funcional: "Working" },
  },
} as const;

export const getUi = (locale: Locale) => ui[locale];
