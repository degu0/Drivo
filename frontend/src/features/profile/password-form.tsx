"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { FormMessage } from "@/components/ui/form-message";
import type { ActionResult } from "@/lib/action-result";
import { applyFieldErrors } from "@/lib/form-errors";
import { updatePassword } from "./actions";
import { passwordSchema, type PasswordInput } from "./schemas";
import { cardClass, cardFooterClass, inputClass } from "./styles";

export function PasswordForm() {
  const [result, setResult] = useState<ActionResult>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setResult(undefined);
    startTransition(async () => {
      const response = await updatePassword(data);
      applyFieldErrors(response, setError);
      setResult(response);
      if ("success" in response) reset();
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-5 p-6">
        <FormField
          id="currentPassword"
          label="Senha atual"
          error={errors.currentPassword?.message}
        >
          {(field) => (
            <input
              {...field}
              type="password"
              autoComplete="current-password"
              className={inputClass}
              {...register("currentPassword")}
            />
          )}
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="password" label="Nova senha" error={errors.password?.message}>
            {(field) => (
              <input
                {...field}
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo de 8 caracteres"
                className={inputClass}
                {...register("password")}
              />
            )}
          </FormField>

          <FormField
            id="confirmPassword"
            label="Confirmar nova senha"
            error={errors.confirmPassword?.message}
          >
            {(field) => (
              <input
                {...field}
                type="password"
                autoComplete="new-password"
                placeholder="Repita a nova senha"
                className={inputClass}
                {...register("confirmPassword")}
              />
            )}
          </FormField>
        </div>
      </div>

      <div className={cardFooterClass}>
        <FormMessage result={result} fallback="Altere sua senha com segurança" />
        <Button
          type="submit"
          variant="tertiary"
          loading={isPending}
          loadingText="Alterando…"
        >
          Alterar senha
        </Button>
      </div>
    </form>
  );
}
