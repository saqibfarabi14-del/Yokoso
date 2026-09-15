import { chefsPicks } from "@/lib/menu";
import { Reveal } from "./Reveal";

export function ChefsPicks() {
  return (
    <section className="relative z-[2] py-[var(--sec)]">
      <div className="wrap">
        <p className="eyebrow">✦ &nbsp; What the kitchen would order</p>
        <ol className="mt-[30px] list-none p-0">
          {chefsPicks.map((dish) => (
            <Reveal
              key={dish.name}
              as="li"
              className="group relative flex items-baseline gap-3.5 border-b border-hair py-[18px] transition-[padding] duration-600 hover:pl-[38px] before:absolute before:left-0 before:top-1/2 before:h-px before:w-0 before:bg-gold before:transition-[width] before:duration-600 before:content-[''] hover:before:w-[26px]"
            >
              <span className="display text-[clamp(18px,3.6vw,23px)] tracking-[0.03em]">
                {dish.name}
              </span>
              <span className="hidden flex-1 text-xs text-quiet min-[760px]:block">
                {dish.detail}
              </span>
              <span className="ml-auto whitespace-nowrap text-[13px] tabular-nums text-gold">
                {dish.price}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
