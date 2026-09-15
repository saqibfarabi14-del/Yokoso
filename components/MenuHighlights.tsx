import { menuHighlights } from "@/lib/menu";
import { Reveal } from "./Reveal";

export function MenuHighlights() {
  return (
    <div
      id="menu"
      className="relative z-[2] grid grid-cols-1 gap-px border-y border-hair bg-hair min-[900px]:grid-cols-3"
    >
      {menuHighlights.map((card) => (
        <Reveal
          key={card.id}
          className="group relative overflow-hidden bg-[var(--glass)] px-[clamp(22px,3.2vw,34px)] py-[clamp(32px,4.6vw,48px)] backdrop-blur-[9px] before:absolute before:inset-0 before:translate-y-[101%] before:bg-[rgba(23,21,15,0.9)] before:transition-transform before:duration-700 before:content-[''] hover:before:translate-y-0"
        >
          <div className="relative">
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <h3 className="display m-0 text-[clamp(27px,5.2vw,35px)] font-light tracking-[0.06em]">
                {card.title}
              </h3>
              <span className="jp text-[15px] tracking-[0.2em] text-gold">{card.jp}</span>
            </div>
            <p className="mb-[26px] mt-1 text-[10px] tracking-[0.22em] text-quiet uppercase">
              {card.count}
            </p>
            <ul className="mb-[26px] list-none p-0">
              {card.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline gap-2 border-b border-[rgba(237,231,218,0.07)] py-[9px] text-[13.5px] text-mid last:border-0"
                >
                  <span>
                    {item.name}
                    {item.pick && (
                      <span className="ml-1 text-[11px] text-shu" aria-label="Chef pick">
                        ✦
                      </span>
                    )}
                  </span>
                  <span className="flex-1 translate-y-[-4px] border-b border-dotted border-[rgba(237,231,218,0.2)]" />
                  <span className="whitespace-nowrap text-[12.5px] tabular-nums text-quiet">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <span className="border-b border-[rgba(201,169,107,0.35)] pb-[5px] text-[10px] tracking-[0.26em] text-gold uppercase">
              {card.more}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
