// As duas fitas da marca, com a mesma semente do vídeo (1941): furos aleatórios
// fora da janela e, dentro dela (colunas 12–18), o padrão do símbolo — onde
// coincidem, há evidência. Usado pelas cenas que encaixam as fitas no scroll.

export type Hole = "o" | "x"; // o = furo, x = sem furo

const SA = [1, 0, 1, 1, 0, 1, 0];
const SB = [0, 1, 1, 0, 1, 1, 0];
export const TAPE_N = 31;
export const TAPE_WIN = 12;

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** [fitaA, fitaB, índices que coincidem] */
export function buildTapes(n = TAPE_N): [Hole[], Hole[], number[]] {
  const rnd = mulberry(1941);
  const A: Hole[] = [];
  const B: Hole[] = [];
  const hits: number[] = [];
  const off = Math.floor((n - TAPE_N) / 2);
  for (let i = 0; i < n; i++) {
    const k = i - off;
    const w = k >= TAPE_WIN && k < TAPE_WIN + 7;
    let a: number;
    let b: number;
    if (w) {
      a = SA[k - TAPE_WIN];
      b = SB[k - TAPE_WIN];
    } else {
      a = rnd() < 0.45 ? 1 : 0;
      b = rnd() < 0.45 ? 1 : 0;
      if (a && b) b = 0;
    }
    A.push(a ? "o" : "x");
    B.push(b ? "o" : "x");
    if (a && b) hits.push(i);
  }
  return [A, B, hits];
}
