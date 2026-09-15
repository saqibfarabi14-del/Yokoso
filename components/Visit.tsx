import { brand } from "@/lib/brand";
import { Reveal } from "./Reveal";

export function Visit() {
  return (
    <>
      <div className="relative z-[2] border-y border-hair bg-[var(--glass)] py-6 text-center backdrop-blur-[8px]">
        <p className="m-0 text-[10.5px] tracking-[0.3em] text-indent-[0.3em] text-gold">
          HAPPY HOUR · 17:00 — 19:00 · EVERY DAY
        </p>
      </div>

      <section id="visit" className="relative z-[2] py-[var(--sec)]">
        <div className="wrap grid grid-cols-1 gap-9 min-[760px]:grid-cols-3">
          <div>
            <h4 className="mb-3.5 mt-0 text-[10px] font-normal tracking-[0.26em] text-gold">
              HOURS
            </h4>
            <Reveal as="p" className="m-0 text-sm leading-[2] text-mid">
              Monday to Sunday
              <br />
              {brand.hours.daily}
              <br />
              Happy hour {brand.hours.happyHour}
            </Reveal>
          </div>
          <div>
            <h4 className="mb-3.5 mt-0 text-[10px] font-normal tracking-[0.26em] text-gold">
              FIND US
            </h4>
            <Reveal as="p" className="m-0 text-sm leading-[2] text-mid">
              {brand.address.line1}
              <br />
              {brand.address.line2}
              <br />
              {brand.address.city}
            </Reveal>
          </div>
          <div>
            <h4 className="mb-3.5 mt-0 text-[10px] font-normal tracking-[0.26em] text-gold">
              RESERVATIONS
            </h4>
            <Reveal as="p" className="m-0 text-sm leading-[2] text-mid">
              <a href={`tel:${brand.phoneTel}`} className="hover:text-silk">
                {brand.phone}
              </a>
              <br />
              Walk-ins before 19:00
              <br />
              Private dining, 24 hours notice
            </Reveal>
          </div>
        </div>

        <Reveal className="wrap mt-12">
          <div
            className="flex min-h-[220px] items-center justify-center border border-hair bg-[var(--glass)] backdrop-blur-[8px]"
            aria-label="Map placeholder — Al Madani Tower, Mirboxtula, Sylhet"
          >
            <div className="text-center">
              <p className="eyebrow mb-2">Map</p>
              <p className="display m-0 text-xl tracking-[0.08em] text-mid">
                Mirboxtula · Ambarkhana · Sylhet
              </p>
              <p className="mt-2 text-[11px] tracking-[0.18em] text-quiet">
                Al Madani Tower, 2nd floor
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
