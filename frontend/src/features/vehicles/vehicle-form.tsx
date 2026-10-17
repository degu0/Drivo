"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { FooterMessage } from "@/features/profile/profile-form";
import { cardFooterClass, inputClass, labelClass } from "@/features/profile/styles";
import {
  createVehicle,
  updateVehicle,
  type VehicleActionResult,
} from "./actions";
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
import { primaryButtonClass, sectionCardClass } from "./styles";

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

export function VehicleForm(props: VehicleFormProps) {
  const [result, setResult] = useState<VehicleActionResult>();
  const [isPending, startTransition] = useTransition();
  const [crlvKey, setCrlvKey] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
      setCrlvKey((key) => key + 1);
    };
  }, [reset]);

  const applyCrlv = (data: CrlvData) => {
    setResult(undefined);
    for (const [field, value] of Object.entries(data)) {
      if (value === null || !(field in emptyVehicleInput)) continue;
      setValue(field as Field, String(value), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const onSubmit = handleSubmit(() => {
    setResult(undefined);
    const input = getValues();
    startTransition(async () => {
      if (props.mode === "create") {
        setResult(await createVehicle(input));
        return;
      }
      const response = await updateVehicle(props.vehicleId, input);
      setResult(response);
      if ("success" in response) reset(input);
    });
  });

  const fieldProps = { register, errors };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
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
          <FooterMessage
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
            <button
              type="submit"
              disabled={isPending || (props.mode === "edit" && !isDirty)}
              className={primaryButtonClass}
            >
              {props.mode === "create"
                ? isPending
                  ? "Cadastrando…"
                  : "Cadastrar veículo"
                : isPending
                  ? "Salvando…"
                  : "Salvar alterações"}
            </button>
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
};

function FieldError({ name, errors }: Pick<FieldProps, "name" | "errors">) {
  const message = errors[name]?.message;
  if (!message) return null;
  return (
    <p id={`${name}-error`} className="text-callout text-danger">
      {message}
    </p>
  );
}

function TextField({
  name,
  label,
  register,
  errors,
  uppercase,
  ...inputProps
}: FieldProps & {
  uppercase?: boolean;
} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "inputMode" | "maxLength" | "placeholder"
  >) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        type="text"
        autoComplete="off"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={`${inputClass} ${uppercase ? "uppercase" : ""}`}
        {...inputProps}
        {...register(name)}
      />
      <FieldError name={name} errors={errors} />
    </div>
  );
}

function SelectField({
  name,
  label,
  register,
  errors,
  options,
}: FieldProps & { options: [value: string, label: string][] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          className={`${inputClass} cursor-pointer appearance-none pr-10`}
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
      <FieldError name={name} errors={errors} />
    </div>
  );
}
