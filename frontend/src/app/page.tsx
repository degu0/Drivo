import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header/Header";
import { buttonClass } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getVehicles } from "@/features/vehicles/api";
import { Garage } from "@/features/vehicles/garage";
import { GarageSkeleton } from "@/features/vehicles/skeletons";

const NEW_VEHICLE_HREF = "/vehicles/new";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<GarageSkeleton />}>
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
    <EmptyState
      title="Sua garagem está vazia"
      description="Adicione seu primeiro veículo. Com o CRLV em mãos, a maior parte dos dados é preenchida automaticamente."
      action={
        <Link href={NEW_VEHICLE_HREF} className={buttonClass({ size: "sm" })}>
          Cadastrar veículo
        </Link>
      }
    />
  );
}
