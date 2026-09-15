type SealProps = {
  className?: string;
  size?: number;
  glow?: boolean;
};

export function Seal({ className = "", size, glow = false }: SealProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {glow && (
        <defs>
          <filter id="kiln">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.045"
              numOctaves={4}
              seed={19}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={5}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      )}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="#B23A26"
        filter={glow ? "url(#kiln)" : undefined}
      />
      <path
        d="M100,30 C156,64 156,136 100,170 C44,136 44,64 100,30 Z"
        fill="none"
        stroke="#EDE7DA"
        strokeWidth={glow ? 5 : 6.5}
        strokeLinejoin="round"
      />
      <path
        d="M62,54 C94,81 94,123 62,150 C30,123 30,81 62,54 Z"
        fill="none"
        stroke="#EDE7DA"
        strokeWidth={glow ? 5 : 6.5}
        strokeLinejoin="round"
      />
      <path
        d="M138,54 C170,81 170,123 138,150 C106,123 106,81 138,54 Z"
        fill="none"
        stroke="#EDE7DA"
        strokeWidth={glow ? 5 : 6.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
