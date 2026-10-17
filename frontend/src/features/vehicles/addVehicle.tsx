import Link from "next/link";

export function AddVehicle({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-72 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-separator p-8 text-center transition hover:border-label-tertiary hover:bg-surface"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-label transition group-hover:bg-surface-3">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-headline text-label">Adicionar veículo</h2>
        <p className="text-footnote text-label-secondary">
          Preencha manualmente ou importe o CRLV
        </p>
      </div>
    </Link>
  );
}
