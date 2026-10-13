const rows = [
  ["Price", "$15 per hour"],
  ["Commitment", "5 hours per student, per week"],
  ["Entry requirement", "Any single solve under 1:00"],
  ["Acceptance", "Applications are reviewed by the team"],
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <h2 className="font-serif text-5xl md:col-span-4 md:text-6xl">Pricing and commitment</h2>
        <table className="w-full border-collapse text-left md:col-span-8">
          <caption className="sr-only">Pricing and commitment</caption>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-ink last:border-b">
                <th scope="row" className="w-2/5 py-5 pr-4 align-top font-mono text-xs font-normal uppercase tracking-wide text-muted">{k}</th>
                <td className="py-5 text-lg">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
