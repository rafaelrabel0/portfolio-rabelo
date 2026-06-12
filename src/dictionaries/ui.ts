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
      showcaseSubtitle: "Demonstrações animadas de sistemas reais em produção — um agente SDR no WhatsApp e o funil de eventos que ele alimenta.",
      showcaseChatCaption: "Reprodução do fluxo real: buffer de mensagens, transcrição de áudio (Whisper), tools de qualificação e movimentação de etapa no CRM.",
      showcaseFunnelCaption: "Cada ação do agente emite um evento via edge function autenticada — o dashboard acompanha o funil em tempo real.",
      companiesTitle: "Empresas & Clientes",
      companiesSubtitle: "Marcas que opero e clientes atendidos pela Rabelo Co.",
      skillsTitle: "Skills & Ferramentas",
      toolsTitle: "Stack & Ferramentas",
      contactTitle: "Vamos conversar",
      contactSubtitle: "Aberto a oportunidades como Engenheiro de Automação com IA.",
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
      showcaseSubtitle: "Animated demos of real production systems — a WhatsApp SDR agent and the event funnel it feeds.",
      showcaseChatCaption: "Replays the real flow: message buffering, audio transcription (Whisper), qualification tools and CRM stage moves.",
      showcaseFunnelCaption: "Every agent action emits an event through an authenticated edge function — the dashboard tracks the funnel in real time.",
      companiesTitle: "Companies & Clients",
      companiesSubtitle: "Brands I operate and clients served through Rabelo Co.",
      skillsTitle: "Skills & Tools",
      toolsTitle: "Stack & Tools",
      contactTitle: "Let's talk",
      contactSubtitle: "Open to opportunities as an AI Automation Engineer.",
    },
    labels: { problem: "Problem", solution: "Solution", result: "Result", stack: "Stack", services: "Services", clients: "Clients", segment: "Segment", status: "Status", live: "Live", scrollToExplore: "Scroll to explore" },
    status: { ativo: "Active", onboarding: "Onboarding", parcial: "Partial", proposta: "Proposal", planejamento: "Planning", producao: "Live", dev: "In dev", funcional: "Working" },
  },
} as const;

export const getUi = (locale: Locale) => ui[locale];
