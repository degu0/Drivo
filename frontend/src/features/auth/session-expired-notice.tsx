"use client";

import { useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";

export function SessionExpiredNotice() {
  const expired = useSearchParams().get("expired") === "1";
  if (!expired) return null;

  return <Alert tone="info">Sua sessão expirou. Entre novamente.</Alert>;
}
