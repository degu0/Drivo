import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/register-form";
import Image from "next/image";

import bgRegister from "../../../public/images/auth/register.jpg";

export const metadata: Metadata = {
  title: "Criar conta · Drivo",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen">
      <div className="relative hidden min-h-screen lg:block lg:w-1/2">
        <Image
          src={bgRegister}
          alt="backgroundLogin"
          fill
          preload
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white xl:p-12">
          <h2 className="text-large-title">
            Cadastre uma vez. <br />
            O CRLV faz o resto.
          </h2>
          <p className="mt-4 max-w-md text-body text-white/70">
            Importe o documento e os dados do veiculo são preenchidos automaticamente.
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 sm:px-8 lg:w-1/2 lg:px-4 lg:py-24">
        <RegisterForm />
      </div>
    </main>
  );
}
