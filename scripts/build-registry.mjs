// Gera o registry da Rabelo Co. em public/r/*.json, no formato que o CLI do
// shadcn consome. Modelo copiado do brainless (theswerd/brainless): JSON
// estático servido pelo próprio site, sem infra nova.
//
// O que este script resolve: os componentes não valem nada soltos — dependem
// dos tokens ember e das classes de globals.css. Cada item leva junto o seu
// bloco de CSS, e o item `ember-theme` leva os tokens. Assim um projeto novo
// instala e já vem com a identidade, em vez de herdar classes quebradas.
//
// Uso: npm run registry:build

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "r");
// REGISTRY_BASE permite gerar apontando para um servidor local e testar a
// instalação de verdade antes de publicar.
const BASE = process.env.REGISTRY_BASE ?? "https://rabelo.company";

const manifest = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const globals = readFileSync(join(root, "src", "app", "globals.css"), "utf8");

/** Título de cada bloco de globals.css, por chave usada no manifesto. */
const CSS_BLOCKS = {
  tokens: "Dark Premium Ember — design tokens",
  "tema-claro": "Tema claro (toggle via data-theme)",
  rotator: "Rotator de palavras do hero",
  marquee: "Marquee",
  preview: "Preview flutuante no hover de um link",
  timeline: "Timeline — trilho que preenche conforme o scroll",
  faq: "FAQ — acordeão em <details>, sem JS",
  "client-card": 'Card de cliente: "o que mudou" revela no hover',
  popover: "Popover ancorado",
};

/** Recorta um bloco de globals.css: do cabeçalho até o próximo cabeçalho. */
function cssBlock(key) {
  const title = CSS_BLOCKS[key];
  if (!title) throw new Error(`bloco de CSS desconhecido: ${key}`);

  const header = globals.indexOf(`/* ============ ${title} ============ */`);
  if (header === -1) throw new Error(`bloco não encontrado em globals.css: ${title}`);

  const next = globals.indexOf("/* ============ ", header + 10);
  return globals.slice(header, next === -1 ? undefined : next).trimEnd();
}

/**
 * Ajusta o source para fora deste repo:
 * - `@/lib/cn` é nosso; no shadcn o helper mora em `@/lib/utils`
 * - imports entre componentes viram `@/components/ui/<nome>`, que é o alvo da
 *   instalação (aqui já batem, mas deixa explícito para quem ler)
 */
function portable(source) {
  return source.replaceAll('from "@/lib/cn"', 'from "@/lib/utils"');
}

function fileFor(name) {
  const source = readFileSync(join(root, "src", "components", "ui", name), "utf8");
  return {
    path: `registry/rabelo/${name}`,
    target: `components/ui/${name}`,
    type: "registry:ui",
    content: portable(source),
  };
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const index = [];

for (const item of manifest.items) {
  const files = (item.files ?? []).map(fileFor);

  // CSS do item entra como arquivo próprio: keyframes, @supports e media
  // queries não sobrevivem ao formato objeto do campo `css` do shadcn.
  for (const key of item.cssBlocks ?? []) {
    files.push({
      path: `registry/rabelo/styles/${key}.css`,
      target: `styles/rabelo/${key}.css`,
      type: "registry:file",
      content: cssBlock(key) + "\n",
    });
  }

  const cssFiles = files.filter((f) => f.type === "registry:file");

  const out = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    author: "Rabelo Co. <rafael@rabelo.company>",
    ...(item.dependencies ? { dependencies: item.dependencies } : {}),
    ...(item.registryDependencies
      ? { registryDependencies: item.registryDependencies.map((d) => `${BASE}/r/${d}.json`) }
      : {}),
    files,
    // Nomeia os arquivos de fato — a instrução genérica obrigava a abrir a
    // pasta para descobrir o que importar.
    docs: cssFiles.length
      ? ["Adicione ao seu CSS global:", ...cssFiles.map((f) => `@import "./${f.target}";`)].join("\n")
      : undefined,
  };

  writeFileSync(join(OUT, `${item.name}.json`), JSON.stringify(out, null, 2) + "\n");

  index.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: files.length,
    dependsOn: item.registryDependencies ?? [],
  });
}

writeFileSync(
  join(OUT, "index.json"),
  JSON.stringify({ name: manifest.name, homepage: manifest.homepage, items: index }, null, 2) + "\n"
);

console.log(`registry: ${index.length} itens em public/r/`);
for (const i of index) console.log(`  ${i.name.padEnd(26)} ${i.files} arquivo(s)`);
