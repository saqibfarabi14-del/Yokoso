import { Reveal } from "./Reveal";

export function BrandStatement() {
  return (
    <section className="px-0 py-[var(--sec)] text-center">
      <div className="wrap">
        <Reveal as="p" className="display mx-auto m-0 max-w-[22ch] text-[clamp(26px,6.4vw,52px)] font-light leading-[1.32] tracking-[0.04em]">
          The sushi Sylhet seeks — served in a room that never needs to raise its voice.
        </Reveal>
      </div>
    </section>
  );
}
