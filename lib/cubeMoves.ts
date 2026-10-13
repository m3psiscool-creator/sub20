export type Axis = 0 | 1 | 2;
export type Move = { axis: Axis; layer: -1 | 1; dir: 1 | -1; name: string };
export type Mat = number[]; // row-major 3x3

// CSS coordinates: x right, y down, z toward viewer.
export const MOVES: Move[] = [
  { name: "R", axis: 0, layer: 1, dir: 1 },
  { name: "R'", axis: 0, layer: 1, dir: -1 },
  { name: "L", axis: 0, layer: -1, dir: -1 },
  { name: "L'", axis: 0, layer: -1, dir: 1 },
  { name: "U", axis: 1, layer: -1, dir: -1 },
  { name: "U'", axis: 1, layer: -1, dir: 1 },
  { name: "D", axis: 1, layer: 1, dir: 1 },
  { name: "D'", axis: 1, layer: 1, dir: -1 },
  { name: "F", axis: 2, layer: 1, dir: 1 },
  { name: "F'", axis: 2, layer: 1, dir: -1 },
  { name: "B", axis: 2, layer: -1, dir: -1 },
  { name: "B'", axis: 2, layer: -1, dir: 1 },
];

export const inverse = (m: Move): Move =>
  MOVES.find((x) => x.axis === m.axis && x.layer === m.layer && x.dir === -m.dir)!;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic scramble; never turns the same face twice in a row.
export function scramble(length = 12, seed = 20): Move[] {
  const rnd = mulberry32(seed);
  const out: Move[] = [];
  while (out.length < length) {
    const m = MOVES[Math.floor(rnd() * MOVES.length)];
    const last = out[out.length - 1];
    if (last && last.axis === m.axis && last.layer === m.layer) continue;
    out.push(m);
  }
  return out;
}

export const solution = (s: Move[]): Move[] => [...s].reverse().map(inverse);

export function rotation(axis: Axis, angle: number): Mat {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  if (axis === 0) return [1, 0, 0, 0, c, -s, 0, s, c];
  if (axis === 1) return [c, 0, s, 0, 1, 0, -s, 0, c];
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

export const mul = (a: Mat, b: Mat): Mat => {
  const o = new Array(9).fill(0);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      for (let k = 0; k < 3; k++) o[r * 3 + c] += a[r * 3 + k] * b[k * 3 + c];
  return o;
};

export const apply = (m: Mat, v: number[]): number[] => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

export const IDENTITY: Mat = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
