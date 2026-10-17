"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { applyFieldErrors } from "@/lib/form-errors";
import { register as registerUser } from "./actions";
import { registerSchema, type RegisterInput } from "./schemas";
import Image from "next/image";
import Link from "next/link";

import iconCar from "../../../public/images/icons/car.png";

const inputClass =
  "h-14 w-full rounded-xl border border-separator bg-surface-2 px-5 text-headline font-normal text-label outline-none transition placeholder:text-label-tertiary focus:border-accent aria-invalid:border-danger";

export function RegisterForm() {
  const [serverError, setServerError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await registerUser(data);
      if (!result) return;
      applyFieldErrors(result, setError);
      setServerError(result.error);
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-6"
    >
      <div className="flex flex-col items-center gap-5">
        <Image src={iconCar} alt="iconCar" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-title-1 text-label">Criar sua conta</h2>
          <p className="text-body text-label-secondary">
            Leva menos de um minuto. Depois é só adicionar seus veículos.
          </p>
        </div>
      </div>

      <FormField id="name" label="Nome completo" error={errors.name?.message}>
        {(field) => (
          <input
            {...field}
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputClass}
            {...register("name")}
          />
        )}
      </FormField>

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
            placeholder="Senha"
            autoComplete="new-password"
            className={inputClass}
            {...register("password")}
          />
        )}
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirmação de senha"
        error={errors.confirmPassword?.message}
      >
        {(field) => (
          <input
            {...field}
            type="password"
            placeholder="Confirme a sua senha"
            autoComplete="new-password"
            className={inputClass}
            {...register("confirmPassword")}
          />
        )}
      </FormField>

      {serverError && <Alert>{serverError}</Alert>}

      <Button
        type="submit"
        size="lg"
        loading={isPending}
        loadingText="Criando conta…"
      >
        Criar conta
      </Button>

      <footer className="text-center lg:absolute lg:inset-x-0 lg:bottom-8">
        <p className="text-body text-label-secondary">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-accent hover:text-accent-hover active:text-accent-pressed"
          >
            Entrar
          </Link>
        </p>
      </footer>
    </form>
  );
}
