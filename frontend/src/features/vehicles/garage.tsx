"use client";

import { useState } from "react";
import Link from "next/link";
import type { Vehicle } from "./api";
import { AddVehicle } from "./addVehicle";
import { VehicleCard } from "./vehicle-card";

// Ignora caixa, acentos e pontuação, para "abc-1d23" achar "ABC1D23".
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function matches(vehicle: Vehicle, query: string) {
  return [vehicle.plate, vehicle.model, vehicle.brand, vehicle.nickname ?? ""]
    .map(normalize)
    .some((field) => field.includes(query));
}

export function Garage({
  vehicles,
  newVehicleHref,
}: {
  vehicles: Vehicle[];
  newVehicleHref: string;
}) {
  const [search, setSearch] = useState("");
  const query = normalize(search);
  const filtered = query
    ? vehicles.filter((vehicle) => matches(vehicle, query))
    : vehicles;

  return (
    <div className="mx-auto flex w-full flex-col gap-10 px-4 pt-40 pb-16 sm:px-6 lg:w-4/5 lg:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-large-title">Meus veículos</h1>
            <Link
              href={newVehicleHref}
              aria-label="Cadastrar veículo"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-hover active:bg-accent-pressed"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>
          <p className="text-footnote text-label-secondary">
            {vehicles.length === 1
              ? "1 veículo cadastrado"
              : `${vehicles.length} veículos cadastrados`}
          </p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por placa ou modelo"
          aria-label="Buscar por placa ou modelo"
          className="h-10 w-full rounded-xl border border-separator bg-surface px-4 text-callout font-normal text-label outline-none transition placeholder:text-label-tertiary focus:border-accent sm:w-72 lg:w-80"
        />
      </div>

      {query && filtered.length === 0 ? (
        <p className="py-16 text-center text-body text-label-secondary">
          Nenhum veículo encontrado para “{search.trim()}”.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((vehicle) => (
            <li key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </li>
          ))}
          {!query && (
            <li>
              <AddVehicle href={newVehicleHref} />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
