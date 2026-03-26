interface AgGoLogoProps {
  size?: number;
  className?: string;
}

export default function AgGoLogo({ size = 64, className = '' }: AgGoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
        <radialGradient id="innerGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#166534" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tractorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="wheatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="cartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer glow ring */}
      <circle cx="50" cy="50" r="49" fill="none" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.4" />

      {/* Main circle background */}
      <circle cx="50" cy="50" r="46" fill="url(#bgGrad)" />
      <circle cx="50" cy="50" r="46" fill="url(#innerGrad)" />

      {/* Subtle inner border */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* ── TRACTOR (bottom-left) ── */}
      {/* Tractor body */}
      <rect x="14" y="60" width="22" height="12" rx="2" fill="url(#tractorGrad)" />
      {/* Cabin */}
      <rect x="20" y="53" width="12" height="10" rx="2" fill="#fef9c3" />
      {/* Windshield */}
      <rect x="22" y="55" width="7" height="6" rx="1" fill="#86efac" fillOpacity="0.6" />
      {/* Exhaust pipe */}
      <rect x="29" y="49" width="2.5" height="7" rx="1" fill="#fde68a" />
      <circle cx="30.25" cy="48.5" r="1.5" fill="#fde68a" />
      {/* Large rear wheel */}
      <circle cx="22" cy="73" r="8" fill="#166534" />
      <circle cx="22" cy="73" r="5.5" fill="#4ade80" />
      <circle cx="22" cy="73" r="2.5" fill="#166534" />
      {/* Tyre tread marks */}
      <line x1="22" y1="65.5" x2="22" y2="67.5" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="22" y1="78.5" x2="22" y2="80.5" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14.5" y1="73" x2="16.5" y2="73" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="27.5" y1="73" x2="29.5" y2="73" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      {/* Small front wheel */}
      <circle cx="34" cy="72" r="4.5" fill="#166534" />
      <circle cx="34" cy="72" r="2.8" fill="#4ade80" />
      <circle cx="34" cy="72" r="1.2" fill="#166534" />

      {/* ── WHEAT STALKS (top-center) ── */}
      {/* Center stalk */}
      <line x1="50" y1="42" x2="50" y2="22" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" />
      {/* Center grain head */}
      <ellipse cx="50" cy="18" rx="3.5" ry="6" fill="url(#wheatGrad)" />
      <line x1="50" y1="14" x2="50" y2="12" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Left stalk */}
      <path d="M50 38 Q44 34 40 24" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <ellipse cx="38.5" cy="20" rx="2.8" ry="5" fill="url(#wheatGrad)" transform="rotate(-20 38.5 20)" />
      <line x1="38.5" y1="16.5" x2="37.5" y2="14.8" stroke="#fde68a" strokeWidth="1.3" strokeLinecap="round" />
      {/* Right stalk */}
      <path d="M50 38 Q56 34 60 24" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <ellipse cx="61.5" cy="20" rx="2.8" ry="5" fill="url(#wheatGrad)" transform="rotate(20 61.5 20)" />
      <line x1="61.5" y1="16.5" x2="62.5" y2="14.8" stroke="#fde68a" strokeWidth="1.3" strokeLinecap="round" />
      {/* Far left stalk */}
      <path d="M50 35 Q41 31 36 20" stroke="#fde68a" strokeWidth="1.3" strokeLinecap="round" fill="none" strokeOpacity="0.75" />
      <ellipse cx="34.5" cy="16.5" rx="2.2" ry="4" fill="url(#wheatGrad)" fillOpacity="0.75" transform="rotate(-30 34.5 16.5)" />
      {/* Far right stalk */}
      <path d="M50 35 Q59 31 64 20" stroke="#fde68a" strokeWidth="1.3" strokeLinecap="round" fill="none" strokeOpacity="0.75" />
      <ellipse cx="65.5" cy="16.5" rx="2.2" ry="4" fill="url(#wheatGrad)" fillOpacity="0.75" transform="rotate(30 65.5 16.5)" />

      {/* ── SHOPPING BASKET (bottom-right) ── */}
      {/* Basket body */}
      <path d="M63 63 L65 78 H83 L85 63 Z" fill="url(#cartGrad)" />
      {/* Basket handle left arc */}
      <path d="M67 63 Q68 54 74 54 Q80 54 81 63" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Basket weave lines */}
      <line x1="65.5" y1="68" x2="84.5" y2="68" stroke="#bbf7d0" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="66.5" y1="73" x2="83.5" y2="73" stroke="#bbf7d0" strokeWidth="1" strokeOpacity="0.7" />
      {/* Basket divider lines */}
      <line x1="70.5" y1="63" x2="68.5" y2="78" stroke="#bbf7d0" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="74" y1="63" x2="74" y2="78" stroke="#bbf7d0" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="77.5" y1="63" x2="79.5" y2="78" stroke="#bbf7d0" strokeWidth="0.9" strokeOpacity="0.6" />
      {/* Small produce dots in basket */}
      <circle cx="70" cy="75" r="1.8" fill="#4ade80" />
      <circle cx="74" cy="75.5" r="1.8" fill="#fde68a" />
      <circle cx="78" cy="75" r="1.8" fill="#4ade80" />

      {/* ── CENTER HUB connecting all three ── */}
      {/* Connector lines from center to each element */}
      <line x1="50" y1="50" x2="30" y2="62" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="50" y1="50" x2="50" y2="42" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="50" y1="50" x2="70" y2="62" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,2" />
      {/* Center hub circle */}
      <circle cx="50" cy="50" r="7" fill="rgba(255,255,255,0.15)" />
      <circle cx="50" cy="50" r="5" fill="rgba(255,255,255,0.25)" />
      {/* "AG" text in center hub */}
      <text
        x="50"
        y="53.5"
        textAnchor="middle"
        fontSize="6"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        fill="white"
        letterSpacing="-0.5"
      >AG</text>
    </svg>
  );
}
