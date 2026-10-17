"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { FormMessage } from "@/components/ui/form-message";
import type { ActionResult } from "@/lib/action-result";
import { applyFieldErrors } from "@/lib/form-errors";
import { updateProfile } from "./actions";
import { profileSchema, type ProfileInput } from "./schemas";
import { cardClass, cardFooterClass, inputClass } from "./styles";

type ProfileFormProps = {
  name: string;
  email: string;
};

function splitName(name: string) {
  const [firstName = "", ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}

export function ProfileForm({ name, email }: ProfileFormProps) {
  const [result, setResult] = useState<ActionResult>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: { ...splitName(name), email },
  });

  const onSubmit = handleSubmit((data) => {
    setResult(undefined);
    startTransition(async () => {
      const response = await updateProfile(data);
      applyFieldErrors(response, setError);
      setResult(response);
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="firstName" label="Nome" error={errors.firstName?.message}>
            {(field) => (
              <input
                {...field}
                type="text"
                autoComplete="given-name"
                className={inputClass}
                {...register("firstName")}
              />
            )}
          </FormField>

          <FormField id="lastName" label="Sobrenome" error={errors.lastName?.message}>
            {(field) => (
              <input
                {...field}
                type="text"
                autoComplete="family-name"
                className={inputClass}
                {...register("lastName")}
              />
            )}
          </FormField>
        </div>

        <FormField id="email" label="E-mail" error={errors.email?.message}>
          {(field) => (
            <input
              {...field}
              type="email"
              autoComplete="email"
              className={inputClass}
              {...register("email")}
            />
          )}
        </FormField>
      </div>

      <div className={cardFooterClass}>
        <FormMessage
          result={result}
          fallback="Alterações salvas ficam visíveis na hora."
        />
        <Button
          type="submit"
          disabled={!isDirty}
          loading={isPending}
          loadingText="Salvando…"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
