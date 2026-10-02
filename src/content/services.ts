// Conteúdo do lado comercial (/servicos) — a apresentação da deciban.
// Fontes: Manual de Identidade (nome, valores, tom), Deciban OS (processo
// público, sem nada interno), Template de Briefing de Proposta e o playbook de
// qualificação (perguntas do pedido de proposta). Sem preços fixos e sem nome
// de cliente.

import type { Localized } from "@/content/profile";

type L = Localized;

export const services = {
  hero: {
    eyebrow: { pt: "deciban · automações e sistemas com IA", en: "deciban · AI automations and systems" } as L,
    lead: { pt: "Construímos", en: "We build" } as L,
    builds: [
      { pt: "agentes de IA", en: "AI agents" },
      { pt: "web apps de IA", en: "AI web apps" },
      { pt: "dashboards de funil", en: "funnel dashboards" },
      { pt: "visão computacional", en: "computer vision" },
      { pt: "automação de CRM", en: "CRM automation" },
      { pt: "busca semântica", en: "semantic search" },
      { pt: "apps de desktop", en: "desktop apps" },
    ] as L[],
    tail: { pt: "que funcionam em produção", en: "that run in production" } as L,
    sub: {
      pt: "Encontramos a solução certa para uma dor real do seu negócio — e entregamos exatamente o que foi prometido.",
      en: "We find the right solution for a real pain in your business — and deliver exactly what was promised.",
    } as L,
  },

  /** O que construímos — cada frente com entregas reais, anônimas. */
  fronts: [
    {
      slug: "agentes",
      name: { pt: "Agentes de IA", en: "AI agents" },
      note: { pt: "atendimento, triagem, qualificação", en: "service, triage, qualification" },
      text: {
        pt: "Atendem no WhatsApp e na web 24 horas, entendem texto, áudio e imagem, qualificam com os critérios do seu negócio e passam para uma pessoa com a conversa inteira em mãos.",
        en: "They answer on WhatsApp and the web around the clock, understand text, audio and images, qualify with your business criteria and hand off to a person with the whole conversation in hand.",
      },
      work: [
        { pt: "Agente SDR multimodal no WhatsApp", en: "Multimodal WhatsApp SDR agent" },
        { pt: "Agente RAG de agendamento para salão", en: "RAG scheduling agent for a salon" },
        { pt: "Onboarding de cliente por conversa com IA", en: "Client onboarding through an AI conversation" },
        { pt: "Secretária virtual com demo ao vivo", en: "Virtual assistant with a live demo" },
      ],
      stack: ["n8n", "Claude", "GPT-4o", "Whisper"],
    },
    {
      slug: "crm",
      name: { pt: "Automações de GTM e CRM", en: "GTM and CRM automation" },
      note: { pt: "prospecção, cadência, pós-call", en: "prospecting, cadence, post-call" },
      text: {
        pt: "O funil trabalhando sozinho: atividades criadas por etapa e desfeitas quando o negócio anda, resumo de call registrado no CRM e lead de anúncio chegando já segmentado.",
        en: "Your pipeline working by itself: activities created per stage and undone when the deal moves, call summaries logged to the CRM and ad leads arriving already segmented.",
      },
      work: [
        { pt: "Motor de cadência de 128 nós com rollback", en: "128-node cadence engine with rollback" },
        { pt: "Inteligência pós-call: Whisper → resumo → nota", en: "Post-call intelligence: Whisper → summary → note" },
        { pt: "Funis de captura com pontuação de lead", en: "Capture funnels with lead scoring" },
        { pt: "Relatório mensal de sucesso do cliente", en: "Monthly customer-success report" },
      ],
      stack: ["Pipedrive", "Kommo", "Meta Lead Ads", "n8n"],
    },
    {
      slug: "plataformas",
      name: { pt: "Plataformas web e SaaS", en: "Web platforms and SaaS" },
      note: { pt: "multi-tenant, do banco ao deploy", en: "multi-tenant, database to deploy" },
      text: {
        pt: "Sistemas completos sob medida, com login, papéis, dados isolados por cliente, API para integrar com o que você já usa e publicação com domínio próprio.",
        en: "Complete custom systems with login, roles, data isolated per client, an API to integrate with what you already use and deployment on your own domain.",
      },
      work: [
        { pt: "Aprovação e publicação de conteúdo nas redes", en: "Content approval and social publishing" },
        { pt: "Agenda clínica mobile-first com API pública", en: "Mobile-first clinic calendar with a public API" },
        { pt: "CRM multi-tenant com agente e guardrails de LGPD", en: "Multi-tenant CRM with an agent and LGPD guardrails" },
        { pt: "Plataforma de atendimento com IA para um setor", en: "Sector-specific AI service platform" },
      ],
      stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
    },
    {
      slug: "dados",
      name: { pt: "Dados, busca e visão", en: "Data, search and vision" },
      note: { pt: "o que estava espalhado vira resposta", en: "what was scattered becomes an answer" },
      text: {
        pt: "Busca semântica sobre seus documentos e acervos, reconhecimento por imagem e painéis que mostram o que a operação está fazendo agora.",
        en: "Semantic search over your documents and archives, image recognition and dashboards that show what the operation is doing right now.",
      },
      work: [
        { pt: "Busca por rosto em acervo de evento (Face Finder)", en: "Face search over an event archive (Face Finder)" },
        { pt: "Busca semântica com verificação visual", en: "Semantic search with visual verification" },
        { pt: "Painel de funil alimentado por eventos", en: "Event-fed funnel dashboard" },
        { pt: "RAG híbrido com banco vetorial", en: "Hybrid RAG on a vector database" },
      ],
      stack: ["pgvector", "Python", "ONNX", "FastAPI"],
    },
    {
      slug: "produtos",
      name: { pt: "Produtos e apps de desktop", en: "Products and desktop apps" },
      note: { pt: "o que construímos para nós", en: "what we build for ourselves" },
      text: {
        pt: "Os mesmos padrões aplicados em produtos próprios: apps que vivem por cima do computador, cofre local e ferramentas que usamos todo dia.",
        en: "The same standards applied to our own products: apps that live on top of your computer, a local vault and tools we use every day.",
      },
      work: [
        { pt: "uai? — tradutor de bolso junto ao cursor", en: "uai? — pocket translator by the cursor" },
        { pt: "Grudaí — notas fixadas por cima da tela", en: "Grudaí — notes pinned above the screen" },
        { pt: "<пароли/> — cofre de senhas 100% local", en: "<пароли/> — 100% local password vault" },
        { pt: "FIA — finanças com API para automação", en: "FIA — finance with an automation API" },
      ],
      stack: ["Tauri 2", "Rust", "Next.js", "SQLite"],
    },
    {
      slug: "sites",
      name: { pt: "Sites e experiências", en: "Sites and experiences" },
      note: { pt: "apresentação que vende", en: "presentation that sells" },
      text: {
        pt: "Landing de produto com trailer, sites de evento com confirmação de presença e lista de presentes, e páginas como esta, feitas para apresentar.",
        en: "Product landings with a trailer, event sites with RSVP and gift lists, and pages like this one, built to present.",
      },
      work: [
        { pt: "Landing de beta com trailer e convites", en: "Beta landing with trailer and invites" },
        { pt: "Sites de casamento com RSVP e presentes por PIX", en: "Wedding sites with RSVP and PIX gifts" },
        { pt: "Este site, com motor de cenas próprio", en: "This site, with its own scene engine" },
      ],
      stack: ["Next.js", "Canvas", "Remotion", "Tailwind"],
    },
  ],

  /** Por que deciban — o nome e o que ele obriga. */
  name: {
    eyebrow: { pt: "O nome", en: "The name" } as L,
    title: { pt: "A menor mudança de evidência que um ser humano consegue perceber", en: "The smallest change in evidence a human being can perceive" } as L,
    story: {
      pt: "Em 1941, em Bletchley Park, Alan Turing e I. J. Good mediam o peso de uma prova deslizando duas fitas perfuradas contra a luz. Onde os furos coincidiam, havia evidência. A unidade dessa medida se chama deciban.",
      en: "In 1941, at Bletchley Park, Alan Turing and I. J. Good weighed evidence by sliding two punched tapes against the light. Where the holes lined up, there was evidence. The unit of that measure is called the deciban.",
    } as L,
    why: {
      pt: "Decidir sob incerteza acumulando evidência é o que todo sistema de IA daqui faz. Por isso a empresa que nasceu como Rabelo Co., em abril de 2025, trocou o sobrenome pelo que faz.",
      en: "Deciding under uncertainty by accumulating evidence is what every AI system we build does. That's why the company born as Rabelo Co. in April 2025 swapped a surname for what it does.",
    } as L,
    founder: {
      pt: "Fundada e conduzida por Rafael Rabelo, engenheiro de automação com IA.",
      en: "Founded and run by Rafael Rabelo, AI automation engineer.",
    } as L,
  },

  values: [
    {
      name: { pt: "Confiança", en: "Trust" },
      text: { pt: "Ser uma empresa correta, em que o cliente possa confiar antes de qualquer entrega.", en: "Being a company that does things right, one a client can trust before any delivery." },
    },
    {
      name: { pt: "Correção", en: "Correctness" },
      text: { pt: "Entregar o que foi prometido. Erro é dito com clareza, nunca escondido.", en: "Delivering what was promised. Mistakes are stated clearly, never hidden." },
    },
    {
      name: { pt: "Prático e lógico", en: "Practical and logical" },
      text: { pt: "Toda solução tem um porquê. Resolver a dor real vem antes de usar a ferramenta da moda.", en: "Every solution has a why. Solving the real pain comes before using the trendy tool." },
    },
    {
      name: { pt: "Medida, não mística", en: "Measured, not mystical" },
      text: { pt: "IA é meio, não mágica. O resultado é medido em número, não em promessa.", en: "AI is a means, not magic. Results are measured in numbers, not promises." },
    },
  ],

  /** Como funciona — o caminho do cliente, sem processo interno. */
  process: [
    {
      n: "01",
      name: { pt: "Conversa", en: "Conversation" },
      when: { pt: "20–30 min", en: "20–30 min" },
      text: { pt: "Entendemos a dor, quanto ela custa hoje, quem decide e qual o prazo. Na própria conversa você sabe se seguimos — e por quê.", en: "We understand the pain, what it costs today, who decides and the deadline. In the call itself you know whether we move forward — and why." },
    },
    {
      n: "02",
      name: { pt: "Briefing", en: "Briefing" },
      when: { pt: "até 24 h", en: "within 24 h" },
      text: { pt: "Escrevemos o que entendemos do problema e o que seria construído. Você corrige antes de qualquer número.", en: "We write down what we understood and what would be built. You correct it before any number." },
    },
    {
      n: "03",
      name: { pt: "Proposta", en: "Proposal" },
      when: { pt: "até 48 h úteis", en: "within 48 business hours" },
      text: { pt: "Escopo fechado, o que fica de fora, prazo com gatilho declarado, investimento e contrato já assinado por nós.", en: "Fixed scope, what's left out, a deadline with a stated trigger, investment and a contract already signed by us." },
    },
    {
      n: "04",
      name: { pt: "Kickoff", en: "Kickoff" },
      when: { pt: "até 5 dias úteis", en: "within 5 business days" },
      text: { pt: "Acessos, um canal único de conversa e o cronograma por etapa. O prazo começa a contar daqui.", en: "Access, a single conversation channel and the schedule by stage. The clock starts here." },
    },
    {
      n: "05",
      name: { pt: "Construção", en: "Build" },
      when: { pt: "em fatias", en: "in slices" },
      text: { pt: "Entregamos em fatias que funcionam de ponta a ponta, com demonstração ao fim de cada uma. Mudança de escopo é escrita, com impacto em prazo e valor, antes de entrar.", en: "We ship in slices that work end to end, with a demo at the end of each. Scope changes are written down, with their impact on time and cost, before they go in." },
    },
    {
      n: "06",
      name: { pt: "Homologação", en: "Acceptance" },
      when: { pt: "7 dias úteis", en: "7 business days" },
      text: { pt: "Você testa com casos reais. Ajustes de prompt e de fluxo entram aqui.", en: "You test with real cases. Prompt and flow tweaks happen here." },
    },
    {
      n: "07",
      name: { pt: "Entrega", en: "Handover" },
      when: { pt: "até 3 dias úteis", en: "within 3 business days" },
      text: { pt: "Documentação de operação, treinamento e credenciais trocadas. Tudo no seu nome.", en: "Operating docs, training and rotated credentials. Everything in your name." },
    },
    {
      n: "08",
      name: { pt: "Sustentação", en: "Support" },
      when: { pt: "opcional, mensal", en: "optional, monthly" },
      text: { pt: "Fila priorizada com você, status escrito toda sexta e relatório no fim do mês.", en: "A queue prioritized with you, a written status every Friday and a report at month end." },
    },
  ],

  promises: [
    { pt: "Escopo por escrito — inclusive o que fica de fora", en: "Scope in writing — including what's left out" },
    { pt: "Prazo com gatilho declarado, nunca solto", en: "Deadlines with a stated trigger, never loose" },
    { pt: "Demonstração a cada etapa, sem sumir por semanas", en: "A demo at every stage, no disappearing for weeks" },
    { pt: "Contas, código e infraestrutura no seu nome", en: "Accounts, code and infrastructure in your name" },
    { pt: "Dados isolados por cliente e LGPD desde o desenho", en: "Data isolated per client and LGPD from day one" },
    { pt: "Erro dito com clareza, no mesmo dia", en: "Mistakes stated clearly, the same day" },
  ] as L[],

  faq: [
    {
      q: { pt: "Quanto custa?", en: "How much does it cost?" },
      a: { pt: "Depende do escopo. Agentes e automações costumam ter setup mais mensalidade de operação; sistemas sob medida, escopo fechado por etapas. Na conversa pedimos uma faixa de investimento para não desenhar algo fora da sua realidade, e o valor exato vem na proposta, em até 48 horas úteis.", en: "It depends on the scope. Agents and automations usually have a setup fee plus a monthly operating fee; custom systems, a fixed scope by stage. In the call we ask for an investment range so we don't design something out of reach, and the exact figure comes in the proposal within 48 business hours." },
    },
    {
      q: { pt: "Quanto tempo até estar no ar?", en: "How long until it's live?" },
      a: { pt: "Um agente típico entra em produção em 2 a 4 semanas, contando ajuste de tom de voz e testes com casos reais. Plataformas saem em fatias: a primeira, que já funciona de ponta a ponta, costuma chegar entre 1 e 2 semanas depois do kickoff.", en: "A typical agent ships in 2 to 4 weeks, including tone-of-voice tuning and tests with real cases. Platforms ship in slices: the first one, already working end to end, usually lands 1 to 2 weeks after kickoff." },
    },
    {
      q: { pt: "Preciso trocar de CRM ou de número de WhatsApp?", en: "Do I need to switch CRM or WhatsApp number?" },
      a: { pt: "Não. Integramos com o que você já usa — Pipedrive, Kommo, planilhas, o gerenciador de tarefas da equipe — e com o seu número atual.", en: "No. We integrate with what you already use — Pipedrive, Kommo, spreadsheets, your team's task manager — and with your current number." },
    },
    {
      q: { pt: "O agente vai falar como robô?", en: "Will the agent sound like a robot?" },
      a: { pt: "Não. O tom de voz e os critérios de qualificação saem de conversas reais do seu atendimento, e o agente passa para uma pessoa quando a conversa pede. Você pode testar um agente de verdade nesta página.", en: "No. Tone of voice and qualification criteria come from real conversations in your operation, and the agent hands off to a person when the conversation calls for it. You can try a real agent on this page." },
    },
    {
      q: { pt: "E os meus dados?", en: "What about my data?" },
      a: { pt: "Cada cliente tem banco, credenciais e instâncias isolados. Tratamos dados conforme a LGPD, com consentimento registrado quando há dado pessoal e nada compartilhado entre operações.", en: "Each client has isolated databases, credentials and instances. We handle data under Brazil's LGPD, with logged consent wherever personal data is involved and nothing shared across operations." },
    },
    {
      q: { pt: "De quem é o código e a infraestrutura?", en: "Who owns the code and infrastructure?" },
      a: { pt: "Seus. As contas de servidor, banco e IA ficam no seu nome, com custo mensal transparente. Na entrega, as credenciais usadas no projeto são trocadas.", en: "You do. Server, database and AI accounts are in your name, with transparent monthly costs. At handover, the credentials used during the project are rotated." },
    },
    {
      q: { pt: "E se eu quiser mudar algo no meio do caminho?", en: "What if I want to change something midway?" },
      a: { pt: "Pode. Toda mudança vira um pedido escrito com impacto em prazo e valor antes de entrar. Se cabe no escopo, entra sem custo; se substitui algo, trocamos por item equivalente.", en: "You can. Every change becomes a written request with its impact on time and cost before it goes in. If it fits the scope, it's free; if it replaces something, we swap it for an equivalent item." },
    },
    {
      q: { pt: "O que acontece depois da entrega?", en: "What happens after handover?" },
      a: { pt: "Você escolhe: sustentação mensal, com fila priorizada e status toda sexta, ou passagem completa, com documentação para outra equipe operar.", en: "Your choice: monthly support, with a prioritized queue and a Friday status, or a full handover with docs for another team to operate." },
    },
    {
      q: { pt: "Atendem empresas fora do Brasil?", en: "Do you work with companies outside Brazil?" },
      a: { pt: "Sim. O trabalho é remoto e conduzido em português ou inglês (nível C2).", en: "Yes. The work is remote and run in Portuguese or English (C2 level)." },
    },
    {
      q: { pt: "Quais ferramentas vocês usam?", en: "Which tools do you use?" },
      a: { pt: "As centrais são n8n e Claude, com OpenAI, Next.js, Supabase e Python quando o problema pede. A ferramenta é escolhida pela dor, não pela moda.", en: "The core ones are n8n and Claude, plus OpenAI, Next.js, Supabase and Python when the problem calls for it. The tool is chosen by the pain, not the trend." },
    },
  ],

  /** Pedido de proposta — perguntas do briefing comercial e da qualificação. */
  proposal: {
    needs: [
      { id: "agente", label: { pt: "Agente de IA", en: "AI agent" } },
      { id: "crm", label: { pt: "Automação de CRM / vendas", en: "CRM / sales automation" } },
      { id: "plataforma", label: { pt: "Sistema web / SaaS", en: "Web system / SaaS" } },
      { id: "processos", label: { pt: "Automação de processos", en: "Process automation" } },
      { id: "dados", label: { pt: "Dados, busca ou painel", en: "Data, search or dashboard" } },
      { id: "outro", label: { pt: "Outra coisa", en: "Something else" } },
    ],
    budgets: [
      { id: "ate-3k", label: { pt: "Até R$ 3 mil", en: "Up to R$ 3k" } },
      { id: "3-10k", label: { pt: "R$ 3–10 mil", en: "R$ 3–10k" } },
      { id: "10-30k", label: { pt: "R$ 10–30 mil", en: "R$ 10–30k" } },
      { id: "30k+", label: { pt: "Acima de R$ 30 mil", en: "Above R$ 30k" } },
      { id: "mensal", label: { pt: "Prefiro mensalidade", en: "I prefer monthly" } },
      { id: "nao-sei", label: { pt: "Ainda não sei", en: "Not sure yet" } },
    ],
    deadlines: [
      { id: "urgente", label: { pt: "Em até 30 dias", en: "Within 30 days" } },
      { id: "1-3m", label: { pt: "1 a 3 meses", en: "1 to 3 months" } },
      { id: "data", label: { pt: "Tenho uma data", en: "I have a date" } },
      { id: "sem-pressa", label: { pt: "Sem pressa", en: "No rush" } },
    ],
    deciders: [
      { id: "eu", label: { pt: "Só eu", en: "Just me" } },
      { id: "socios", label: { pt: "Eu e sócio(s)", en: "Me and partner(s)" } },
      { id: "outro", label: { pt: "Outra pessoa", en: "Someone else" } },
    ],
  },
};

export type ProposalOption = { id: string; label: L };
