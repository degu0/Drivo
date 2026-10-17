import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Vehicle, VehicleType } from "./api";
import { colorHex, formatPlate, fuelLabel, maskChassis } from "./labels";

import iconCar from "../../../public/images/icons/car.png";
import carImage from "../../../public/images/vehicles/car.jpg";
import motorcycleImage from "../../../public/images/vehicles/motorcycle.jpg";

// Foto padrão por tipo, usada quando o veículo não tem imagem própria.
const defaultImageByType: Partial<Record<VehicleType, StaticImageData>> = {
  CARRO: carImage,
  MOTO: motorcycleImage,
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const title = vehicle.nickname || vehicle.model;
  const years = `${vehicle.manufactureYear}/${vehicle.modelYear}`;
  const defaultImage = defaultImageByType[vehicle.type];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface">
      <div className="relative flex aspect-16/10 items-center justify-center bg-surface-2">
        {vehicle.imageUrl ? (
          <Image
            src={vehicle.imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : defaultImage ? (
          <Image
            src={defaultImage}
            alt={title}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <Image src={iconCar} alt="" aria-hidden className="w-20 opacity-40 sm:w-24" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-8 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-footnote font-semibold uppercase tracking-wider text-label-tertiary">
              {vehicle.brand}
            </p>
            <h2 className="truncate text-title-2 text-label">{title}</h2>
            <p className="flex items-center gap-2 text-callout font-normal text-label-secondary">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: colorHex(vehicle.color) }}
              />
              <span className="truncate">
                {vehicle.color} · {years} · {fuelLabel[vehicle.fuel]}
              </span>
            </p>
          </div>
          <Plate plate={vehicle.plate} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <dl className="grid min-w-0 flex-1 grid-cols-2 gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <dt className="text-footnote font-semibold uppercase tracking-wider text-label-tertiary">
                Renavam
              </dt>
              <dd className="truncate font-mono text-mono text-label">
                {vehicle.renavam}
              </dd>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <dt className="text-footnote font-semibold uppercase tracking-wider text-label-tertiary">
                Chassi
              </dt>
              <dd className="truncate font-mono text-mono text-label">
                {maskChassis(vehicle.chassis)}
              </dd>
            </div>
          </dl>
          <Link
            href={`/vehicles/${vehicle.id}`}
            aria-label={`Ver detalhes de ${title}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-label transition hover:bg-surface-3"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Plate({ plate }: { plate: string }) {
  return (
    <div className="w-32 shrink-0 overflow-hidden rounded-md bg-white shadow-sm">
      <div className="flex items-center justify-between bg-[#1a4fc4] px-2 py-0.5">
        <span className="text-[9px] font-bold tracking-wider text-white">
          BRASIL
        </span>
        <span className="h-2 w-3 rounded-[1px] bg-success" aria-hidden />
      </div>
      <p className="py-1 text-center font-mono text-headline tracking-[0.15em] text-black">
        {formatPlate(plate)}
      </p>
    </div>
  );
}
