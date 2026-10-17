"use client";

import Link from "next/link";
import { Button, buttonClass } from "./button";
import { EmptyState } from "./empty-state";
import { WarningIcon } from "./icons";

export function ErrorState({
  title = "Não foi possível carregar",
  description = "Pode ser instabilidade no servidor ou na sua conexão. Tente novamente em instantes.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry: () => void;
}) {
  return (
    <EmptyState
      tone="danger"
      icon={<WarningIcon />}
      title={title}
      description={description}
      action={
        <>
          <Button size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
          <Link
            href="/"
            className={buttonClass({ variant: "secondary", size: "sm" })}
          >
            Ir para a garagem
          </Link>
        </>
      }
    />
  );
}
