import { LoadingRegion, Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <LoadingRegion
      label="Carregando seu perfil…"
      className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 pt-40 pb-16 sm:px-6"
    >
      <div className="flex items-center gap-6">
        <Skeleton className="size-24 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-11 w-64 max-w-full" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </div>
      </div>

      {[3, 3, 1].map((fields, section) => (
        <div
          key={section}
          className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
        >
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
            {Array.from({ length: fields }, (_, item) => (
              <Skeleton key={item} className="h-12" />
            ))}
          </div>
        </div>
      ))}
    </LoadingRegion>
  );
}
