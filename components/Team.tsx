import Image from "next/image";
import Reveal from "./Reveal";

const people = [
  { name: "Izhak", src: "/images/izhak.jpg", pos: "50% 50%", alt: "Izhak, coach at Sub20" },
  { name: "Danilo", src: "/images/danilo.jpg", pos: "50% 50%", alt: "Danilo, coach at Sub20" },
];

export default function Team() {
  return (
    <section id="team" className="border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-serif text-5xl md:text-6xl">Team</h2>
        <div className="mt-12 grid grid-cols-2 gap-5 md:max-w-3xl md:gap-10">
          {people.map((p) => (
            <Reveal key={p.name}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-[#E6E1D5]">
                  <Image src={p.src} alt={p.alt} width={800} height={1000}
                    className="h-full w-full object-cover [filter:sepia(.18)_saturate(.9)_contrast(1.03)]"
                    style={{ objectPosition: p.pos }} />
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide">{p.name} / Coach</figcaption>
                
                <p className="mt-2 text-sm text-muted">CHS student</p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
