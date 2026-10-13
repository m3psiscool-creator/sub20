"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { IDENTITY, Mat, Move, apply, ease, mul, rotation, scramble, solution } from "@/lib/cubeMoves";

const S = 56; // cubie size in px
const FACE_COLORS: Record<string, string> = {
  "+x": "#C41E3A", "-x": "#FF6B1A", "+y": "#F5D90A", "-y": "#F4F4F0", "+z": "#1F9D55", "-z": "#1D5FD1",
};
const FACE_TF: Record<string, string> = {
  "+x": "rotateY(90deg)", "-x": "rotateY(-90deg)", "+y": "rotateX(-90deg)",
  "-y": "rotateX(90deg)", "+z": "", "-z": "rotateY(180deg)",
};
const AXES = ["x", "y", "z"];

type Cubie = { p: number[]; m: Mat };
const home = (): Cubie[] => {
  const out: Cubie[] = [];
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) out.push({ p: [x, y, z], m: IDENTITY });
  return out;
};
const initial = home().map((c) => c.p);

// Timeline in ms: idle, scramble, pause, solve, hold. Totals ~12s.
const IDLE = 1500, SCR = 130, PAUSE = 500, SOL = 520, HOLD = 2000;
const fmt = (s: number) => {
  const c = Math.round(s * 100);
  return `${Math.floor(c / 6000)}:${String(Math.floor((c % 6000) / 100)).padStart(2, "0")}.${String(c % 100).padStart(2, "0")}`;
};

export default function Cube({ size = S }: { size?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const cubieRefs = useRef<(HTMLDivElement | null)[]>([]);

  const reduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [forced, setForced] = useState(false);
  const animate = !reduced || forced;

  useEffect(() => {
    if (!animate) {
      timerRef.current!.textContent = "0:20.00";
      return;
    }

    const scr = scramble();
    const seq: Move[] = [...scr, ...solution(scr)];
    const total = IDLE + 12 * SCR + PAUSE + 12 * SOL + HOLD;
    let cubies = home();
    let done = 0, t = 0, last = 0, raf = 0, onScreen = true;

    const draw = (partial?: { move: Move; angle: number }) => {
      cubies.forEach((c, i) => {
        let { p, m } = c;
        if (partial && Math.round(p[partial.move.axis]) === partial.move.layer) {
          const r = rotation(partial.move.axis, partial.angle);
          p = apply(r, p);
          m = mul(r, m);
        }
        const k = size;
        cubieRefs.current[i]!.style.transform =
          `matrix3d(${m[0]},${m[3]},${m[6]},0,${m[1]},${m[4]},${m[7]},0,${m[2]},${m[5]},${m[8]},0,${p[0] * k},${p[1] * k},${p[2] * k},1)`;
      });
    };
    const commit = (mv: Move) => {
      const r = rotation(mv.axis, (mv.dir * Math.PI) / 2);
      cubies = cubies.map((c) =>
        Math.round(c.p[mv.axis]) === mv.layer
          ? { p: apply(r, c.p).map(Math.round), m: mul(r, c.m).map(Math.round) }
          : c);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 50);
      last = now;
      t = (t + dt) % total;
      spinRef.current!.style.transform = `rotateX(-28deg) rotateY(${-38 + (now / 1000) * 12}deg)`;

      // Which move is in flight, and how far along is it?
      let n = 0, prog = 0, timer = 60;
      const a = IDLE, b = a + 12 * SCR, c = b + PAUSE, d = c + 12 * SOL;
      if (t < a) { n = 0; timer = 0; }
      else if (t < b) { n = Math.floor((t - a) / SCR); prog = ((t - a) % SCR) / SCR; timer = 0; }
      else if (t < c) { n = 12; timer = 60; }
      else if (t < d) {
        const i = Math.floor((t - c) / SOL);
        prog = ((t - c) % SOL) / SOL;
        n = 12 + i;
        timer = 60 - 40 * ((i + ease(prog)) / 12);
      } else { n = 24; timer = 20; }

      if (done > n) { cubies = home(); done = 0; }
      while (done < n) commit(seq[done++]);
      const live = n < 24 && prog > 0 ? seq[n] : null;
      draw(live ? { move: live, angle: (live.dir * Math.PI / 2) * ease(prog) } : undefined);
      timerRef.current!.textContent = t < a ? "1:00.00" : fmt(timer === 0 ? 60 : timer);
    };

    const run = () => { if (!raf && onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) run(); else stop();
    });
    io.observe(rootRef.current!);
    const vis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", vis);
    run();
    return () => { stop(); io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, [size, animate]);

  const cubies = home();
  return (
    <div ref={rootRef} role="img" aria-label="A 3x3 speedcube scrambling, then solving while a timer counts down from 1:00.00 to 0:20.00"
      className="flex flex-col items-center gap-10 select-none">
      <div style={{ perspective: size * 16, width: size * 3, height: size * 3 }} className="relative">
        <div ref={spinRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(-28deg) rotateY(-38deg)" }}>
          {cubies.map((c, i) => (
            <div key={i} ref={(el) => { cubieRefs.current[i] = el; }}
              className="absolute"
              style={{
                width: size, height: size, left: size, top: size, marginLeft: 0, transformStyle: "preserve-3d",
                transform: `translate3d(${c.p[0] * size}px,${c.p[1] * size}px,${c.p[2] * size}px)`,
              }}>
              {Object.keys(FACE_COLORS).map((f) => {
                const ax = AXES.indexOf(f[1]);
                const lit = initial[i][ax] === (f[0] === "+" ? 1 : -1);
                return (
                  <div key={f} className="absolute inset-0 bg-[#151515]"
                    style={{ transform: `${FACE_TF[f]} translateZ(${size / 2}px)`, backfaceVisibility: "hidden" }}>
                    {lit && <div className="absolute rounded-[3px]" style={{ inset: size * 0.08, background: FACE_COLORS[f] }} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <span ref={timerRef} className="font-mono text-4xl tabular-nums tracking-tight" aria-hidden="true">
        1:00.00
      </span>
      {!animate && (
        <button type="button" onClick={() => setForced(true)}
          className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper">
          Play animation
        </button>
      )}
    </div>
  );
}
