import Link from "next/link";

export function PageHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/"
        className="flex w-fit items-center gap-1 text-callout text-accent transition hover:text-accent-hover active:text-accent-pressed"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>
      <h1 className="truncate text-large-title">{title}</h1>
      {subtitle && (
        <p className="text-body text-label-secondary">{subtitle}</p>
      )}
    </div>
  );
}
