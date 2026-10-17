"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await registerUser(data);
      if (result?.error) setServerError(result.error);
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
            Leva menos de um minuto. Depois eh so adicionar seus viculos
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-callout text-label-secondary">
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-footnote text-danger">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-callout text-label-secondary">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-footnote text-danger">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-callout text-label-secondary">
          Senha
        </label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          className={inputClass}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-footnote text-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-callout text-label-secondary"
        >
          Confirmação de senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirme a sua senha"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          className={inputClass}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-footnote text-danger">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-xl bg-danger/10 px-4 py-3 text-callout text-danger"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="h-14 rounded-xl bg-accent text-headline text-white transition hover:bg-accent-hover active:bg-accent-pressed disabled:opacity-60 cursor-pointer"
      >
        {isPending ? "Criando conta…" : "Criar conta"}
      </button>

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
