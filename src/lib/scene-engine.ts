// Motor das cenas — um laço de requestAnimationFrame para a página inteira.
//
// O que ele faz a cada quadro:
// 1. Scroll suave: a roda do mouse vira um alvo e a página desliza até ele
//    (mesma técnica do site do uai?). Teclado, barra de rolagem e toque seguem
//    nativos — só a roda é interceptada.
// 2. Progresso de cena: todo [data-scene] (uma seção alta com um palco sticky
//    dentro) recebe --p de 0 a 1, suavizado. O CSS anima a partir dele, sem
//    re-render do React.
// 3. Revelação: todo [data-r] recebe --r de 0 a 1 enquanto entra na tela.
// 4. --sp no <html>: progresso da página inteira (barra do topo e HUD).
//
// Componentes que precisam de um número discreto (passo da timeline, item
// ativo) assinam com onScene() e só mudam de estado quando o passo muda.

type Listener = (p: number) => void;
type SceneEl = HTMLElement & { _p?: number };

const listeners = new Map<Element, Set<Listener>>();
const activeListeners = new Set<(id: string) => void>();
let running = false;
let activeId = "";

export function onScene(el: Element, cb: Listener) {
  let set = listeners.get(el);
  if (!set) listeners.set(el, (set = new Set()));
  set.add(cb);
  return () => {
    set!.delete(cb);
    if (set!.size === 0) listeners.delete(el);
  };
}

/** Avisa qual seção [data-chapter] está no centro da tela (para o HUD). */
export function onActiveChapter(cb: (id: string) => void) {
  activeListeners.add(cb);
  if (activeId) cb(activeId);
  return () => activeListeners.delete(cb);
}

const clamp = (x: number) => Math.min(1, Math.max(0, x));

/** Algum ancestral rola sozinho nessa direção? Então a roda é dele, não da página. */
function ownsWheel(target: EventTarget | null, dy: number) {
  let el = target instanceof Element ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    if (el instanceof HTMLElement) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
        if (dy < 0 && el.scrollTop > 0) return true;
        if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      }
      if (el.dataset.nativeScroll !== undefined) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function startSceneEngine() {
  if (running) return () => {};
  running = true;

  const root = document.documentElement;
  const se = document.scrollingElement || root;
  const maxScroll = () => se.scrollHeight - window.innerHeight;
  // Roda suave só com ponteiro fino (mouse/trackpad). No toque, nativo.
  const fine = window.matchMedia("(pointer: fine)").matches;

  let cur = se.scrollTop;
  let target = cur;
  let lastSet = cur;
  let locked = false;

  const wheel = (e: WheelEvent) => {
    if (!fine || e.ctrlKey || maxScroll() <= 1) return;
    if (document.body.dataset.scrollLock !== undefined) return;
    let dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 40;
    else if (e.deltaMode === 2) dy *= window.innerHeight;
    if (ownsWheel(e.target, dy)) return;
    e.preventDefault();
    if (Math.abs(target - cur) < 1) cur = target = se.scrollTop;
    target = Math.max(0, Math.min(maxScroll(), target + dy));
  };

  // Âncoras da própria página deslizam pelo mesmo motor (sem pulo seco).
  const click = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    history.replaceState(null, "", url.hash);
    cur = se.scrollTop;
    target = Math.max(0, Math.min(maxScroll(), el.getBoundingClientRect().top + se.scrollTop - 64));
    if (!fine) window.scrollTo({ top: target, behavior: "smooth" });
  };

  window.addEventListener("wheel", wheel, { passive: false });
  document.addEventListener("click", click);

  let last = performance.now();
  let raf = 0;

  const loop = () => {
    const now = performance.now();
    const f = Math.min(0.05, (now - last) / 1000) * 60;
    last = now;
    const vh = window.innerHeight;

    // 1. scroll suave
    if (fine) {
      if (Math.abs(se.scrollTop - lastSet) > 2) cur = target = se.scrollTop;
      if (Math.abs(target - cur) > 0.4) {
        cur += (target - cur) * (1 - Math.pow(0.88, f));
        se.scrollTop = cur;
        locked = true;
      } else if (locked) {
        cur = target;
        se.scrollTop = cur;
        locked = false;
      }
      lastSet = se.scrollTop;
    }

    // 2. progresso de cena
    const kp = 1 - Math.pow(0.8, f);
    for (const el of document.querySelectorAll<SceneEl>("[data-scene]")) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const goal = clamp(-r.top / Math.max(1, r.height - vh));
      const p = el._p === undefined ? goal : el._p + (goal - el._p) * kp;
      const settled = Math.abs(goal - p) < 0.0005 ? goal : p;
      if (settled !== el._p) {
        el._p = settled;
        el.style.setProperty("--p", settled.toFixed(4));
        listeners.get(el)?.forEach((cb) => cb(settled));
      }
    }

    // 3. revelação
    for (const el of document.querySelectorAll<SceneEl>("[data-r]")) {
      const r = el.getBoundingClientRect();
      const q = Math.round(clamp((vh - r.top) / (vh * 0.42)) * 1000) / 1000;
      if (q !== el._p) {
        el._p = q;
        el.style.setProperty("--r", String(q));
      }
    }

    // 4. progresso da página e capítulo ativo
    const max = maxScroll();
    const sp = max > 0 ? (se.scrollTop / max).toFixed(4) : "0";
    if (root.style.getPropertyValue("--sp") !== sp) root.style.setProperty("--sp", sp);
    let id = "";
    for (const el of document.querySelectorAll<HTMLElement>("[data-chapter]")) {
      const r = el.getBoundingClientRect();
      if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) id = el.dataset.chapter ?? "";
    }
    if (id !== activeId) {
      activeId = id;
      activeListeners.forEach((cb) => cb(id));
    }

    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", wheel);
    document.removeEventListener("click", click);
  };
}
