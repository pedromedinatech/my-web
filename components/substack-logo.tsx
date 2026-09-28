interface SubstackLogoProps {
  size?: number;
  className?: string;
  color?: string;
}

export function SubstackLogo({
  size = 13,
  className = "",
  color = "#FF6719",
}: SubstackLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className={className}
    >
      <path d="M3.5 2.5h17v2.6h-17zM3.5 7.2h17v2.6h-17zM3.5 11.9h17V22l-8.5-4.8L3.5 22z" />
    </svg>
  );
}
