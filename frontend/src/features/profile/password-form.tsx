"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updatePassword, type ProfileActionResult } from "./actions";
import { FooterMessage } from "./profile-form";
import { passwordSchema, type PasswordInput } from "./schemas";
import { cardClass, cardFooterClass, inputClass, labelClass } from "./styles";

export function PasswordForm() {
  const [result, setResult] = useState<ProfileActionResult>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setResult(undefined);
    startTransition(async () => {
      const response = await updatePassword(data);
      setResult(response);
      if ("success" in response) reset();
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className={labelClass}>
            Senha atual
          </label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.currentPassword}
            className={inputClass}
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-callout text-danger">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className={labelClass}>
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              aria-invalid={!!errors.password}
              className={inputClass}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-callout text-danger">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirmar nova senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              aria-invalid={!!errors.confirmPassword}
              className={inputClass}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-callout text-danger">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={cardFooterClass}>
        <FooterMessage
          result={result}
          fallback="Altere sua senha com segurança"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-11 shrink-0 cursor-pointer rounded-xl bg-surface-3 px-5 text-body font-semibold text-label transition hover:bg-surface-4 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Alterando…" : "Alterar senha"}
        </button>
      </div>
    </form>
  );
}
