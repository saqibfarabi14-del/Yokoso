type Props = {
  onReserve: () => void;
};

export function Footer({ onReserve }: Props) {
  return (
    <>
      <section className="relative z-[2] border-t border-hair py-[var(--sec)] text-center">
        <div className="wrap">
          <div className="vert mx-auto mb-7 inline-block h-[72px] text-[13px]">ようこそ</div>
          <h2 className="display m-0 mb-[30px] text-[clamp(28px,7vw,54px)] font-light tracking-[0.1em]">
            Reserve a table
          </h2>
          <button type="button" className="btn" onClick={onReserve}>
            BOOK NOW
          </button>
        </div>
      </section>

      <footer className="relative z-[2] flex flex-wrap justify-between gap-3.5 border-t border-hair px-[var(--gut)] py-[26px] pb-[52px] text-[10px] tracking-[0.16em] text-quiet">
        <span>YŌKOSO · SYLHET</span>
        <span>৳150 — 1,950</span>
      </footer>
    </>
  );
}
