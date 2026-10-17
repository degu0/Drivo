"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { login } from "./actions";
import { loginSchema, type LoginInput } from "./schemas";
import { SessionExpiredNotice } from "./session-expired-notice";
import Image from "next/image";

import iconCar from "../../../public/images/icons/car.png";

const inputClass =
  "h-14 w-full rounded-xl border border-separator bg-surface-2 px-5 text-headline font-normal text-label outline-none transition placeholder:text-label-tertiary focus:border-accent aria-invalid:border-danger";

export function LoginForm() {
  const [serverError, setServerError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await login(data);
      if (result?.error) setServerError(result.error);
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-8"
    >
      <div className="flex flex-col items-center gap-5">
        <Image src={iconCar} alt="iconCar" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-title-1 text-label">Entrar no Drivo</h2>
          <p className="text-body text-label-secondary">
            Seus veículos, documentos e dados em um só lugar.
          </p>
        </div>
      </div>

      <Suspense fallback={null}>
        <SessionExpiredNotice />
      </Suspense>

      <FormField id="email" label="E-mail" error={errors.email?.message}>
        {(field) => (
          <input
            {...field}
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={inputClass}
            {...register("email")}
          />
        )}
      </FormField>

      <FormField id="password" label="Senha" error={errors.password?.message}>
        {(field) => (
          <input
            {...field}
            type="password"
            autoComplete="current-password"
            placeholder="Senha"
            className={inputClass}
            {...register("password")}
          />
        )}
      </FormField>

      {serverError && <Alert>{serverError}</Alert>}

      <Button type="submit" size="lg" loading={isPending} loadingText="Entrando…">
        Entrar
      </Button>

      <footer className="text-center lg:absolute lg:inset-x-0 lg:bottom-8">
        <p className="text-body text-label-secondary">
          Ainda não tem conta?{" "}
          <a
            href="/register"
            className="text-accent hover:text-accent-hover aria-pressed:text-accent-pressed"
          >
            Criar conta
          </a>
        </p>
      </footer>
    </form>
  );
}
