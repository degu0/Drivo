"use client";

import { useRef, useState, useTransition } from "react";
import { deleteVehicle } from "./actions";
import { formatPlate } from "./labels";
import {
  dangerButtonClass,
  secondaryButtonClass,
  sectionCardClass,
} from "./styles";

export function DeleteVehicleCard({
  vehicleId,
  vehicleTitle,
  vehiclePlate,
}: {
  vehicleId: string;
  vehicleTitle: string;
  vehiclePlate: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const openDialog = () => {
    setError(undefined);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    if (!isPending) dialogRef.current?.close();
  };

  const onDelete = () => {
    setError(undefined);
    startTransition(async () => {
      const result = await deleteVehicle(vehicleId);
      setError(result.error);
    });
  };

  return (
    <div className={`${sectionCardClass} ring-1 ring-danger/25`}>
      <div className="flex flex-col gap-1">
        <h2 className="text-headline text-label">Excluir veículo</h2>
        <p className="text-footnote text-label-secondary">
          Remove o veículo e todos os seus dados da sua garagem. Não é possível
          desfazer.
        </p>
      </div>

      <button
        type="button"
        onClick={openDialog}
        className={`${dangerButtonClass} w-full`}
      >
        Excluir veículo
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="delete-vehicle-title"
        aria-describedby="delete-vehicle-description"
        onCancel={(event) => {
          if (isPending) event.preventDefault();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm scale-95 rounded-2xl bg-surface p-0 text-label opacity-0 shadow-2xl ring-1 ring-white/10 transition-[opacity,scale,display,overlay] transition-discrete duration-200 backdrop:bg-black/60 backdrop:backdrop-blur-sm open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="flex flex-col items-center gap-5 p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-danger/15 text-danger">
            <WarningIcon />
          </div>

          <div className="flex flex-col gap-2">
            <h2 id="delete-vehicle-title" className="text-headline text-label">
              Excluir {vehicleTitle}?
            </h2>
            <p
              id="delete-vehicle-description"
              className="text-footnote text-label-secondary"
            >
              O veículo de placa {formatPlate(vehiclePlate)} e todos os seus
              dados serão removidos permanentemente.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-callout text-danger">
              {error}
            </p>
          )}

          <div className="grid w-full grid-cols-2 gap-3">
            <button
              type="button"
              // Foco inicial no botão seguro, não no destrutivo.
              autoFocus
              onClick={closeDialog}
              disabled={isPending}
              className={secondaryButtonClass}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={isPending}
              className={`${dangerButtonClass} w-full`}
            >
              {isPending ? "Excluindo…" : "Excluir"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
