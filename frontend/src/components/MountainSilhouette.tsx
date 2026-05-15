export function MountainSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.42 0.015 60)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.42 0.015 60)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.36 0.12 22)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.16 0.01 60)" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M0,260 L120,180 L210,220 L320,120 L430,200 L560,90 L660,170 L770,110 L900,200 L1020,140 L1140,210 L1260,160 L1360,220 L1440,180 L1440,320 L0,320 Z"
        fill="url(#m1)"
      />
      <path
        d="M0,290 L140,230 L260,270 L380,200 L520,260 L640,190 L780,250 L900,210 L1040,260 L1180,220 L1320,260 L1440,230 L1440,320 L0,320 Z"
        fill="url(#m2)"
      />
    </svg>
  );
}
