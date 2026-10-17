import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";
import Image from "next/image";

import bgLogin from "../../../public/login_image.jpg";

export const metadata: Metadata = {
  title: "Entrar · Drivo",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="relative hidden min-h-screen lg:block lg:w-1/2">
        <Image
          src={bgLogin}
          alt="backgroundLogin"
          fill
          preload
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white xl:p-12">
          <h2 className="text-large-title">
            Sua garagem, <br />
            sempre à mão
          </h2>
          <p className="mt-4 max-w-md text-body text-white/70">
            Placa, Renavam e licenciamento de todos os seus veículos em um só lugar.
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 sm:px-8 lg:w-1/2 lg:px-4 lg:py-24">
        <LoginForm />
      </div>
    </main>
  );
}
