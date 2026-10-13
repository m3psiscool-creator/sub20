import Reveal from "./Reveal";

const steps = [
  ["Apply with your current solve time.", "Tell us where you are now. To get in you need one solve under 1:00."],
  ["We review every application.", "Nobody is accepted automatically. The team reads each one."],
  ["Train 5 hours a week with us.", "That is the commitment for every student, every week."],
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="font-serif text-5xl md:col-span-4 md:text-6xl">How it works</h2>
        <ol className="md:col-span-8">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <Reveal className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink py-7">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <div>
                  <h3 className="text-xl">{t}</h3>
                  <p className="mt-2 max-w-md text-muted">{d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
