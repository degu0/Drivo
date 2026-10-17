# Drivo

Garagem digital de veículos. O usuário cadastra seus carros e motos, e pode importar o **CRLV** (foto ou PDF): a IA do Google Gemini lê o documento e preenche o formulário automaticamente para ele revisar antes de salvar.

Projeto desenvolvido como teste técnico para desenvolvedor fullstack júnior.

<!-- screenshot: tela da garagem -->

<!-- screenshot: cadastro com importação do CRLV -->

## Funcionalidades

- Criar conta, entrar e sair
- Listar os veículos da garagem, com busca por placa, modelo, marca ou apelido
- Cadastrar um veículo manualmente ou **importando o CRLV** (os campos que a IA não conseguir ler ficam destacados para preenchimento manual)
- Ver, editar e excluir um veículo (com confirmação), e atualizar os dados a partir de um novo CRLV
- Editar nome e e-mail do perfil
- Trocar a senha (exige a senha atual)
- Estados de carregamento (skeletons na garagem, no veículo e no perfil), erro (com "Tentar novamente"), vazio e "não encontrado"
- Botões com indicação de envio em todos os formulários, impedindo envio duplicado
- Aviso de sessão expirada, com retorno ao login

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, react-hook-form 7, Zod 4 |
| Backend | NestJS 11, Prisma 7 (driver adapter `@prisma/adapter-pg`), Zod 4 (`nestjs-zod`), JWT (`@nestjs/jwt`), bcrypt, Swagger (`@nestjs/swagger`) |
| IA | Google Gemini (`@google/genai`) |
| Banco | PostgreSQL 18 |
| Infra | Docker e Docker Compose, Node.js 22 |

