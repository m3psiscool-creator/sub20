import { BRAND, CONTACT } from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm md:flex-row md:items-baseline md:justify-between md:px-8">
        <span className="font-serif text-2xl">{BRAND}</span>
        <span>Run by Izhak and Danilo</span>
        <a href={`tel:${CONTACT.replace(/\s/g, "")}`} className="underline underline-offset-4">{CONTACT}</a>
        <span className="font-mono text-xs text-muted">{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
