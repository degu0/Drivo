import { LoadingRegion, Skeleton } from "@/components/ui/skeleton";

export function GarageSkeleton() {
  return (
    <LoadingRegion
      label="Carregando seus veículos…"
      className="mx-auto flex w-full flex-col gap-10 px-4 pt-40 pb-16 sm:px-6 lg:w-4/5 lg:px-0"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-11 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full sm:w-72 lg:w-80" />
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[0, 1, 2].map((item) => (
          <li key={item}>
            <VehicleCardSkeleton />
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}

function VehicleCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-surface">
      <Skeleton className="aspect-16/10 rounded-none" />
      <div className="flex flex-col gap-8 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="grid flex-1 grid-cols-2 gap-3">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Mesmo layout da página de detalhes: título, formulário e coluna lateral
export function VehicleDetailsSkeleton() {
  return (
    <LoadingRegion
      label="Carregando veículo…"
      className="mx-auto flex w-full flex-col gap-8 px-4 pt-40 pb-16 sm:px-6 lg:w-4/5 lg:px-0"
    >
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-11 w-72 max-w-full" />
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="flex flex-col gap-6">
          <FormSectionSkeleton fields={3} />
          <FormSectionSkeleton fields={6} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-28" />
            <Skeleton className="h-11" />
          </div>
          <Skeleton className="h-40 rounded-2xl bg-surface" />
        </div>
      </div>
    </LoadingRegion>
  );
}

function FormSectionSkeleton({ fields }: { fields: number }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {Array.from({ length: fields }, (_, item) => (
          <div key={item} className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
