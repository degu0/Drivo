import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  size?: "page" | "inline";
  tone?: "neutral" | "danger";
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = "page",
  tone = "neutral",
}: EmptyStateProps) {
  const isPage = size === "page";

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 text-center ${
        isPage ? "min-h-screen gap-6" : "gap-4 py-16"
      }`}
    >
      {icon && (
        <div
          className={`flex size-12 items-center justify-center rounded-full ${
            tone === "danger"
              ? "bg-danger/15 text-danger"
              : "bg-surface-2 text-label-secondary"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="flex max-w-md flex-col gap-3">
        {isPage ? (
          <h1 className="text-large-title">{title}</h1>
        ) : (
          <h2 className="text-headline text-label">{title}</h2>
        )}
        {description && (
          <p className="text-body text-label-secondary">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {action}
        </div>
      )}
    </div>
  );
}
