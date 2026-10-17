"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { loginSchema, type LoginInput } from "./schemas";
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
          autoComplete="current-password"
          placeholder="Senha"
          aria-invalid={!!errors.password}
          className={inputClass}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-footnote text-danger">{errors.password.message}</p>
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
        {isPending ? "Entrando…" : "Entrar"}
      </button>

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
