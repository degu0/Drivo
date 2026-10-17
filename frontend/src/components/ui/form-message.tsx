import type { ActionResult } from "@/lib/action-result";

export function FormMessage({
  result,
  fallback,
}: {
  result?: ActionResult;
  fallback: string;
}) {
  if (result && "error" in result) {
    return (
      <p role="alert" className="text-callout text-danger">
        {result.error}
      </p>
    );
  }
  if (result && "success" in result) {
    return (
      <p role="status" className="text-callout text-success">
        {result.success}
      </p>
    );
  }
  return <p className="text-callout text-label-tertiary">{fallback}</p>;
}
