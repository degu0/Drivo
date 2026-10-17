"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { scanCrlv } from "./actions";
import type { CrlvData } from "./schemas";

const MAX_CRLV_SIZE = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

type ScannedFile = { name: string; size: number };

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function useCrlvScan(onData: (data: CrlvData) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<ScannedFile>();
  const [reading, setReading] = useState<ScannedFile>();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;

    setError(undefined);
    if (selected.size > MAX_CRLV_SIZE) {
      setError("O arquivo deve ter no máximo 5 MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", selected);
    const scanned = { name: selected.name, size: selected.size };
    setReading(scanned);

    startTransition(async () => {
      const result = await scanCrlv(formData);
      setReading(undefined);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setFile(scanned);
      onData(result.data);
    });
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPT}
      onChange={onChange}
      className="hidden"
      tabIndex={-1}
      aria-hidden
    />
  );

  return {
    input,
    file,
    reading,
    error,
    isPending,
    open: () => inputRef.current?.click(),
  };
}

export function CrlvImportCard({ onData }: { onData: (data: CrlvData) => void }) {
  const { input, file, reading, error, isPending, open } = useCrlvScan(onData);

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <ScanIcon />
        </div>
        <div className="flex min-w-0 flex-col">
          <h2 className="text-headline text-label">Importar CRLV</h2>
          <p className="text-footnote text-label-secondary">
            Preenchemos o formulário para você
          </p>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-busy={isPending}
        className="flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3"
      >
        {reading ? (
          <>
            <FileIcon className="text-label-tertiary" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-callout text-label">{reading.name}</p>
              <p className="text-footnote text-label-tertiary">
                {formatSize(reading.size)} · lendo… pode levar alguns segundos
              </p>
            </div>
            <Spinner className="size-5 text-label-tertiary" />
          </>
        ) : file ? (
          <>
            <FileIcon className="text-danger" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-callout text-label">{file.name}</p>
              <p className="text-footnote text-label-tertiary">
                {formatSize(file.size)} · lido agora
              </p>
            </div>
            <CheckIcon />
          </>
        ) : (
          <>
            <FileIcon className="text-label-tertiary" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-callout text-label-secondary">
                Nenhum arquivo selecionado
              </p>
              <p className="text-footnote text-label-tertiary">
                PDF, JPG ou PNG · até 5 MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="-mt-2 text-callout text-danger">
          {error}
        </p>
      )}

      {input}
      <Button
        variant="secondary"
        className="w-full"
        onClick={open}
        loading={isPending}
        loadingText="Lendo CRLV…"
      >
        {file ? "Importar outro CRLV" : "Escolher arquivo"}
      </Button>
    </div>
  );
}

export function VehicleRecordCard({
  createdAt,
  updatedAt,
  onData,
}: {
  createdAt: string;
  updatedAt: string;
  onData: (data: CrlvData) => void;
}) {
  const { input, file, error, isPending, open } = useCrlvScan(onData);

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
      <div className="flex flex-col">
        <h2 className="text-headline text-label">Registro</h2>
        <p className="text-footnote text-label-secondary">
          Histórico deste veículo no Drivo
        </p>
      </div>

      <dl className="flex flex-col divide-y divide-separator/60 rounded-xl bg-surface-2">
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-footnote text-label-tertiary">Cadastrado em</dt>
          <dd className="text-callout text-label">{createdAt}</dd>
        </div>
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-footnote text-label-tertiary">
            Última alteração
          </dt>
          <dd className="text-callout text-label">{updatedAt}</dd>
        </div>
      </dl>

      {error && (
        <p role="alert" className="text-callout text-danger">
          {error}
        </p>
      )}
      {file && !isPending && !error && (
        <p role="status" className="text-callout text-success">
          Dados de {file.name} aplicados. Revise e salve.
        </p>
      )}

      {input}
      <Button
        variant="secondary"
        className="w-full"
        onClick={open}
        loading={isPending}
        loadingText="Lendo CRLV…"
      >
        Atualizar com novo CRLV
      </Button>
    </div>
  );
}

function ScanIcon() {
  return (
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
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 9h6M9 12h6M9 15h3" />
    </svg>
  );
}

function FileIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`size-5 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label="Lido com sucesso"
      className="size-5 shrink-0 text-success"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}
