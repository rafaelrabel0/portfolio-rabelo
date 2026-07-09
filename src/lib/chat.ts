// Contrato do chat ao vivo com o agente n8n.
// O front envia OutgoingMessage para /api/chat, que repassa ao webhook
// (CHAT_WEBHOOK_URL) e devolve AgentReply normalizado.

export type ChatMode = "practice" | "proposal";

export type ControlAction = "confirm_send" | "edit_answers";

export type OutgoingMessage =
  | { type: "text"; text: string }
  | { type: "image"; data: string; mimeType: string }
  | { type: "audio"; data: string; mimeType: string; duration: number }
  | { type: "control"; action: ControlAction };

// qualifying: coleta em andamento · qualified: perguntas concluídas (practice
// mostra as opções enviar/editar) · finalized: tool de finalização disparada
// no n8n (tela de agradecimento).
export type AgentStatus = "qualifying" | "qualified" | "finalized";

export type AgentReply = {
  reply: string;
  status: AgentStatus;
  stage?: string;
  tool?: string;
};

export type ChatBubble = {
  id: number;
  role: "user" | "agent" | "tool";
  text?: string;
  image?: string; // dataURL para preview local
  audio?: { duration: number };
};
