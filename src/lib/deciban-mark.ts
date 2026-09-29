/* deciban — abertura da marca: duas fitas perfuradas deslizam, os furos
   coincidem e acendem em ember, a janela vira o símbolo e o nome aparece.
   Portado de "Brand Deciban/animacao/video.html" (cenas 1–3), sem as legendas
   de Bletchley. Determinístico: drawDecibanMark(ctx, w, h, t) desenha o
   instante t (segundos). Mesma função no site (rodapé) e no trailer. */

export const DECIBAN_LOGO_D = "M248.0 -12.0Q184.0 -12.0 137.0 17.0Q90.0 46.0 64.5 107.0Q39.0 168.0 39.0 264.0Q39.0 359.0 65.0 419.5Q91.0 480.0 137.0 509.0Q183.0 538.0 241.0 538.0Q277.0 538.0 307.0 530.0Q337.0 522.0 360.0 505.5Q383.0 489.0 399.0 465.0H405.0V723.0H527.0V0.0H426.0L416.0 70.0H409.0Q384.0 29.0 341.5 8.5Q299.0 -12.0 248.0 -12.0ZM286.0 93.0Q328.0 93.0 354.0 112.0Q380.0 131.0 392.5 167.0Q405.0 203.0 405.0 255.0V268.0Q405.0 307.0 398.0 338.0Q391.0 369.0 376.5 390.0Q362.0 411.0 339.5 422.0Q317.0 433.0 286.0 433.0Q241.0 433.0 214.5 415.5Q188.0 398.0 176.5 361.5Q165.0 325.0 165.0 269.0V255.0Q165.0 200.0 176.5 164.0Q188.0 128.0 214.5 110.5Q241.0 93.0 286.0 93.0ZM853.0 -12.0Q769.0 -12.0 713.0 17.5Q657.0 47.0 629.0 108.0Q601.0 169.0 601.0 263.0Q601.0 358.0 629.0 418.5Q657.0 479.0 713.0 508.5Q769.0 538.0 853.0 538.0Q929.0 538.0 980.5 509.5Q1032.0 481.0 1058.0 422.0Q1084.0 363.0 1084.0 269.0V233.0H726.0Q728.0 184.0 741.0 150.5Q754.0 117.0 781.5 100.5Q809.0 84.0 854.0 84.0Q877.0 84.0 897.0 90.0Q917.0 96.0 932.0 108.5Q947.0 121.0 955.5 140.0Q964.0 159.0 964.0 184.0H1084.0Q1084.0 134.0 1066.5 97.0Q1049.0 60.0 1017.5 36.0Q986.0 12.0 944.0 0.0Q902.0 -12.0 853.0 -12.0ZM728.0 319.0H957.0Q957.0 352.0 949.5 375.0Q942.0 398.0 928.5 413.0Q915.0 428.0 896.0 434.5Q877.0 441.0 853.0 441.0Q814.0 441.0 787.5 428.0Q761.0 415.0 747.0 388.0Q733.0 361.0 728.0 319.0ZM1377.0 -12.0Q1295.0 -12.0 1240.5 17.5Q1186.0 47.0 1159.0 108.0Q1132.0 169.0 1132.0 263.0Q1132.0 358.0 1159.5 418.5Q1187.0 479.0 1241.5 508.5Q1296.0 538.0 1377.0 538.0Q1430.0 538.0 1471.0 525.0Q1512.0 512.0 1541.5 485.5Q1571.0 459.0 1586.0 420.0Q1601.0 381.0 1601.0 329.0H1477.0Q1477.0 366.0 1466.0 390.0Q1455.0 414.0 1432.5 426.5Q1410.0 439.0 1375.0 439.0Q1334.0 439.0 1308.0 420.0Q1282.0 401.0 1269.5 363.5Q1257.0 326.0 1257.0 269.0V256.0Q1257.0 200.0 1269.5 162.0Q1282.0 124.0 1309.0 105.5Q1336.0 87.0 1380.0 87.0Q1414.0 87.0 1436.5 99.5Q1459.0 112.0 1471.0 137.0Q1483.0 162.0 1483.0 197.0H1601.0Q1601.0 148.0 1586.0 109.0Q1571.0 70.0 1542.0 43.0Q1513.0 16.0 1471.5 2.0Q1430.0 -12.0 1377.0 -12.0ZM1675.0 607.0V723.0H1797.0V607.0ZM1675.0 0.0V526.0H1797.0V0.0ZM2176.0 -12.0Q2125.0 -12.0 2083.0 8.5Q2041.0 29.0 2015.0 70.0H2008.0L1998.0 0.0H1897.0V723.0H2019.0V465.0H2025.0Q2041.0 489.0 2064.0 505.5Q2087.0 522.0 2117.0 530.0Q2147.0 538.0 2183.0 538.0Q2242.0 538.0 2287.5 509.0Q2333.0 480.0 2359.0 419.5Q2385.0 359.0 2385.0 264.0Q2385.0 168.0 2359.5 107.0Q2334.0 46.0 2287.5 17.0Q2241.0 -12.0 2176.0 -12.0ZM2138.0 93.0Q2183.0 93.0 2209.5 110.5Q2236.0 128.0 2247.5 164.0Q2259.0 200.0 2259.0 255.0V269.0Q2259.0 325.0 2247.5 361.5Q2236.0 398.0 2209.5 415.5Q2183.0 433.0 2138.0 433.0Q2107.0 433.0 2084.5 422.0Q2062.0 411.0 2047.5 390.0Q2033.0 369.0 2026.0 338.0Q2019.0 307.0 2019.0 268.0V255.0Q2019.0 203.0 2031.5 167.0Q2044.0 131.0 2070.5 112.0Q2097.0 93.0 2138.0 93.0ZM2594.0 -12.0Q2572.0 -12.0 2543.5 -6.5Q2515.0 -1.0 2488.5 14.0Q2462.0 29.0 2445.0 58.5Q2428.0 88.0 2428.0 136.0Q2428.0 190.0 2452.0 225.5Q2476.0 261.0 2519.5 281.5Q2563.0 302.0 2623.5 310.5Q2684.0 319.0 2756.0 319.0V362.0Q2756.0 385.0 2749.0 403.0Q2742.0 421.0 2723.5 431.5Q2705.0 442.0 2668.0 442.0Q2631.0 442.0 2610.0 433.0Q2589.0 424.0 2581.0 411.0Q2573.0 398.0 2573.0 384.0V370.0H2455.0Q2454.0 375.0 2454.0 380.0Q2454.0 385.0 2454.0 392.0Q2454.0 437.0 2481.0 470.0Q2508.0 503.0 2556.0 520.5Q2604.0 538.0 2667.0 538.0Q2739.0 538.0 2785.5 518.0Q2832.0 498.0 2855.0 461.0Q2878.0 424.0 2878.0 371.0V123.0Q2878.0 104.0 2889.0 96.0Q2900.0 88.0 2913.0 88.0H2945.0V4.0Q2935.0 0.0 2916.0 -5.5Q2897.0 -11.0 2869.0 -11.0Q2843.0 -11.0 2822.5 -2.5Q2802.0 6.0 2788.0 22.0Q2774.0 38.0 2768.0 60.0H2762.0Q2745.0 39.0 2721.5 22.5Q2698.0 6.0 2666.5 -3.0Q2635.0 -12.0 2594.0 -12.0ZM2631.0 88.0Q2661.0 88.0 2684.5 97.0Q2708.0 106.0 2723.5 122.0Q2739.0 138.0 2747.5 161.0Q2756.0 184.0 2756.0 211.0V235.0Q2701.0 235.0 2654.5 228.0Q2608.0 221.0 2580.5 202.0Q2553.0 183.0 2553.0 148.0Q2553.0 130.0 2561.5 116.5Q2570.0 103.0 2587.5 95.5Q2605.0 88.0 2631.0 88.0ZM2985.0 0.0V526.0H3087.0L3097.0 456.0H3104.0Q3122.0 480.0 3146.5 498.5Q3171.0 517.0 3202.5 527.5Q3234.0 538.0 3272.0 538.0Q3322.0 538.0 3360.5 520.0Q3399.0 502.0 3421.0 462.0Q3443.0 422.0 3443.0 355.0V0.0H3320.0V333.0Q3320.0 361.0 3313.5 379.5Q3307.0 398.0 3294.5 409.5Q3282.0 421.0 3264.0 426.0Q3246.0 431.0 3224.0 431.0Q3191.0 431.0 3164.5 415.0Q3138.0 399.0 3122.5 371.0Q3107.0 343.0 3107.0 306.0V0.0Z";
const LOGO_X0 = 39, LOGO_W = 3404, LOGO_ASC = 723;

