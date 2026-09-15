import { sushiBoat } from "@/lib/menu";
import { Reveal } from "./Reveal";

export function SushiBoat() {
  return (
    <section id="boat" className="relative z-[2] border-t border-hair">
      <div className="wrap pb-[clamp(40px,6vw,66px)] pt-[var(--sec)]">
        <p className="eyebrow">What we are known for</p>
        <Reveal as="h2" className="display m-0 mb-3.5 text-[clamp(28px,6.6vw,48px)] font-light leading-[1.16] tracking-[0.05em]">
          {sushiBoat.title}
        </Reveal>
        <Reveal as="p" className="m-0 max-w-[48ch] text-mid">
          {sushiBoat.blurb}
        </Reveal>
        <Reveal as="span" className="display mt-[22px] block text-[clamp(22px,5vw,34px)] tabular-nums text-gold">
          {sushiBoat.price}
          <small className="mt-1.5 block font-[family-name:var(--font-body)] text-[10px] tracking-[0.24em] text-quiet">
            {sushiBoat.perHead}
          </small>
        </Reveal>
      </div>

      <div className="overflow-x-auto pb-[var(--sec)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-min snap-x snap-mandatory px-[var(--gut)] min-[900px]:px-0">
          {sushiBoat.rolls.map((roll) => (
            <article
              key={roll.no}
              className="relative flex min-h-[clamp(330px,46vw,430px)] w-[min(78vw,378px)] shrink-0 snap-start flex-col justify-between border-l border-hair bg-[var(--glass)] px-[clamp(20px,3vw,34px)] py-[clamp(26px,4vw,42px)] backdrop-blur-[7px] transition-colors duration-700 hover:bg-[rgba(23,21,15,0.78)]"
            >
              <span className="display text-[13px] tracking-[0.2em] text-gold">{roll.no}</span>
              <div>
                <h3 className="display mb-2.5 mt-auto text-[clamp(24px,4.4vw,32px)] font-light leading-[1.2] tracking-[0.04em]">
                  {roll.name}
                </h3>
                <p className="jp mb-4 text-[13px] tracking-[0.2em] text-gold">{roll.kj}</p>
                <p className="mb-5 text-[13px] leading-[1.85] text-quiet">{roll.blurb}</p>
                <span className="display text-[19px] tabular-nums text-mid">{roll.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
