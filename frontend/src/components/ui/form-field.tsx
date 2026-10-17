import type { ReactNode } from "react";

// Atributos de acessibilidade que o input precisa receber
export type FieldA11yProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (field: FieldA11yProps) => ReactNode;
};

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-callout text-label-secondary">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p
          id={messageId}
          className={`text-callout ${error ? "text-danger" : "text-warning"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