export const DECIBAN = { bg: "#0B0908", ember: "#FF6D2E", paper: "#B3AEA6", text: "#F2EDE9", text2: "#A8A29E" };
/** Duração até o nome terminar de aparecer (depois fica parado). */
export const DECIBAN_MARK_END = 6.2;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const eo = (x: number) => 1 - Math.pow(1 - x, 4);
const eio = (x: number) => (x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 31, MID = 15, WIN = 12;
const SYM_A = [1, 0, 1, 1, 0, 1, 0];
const SYM_B = [0, 1, 1, 0, 1, 1, 0];
const TA: number[] = [], TB: number[] = [];
{
  const rnd = mulberry(1941);
  for (let i = 0; i < N; i++) {
    if (i >= WIN && i < WIN + 7) {
      TA[i] = SYM_A[i - WIN];
      TB[i] = SYM_B[i - WIN];
      continue;
    }
    TA[i] = rnd() < 0.45 ? 1 : 0;
    TB[i] = rnd() < 0.45 ? 1 : 0;
    if (TA[i] && TB[i]) TB[i] = 0;
  }
}
const P = 62, R = 18, GAP = 48;
const STEPS = [-7, -5, -3, -2, -1, 0];

function offsetD(t: number) {
  if (t < 1.1) return lerp(-70, -7, eo(prog(t, 0, 1.1)));
  for (let k = 1; k < STEPS.length; k++) {
    const a = 1.25 + (k - 1) * 0.36;
    if (t < a + 0.22) return lerp(STEPS[k - 1], STEPS[k], eio(prog(t, a, a + 0.22)));
  }
  return 0;
}

let logo: Path2D | null = null;

export type MarkOptions = {
  /** Escala do desenho (1 = o vídeo original em 1920×1080). */
  scale?: number;
  /** Fundo carvão pintado por baixo. */
  fill?: boolean;
  /** Texto pequeno acima do símbolo ("made by", "um produto"). */
  label?: string;
  /** Fonte da legenda e da leitura do deslocamento. */
  mono?: string;
  /** Mostra "DESLOCAMENTO −03" embaixo das fitas durante a busca. */
  readout?: boolean;
  /** Ponto do desenho (em px do vídeo original) que fica no centro vertical do canvas.
   *  540 = o original; 430 centraliza a marca final (legenda + símbolo + nome). */
  focusY?: number;
};

/** Desenha o instante t (s). O desenho é centrado no canvas. */
export function drawDecibanMark(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, o: MarkOptions = {}) {
  const s = o.scale ?? Math.min(w / 1920, h / 1080);
  const mono = o.mono ?? '"Geist Mono", ui-monospace, monospace';
  logo ??= new Path2D(DECIBAN_LOGO_D);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.filter = "none";
  if (o.fill !== false) {
    ctx.fillStyle = DECIBAN.bg;
    ctx.fillRect(0, 0, w, h);
  }
  const dpr = (ctx.canvas.width / (ctx.canvas.clientWidth || w)) || 1;
  const k = s;
  const fy = o.focusY ?? 540;
  ctx.setTransform(k * dpr, 0, 0, k * dpr, (w / 2 - 960 * k) * dpr, (h / 2 - fy * k) * dpr);
  const CX = 960, CY = 540;

  const dot = (x: number, y: number, r: number, c: string, a: number) => {
    if (a <= 0.002) return;
    ctx.globalAlpha = a;
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  const vline = (x: number, y1: number, y2: number, lw: number, a: number) => {
    if (a <= 0.002 || y2 <= y1) return;
    ctx.globalAlpha = a;
    ctx.strokeStyle = DECIBAN.ember;
    ctx.lineWidth = lw;
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  const text = (str: string, x: number, y: number, font: string, color: string, alpha: number, ls = 0) => {
    if (alpha <= 0.002) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${ls}px`;
    ctx.fillText(str, x, y);
    ctx.restore();
  };

  const d = offsetD(t);
  const offA = d * 0.52, offB = -d * 0.48;
  const toSym = eio(prog(t, 4.0, 4.9));
  const rise = eio(prog(t, 4.6, 5.5));
  const cy = lerp(CY - 30, CY - 150, rise);
  const y1 = cy - GAP, y2 = cy + GAP;
  const xA = (i: number) => CX + (i - MID + offA) * P;
  const xB = (i: number) => CX + (i - MID + offB) * P;

  // as fitas de papel
  const strip = (x0: number, x1: number, y: number) => {
    ctx.globalAlpha = 0.06 * (1 - toSym);
    ctx.fillStyle = DECIBAN.paper;
    ctx.beginPath();
    ctx.roundRect(x0, y - R - 14, x1 - x0, 2 * R + 28, 6);
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  strip(xA(0) - P / 2, xA(N - 1) + P / 2, y1);
  strip(xB(0) - P / 2, xB(N - 1) + P / 2, y2);

  const n = Math.round(d), near = clamp(1 - Math.abs(d - n) / 0.2);
  const locked = t >= 2.92;
  const hit = new Set<number>();
  if (near > 0 && t > 1.1)
    for (let i = 0; i < N; i++) {
      const j = i + n;
      if (TA[i] && j >= 0 && j < N && TB[j]) hit.add(i);
    }

  for (let i = 0; i < N; i++) {
    const inWin = i >= WIN && i < WIN + 7;
    const keep = inWin ? 1 : 1 - toSym;
    if (TA[i]) dot(xA(i), y1, R, DECIBAN.text, 0.36 * keep);
    else if (inWin) dot(xA(i), y1, R, DECIBAN.text, 0.12 * toSym);
    if (TB[i]) dot(xB(i), y2, R, DECIBAN.text, 0.36 * keep);
    else if (inWin) dot(xB(i), y2, R, DECIBAN.text, 0.12 * toSym);
  }

  // o que coincide acende em ember: na busca, fraco; no encaixe, pleno
  const lock = eo(prog(t, 2.9, 3.3));
  for (const i of hit) {
    const a = locked ? lerp(0.45, 1, lock) : 0.45 * near;
    const x = xA(i);
    dot(x, y1, R + 0.4, DECIBAN.bg, a);
    dot(x, y2, R + 0.4, DECIBAN.bg, a);
    dot(x, y1, R, DECIBAN.ember, a);
    dot(x, y2, R, DECIBAN.ember, a);
    const len = locked ? eo(prog(t, 3.0, 3.5)) : 0;
    vline(x, y1, lerp(y1, y2, len), 5, 0.4);
  }

  // pulso de encaixe: a borda do furo crescendo e sumindo
  if (t > 2.9 && t < 3.8) {
    const q = prog(t, 2.9, 3.8);
    for (const i of hit)
      for (const y of [y1, y2]) {
        ctx.globalAlpha = 0.5 * (1 - q);
        ctx.strokeStyle = DECIBAN.ember;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xA(i), y, R + 4 + eo(q) * 26, 0, Math.PI * 2);
        ctx.stroke();
      }
    ctx.globalAlpha = 1;
  }

  // leitura do deslocamento, embaixo das fitas
  if (o.readout !== false && t > 1.2 && t < 4.2) {
    const la = Math.min(eo(prog(t, 1.2, 1.6)), 1 - eio(prog(t, 3.8, 4.2)));
    const nd = Math.round(d);
    const str = locked ? "DESLOCAMENTO 00  ·  2 COINCIDÊNCIAS" : `DESLOCAMENTO ${nd < 0 ? "−" : ""}${String(Math.abs(nd)).padStart(2, "0")}`;
    text(str, CX, y2 + 96, `500 18px ${mono}`, locked ? DECIBAN.ember : DECIBAN.text2, la, 3);
  }

  // o símbolo recebe o nome
  if (t > 4.9) {
    const asc = 78, ww = (LOGO_W * asc) / LOGO_ASC;
    const rv = eo(prog(t, 5.0, 5.8));
    const x = CX - ww / 2, y = y2 + R + 41 + asc + (1 - rv) * 12;
    const sc = asc / LOGO_ASC;
    ctx.save();
    ctx.globalAlpha = clamp(rv * 1.6);
    ctx.beginPath();
    ctx.rect(x - 4, y - asc - 10, (LOGO_W * sc + 8) * rv, asc + 30);
    ctx.clip();
    ctx.transform(sc, 0, 0, -sc, x - LOGO_X0 * sc, y);
    ctx.fillStyle = DECIBAN.text;
    ctx.fill(logo);
    ctx.restore();
  }

  // legenda acima do símbolo
  if (o.label && t > 5.2) {
    const la = eo(prog(t, 5.2, 5.9));
    text(o.label.toUpperCase(), CX, y1 - R - 46 + (1 - la) * 10, `500 20px ${mono}`, DECIBAN.text2, la, 6);
  }
  ctx.restore();
}
