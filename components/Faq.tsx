const faqs: [string, string][] = [
  ["Who is this for?", "Cubers who can already solve in about a minute and want to get much faster. Most students improve their solve time by about 200%, for example 60 seconds down to around 20."],
  ["What counts as a 1 minute solve?", "Any single solve under 1:00. It does not have to be an average."],
  ["How do applications work?", "You apply with your current solve time. The team reviews every application, so acceptance is not automatic."],
  ["How often do you reopen?", "TODO: no reopen schedule has been confirmed. Applications are closed right now."],
  ["How do sessions run?", "Each student commits to 5 hours per week, at $15 per hour. TODO: session format and scheduling to be supplied by the owners."],
];

export default function Faq() {
  return (
    <section id="faq" className="border-t border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <h2 className="font-serif text-5xl md:col-span-4 md:text-6xl">FAQ</h2>
        <div className="md:col-span-8">
          {faqs.map(([q, a]) => (
            <details key={q} className="border-t border-ink last:border-b">
              <summary className="flex items-center justify-between gap-4 py-5 text-lg">
                {q}
                <span aria-hidden="true" className="plus font-mono text-xl transition-transform">+</span>
              </summary>
              <p className="max-w-lg pb-6 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
