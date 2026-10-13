import { APPLICATIONS_OPEN, APPLY_HREF, NOTIFY_HREF } from "@/config";

export default function ApplicationStatus() {
  return (
    <section id="apply" className="border-t border-ink bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-[#BDB9AD]">Application status</p>
        <h2 className="mt-4 font-serif text-6xl leading-none md:text-8xl">
          {APPLICATIONS_OPEN ? "Applications are open." : "Applications are closed."}
        </h2>
        {APPLICATIONS_OPEN ? (
          <a href={APPLY_HREF} className="mt-10 inline-block bg-paper px-6 py-3 text-ink">Apply</a>
        ) : (
          <p className="mt-6 max-w-md text-[#BDB9AD]">
            We are not taking students right now.
            {NOTIFY_HREF && <> <a href={NOTIFY_HREF} className="text-paper underline underline-offset-4">Get notified when we reopen.</a></>}
          </p>
        )}
      </div>
    </section>
  );
}
