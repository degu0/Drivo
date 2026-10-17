import { Suspense } from 'react';
import { logout } from '@/features/auth/actions';
import { getCurrentUser } from '@/lib/auth';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Drivo</h1>
      <Suspense
        fallback={<p className="text-body text-label-secondary">Carregando…</p>}
      >
        <UserGreeting />
      </Suspense>
    </main>
  );
}

async function UserGreeting() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-body text-label-secondary">Olá, {user.name}</p>
      <form action={logout}>
        <button
          type="submit"
          className="h-10 rounded-xl bg-surface-2 px-5 text-callout text-label transition hover:bg-surface-3"
        >
          Sair
        </button>
      </form>
    </div>
  );
}
