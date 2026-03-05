export function DallahLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="كيف الضيافة - شعار"
    >
      <ellipse cx="38" cy="50" rx="24" ry="18" fill="url(#gold-grad)" />
      <rect x="30" y="24" width="16" height="14" rx="4" fill="url(#gold-grad)" />
      <path
        d="M60 42 Q74 36 72 50 Q70 58 60 54"
        stroke="#D4A017"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 44 Q4 44 4 54 Q4 64 14 64"
        stroke="#D4A017"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="38" cy="24" rx="9" ry="4.5" fill="#D4A017" />
      <circle cx="38" cy="18" r="4" fill="#D4A017" />
      <line x1="24" y1="50" x2="52" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="22" y1="56" x2="54" y2="56" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}
