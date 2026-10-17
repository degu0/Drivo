"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { FormMessage } from "@/components/ui/form-message";
import { cardFooterClass, inputClass } from "@/features/profile/styles";
import type { ActionResult } from "@/lib/action-result";
import { applyFieldErrors } from "@/lib/form-errors";
import { createVehicle, updateVehicle } from "./actions";
import { CrlvImportCard, VehicleRecordCard } from "./crlv";
import { DeleteVehicleCard } from "./delete-vehicle";
import { fuelLabel, vehicleTypeLabel } from "./labels";
import {
  emptyVehicleInput,
  FUEL_TYPES,
  VEHICLE_TYPES,
  vehicleSchema,
  type CrlvData,
  type VehicleInput,
  type VehicleOutput,
} from "./schemas";
import { sectionCardClass } from "./styles";

type VehicleFormProps =
  | { mode: "create" }
  | {
      mode: "edit";
      vehicleId: string;
      vehicleTitle: string;
      values: VehicleInput;
      createdAt: string;
      updatedAt: string;
    };

type Field = keyof VehicleInput;

const MISSING_FROM_CRLV = "Não encontrado no CRLV. Preencha manualmente.";

export function VehicleForm(props: VehicleFormProps) {
  const [result, setResult] = useState<ActionResult>();
  const [isPending, startTransition] = useTransition();
  const [crlvKey, setCrlvKey] = useState(0);
  const [missingFromCrlv, setMissingFromCrlv] = useState<Field[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<VehicleInput, unknown, VehicleOutput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: emptyVehicleInput,
    values: props.mode === "edit" ? props.values : undefined,
  });

  useEffect(() => {
    return () => {
      reset();
      setResult(undefined);
      setMissingFromCrlv([]);
      setCrlvKey((key) => key + 1);
    };
  }, [reset]);

  const applyCrlv = (data: CrlvData) => {
    setResult(undefined);
    const missing: Field[] = [];
    for (const [field, value] of Object.entries(data)) {
      if (!(field in emptyVehicleInput)) continue;
      if (value === null) {
        missing.push(field as Field);
        continue;
      }
      setValue(field as Field, String(value), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    setMissingFromCrlv(missing);
  };

  const onSubmit = handleSubmit(() => {
    setResult(undefined);
    const input = getValues();
    startTransition(async () => {
      const response =
        props.mode === "create"
          ? await createVehicle(input)
          : await updateVehicle(props.vehicleId, input);
      applyFieldErrors(response, setError);
      setResult(response);
      if ("success" in response) reset(input);
    });
  });

  const values = useWatch({ control });
  const hintFor = (name: Field) =>
    missingFromCrlv.includes(name) && !values[name]
      ? MISSING_FROM_CRLV
      : undefined;
  const pendingMissing = missingFromCrlv.filter((name) => !values[name]);

  const fieldProps = { register, errors, hintFor };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        {pendingMissing.length > 0 && (
          <Alert tone="info">
            {pendingMissing.length === 1
              ? "1 campo não foi encontrado no CRLV e está destacado abaixo."
              : `${pendingMissing.length} campos não foram encontrados no CRLV e estão destacados abaixo.`}
          </Alert>
        )}

        <section className={sectionCardClass}>
          <SectionHeader
            title="Identificação"
            description="Dados oficiais do veículo, conforme o documento."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField {...fieldProps} name="plate" label="Placa" uppercase />
            <TextField
              {...fieldProps}
              name="renavam"
              label="Renavam"
              inputMode="numeric"
              maxLength={11}
            />
          </div>
          <TextField {...fieldProps} name="chassis" label="Chassi" uppercase />
        </section>

        <section className={sectionCardClass}>
          <SectionHeader
            title="Características"
            description="Como o veículo aparece na sua garagem."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField {...fieldProps} name="brand" label="Marca" />
            <TextField {...fieldProps} name="model" label="Modelo" />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <TextField
              {...fieldProps}
              name="manufactureYear"
              label="Ano de fabricação"
              inputMode="numeric"
              maxLength={4}
            />
            <TextField
              {...fieldProps}
              name="modelYear"
              label="Ano do modelo"
              inputMode="numeric"
              maxLength={4}
            />
            <TextField {...fieldProps} name="color" label="Cor" />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <SelectField
              {...fieldProps}
              name="fuel"
              label="Combustível"
              options={FUEL_TYPES.map((value) => [value, fuelLabel[value]])}
            />
            <SelectField
              {...fieldProps}
              name="type"
              label="Tipo"
              options={VEHICLE_TYPES.map((value) => [
                value,
                vehicleTypeLabel[value],
              ])}
            />
            <TextField
              {...fieldProps}
              name="nickname"
              label="Apelido (opcional)"
              placeholder="Ex.: Carro da família"
            />
          </div>
        </section>

        <div className={`${cardFooterClass} rounded-2xl border-t-0 bg-surface`}>
          <FormMessage
            result={result}
            fallback={
              props.mode === "create"
                ? "Revise os dados antes de cadastrar."
                : "Alterações salvas ficam visíveis na hora."
            }
          />
          <div className="flex shrink-0 items-center gap-4">
            {props.mode === "create" && (
              <Link
                href="/"
                className="text-body font-semibold text-label-secondary transition hover:text-label"
              >
                Cancelar
              </Link>
            )}
            <Button
              type="submit"
              disabled={props.mode === "edit" && !isDirty}
              loading={isPending}
              loadingText={props.mode === "create" ? "Cadastrando…" : "Salvando…"}
            >
              {props.mode === "create" ? "Cadastrar veículo" : "Salvar alterações"}
            </Button>
          </div>
        </div>
      </form>

      <aside className="flex flex-col gap-6 lg:sticky lg:top-8">
        {props.mode === "create" ? (
          <CrlvImportCard key={crlvKey} onData={applyCrlv} />
        ) : (
          <>
            <VehicleRecordCard
              key={crlvKey}
              createdAt={props.createdAt}
              updatedAt={props.updatedAt}
              onData={applyCrlv}
            />
            <DeleteVehicleCard
              vehicleId={props.vehicleId}
              vehicleTitle={props.vehicleTitle}
              vehiclePlate={props.values.plate}
            />
          </>
        )}
      </aside>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-headline text-label">{title}</h2>
      <p className="text-footnote text-label-secondary">{description}</p>
    </div>
  );
}

