interface AgGoLogoProps {
  size?: number;
  className?: string;
}

export default function AgGoLogo({ size = 64, className = '' }: AgGoLogoProps) {
  const id = `aggo-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Background gradient – deep tech green to dark teal */}
        <linearGradient id={`bg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2818" />
          <stop offset="100%" stopColor="#0a2420" />
        </linearGradient>

        {/* Outer ring glow */}
        <linearGradient id={`ring-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Equipment accent – electric blue */}
        <linearGradient id={`eq-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>

        {/* Marketplace accent – warm amber-gold */}
        <linearGradient id={`mkt-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Shopper accent – violet-emerald */}
        <linearGradient id={`sh-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Center glow */}
        <radialGradient id={`ctr-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>

        {/* Segment glows */}
        <radialGradient id={`glow-eq-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow-mkt-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow-sh-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`clip-${id}`}>
          <circle cx="60" cy="60" r="55" />
        </clipPath>
      </defs>

      {/* ── Base circle ── */}
      <circle cx="60" cy="60" r="58" fill={`url(#bg-${id})`} />

      {/* ── Subtle hex grid overlay ── */}
      <g clipPath={`url(#clip-${id})`} opacity="0.06" stroke="#34d399" strokeWidth="0.5">
        <line x1="60" y1="5" x2="60" y2="115" />
        <line x1="5" y1="32" x2="115" y2="88" />
        <line x1="5" y1="88" x2="115" y2="32" />
        <circle cx="60" cy="60" r="25" />
        <circle cx="60" cy="60" r="42" />
      </g>

      {/* ── Outer glow ring ── */}
      <circle cx="60" cy="60" r="55" fill="none" stroke={`url(#ring-${id})`} strokeWidth="2.5" />
      {/* inner soft ring */}
      <circle cx="60" cy="60" r="51" fill="none" stroke="#34d399" strokeWidth="0.5" strokeOpacity="0.2" />

      {/* ── Three segment zone glows ── */}
      {/* Equipment – top-left zone */}
      <circle cx="35" cy="38" r="26" fill={`url(#glow-eq-${id})`} />
      {/* Marketplace – top-right zone */}
      <circle cx="85" cy="38" r="26" fill={`url(#glow-mkt-${id})`} />
      {/* Shopper – bottom-center zone */}
      <circle cx="60" cy="85" r="26" fill={`url(#glow-sh-${id})`} />

      {/* ── Divider lines from center ── */}
      <line x1="60" y1="60" x2="60" y2="10" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="60" y1="60" x2="14" y2="85" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="60" y1="60" x2="106" y2="85" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.25" />

      {/* ══════════════════════════════════
          EQUIPMENT RENTER — top-left
          Clean tractor silhouette (line art)
          ══════════════════════════════════ */}
      {/* Tractor body */}
      <rect x="22" y="37" width="20" height="10" rx="2.5" fill="none" stroke={`url(#eq-${id})`} strokeWidth="1.8" />
      {/* Cabin roof */}
      <path d="M28 37 L30 31 L38 31 L40 37" fill="none" stroke={`url(#eq-${id})`} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Cabin window */}
      <rect x="30.5" y="32.5" width="6" height="4" rx="1" fill={`url(#eq-${id})`} fillOpacity="0.3" stroke={`url(#eq-${id})`} strokeWidth="0.8" />
      {/* Exhaust */}
      <line x1="37" y1="28" x2="37" y2="32" stroke={`url(#eq-${id})`} strokeWidth="1.6" strokeLinecap="round" />
      {/* Large rear wheel */}
      <circle cx="28" cy="50" r="6.5" fill="none" stroke={`url(#eq-${id})`} strokeWidth="1.8" />
      <circle cx="28" cy="50" r="3" fill={`url(#eq-${id})`} fillOpacity="0.4" />
      {/* Wheel spokes */}
      <line x1="28" y1="44" x2="28" y2="56" stroke={`url(#eq-${id})`} strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="22" y1="50" x2="34" y2="50" stroke={`url(#eq-${id})`} strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="23.6" y1="45.4" x2="32.4" y2="54.6" stroke={`url(#eq-${id})`} strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="32.4" y1="45.4" x2="23.6" y2="54.6" stroke={`url(#eq-${id})`} strokeWidth="0.8" strokeOpacity="0.6" />
      {/* Small front wheel */}
      <circle cx="40" cy="49" r="4" fill="none" stroke={`url(#eq-${id})`} strokeWidth="1.6" />
      <circle cx="40" cy="49" r="1.5" fill={`url(#eq-${id})`} fillOpacity="0.4" />
      {/* Label dot */}
      <circle cx="28" cy="20" r="2" fill={`url(#eq-${id})`} />

      {/* ══════════════════════════════════
          MARKETPLACE — top-right
          Minimal wheat / crop icon
          ══════════════════════════════════ */}
      {/* Center stalk */}
      <line x1="85" y1="55" x2="85" y2="25" stroke={`url(#mkt-${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Top grain */}
      <ellipse cx="85" cy="21" rx="3.5" ry="5.5" fill="none" stroke={`url(#mkt-${id})`} strokeWidth="1.6" />
      <ellipse cx="85" cy="21" rx="1.5" ry="3" fill={`url(#mkt-${id})`} fillOpacity="0.35" />
      <line x1="85" y1="16" x2="85" y2="14" stroke={`url(#mkt-${id})`} strokeWidth="1.4" strokeLinecap="round" />
      {/* Left branch */}
      <path d="M85 45 C80 42 76 36 77 29" stroke={`url(#mkt-${id})`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="76" cy="25.5" rx="2.8" ry="4.8" fill="none" stroke={`url(#mkt-${id})`} strokeWidth="1.4" transform="rotate(-18 76 25.5)" />
      <ellipse cx="76" cy="25.5" rx="1.2" ry="2.4" fill={`url(#mkt-${id})`} fillOpacity="0.35" transform="rotate(-18 76 25.5)" />
      {/* Right branch */}
      <path d="M85 45 C90 42 94 36 93 29" stroke={`url(#mkt-${id})`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="94" cy="25.5" rx="2.8" ry="4.8" fill="none" stroke={`url(#mkt-${id})`} strokeWidth="1.4" transform="rotate(18 94 25.5)" />
      <ellipse cx="94" cy="25.5" rx="1.2" ry="2.4" fill={`url(#mkt-${id})`} fillOpacity="0.35" transform="rotate(18 94 25.5)" />
      {/* Extra outer branches */}
      <path d="M85 40 C78 37 74 30 75 23" stroke={`url(#mkt-${id})`} strokeWidth="1.1" strokeLinecap="round" fill="none" strokeOpacity="0.55" />
      <path d="M85 40 C92 37 96 30 95 23" stroke={`url(#mkt-${id})`} strokeWidth="1.1" strokeLinecap="round" fill="none" strokeOpacity="0.55" />
      {/* Label dot */}
      <circle cx="92" cy="20" r="2" fill={`url(#mkt-${id})`} />

      {/* ══════════════════════════════════
          SHOPPER — bottom-center
          Clean minimal shopping bag / basket
          ══════════════════════════════════ */}
      {/* Bag body */}
      <path d="M47 82 L49 100 H71 L73 82 Z" fill="none" stroke={`url(#sh-${id})`} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Handle */}
      <path d="M53 82 Q53 72 60 72 Q67 72 67 82" fill="none" stroke={`url(#sh-${id})`} strokeWidth="2" strokeLinecap="round" />
      {/* Inner fill glow */}
      <path d="M48.5 84 L50.5 98 H69.5 L71.5 84 Z" fill={`url(#sh-${id})`} fillOpacity="0.12" />
      {/* Horizontal detail lines */}
      <line x1="49.5" y1="88.5" x2="70.5" y2="88.5" stroke={`url(#sh-${id})`} strokeWidth="0.9" strokeOpacity="0.5" />
      <line x1="50.5" y1="93.5" x2="69.5" y2="93.5" stroke={`url(#sh-${id})`} strokeWidth="0.9" strokeOpacity="0.5" />
      {/* Stylised tag */}
      <circle cx="60" cy="77" r="2.2" fill={`url(#sh-${id})`} fillOpacity="0.5" stroke={`url(#sh-${id})`} strokeWidth="0.8" />
      {/* Label dot */}
      <circle cx="60" cy="103" r="2" fill={`url(#sh-${id})`} />

      {/* ══════════════════════════════════
          CENTER NEXUS
          ══════════════════════════════════ */}
      {/* Center glow pool */}
      <circle cx="60" cy="60" r="14" fill={`url(#ctr-${id})`} />
      {/* Center ring */}
      <circle cx="60" cy="60" r="10" fill="none" stroke="#34d399" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Thin inner fill */}
      <circle cx="60" cy="60" r="9" fill="#0d2818" fillOpacity="0.9" />
      {/* Three micro-nodes on the inner ring for each role */}
      <circle cx="60" cy="50" r="2.2" fill={`url(#mkt-${id})`} />
      <circle cx="51.3" cy="64.5" r="2.2" fill={`url(#eq-${id})`} />
      <circle cx="68.7" cy="64.5" r="2.2" fill={`url(#sh-${id})`} />
      {/* Center monogram */}
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="#34d399"
        letterSpacing="0.5"
      >AG</text>

      {/* ── Outer edge shimmer dots ── */}
      <circle cx="60" cy="5.5" r="2" fill="#34d399" fillOpacity="0.7" />
      <circle cx="113.2" cy="87" r="1.5" fill="#34d399" fillOpacity="0.45" />
      <circle cx="6.8" cy="87" r="1.5" fill="#34d399" fillOpacity="0.45" />
    </svg>
  );
}
