"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { brand } from "@/lib/brand";

type PickState = {
  party: string;
  date: string;
  time: string;
  name: string;
  phone: string;
};

const TIMES = ["12:30", "13:30", "18:00", "19:00", "20:00", "21:00", "22:00"];
const PARTIES = ["2", "3", "4", "5", "6", "8", "10+"];

function dateOptions(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    let label: string;
    try {
      label = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(d);
    } catch {
      label = d.toDateString();
    }
    out.push(i === 0 ? "Tonight" : i === 1 ? "Tomorrow" : label);
  }
  return out;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Reservation({ open, onClose }: Props) {
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [pick, setPick] = useState<PickState>({
    party: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });
  const dates = dateOptions();

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setConfirmed(false);
    setPick({ party: "", date: "", time: "", name: "", phone: "" });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const select = useCallback((key: keyof PickState, value: string) => {
    setPick((p) => ({ ...p, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, 4)), 180);
  }, []);

  const summary = [pick.party && `${pick.party} guests`, pick.date, pick.time]
    .filter(Boolean)
    .join("  ·  ");

  const canConfirm =
    pick.party && pick.date && pick.time && pick.name.trim() && pick.phone.trim();

  const confirm = () => {
    if (!canConfirm) return;
    setConfirmed(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[180] flex flex-col bg-[rgba(11,10,9,0.97)] backdrop-blur-[28px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-between border-b border-hair px-[var(--gut)] py-4">
        <span className="font-variant-numeric tabular-nums text-[10px] tracking-[0.3em] text-gold">
          {confirmed ? "CONFIRMED" : `0${Math.min(step + 1, 5)} / 05`}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="display cursor-pointer border-0 bg-transparent px-2 py-1 text-[26px] leading-none text-silk"
          aria-label="Close reservation"
        >
          ×
        </button>
      </div>

      <div className="flex flex-1 place-items-center overflow-y-auto px-[var(--gut)] py-6">
        <div className="mx-auto w-full max-w-[620px] text-center">
          {confirmed ? (
            <div>
              <p className="eyebrow">We look forward to welcoming you</p>
              <h3
                id={titleId}
                className="display m-0 mb-8 text-[clamp(28px,7.4vw,48px)] leading-[1.2] tracking-[0.05em]"
              >
                Your table is held
              </h3>
              <p className="mx-auto mb-2 max-w-[36ch] text-mid">
                {pick.name}, party of {pick.party}
              </p>
              <p className="mb-2 text-gold">
                {pick.date} · {pick.time}
              </p>
              <p className="mb-10 text-[13px] text-quiet">
                We will confirm by phone at {pick.phone}. For changes, call{" "}
                <a href={`tel:${brand.phoneTel}`} className="text-silk underline-offset-4 hover:underline">
                  {brand.phone}
                </a>
                .
              </p>
              <button type="button" className="btn" onClick={onClose}>
                CLOSE
              </button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <Step title="How many of you?" titleId={titleId}>
                  <Opts
                    list={PARTIES}
                    selected={pick.party}
                    onSelect={(v) => select("party", v)}
                  />
                </Step>
              )}
              {step === 1 && (
                <Step title="Which evening?" titleId={titleId}>
                  <Opts
                    list={dates}
                    selected={pick.date}
                    onSelect={(v) => select("date", v)}
                  />
                </Step>
              )}
              {step === 2 && (
                <Step title="What time?" titleId={titleId}>
                  <Opts
                    list={TIMES}
                    selected={pick.time}
                    onSelect={(v) => select("time", v)}
                  />
                </Step>
              )}
              {step === 3 && (
                <Step title="And your name?" titleId={titleId}>
                  <label className="sr-only" htmlFor="res-name">
                    Your name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name"
                    value={pick.name}
                    onChange={(e) => setPick((p) => ({ ...p, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && pick.name.trim()) setStep(4);
                    }}
                    className="display w-full max-w-[460px] border-0 border-b border-hair bg-transparent px-0 py-3 text-center text-[clamp(24px,6vw,38px)] tracking-[0.04em] text-silk outline-none focus:border-gold"
                  />
                  <div className="mt-10">
                    <button
                      type="button"
                      className="btn"
                      disabled={!pick.name.trim()}
                      onClick={() => pick.name.trim() && setStep(4)}
                    >
                      CONTINUE
                    </button>
                  </div>
                </Step>
              )}
              {step === 4 && (
                <Step title="A number to reach you?" titleId={titleId}>
                  <label className="sr-only" htmlFor="res-phone">
                    Phone number
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone"
                    value={pick.phone}
                    onChange={(e) => setPick((p) => ({ ...p, phone: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") confirm();
                    }}
                    className="display w-full max-w-[460px] border-0 border-b border-hair bg-transparent px-0 py-3 text-center text-[clamp(24px,6vw,38px)] tracking-[0.04em] text-silk outline-none focus:border-gold"
                  />
                  <div className="mt-10">
                    <button
                      type="button"
                      className="btn"
                      disabled={!canConfirm}
                      onClick={confirm}
                    >
                      CONFIRM RESERVATION
                    </button>
                  </div>
                </Step>
              )}
            </>
          )}
        </div>
      </div>

      {!confirmed && (
        <div className="flex items-center justify-between gap-3.5 border-t border-hair px-[var(--gut)] py-[18px] pb-[clamp(26px,6vw,46px)]">
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent py-2.5 font-[inherit] text-[10px] tracking-[0.26em] text-quiet"
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            ← BACK
          </button>
          <span className="text-[11px] tracking-[0.1em] text-quiet">{summary}</span>
        </div>
      )}
    </div>
  );
}

function Step({
  title,
  titleId,
  children,
}: {
  title: string;
  titleId: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        id={titleId}
        className="display m-0 mb-[34px] text-[clamp(28px,7.4vw,52px)] leading-[1.2] tracking-[0.05em]"
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Opts({
  list,
  selected,
  onSelect,
}: {
  list: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {list.map((label) => {
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(label)}
            className={`display cursor-pointer border px-[22px] py-[13px] text-[19px] tracking-[0.05em] transition-colors duration-400 ${
              active
                ? "border-gold bg-gold text-sumi"
                : "border-hair bg-transparent text-mid hover:border-gold hover:bg-gold hover:text-sumi"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
