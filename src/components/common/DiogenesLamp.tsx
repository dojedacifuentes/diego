/**
 * Abstract lantern mark for Diógenes Lab.
 * Geometric, not literal — a frame holding a flame.
 */
export function DiogenesLamp({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Handle */}
      <path d="M9 4.5 C9 2.8 15 2.8 15 4.5" />
      {/* Frame */}
      <path d="M8 7 H16 L17 18 H7 Z" />
      {/* Inner flame */}
      <path
        d="M12 10.2 C13.6 12 13.8 13.4 12 15 C10.2 13.4 10.4 12 12 10.2 Z"
        fill="currentColor"
        stroke="none"
        opacity="0.9"
      />
      {/* Base */}
      <path d="M9.5 21 H14.5" />
    </svg>
  );
}
