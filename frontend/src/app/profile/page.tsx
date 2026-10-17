import { Suspense } from "react";
import { Header } from "@/components/header/Header";
import { UserAvatar } from "@/components/header/UserAvatar";
import { logout } from "@/features/auth/actions";
import { PasswordForm } from "@/features/profile/password-form";
import { ProfileForm } from "@/features/profile/profile-form";
import { ProfileSkeleton } from "@/features/profile/profile-skeleton";
import { cardClass } from "@/features/profile/styles";
import { getCurrentUser } from "@/lib/auth";

const memberSinceFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense
        fallback={<ProfileSkeleton />}
      >
        <ProfileContent />
      </Suspense>
    </main>
  );
}

async function ProfileContent() {
  const user = await getCurrentUser();
  const memberSince = memberSinceFormatter.format(new Date(user.createdAt));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 pt-40 pb-16 sm:px-6">
      <div className="flex items-center gap-6">
        <UserAvatar name={user.name} size="lg" />
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="truncate text-large-title">{user.name}</h1>
          <p className="truncate text-body text-label-secondary">
            {user.email} · Membro desde {memberSince}
          </p>
        </div>
      </div>

      <Section
        title="Informações pessoais"
        description="Seu nome aparece no app. O e-mail é usado para entrar e receber avisos."
      >
        <ProfileForm name={user.name} email={user.email} />
      </Section>

      <Section
        title="Senha"
        description="Use ao menos 8 caracteres, combinando letras e números. Você continuará conectado neste dispositivo."
      >
        <PasswordForm />
      </Section>

      <Section
        title="Conta"
        description="Encerre a sessão ou exclua sua conta e todos os veículos cadastrados."
      >
        <div
          className={`${cardClass} flex items-center justify-between gap-4 p-6`}
        >
          <div className="flex flex-col">
            <h3 className="text-headline text-label">Sair da conta</h3>
            <p className="text-body text-label-secondary">
              Encerre a sessão neste dispositivo
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="cursor-pointer text-headline text-accent transition hover:text-accent-hover active:text-accent-pressed"
            >
              Sair
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-title-2 text-label">{title}</h2>
        <p className="text-body text-label-secondary">{description}</p>
      </div>
      {children}
    </section>
  );
}