## Como instalar

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/) com Docker Compose
- Uma chave **gratuita** da API do Gemini, criada no [Google AI Studio](https://aistudio.google.com/apikey)

### Passo a passo

1. Clone o repositório e entre na pasta:

   ```bash
   git clone <url-do-repositorio> drivo
   cd drivo
   ```

2. Crie o arquivo de variáveis de ambiente a partir do exemplo:

   ```bash
   cp .env.example .env
   ```

3. Edite o `.env` e preencha:
   - `GEMINI_API_KEY`: a sua chave do Google AI Studio.
   - `JWT_SECRET`: um valor aleatório com **pelo menos 32 caracteres**. Para gerar um:

     ```bash
     openssl rand -hex 32
     ```

     Ou, com Node.js instalado:

     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

   - (Opcional) `POSTGRES_PASSWORD`: troque a senha do banco. Evite os caracteres `@ : / ? # % & +`, porque a senha também é usada dentro da URL de conexão.

> **Importante:** a API valida as variáveis de ambiente ao iniciar. Sem `GEMINI_API_KEY`, ou com um `JWT_SECRET` menor que 32 caracteres, ela **não sobe** e mostra no log qual variável está inválida. O `docker compose` também se recusa a iniciar se `GEMINI_API_KEY`, `GEMINI_TEXT_MODEL`, `JWT_SECRET` ou as variáveis `POSTGRES_*` estiverem ausentes.

## Como executar

### Com Docker (recomendado)

Um único comando sobe o banco, a API e o frontend:

```bash
docker compose up --build
```

Na primeira vez, o build das imagens leva alguns minutos. As migrations do banco são aplicadas automaticamente quando a API inicia.

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:3333/api |
| Documentação da API (Swagger) | http://localhost:3333/api/docs |
| PostgreSQL (acesso pela sua máquina) | `localhost:5433` |

Para parar os containers (os dados são mantidos):

```bash
docker compose down
```

Para parar e **apagar todos os dados** (banco e volumes):

```bash
docker compose down -v
```

### Sem Docker (desenvolvimento)

O banco continua no Docker; a API e o frontend rodam na sua máquina com Node.js 22. Os dois leem o `.env` da raiz.

1. Suba só o banco:

   ```bash
   docker compose up -d database
   ```

2. Em um terminal, a API (aplica as migrations e inicia em modo watch):

   ```bash
   cd backend
   npm install
   npm run prisma:deploy
   npm run start:dev
   ```

3. Em outro terminal, o frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

O frontend usa `http://localhost:3333/api` por padrão. Para outra URL, copie `frontend/.env.example` para `frontend/.env.local` e ajuste `NEXT_PUBLIC_API_URL`.

> As portas 3000 e 3333 são as mesmas do Docker. Se os containers `api` e `web` estiverem rodando, pare-os antes (`docker compose stop api web`).

## Como testar

### Testes automatizados

```bash
cd backend
npm test
```

Também existem `npm run test:cov` (cobertura) e `npm run test:e2e` (teste de ponta a ponta, que precisa do banco rodando).

**Estado atual, com transparência:** os testes do backend são os arquivos gerados pelo Nest CLI (`should be defined` para cada controller e service, e `GET /` no e2e). Hoje **7 das 8 suítes unitárias falham por configuração**, não por erro de regra de negócio:

- o Jest não resolve os imports absolutos `src/...` (falta `moduleNameMapper` na configuração);
- o client gerado pelo Prisma 7 usa imports com extensão `.js`, que o Jest também não resolve sem configuração;
- os módulos de teste não fornecem mocks das dependências (ex.: `ConfigService` no `GeminiService`).

O frontend não tem testes automatizados; a verificação disponível é o lint:

```bash
cd frontend
npm run lint
```

Ver [Com mais tempo](#com-mais-tempo) para o plano de testes.

### Roteiro de teste manual

1. Acesse http://localhost:3000 e crie uma conta. Você cai na **garagem vazia**.
2. Clique em **Cadastrar veículo** e importe um CRLV (foto JPG/PNG ou PDF de até 5 MB). O repositório **não** inclui um CRLV de exemplo; use um documento seu ou um CRLV fictício. Confira os campos preenchidos e os destacados em amarelo (não encontrados), e salve.
3. Na garagem, use a busca por placa ou modelo. Busque algo inexistente para ver a mensagem de "nenhum veículo encontrado" e o botão **Limpar busca**.
4. Abra o veículo, edite um campo e salve. Depois, exclua o veículo (há confirmação).
5. No **Perfil**, altere o nome e troque a senha (teste também com a senha atual errada).
6. Estados de erro: pare a API (`docker compose stop api`) e recarregue a garagem. Suba de novo (`docker compose start api`) e clique em **Tentar novamente**.
7. Veículo inexistente: acesse `/vehicles/00000000-0000-4000-8000-000000000000`.
8. Sessão expirada: no DevTools (Application → Cookies), altere o valor do cookie `drivo_session` e recarregue. Você volta ao login com o aviso "Sua sessão expirou".
9. Loading: no DevTools (Network), simule uma rede lenta e recarregue para ver os skeletons.

## Variáveis de ambiente

Arquivo `.env` na raiz do repositório (modelo em `.env.example`). A lista oficial da API está em `backend/src/config/env.ts`.

| Nome | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `POSTGRES_USER` | Sim (Docker) | Usuário do PostgreSQL criado pelo container | `drivo` |
| `POSTGRES_PASSWORD` | Sim (Docker) | Senha do PostgreSQL | `troque_esta_senha` |
| `POSTGRES_DB` | Sim (Docker) | Nome do banco | `drivo` |
| `DATABASE_URL` | Sim | Conexão do Prisma. Usada fora do Docker (porta 5433); no Docker, o compose monta outra com host `database` e porta 5432 | `postgresql://drivo:troque_esta_senha@localhost:5433/drivo?schema=public` |
| `JWT_SECRET` | Sim | Segredo de assinatura do JWT, mínimo de 32 caracteres | (gerado com `openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | Não (padrão `1d`) | Tempo de validade do token | `1d` |
| `GEMINI_API_KEY` | Sim | Chave da API do Gemini (gratuita no Google AI Studio) | `troque_pela_sua_chave_do_google_ai_studio` |
| `GEMINI_TEXT_MODEL` | Sim | Modelo do Gemini usado na leitura do CRLV | `gemini-2.5-flash` |
| `PORT` | Não (padrão `3333`) | Porta da API. No Docker, fixada em `3333` pelo compose | `3333` |
| `CORS_ORIGIN` | Não (padrão `http://localhost:3000`) | Origem liberada no CORS. No Docker, fixada pelo compose | `http://localhost:3000` |

Frontend (`frontend/.env.example`):

| Nome | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Não (padrão `http://localhost:3333/api`) | URL da API usada pelo servidor do Next. Fixada no build; no Docker vem do `docker-compose.yaml` | `http://localhost:3333/api` |

## API

Todas as rotas têm o prefixo `/api`. Documentação interativa (Swagger/OpenAPI) em **http://localhost:3333/api/docs**, com suporte a autenticação Bearer (botão **Authorize**).

| Método | Caminho | Autenticação | Descrição |
|---|---|---|---|
| GET | `/api` | Não | Verificação simples (responde `Hello World!`) |
| POST | `/api/auth/register` | Não | Cria a conta e devolve o token |
| POST | `/api/auth/login` | Não | Autentica e devolve o token |
| GET | `/api/users/me` | Bearer | Dados do usuário logado |
| PATCH | `/api/users/me` | Bearer | Atualiza nome e/ou e-mail |
| PATCH | `/api/users/me/password` | Bearer | Troca a senha (exige a senha atual) |
| GET | `/api/vehicles` | Bearer | Lista os veículos do usuário |
| POST | `/api/vehicles` | Bearer | Cadastra um veículo |
| POST | `/api/vehicles/crlv/scan` | Bearer | Lê um CRLV (multipart, campo `file`) e devolve os dados extraídos, sem salvar nada |
| GET | `/api/vehicles/:id` | Bearer | Detalhes de um veículo |
| PATCH | `/api/vehicles/:id` | Bearer | Atualiza um veículo |
| DELETE | `/api/vehicles/:id` | Bearer | Exclui um veículo (responde 204) |

## Decisões técnicas

### Arquitetura

- **Monorepo com `frontend/` e `backend/`.** Um único repositório e um único `docker compose` para subir tudo; cada app tem seu próprio `package.json` e Dockerfile.
- **Regras de negócio só na API (NestJS).** O Next é a camada de interface: valida formulários para dar feedback rápido, mas quem decide (unicidade, dono do veículo, senha atual) é a API.
- **Next.js com Server Components e Server Actions.** As páginas buscam os dados no servidor do Next e os formulários enviam por Server Actions. O JWT fica em um **cookie `httpOnly`**, que o JavaScript do navegador não consegue ler; isso reduz o impacto de um XSS. Por isso, quem chama a API é o servidor do Next, não o navegador.
- **Formulários com react-hook-form + Zod.** Os schemas do frontend espelham as regras do backend para mostrar erros no campo antes do envio. A validação é repetida na API (`nestjs-zod`), que é a fonte da verdade.
- **Backend organizado por módulos:** `auth`, `users`, `vehicles`, `gemini` e `prisma` (global), além de `config` para as variáveis de ambiente.
- **Estados de interface reutilizáveis.** Componentes em `frontend/src/components/ui/` (`Button` com estado de envio, `FormField`, `EmptyState`, `ErrorState`, `Skeleton`). Os erros da API são traduzidos para mensagens em português em um único lugar (`frontend/src/lib/api-error.ts`), inclusive erros por campo, e o 401 é tratado em um único ponto (`frontend/src/lib/api.ts`), que leva ao login com aviso de sessão expirada.

### Configuração

- **Variáveis de ambiente validadas com Zod na inicialização (fail fast).** Uma variável ausente ou inválida impede a API de subir, com uma mensagem clara, em vez de falhar depois em uma requisição.
- **Modelo do Gemini em variável de ambiente** (`GEMINI_TEXT_MODEL`), para trocar de modelo sem alterar código.
- **Prisma fixado na versão 7 (estável).** A versão 8 estava em release candidate.
- **Banco exposto na porta 5433 da máquina**, para não conflitar com um PostgreSQL instalado localmente na 5432. Dentro do Docker, a API acessa a porta padrão 5432.

### Banco de dados

- **IDs em UUID**, que não expõem a quantidade de registros nem são sequenciais.
- **camelCase no código e snake_case no banco** (`@map` / `@@map`), seguindo a convenção de cada lado.
- **Placa, chassi e RENAVAM únicos no sistema inteiro.** Um veículo real só existe uma vez. Trade-off: dificulta a venda entre usuários e permite descobrir que uma placa já está cadastrada (ver [Limitações](#limitações)).
- **Exclusão definitiva (hard delete) de veículos.** Um soft delete conflitaria com a unicidade de placa, chassi e RENAVAM. Ao remover um usuário, os veículos dele são removidos em cascata (`onDelete: Cascade`).
- **Dados normalizados.** E-mail sem espaços e em minúsculas (no frontend e na API). Placa e chassi em maiúsculas; o frontend e a leitura do CRLV removem hífens e espaços, e a API só aceita o formato normalizado (ex.: `ABC1D23`).

### Autenticação e segurança

- **JWT com um único token** e expiração configurável (`JWT_EXPIRES_IN`). O logout apaga o cookie da sessão (o JWT é stateless).
- **Senhas com bcrypt** (salt rounds 10) e limite de **72 caracteres**, que é o limite do bcrypt.
- **Mesma mensagem para e-mail inexistente e senha errada** no login, para não revelar quais e-mails estão cadastrados.
- **Rotas `/users/me`:** o usuário vem do token, nunca de um id enviado pelo frontend.
- **Toda consulta de veículo filtra pelo `userId` do token.** Um veículo de outro usuário responde **404** (e não 403), para não revelar que ele existe.
- **Troca de senha exige a senha atual.**
- **O hash da senha nunca sai da API** (`omit: { passwordHash: true }` nas consultas e resposta de login montada só com id, nome e e-mail).
- **E-mail duplicado responde 409**, no cadastro e na edição do perfil.
- **CORS restrito à origem do frontend** (`CORS_ORIGIN`).

### Integração com o Gemini

- **Chamada ao Gemini só no backend.** A chave nunca chega ao navegador.
- **Arquivo do CRLV mantido apenas em memória**, nunca salvo em disco. Tipo (JPG, PNG ou PDF) e tamanho (até 5 MB) são validados antes de chamar a IA.
- **Saída estruturada:** o Gemini responde em JSON seguindo um JSON Schema gerado a partir do schema Zod, com temperatura 0. O prompt pede para ignorar os dados pessoais do proprietário.
- **Resposta da IA tratada como dado não confiável.** Ela é validada com Zod; um campo inválido vira `null`, e o frontend destaca esses campos para o usuário preencher.
- **A leitura não salva nada.** O fluxo é: ler o CRLV → o usuário revisa o formulário → cadastro.
- **Erros específicos:** 400 (arquivo inválido), 422 (não parece um CRLV), 429 (limite de uso da IA) e 502 (falha ao falar com o serviço), cada um com uma mensagem própria no frontend.

### Docker

- **Um único comando** sobe banco, API e frontend. O Postgres tem healthcheck, e a API só inicia quando o banco está pronto (`depends_on` com `service_healthy`).
- **Migrations aplicadas na inicialização do container** (`prisma migrate deploy`), porque durante o build o banco não existe.
- **Builds multi-stage com imagem `node:22.20.0-slim`** (Debian), e não Alpine, por causa do `bcrypt`, que é um módulo nativo. O frontend usa o `output: "standalone"` do Next, e os dois containers rodam com usuário não root.
- **npm 11 dentro das imagens**, a mesma versão que gerou os `package-lock.json`. O npm 10 que vem com o Node 22 considera esses lockfiles "fora de sincronia" no `npm ci`.
- **`NEXT_PUBLIC_API_URL` definida no build como `http://api:3333/api`.** Como quem chama a API é o servidor do Next (dentro do container `web`), a URL usa o nome do serviço na rede do Docker; `localhost` ali apontaria para o próprio container.
- **Variáveis da API passadas uma a uma** no compose (sem `env_file`), para o container receber só o que usa.
- **Volume para os dados do banco** (`drivo_data`).

### Documentação

- **Swagger/OpenAPI** em `/api/docs`, com autenticação Bearer e as respostas de erro de cada rota documentadas.

## Limitações

- **Sem foto gerada por IA nem upload de foto.** O campo `imageUrl` existe no banco, mas nenhuma rota o preenche. Veículos sem foto mostram uma imagem padrão por tipo (carro ou moto) ou um ícone.
- **Placa, chassi ou RENAVAM duplicado responde 500**, e não 409: o erro de unicidade do Prisma (`P2002`) não é tratado. O frontend mostra uma mensagem genérica de instabilidade.
- **Login inválido responde 409**, e não 401 (a mensagem é a mesma para e-mail inexistente e senha errada).
- **Diferença de tempo no login:** a senha só é comparada com o bcrypt quando o e-mail existe, então a resposta para um e-mail inexistente é mais rápida (timing attack).
- **Logout não invalida o token no servidor.** O JWT continua válido até expirar.
- **Unicidade global de placa, chassi e RENAVAM:** o comprador de um carro não consegue cadastrá-lo enquanto o vendedor não o excluir.
- **Leitura do CRLV depende da cota gratuita do Gemini.** Ao atingir o limite, a API responde 429 e o usuário pode preencher o formulário manualmente.
- **Testes automatizados insuficientes:** só os arquivos gerados pelo Nest CLI, e 7 das 8 suítes unitárias falham por configuração do Jest (ver [Como testar](#como-testar)). O frontend não tem testes.
- **Listagem de veículos sem paginação.**
- **`@tanstack/react-query` está instalado, mas não é usado.** Os dados são buscados com Server Components.
- **O volume `drivo_uploads` e a pasta `/app/uploads` estão preparados no Docker, mas ainda não são usados** (nenhuma rota grava arquivos).
- **O Swagger não chama o `cleanupOpenApiDoc` do `nestjs-zod`**, recomendado para pós-processar os schemas gerados a partir do Zod; os schemas dos corpos podem aparecer incompletos na documentação.

## Com mais tempo

- **Testes:** corrigir a configuração do Jest (`moduleNameMapper` para `src/` e para os imports `.js` do Prisma), escrever testes unitários dos services (auth, users, vehicles, leitura do CRLV com o Gemini mockado), testes e2e das rotas e testes do frontend, rodando em um pipeline de CI.
- **Filtro global de erros do Prisma:** `P2002` → 409 (com o campo duplicado) e `P2025` → 404.
- **Login com 401** e comparação de senha com tempo constante (comparar com um hash fictício quando o e-mail não existe).
- **Refresh token e revogação de sessão.**
- **Foto do veículo:** upload pelo próprio usuário e geração por IA em segundo plano, com fila (ex.: BullMQ + Redis) e armazenamento em S3.
- **Guard JWT global com um decorator `@Public()`**, para as rotas serem protegidas por padrão.
- **Schemas Zod compartilhados entre frontend e backend**, em vez de manter os dois espelhados.
- **Fluxo de transferência de veículo entre usuários.**
- **Paginação** na listagem de veículos.
- **Swagger:** aplicar o `cleanupOpenApiDoc` do `nestjs-zod`.

## Estrutura de pastas

```text
drivo/
├── docker-compose.yaml
├── .env.example
├── backend/                  # API NestJS
│   ├── Dockerfile
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── prisma.config.ts
│   ├── src/
│   │   ├── auth/             # cadastro, login, JWT e guard
│   │   ├── users/            # /users/me, perfil e senha
│   │   ├── vehicles/         # CRUD de veículos e leitura do CRLV
│   │   ├── gemini/           # cliente do Google Gemini
│   │   ├── prisma/           # PrismaService (módulo global)
│   │   ├── config/           # validação das variáveis de ambiente
│   │   └── main.ts           # prefixo /api, CORS e Swagger
│   └── test/                 # teste e2e
└── frontend/                 # Next.js (App Router)
    ├── Dockerfile
    └── src/
        ├── app/              # páginas, error.tsx e not-found.tsx
        ├── components/
        │   ├── header/
        │   └── ui/           # Button, FormField, EmptyState, Skeleton...
        ├── features/         # auth, profile e vehicles (formulários e Server Actions)
        ├── lib/              # cliente da API, tradução de erros, sessão
        └── proxy.ts          # redireciona para o login sem sessão
```
