"use client";

import { useState } from "react";
import { Seal } from "./Seal";

type Props = {
  onReserve: () => void;
};

const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#room", label: "Private Dining" },
  { href: "#visit", label: "Visit" },
];

export function Header({ onReserve }: Props) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-[70] border-b border-hair bg-[rgba(11,10,9,0.5)] backdrop-blur-[22px] backdrop-saturate-150">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-[18px] px-[var(--gut)] py-3">
          <a href="#top" className="flex items-center gap-[13px]" aria-label="Yōkoso home">
            <Seal size={30} />
            <span className="display text-base tracking-[0.3em] text-indent-[0.3em]">
              YŌKOSO
            </span>
          </a>

          <nav className="hidden gap-[clamp(16px,2.4vw,32px)] text-[11px] tracking-[0.2em] min-[980px]:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative pb-[3px] text-mid transition-colors hover:text-silk after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button type="button" className="btn" onClick={onReserve}>
            RESERVE
          </button>

          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent py-2.5 pl-3.5 min-[980px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`mb-1.5 block h-px w-6 bg-silk transition duration-500 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`mb-1.5 block h-px w-6 bg-silk transition duration-500 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-silk transition duration-500 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-sheet"
        className={`fixed inset-0 z-[65] flex flex-col justify-center bg-[rgba(11,10,9,0.94)] px-[var(--gut)] backdrop-blur-[26px] transition duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="vert absolute right-[var(--gut)] top-[15%] h-[36%] text-sm">
          ようこそ
        </div>
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={close}
            className="display border-0 border-b border-hair py-[13px] text-[clamp(28px,8.4vw,42px)] tracking-[0.12em]"
          >
            {n.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            close();
            onReserve();
          }}
          className="display cursor-pointer border-0 border-b border-hair bg-transparent py-[13px] text-left text-[clamp(28px,8.4vw,42px)] tracking-[0.12em] text-silk"
        >
          Reserve
        </button>
      </div>
    </>
  );
}