type FieldProps = {
  name: Field;
  label: string;
  register: UseFormRegister<VehicleInput>;
  errors: FieldErrors<VehicleInput>;
  hintFor: (name: Field) => string | undefined;
};

function TextField({
  name,
  label,
  register,
  errors,
  hintFor,
  uppercase,
  ...inputProps
}: FieldProps & {
  uppercase?: boolean;
} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "inputMode" | "maxLength" | "placeholder"
  >) {
  const hint = hintFor(name);
  return (
    <FormField
      id={name}
      label={label}
      error={errors[name]?.message}
      hint={hint}
    >
      {(field) => (
        <input
          {...field}
          type="text"
          autoComplete="off"
          data-hint={hint ? "" : undefined}
          className={`${inputClass} data-hint:border-warning ${uppercase ? "uppercase" : ""}`}
          {...inputProps}
          {...register(name)}
        />
      )}
    </FormField>
  );
}

function SelectField({
  name,
  label,
  register,
  errors,
  hintFor,
  options,
}: FieldProps & { options: [value: string, label: string][] }) {
  const hint = hintFor(name);
  return (
    <FormField
      id={name}
      label={label}
      error={errors[name]?.message}
      hint={hint}
    >
      {(field) => (
        <div className="relative">
          <select
            {...field}
            data-hint={hint ? "" : undefined}
            className={`${inputClass} cursor-pointer appearance-none pr-10 data-hint:border-warning`}
            {...register(name)}
          >
            <option value="" disabled>
              Selecione
            </option>
            {options.map(([value, optionLabel]) => (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-label-tertiary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}
    </FormField>
  );
}
