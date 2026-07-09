// Política de Privacidade (LGPD — Lei 13.709/2018) — página /privacidade.
// Conteúdo jurídico-informativo; atualizar `updated` a cada mudança material.

import type { Localized } from "@/content/profile";

export type PrivacySection = { title: Localized; paragraphs: Localized[] };

export const privacy: { updated: string; intro: Localized; sections: PrivacySection[] } = {
  updated: "2026-07-09",

  intro: {
    pt: "Esta Política de Privacidade explica, de forma transparente, como a Rabelo Co. coleta, usa, armazena e protege os seus dados pessoais quando você navega em rabelo.company, conversa com o nosso agente de IA ou solicita uma proposta comercial — em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).",
    en: "This Privacy Policy explains, transparently, how Rabelo Co. collects, uses, stores and protects your personal data when you browse rabelo.company, talk to our AI agent or request a business proposal — in compliance with the Brazilian General Data Protection Law (LGPD, Law no. 13,709/2018).",
  },

  sections: [
    {
      title: { pt: "1. Quem é o controlador", en: "1. Who the controller is" },
      paragraphs: [
        {
          pt: "O controlador dos dados tratados neste site é Rafael Rabelo de Souza (Rabelo Co.), Brasil. Para qualquer assunto de privacidade — dúvidas, solicitações ou exercício de direitos — o canal do titular é o e-mail rafael@rabelo.company. Responderemos em até 15 dias.",
          en: "The controller of the data processed on this website is Rafael Rabelo de Souza (Rabelo Co.), Brazil. For any privacy matter — questions, requests or exercising your rights — the data subject channel is the email rafael@rabelo.company. We reply within 15 days.",
        },
      ],
    },
    {
      title: { pt: "2. Quais dados coletamos e quando", en: "2. What data we collect and when" },
      paragraphs: [
        {
          pt: "Chat com o agente de IA (demo \"Na prática\" e \"Solicitar proposta\"): as mensagens que você digita, áudios que grava e imagens que envia, além dos dados que você informa na conversa — tipicamente nome, empresa/nicho, canal de atendimento, volume de leads, principal desafio, objetivo de automação, e-mail e WhatsApp. Um identificador aleatório de sessão (UUID) mantém o contexto da conversa.",
          en: "AI agent chat (the \"In practice\" demo and \"Request a proposal\"): the messages you type, voice notes you record and images you send, plus the data you share in the conversation — typically name, company/niche, service channel, lead volume, main challenge, automation goal, email and WhatsApp. A random session identifier (UUID) keeps the conversation context.",
        },
        {
          pt: "Formulário \"Solicitar proposta\": nome, empresa/segmento, e-mail, WhatsApp e a descrição do seu negócio.",
          en: "\"Request a proposal\" form: name, company/industry, email, WhatsApp and your business description.",
        },
        {
          pt: "Agendamento (Cal.com): se você agendar uma conversa, o Cal.com coleta nome, e-mail e horário escolhido, conforme a política de privacidade do próprio Cal.com.",
          en: "Scheduling (Cal.com): if you book a call, Cal.com collects your name, email and chosen time slot, under Cal.com's own privacy policy.",
        },
        {
          pt: "Dados técnicos: o endereço IP é usado de forma transitória para proteção contra abuso (limite de requisições) e não é armazenado pelo site em bancos de dados próprios. Não usamos cookies de rastreamento nem ferramentas de analytics; a única preferência salva no seu navegador (localStorage) é o tema claro/escuro, que não identifica você.",
          en: "Technical data: your IP address is used transiently for abuse protection (rate limiting) and is not stored by the site in its own databases. We use no tracking cookies and no analytics tools; the only preference saved in your browser (localStorage) is the light/dark theme, which does not identify you.",
        },
      ],
    },
    {
      title: { pt: "3. Para que usamos e com qual base legal", en: "3. Why we use it and on which legal basis" },
      paragraphs: [
        {
          pt: "Qualificação e elaboração de proposta comercial: os dados do chat e do formulário são usados exclusivamente para entender o seu negócio e preparar uma proposta personalizada, e para contato posterior por WhatsApp e e-mail. Base legal: procedimentos preliminares relacionados a contrato do qual o titular é parte (art. 7º, V, da LGPD) e consentimento (art. 7º, I), manifestado ao iniciar a conversa ou marcar a caixa de concordância no formulário.",
          en: "Qualification and business proposal: chat and form data are used exclusively to understand your business, prepare a personalized proposal and follow up via WhatsApp and email. Legal basis: preliminary procedures related to a contract to which you are a party (LGPD art. 7, V) and consent (art. 7, I), given when you start the conversation or tick the agreement box on the form.",
        },
        {
          pt: "Segurança do serviço: dados técnicos transitórios (IP) são tratados com base no legítimo interesse (art. 7º, IX) de proteger o site contra abuso automatizado.",
          en: "Service security: transient technical data (IP) is processed under legitimate interest (art. 7, IX) to protect the site against automated abuse.",
        },
        {
          pt: "Não vendemos, alugamos ou compartilhamos seus dados para fins de marketing de terceiros. Não há decisões automatizadas com efeito jurídico sobre você: a proposta é sempre elaborada e enviada por uma pessoa (Rafael Rabelo).",
          en: "We do not sell, rent or share your data for third-party marketing. There is no automated decision-making with legal effect on you: the proposal is always prepared and sent by a person (Rafael Rabelo).",
        },
      ],
    },
    {
      title: { pt: "4. Transparência sobre IA", en: "4. AI transparency" },
      paragraphs: [
        {
          pt: "O chat é operado por um agente de inteligência artificial construído sobre a plataforma de automação n8n (infraestrutura própria da Rabelo Co.). Para gerar as respostas, as suas mensagens são processadas por modelos da OpenAI (GPT-4o); áudios são transcritos (Whisper) e imagens são descritas (visão computacional). Segundo os termos da API da OpenAI, esses dados não são usados para treinar os modelos. Você é sempre informado de que está conversando com uma IA — o agente se identifica como tal.",
          en: "The chat is operated by an artificial-intelligence agent built on the n8n automation platform (Rabelo Co.'s own infrastructure). To generate replies, your messages are processed by OpenAI models (GPT-4o); voice notes are transcribed (Whisper) and images are described (computer vision). Under OpenAI's API terms, this data is not used to train their models. You are always informed that you are talking to an AI — the agent identifies itself as such.",
        },
      ],
    },
    {
      title: { pt: "5. Com quem os dados são compartilhados (operadores)", en: "5. Who data is shared with (processors)" },
      paragraphs: [
        {
          pt: "Para prestar o serviço, usamos operadores que tratam dados em nosso nome: Vercel Inc. (hospedagem do site, EUA), OpenAI (processamento de linguagem do chat, EUA), Cal.com Inc. (agendamento, EUA, somente se você agendar) e a infraestrutura de automação n8n mantida pela própria Rabelo Co. O contato posterior pode ocorrer via WhatsApp (Meta) e e-mail.",
          en: "To provide the service we use processors acting on our behalf: Vercel Inc. (website hosting, USA), OpenAI (chat language processing, USA), Cal.com Inc. (scheduling, USA, only if you book) and the n8n automation infrastructure maintained by Rabelo Co. itself. Follow-up contact may happen via WhatsApp (Meta) and email.",
        },
        {
          pt: "Isso implica transferência internacional de dados (art. 33 da LGPD) para países com salvaguardas contratuais adequadas — todos os fornecedores citados operam sob termos de proteção de dados compatíveis (DPAs). Dados também podem ser compartilhados se exigido por lei ou ordem judicial.",
          en: "This entails international data transfer (LGPD art. 33) to countries under adequate contractual safeguards — all listed vendors operate under compatible data-protection agreements (DPAs). Data may also be shared if required by law or court order.",
        },
      ],
    },
    {
      title: { pt: "6. Por quanto tempo guardamos", en: "6. How long we keep it" },
      paragraphs: [
        {
          pt: "Leads e conversas do chat: mantidos pelo tempo necessário à elaboração e negociação da proposta e, no máximo, por 12 meses após o último contato — salvo se uma relação contratual se iniciar (aí valem os prazos legais do contrato) ou se você pedir exclusão antes. Registros técnicos de execução da automação têm retenção curta e rotativa. Após os prazos, os dados são eliminados ou anonimizados.",
          en: "Leads and chat conversations: kept for as long as needed to prepare and negotiate the proposal and for at most 12 months after the last contact — unless a contractual relationship starts (then legal contract terms apply) or you request deletion earlier. Technical automation execution logs have short, rotating retention. After these periods, data is deleted or anonymized.",
        },
      ],
    },
    {
      title: { pt: "7. Seus direitos (art. 18 da LGPD)", en: "7. Your rights (LGPD art. 18)" },
      paragraphs: [
        {
          pt: "Você pode, a qualquer momento e gratuitamente: confirmar a existência de tratamento; acessar os seus dados; corrigir dados incompletos, inexatos ou desatualizados; solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade; pedir portabilidade; obter informação sobre compartilhamentos; e revogar o consentimento (a revogação não afeta o tratamento já realizado licitamente).",
          en: "At any time and free of charge you may: confirm that processing exists; access your data; correct incomplete, inaccurate or outdated data; request anonymization, blocking or deletion of unnecessary or non-compliant data; request portability; obtain information about sharing; and withdraw consent (withdrawal does not affect processing already lawfully performed).",
        },
        {
          pt: "Para exercer qualquer direito, escreva para rafael@rabelo.company com o assunto \"LGPD\". Se entender que o tratamento viola a lei, você também pode peticionar à Autoridade Nacional de Proteção de Dados (ANPD — gov.br/anpd).",
          en: "To exercise any right, write to rafael@rabelo.company with the subject \"LGPD\". If you believe processing violates the law, you may also petition the Brazilian Data Protection Authority (ANPD — gov.br/anpd).",
        },
      ],
    },
    {
      title: { pt: "8. Como protegemos os dados (art. 46)", en: "8. How we protect data (art. 46)" },
      paragraphs: [
        {
          pt: "Medidas técnicas aplicadas: criptografia em trânsito (HTTPS/TLS com HSTS), cabeçalhos de segurança (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy), limite de requisições por IP e validação de origem nas APIs, validação e limite de tamanho de todo conteúdo enviado, minimização (o site não mantém banco de dados próprio de conversas; o processamento ocorre na infraestrutura de automação com acesso restrito ao controlador) e credenciais isoladas por serviço. Em caso de incidente de segurança com risco relevante, comunicaremos os titulares afetados e a ANPD, descrevendo o fato, os dados envolvidos e as medidas adotadas.",
          en: "Technical measures in place: encryption in transit (HTTPS/TLS with HSTS), security headers (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy), per-IP rate limiting and origin validation on the APIs, validation and size limits on all submitted content, minimization (the site keeps no conversation database of its own; processing happens in the automation infrastructure with access restricted to the controller) and isolated credentials per service. In case of a security incident with relevant risk, we will notify affected data subjects and the ANPD, describing the event, the data involved and the measures taken.",
        },
      ],
    },
    {
      title: { pt: "9. Cookies e armazenamento local", en: "9. Cookies and local storage" },
      paragraphs: [
        {
          pt: "O site não usa cookies próprios de rastreamento nem analytics. O único item salvo no navegador é a preferência de tema (localStorage), essencial à experiência e sem identificação pessoal. O widget de agendamento do Cal.com, quando carregado e utilizado, pode definir cookies próprios sob responsabilidade do Cal.com.",
          en: "The site uses no first-party tracking cookies and no analytics. The only item saved in your browser is the theme preference (localStorage), essential to the experience and with no personal identification. The Cal.com scheduling widget, when loaded and used, may set its own cookies under Cal.com's responsibility.",
        },
      ],
    },
    {
      title: { pt: "10. Menores de idade", en: "10. Minors" },
      paragraphs: [
        {
          pt: "Os serviços da Rabelo Co. destinam-se a negócios e não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados de crianças ou adolescentes; se identificarmos esse tratamento, os dados serão eliminados.",
          en: "Rabelo Co.'s services are aimed at businesses and are not directed at anyone under 18. We do not knowingly collect data from children or teenagers; if we identify such processing, the data will be deleted.",
        },
      ],
    },
    {
      title: { pt: "11. Alterações desta política", en: "11. Changes to this policy" },
      paragraphs: [
        {
          pt: "Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização aparece no topo da página; mudanças materiais serão destacadas aqui.",
          en: "This policy may be updated to reflect changes to the site or the law. The last-updated date appears at the top of the page; material changes will be highlighted here.",
        },
      ],
    },
  ],
};
