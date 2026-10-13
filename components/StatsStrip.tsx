import CountUp from "./CountUp";

const stats = [
  { node: <CountUp to={60} time />, label: "entry solve time" },
  { node: <><CountUp to={5} /> hrs</>, label: "per student, every week" },
  { node: <>$<CountUp to={15} /></>, label: "per hour" },
  { node: <><CountUp to={3} />x</>, label: "faster on average (about 200% improvement)" },
];

export default function StatsStrip() {
  return (
    <section aria-label="Key numbers" className="border-y border-ink">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className={`px-5 py-8 md:px-8 md:py-12 ${i % 2 ? "border-l border-ink" : ""} ${i > 1 ? "border-t border-ink md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-ink" : ""}`}>
            <dd className="font-mono text-4xl tabular-nums tracking-tight md:text-5xl">{s.node}</dd>
            <dt className="mt-3 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
