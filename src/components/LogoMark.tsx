// Komponentguiden logo mark — a slate hexagon frame holding a flat isometric
// component (cube) in three tones of indigo. Frame = soft slate (#334155);
// cube = brand indigo. Used in the navbar, footer, and anywhere the icon appears.
export default function LogoMark({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Komponentguiden"
      focusable="false"
    >
      <polygon
        points="24,3 42.2,13.5 42.2,34.5 24,45 5.8,34.5 5.8,13.5"
        fill="none"
        stroke="#334155"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <polygon points="24,11 35,17.5 24,24 13,17.5" fill="#8b85ff" />
      <polygon points="13,17.5 24,24 24,37 13,30.5" fill="#4f46e5" />
      <polygon points="35,17.5 24,24 24,37 35,30.5" fill="#635bff" />
    </svg>
  );
}
