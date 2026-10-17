import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header/Header";
import { getVehicles } from "@/features/vehicles/api";
import { Garage } from "@/features/vehicles/garage";

const NEW_VEHICLE_HREF = "/vehicles/new";

const primaryButtonClass =
  "flex h-10 shrink-0 items-center justify-center rounded-xl bg-accent px-5 text-body font-semibold text-white transition hover:bg-accent-hover active:bg-accent-pressed";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense
        fallback={
          <p className="pt-40 text-center text-body text-label-secondary">
            Carregando…
          </p>
        }
      >
        <Vehicles />
      </Suspense>
    </main>
  );
}

async function Vehicles() {
  const vehicles = await getVehicles();

  if (vehicles.length === 0) {
    return <EmptyGarage />;
  }

  return <Garage vehicles={vehicles} newVehicleHref={NEW_VEHICLE_HREF} />;
}

function EmptyGarage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex max-w-md flex-col gap-3 text-center">
        <h1 className="text-large-title">Sua garagem está vazia</h1>
        <p className="text-body text-label-secondary">
          Adicione seu primeiro veículo. Com o CRLV em mãos, a maior parte dos
          dados é preenchida automaticamente.
        </p>
      </div>
      <Link href={NEW_VEHICLE_HREF} className={primaryButtonClass}>
        Cadastrar veículo
      </Link>
    </div>
  );
}
