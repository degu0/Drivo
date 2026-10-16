import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// O .env fica na raiz do repositório (compartilhado com o docker-compose)
config({ path: ['.env', '../.env'], quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
