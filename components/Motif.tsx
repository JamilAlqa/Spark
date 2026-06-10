import type { MotifName } from "@/types/idea";

export default function Motif({
  name,
  color,
}: {
  name: MotifName;
  color: string;
}) {
  switch (name) {
    case "bolt":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M55 12 L30 54 H48 L44 88 L74 40 H54 Z" />
          <path d="M22 30 l-7 -7 M80 70 l7 7 M78 22 l8 -8 M20 76 l-8 8" strokeWidth="2" />
        </svg>
      );
    case "wheel":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round">
          <circle cx="62" cy="50" r="26" />
          <circle cx="62" cy="50" r="9" />
          <path d="M8 36 H38 M2 50 H32 M8 64 H38" strokeWidth="2.2" />
        </svg>
      );
    case "steam":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round">
          <path d="M24 62 H76 A26 26 0 0 1 50 88 A26 26 0 0 1 24 62 Z" />
          <path d="M38 48 c0-8 6-8 6-16 M52 48 c0-8 6-8 6-16 M66 48 c0-8 6-8 6-16" strokeWidth="2.2" />
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <path d="M50 88 V58 M50 58 C50 42 30 46 26 28 M50 58 C50 40 70 48 76 24 M50 70 C42 64 34 66 28 56 M50 64 C60 58 66 60 72 50" />
          <circle cx="26" cy="24" r="4" fill={color} stroke="none" />
          <circle cx="76" cy="20" r="4" fill={color} stroke="none" />
          <circle cx="28" cy="52" r="3.4" fill={color} stroke="none" />
          <circle cx="73" cy="46" r="3.4" fill={color} stroke="none" />
        </svg>
      );
    case "arch":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 86 V44 A22 22 0 0 1 72 44 V86" />
          <path d="M16 86 H84" strokeWidth="2.2" />
          <circle cx="50" cy="22" r="4" />
        </svg>
      );
    case "asterisk":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round">
          <path d="M50 24 V76 M27 37 L73 63 M73 37 L27 63" />
          <circle cx="50" cy="50" r="34" strokeWidth="2" strokeDasharray="3 7" />
        </svg>
      );
  }
}
