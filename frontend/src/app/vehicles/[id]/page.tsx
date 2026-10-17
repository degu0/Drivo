import { Suspense } from "react";
import { Header } from "@/components/header/Header";
import { getVehicle } from "@/features/vehicles/api";
import { formatPlate } from "@/features/vehicles/labels";
import { toVehicleInput } from "@/features/vehicles/schemas";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { VehicleDetailsSkeleton } from "@/features/vehicles/skeletons";
import { PageHeading } from "../page-heading";

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export default function VehiclePage({ params }: PageProps<"/vehicles/[id]">) {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense
        fallback={<VehicleDetailsSkeleton />}
      >
        <VehicleDetails params={params} />
      </Suspense>
    </main>
  );
}

async function VehicleDetails({
  params,
}: Pick<PageProps<"/vehicles/[id]">, "params">) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  const title = vehicle.nickname || vehicle.model;

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 pt-40 pb-16 sm:px-6 lg:w-4/5 lg:px-0">
      <PageHeading
        title={title}
        subtitle={`${vehicle.brand} · ${formatPlate(vehicle.plate)}`}
      />
      <VehicleForm
        mode="edit"
        vehicleId={vehicle.id}
        vehicleTitle={title}
        values={toVehicleInput(vehicle)}
        createdAt={dateTimeFormatter.format(new Date(vehicle.createdAt))}
        updatedAt={dateTimeFormatter.format(new Date(vehicle.updatedAt))}
      />
    </div>
  );
}
