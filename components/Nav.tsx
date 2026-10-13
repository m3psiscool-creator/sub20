import { APPLICATIONS_OPEN, BRAND } from "@/config";

const links = [
  ["How it works", "#how"],
  ["Team", "#team"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink bg-paper/95">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="font-serif text-2xl leading-none">{BRAND}</a>
        <div className="flex items-center gap-6">
          <ul className="hidden gap-6 text-sm md:flex">
            {links.map(([l, h]) => (
              <li key={h}><a href={h} className="underline-offset-4 hover:underline">{l}</a></li>
            ))}
          </ul>
          <a href="#apply" className="flex items-center gap-2 border border-ink px-3 py-1 font-mono text-xs uppercase tracking-wide">
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${APPLICATIONS_OPEN ? "bg-[#1F9D55]" : "bg-[#C41E3A]"}`} />
            {APPLICATIONS_OPEN ? "Applications open" : "Applications closed"}
          </a>
        </div>
      </nav>
    </header>
  );
}
