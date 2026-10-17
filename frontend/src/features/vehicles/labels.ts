import type { FuelType, VehicleType } from './api';

export const fuelLabel: Record<FuelType, string> = {
  GASOLINA: 'Gasolina',
  ETANOL: 'Etanol',
  FLEX: 'Flex',
  DIESEL: 'Diesel',
  GNV: 'GNV',
  ELETRICO: 'Elétrico',
  HIBRIDO: 'Híbrido',
};

export const vehicleTypeLabel: Record<VehicleType, string> = {
  CARRO: 'Carro',
  MOTO: 'Moto',
  CAMINHONETE: 'Caminhonete',
  CAMINHAO: 'Caminhão',
  ONIBUS: 'Ônibus',
  OUTRO: 'Outro',
};

export function formatPlate(plate: string) {
  // Placa antiga (ABC1234) ganha hífen; Mercosul (ABC1D23) fica como está.
  return /^[A-Z]{3}\d{4}$/.test(plate)
    ? `${plate.slice(0, 3)}-${plate.slice(3)}`
    : plate;
}

const colorSwatch: Record<string, string> = {
  branco: '#f5f5f7',
  branca: '#f5f5f7',
  prata: '#c7c7cc',
  cinza: '#8e8e93',
  preto: '#1c1c1e',
  preta: '#1c1c1e',
  vermelho: '#ff453a',
  vermelha: '#ff453a',
  azul: '#0a84ff',
  verde: '#30d158',
  amarelo: '#ffd60a',
  amarela: '#ffd60a',
  laranja: '#ff9f0a',
  marrom: '#8b5e3c',
  bege: '#d6c6a5',
  dourado: '#d4af37',
  dourada: '#d4af37',
  vinho: '#7b1e3a',
  roxo: '#bf5af2',
  roxa: '#bf5af2',
};

export function colorHex(color: string) {
  return colorSwatch[color.trim().toLowerCase()] ?? '#8e8e93';
}

export function maskChassis(chassis: string) {
  // Mostra só o WMI (3 primeiros) e os 4 últimos dígitos.
  if (chassis.length <= 7) return chassis;
  return `${chassis.slice(0, 3)}•••••••${chassis.slice(-4)}`;
}
