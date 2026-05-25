import Link from "next/link";

export function LogoMark({
  className = "h-8 w-8",
  title = "AI BirdView",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* Body + wing — single-color kiwi silhouette inspired by the uploaded mark */}
      <path
        fill="currentColor"
        d="M14.2 31.6c0-7.8 6.3-14.1 14.1-14.1 2.2 0 4.3.5 6.2 1.5l1.1-1.2c.6-.6 1.6-.7 2.3-.1.7.6.8 1.6.2 2.4l-.7.8c2.6 2.5 4.2 6 4.2 9.9 0 1.1-.1 2.1-.4 3.1l6.8-2.3c1.1-.4 2.3.4 2.3 1.6 0 .6-.3 1.1-.8 1.4l-7.5 4.7c-.6 1-1.3 1.9-2.1 2.7l9.3-1.4c1-.2 2 .5 2 1.6 0 .6-.4 1.2-1 1.5l-10.6 4.4a14.05 14.05 0 0 1-7.5 2.2c-7.8 0-14.1-6.3-14.1-14.1z"
      />
      {/* Light highlight crease inside the wing */}
      <path
        fill="var(--ink-0)"
        opacity="0.85"
        d="M22 30.1c2.2-3.8 6.3-6.4 11-6.5-2.6 2-4.4 4.7-5.2 7.7l-5.8-1.2z"
      />
      {/* Eye */}
      <circle cx="20.2" cy="27.6" r="1.05" fill="var(--ink-900)" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className = "",
  wordmarkClassName = "",
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="AI BirdView home"
    >
      <span className="text-kiwi-500 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-px group-hover:rotate-[-6deg]">
        <LogoMark className="h-7 w-7" />
      </span>
      <span
        className={`font-semibold tracking-[-0.022em] text-ink-800 ${wordmarkClassName}`}
      >
        AI <span className="text-kiwi-600">BirdView</span>
      </span>
    </Link>
  );
}
