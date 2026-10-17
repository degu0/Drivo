import { Header } from "@/components/header/Header";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { PageHeading } from "../page-heading";

export default function NewVehiclePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto flex w-full flex-col gap-8 px-4 pt-40 pb-16 sm:px-6 lg:w-4/5 lg:px-0">
        <PageHeading title="Novo veículo" />
        <VehicleForm mode="create" />
      </div>
    </main>
  );
}
