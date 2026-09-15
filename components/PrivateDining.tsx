import { privateDining } from "@/lib/menu";
import { Reveal } from "./Reveal";

type Props = {
  onEnquire: () => void;
};

export function PrivateDining({ onEnquire }: Props) {
  const rows = [
    { dt: "Seats", dd: privateDining.seats },
    { dt: "Anchor", dd: privateDining.anchor },
    { dt: "And", dd: privateDining.and },
    { dt: "Notice", dd: privateDining.notice },
  ];

  return (
    <section id="room" className="relative z-[2] border-t border-hair py-[var(--sec)]">
      <div className="wrap grid grid-cols-1 items-center gap-9 min-[880px]:grid-cols-[1.1fr_1fr] min-[880px]:gap-[clamp(40px,7vw,92px)]">
        <div>
          <p className="eyebrow">Private dining</p>
          <Reveal as="h2" className="display m-0 mb-[18px] text-[clamp(27px,6vw,42px)] font-light leading-[1.22] tracking-[0.05em]">
            A room of your own
          </Reveal>
          <Reveal as="p" className="mb-[26px] max-w-[44ch] text-mid">
            Prestige dining for family gatherings, quiet celebrations, and considered business —
            set menus anchored by the sushi boats and whole sea bass.
          </Reveal>
          <button type="button" className="btn" onClick={onEnquire}>
            ENQUIRE
          </button>
        </div>
        <Reveal
          as="dl"
          className="m-0 border-t border-hair bg-[var(--glass)] backdrop-blur-[8px]"
        >
          {rows.map((r) => (
            <div
              key={r.dt}
              className="flex justify-between gap-4 border-b border-hair px-4 py-[15px]"
            >
              <dt className="text-[10px] tracking-[0.22em] text-quiet uppercase">{r.dt}</dt>
              <dd className="display m-0 text-[18px]">{r.dd}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
