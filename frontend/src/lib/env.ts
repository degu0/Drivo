import { z } from 'zod';

const envSchema = z.object({
  // protocol: sem ele, o z.url() aceita "localhost:3333" (lê "localhost:" como protocolo)
  NEXT_PUBLIC_API_URL: z
    .url({ protocol: /^https?$/ })
    .default('http://localhost:3333/api'),
});

// Variáveis NEXT_PUBLIC_* são substituídas pelo valor no momento do build.
// O Next só reconhece o acesso literal (process.env.NEXT_PUBLIC_API_URL);
// acesso dinâmico como process.env[nome] chega como undefined no navegador.
export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
