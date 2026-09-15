"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import { Seal } from "./Seal";
import { Reveal } from "./Reveal";

export function Hero() {
  const [status, setStatus] = useState({ text: "OPEN DAILY · 12:00 — 23:00", open: true });

  useEffect(() => {
    const paint = () => {
      let h: number;
      try {
        h = parseInt(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Dhaka",
            hour: "2-digit",
            hour12: false,
          }).format(new Date()),
          10
        );
      } catch {
        h = new Date().getHours();
      }
      if (h >= 17 && h < 19) {
        setStatus({ text: "HAPPY HOUR · ON NOW UNTIL 19:00", open: true });
      } else if (h >= 12 && h < 23) {
        setStatus({
          text: h < 17 ? "OPEN NOW · HAPPY HOUR FROM 17:00" : "OPEN NOW · KITCHEN UNTIL 23:00",
          open: true,
        });
      } else {
        setStatus({ text: "CLOSED · WE OPEN TOMORROW AT 12:00", open: false });
      }
    };
    paint();
    const id = setInterval(paint, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-0 pb-[clamp(44px,7vw,72px)] pt-[clamp(60px,11vw,116px)] text-center">
      <div className="vert absolute right-[var(--gut)] top-[5%] h-[44%] text-[12.5px] opacity-70">
        {brand.taglineJa}
      </div>
      <div className="wrap relative z-[3]">
        <Seal
          glow
          className="mx-auto mb-[clamp(26px,4.4vw,40px)] block w-[clamp(70px,13.5vw,98px)] drop-shadow-[0_0_40px_rgba(178,58,38,0.4)]"
        />
        <h1 className="display m-0 text-[clamp(40px,12.5vw,110px)] font-light leading-none tracking-[0.32em] text-indent-[0.32em]">
          YŌKOSO
        </h1>
        <Reveal as="p" className="display mx-auto mt-[clamp(20px,3.6vw,30px)] max-w-[34ch] text-[clamp(17px,3.6vw,23px)] leading-[1.55] tracking-[0.05em] text-mid">
          Destination dining in Sylhet — eighteen sushi compositions, two signature boats, and a Pan-Asian kitchen of quiet precision.
        </Reveal>
        <div
          className="mt-[26px] inline-flex items-center gap-2.5 border border-hair bg-[var(--glass)] px-5 py-[9px] text-[10px] tracking-[0.26em] text-indent-[0.26em] text-mid backdrop-blur-[9px]"
          role="status"
        >
          <i
            className={`block h-[5px] w-[5px] shrink-0 rounded-full ${
              status.open
                ? "bg-gold shadow-[0_0_0_0_rgba(201,169,107,0.5)] animate-pulse"
                : "bg-[var(--quiet)]"
            }`}
            aria-hidden="true"
          />
          <span>{status.text}</span>
        </div>
        <Reveal className="mt-[clamp(38px,6.4vw,64px)] flex flex-wrap justify-center border-y border-hair bg-[var(--glass)] backdrop-blur-[9px]">
          {brand.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 basis-[126px] px-2.5 py-5 ${i ? "border-l border-hair" : ""}`}
            >
              <b className="display mb-1 block text-[clamp(24px,5.4vw,34px)] font-light leading-[1.05] tabular-nums">
                {s.value}
              </b>
              <span className="text-[9px] tracking-[0.24em] text-quiet uppercase">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
