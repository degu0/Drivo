import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_TEXT_MODEL: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(3333),
  CORS_ORIGIN: z.url().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    throw new Error(`Variáveis de ambiente inválidas:\n${errors}`);
  }

  return result.data;
}
