"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { WarningIcon } from "@/components/ui/icons";
import { deleteVehicle } from "./actions";
import { formatPlate } from "./labels";
import { sectionCardClass } from "./styles";

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

      <Button variant="danger" className="w-full" onClick={openDialog}>
        Excluir veículo
      </Button>

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
            <Button
              variant="secondary"
              autoFocus
              onClick={closeDialog}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={onDelete}
              loading={isPending}
              loadingText="Excluindo…"
            >
              Excluir
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
