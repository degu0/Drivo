import type { ReactNode } from "react";

type Tone = "danger" | "info";

const tones: Record<Tone, string> = {
  danger: "bg-danger/10 text-danger",
  info: "bg-accent/10 text-accent",
};

export function Alert({
  tone = "danger",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <p
      role={tone === "danger" ? "alert" : "status"}
      className={`rounded-xl px-4 py-3 text-callout ${tones[tone]}`}
    >
      {children}
    </p>
  );
}
