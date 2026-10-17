"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateProfile, type ProfileActionResult } from "./actions";
import { profileSchema, type ProfileInput } from "./schemas";
import { cardClass, cardFooterClass, inputClass, labelClass } from "./styles";

type ProfileFormProps = {
  name: string;
  email: string;
};

function splitName(name: string) {
  const [firstName = "", ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}

export function ProfileForm({ name, email }: ProfileFormProps) {
  const [result, setResult] = useState<ProfileActionResult>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: { ...splitName(name), email },
  });

  const onSubmit = handleSubmit((data) => {
    setResult(undefined);
    startTransition(async () => {
      setResult(await updateProfile(data));
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className={labelClass}>
              Nome
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              className={inputClass}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-callout text-danger">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className={labelClass}>
              Sobrenome
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              className={inputClass}
              {...register("lastName")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-callout text-danger">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className={cardFooterClass}>
        <FooterMessage
          result={result}
          fallback="Alterações salvas ficam visíveis na hora."
        />
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="h-11 shrink-0 cursor-pointer rounded-xl bg-accent px-5 text-body font-semibold text-white transition hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Salvando…" : "Salvar"}
        </button>
      </div>
    </form>
  );
}

export function FooterMessage({
  result,
  fallback,
}: {
  result?: ProfileActionResult;
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
