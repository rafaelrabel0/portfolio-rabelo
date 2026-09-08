import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { TerminalFrame } from "@/components/ui/terminal-frame";
import { ClaudeDiff } from "@/components/brainless/claude-diff";
import { ClaudeHeader } from "@/components/brainless/claude-header";
import { ClaudeMessage } from "@/components/brainless/claude-message";
import { ClaudeTodoList } from "@/components/brainless/claude-todo-list";
import { ClaudeToolCall } from "@/components/brainless/claude-tool-call";
import type { Todo } from "@/components/brainless/claude-todo-list";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// Interfaces de agente de código recriadas como componentes: peças do brainless
// (theswerd/brainless, MIT), adaptadas em src/components/brainless.
//
// A cena abaixo é uma sessão real — a que derrubou o LCP deste site de 4176 ms
// para 1832 ms. Números, arquivo e diff são os verdadeiros; nada de "acme-app".
//
// Só peças que são server component entram aqui (header, message, todo, tool
// call, diff). As três client do brainless — thinking, permission e prompt —
// têm animação e estado, e não vale gastar JS no caminho crítico da home por
// elas; por isso nem ficam no repositório. Para trazer alguma de volta:
//
//   curl -s https://brainless.swerdlow.dev/r/claude-prompt.json
//
// e adaptar os imports (`@/lib/utils` -> `@/lib/cn`).

const cena: Record<Locale, {
  frame: string;
  prompt: string;
  plano: string;
  todos: Todo[];
  toolArg: string;
  toolResult: string;
  toolCausa: string;
  diffSummary: string;
  fecho: string;
}> = {
  pt: {
    frame: "rafael@rabelo — claude ~/portfolio-rabelo",
    prompt: "bora otimizar meu portfólio",
    plano: "Antes de mexer: medir. Vou comparar contra o commit anterior num worktree separado, com rede e CPU limitadas, para o número não ser chute.",
    todos: [
      { label: "Medir LCP, FCP e bytes contra o commit anterior", status: "done" },
      { label: "Comprimir os assets (og.png tem 1,1 MB)", status: "done" },
      { label: "Tirar framer-motion do caminho crítico", status: "active" },
      { label: "Revalidar as duas pontas e publicar", status: "todo" },
    ],
    toolArg: "Fast 3G · CPU 4x · mediana de 3",
    toolResult: "LCP 4176 ms · FCP 1924 ms · imagens 89 KB",
    toolCausa: "causa: o root layout monta framer-motion, então o texto do hero só pinta depois de hidratar",
    diffSummary: "fundo animado sai de framer-motion e vira CSS",
    fecho: "LCP em 1832 ms (-56%). O texto do hero agora pinta no primeiro paint, sem esperar JS — e o fundo continua idêntico, animando no compositor.",
  },
  en: {
    frame: "rafael@rabelo — claude ~/portfolio-rabelo",
    prompt: "let's optimize my portfolio",
    plano: "Before touching anything: measure. I'll compare against the previous commit in a separate worktree, with throttled network and CPU, so the number isn't a guess.",
    todos: [
      { label: "Measure LCP, FCP and bytes against the previous commit", status: "done" },
      { label: "Compress the assets (og.png is 1.1 MB)", status: "done" },
      { label: "Get framer-motion off the critical path", status: "active" },
      { label: "Re-validate both ends and ship", status: "todo" },
    ],
    toolArg: "Fast 3G · CPU 4x · median of 3",
    toolResult: "LCP 4176 ms · FCP 1924 ms · images 89 KB",
    toolCausa: "cause: the root layout mounts framer-motion, so the hero text only paints after hydration",
    diffSummary: "animated background moves from framer-motion to CSS",
    fecho: "LCP down to 1832 ms (-56%). The hero text now paints on first paint, with no JS in the way — and the background looks identical, animating on the compositor.",
  },
};

const diff = [
  { type: "del" as const, n: 1, text: '"use client";' },
  { type: "del" as const, n: 3, text: 'import { motion, useReducedMotion } from "framer-motion";' },
  { type: "ctx" as const, n: 4, text: "" },
  { type: "add" as const, n: 5, text: "export function AnimatedBackground() {" },
  { type: "del" as const, n: 6, text: "  const reduced = useReducedMotion();" },
  { type: "ctx" as const, n: 7, text: "  return (" },
  { type: "del" as const, n: 8, text: "    <motion.div animate={reduced ? undefined : { x: b.x, y: b.y }}" },
  { type: "add" as const, n: 9, text: '    <div className="blob absolute rounded-full"' },
  { type: "ctx" as const, n: 10, text: "      style={{ filter: \"blur(90px)\" }}" },
];

export function HowIBuild({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const t = cena[locale];

  return (
    <Section id="how-i-build">
      <SectionHeader
        eyebrow="05"
        title={ui.sections.howIBuildTitle}
        subtitle={ui.sections.howIBuildSubtitle}
      />

      <Reveal>
        <TerminalFrame title={t.frame}>
          <div className="space-y-3 font-mono text-[13px] leading-[1.6]" style={{ color: "#c0caf5" }}>
            <ClaudeHeader
              user="Rafael"
              cwd="~/portfolio-rabelo"
              model="Claude Opus · xhigh effort"
              org="Rabelo Co."
              tips={[locale === "pt" ? "Medir antes de mexer" : "Measure before touching"]}
              whatsNew={[
                locale === "pt" ? "next/image: priority saiu, use loading=eager" : "next/image: priority is out, use loading=eager",
                locale === "pt" ? "Tailwind v4 sem config, tokens no CSS" : "Tailwind v4 with no config, tokens in CSS",
              ]}
            />

            <ClaudeMessage role="user">{t.prompt}</ClaudeMessage>
            <ClaudeMessage>{t.plano}</ClaudeMessage>

            <ClaudeTodoList todos={t.todos} />

            <ClaudeToolCall
              tool="Bash"
              arg={t.toolArg}
              result={t.toolResult}
              status="success"
              defaultOpen
            >
              <div className="pl-6 pt-1" style={{ color: "#e0af68" }}>
                {t.toolCausa}
              </div>
            </ClaudeToolCall>

            <ClaudeDiff
              file="src/components/AnimatedBackground.tsx"
              summary={t.diffSummary}
              lines={diff}
            />

            <ClaudeMessage>{t.fecho}</ClaudeMessage>
          </div>
        </TerminalFrame>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-5 max-w-3xl text-sm text-faint">
          {ui.sections.howIBuildNote}
        </p>
      </Reveal>
    </Section>
  );
}
