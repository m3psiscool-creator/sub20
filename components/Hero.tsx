import Cube from "./Cube";
import { APPLICATIONS_OPEN, APPLY_HREF, NOTIFY_HREF } from "@/config";

export default function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:grid-cols-12 md:px-8 md:pb-28 md:pt-24">
      <div className="md:col-span-7">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">Speedcubing coaching</p>
        <h1 className="font-serif text-[3.5rem] leading-[0.95] sm:text-7xl md:text-8xl">
          Get faster.<br />Much faster.
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted">
          Five hours a week with two coaches who take your solve time seriously. Most students end up about three times faster.
        </p>
        <div className="mt-10 border-t border-ink pt-5">
          {APPLICATIONS_OPEN ? (
            <a href={APPLY_HREF} className="inline-block bg-ink px-5 py-3 text-sm text-paper">Apply now</a>
          ) : (
            <p className="text-sm">
              Applications are closed right now.
              {NOTIFY_HREF && (
                <> <a href={NOTIFY_HREF} className="underline underline-offset-4">Get notified when we reopen</a></>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center md:col-span-5 md:justify-end md:pr-6">
        <Cube />
      </div>
    </section>
  );
}
