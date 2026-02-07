# 📺 Calendário Anime API

API REST para gerenciamento de calendário de animes com autenticação JWT e controle de acesso baseado em roles.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js
- **[Prisma](https://www.prisma.io/)** - ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados
- **[JWT](https://jwt.io/)** - Autenticação
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem

## 📋 Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **PostgreSQL** >= 14.x

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd calendario-anime-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/anime_db?schema=public"

# JWT
JWT_SECRET="seu_secret_super_seguro_aqui"
JWT_EXPIRES_IN="7d"

# Application
NODE_ENV="development"
PORT=3000
```

### 4. Configure o banco de dados

```bash
# Criar as migrations e aplicar ao banco
npx prisma migrate dev

# Gerar o Prisma Client (já é feito automaticamente no postinstall)
npx prisma generate
```

## ▶️ Executando a aplicação

### Modo desenvolvimento

```bash
npm run start:dev
```

### Modo produção

```bash
# Build
npm run build

# Executar
npm run start:prod
```

A aplicação estará disponível em:

- **API:** http://localhost:3000
- **Swagger UI:** http://localhost:3000/api

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo watch
npm run start:debug        # Inicia em modo debug

# Build e Produção
npm run build              # Compila o projeto
npm run start:prod         # Executa em produção

# Prisma
npm run prisma:generate    # Gera o Prisma Client
npm run prisma:migrate     # Cria e aplica migrations
npm run prisma:studio      # Abre o Prisma Studio

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Testes em modo watch
npm run test:cov           # Testes com coverage
npm run test:e2e           # Testes end-to-end

# Qualidade de código
npm run lint               # Verifica o código
npm run format             # Formata o código
```

## 🗂️ Estrutura do Projeto

```
calendario-anime-api/
├── prisma/
│   ├── schema.prisma              # Schema do Prisma
│   └── migrations/                # Migrations do banco
│
├── src/
│   ├── animes/                    # Módulo de animes
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── interfaces/            # Interfaces TypeScript
│   │   ├── animes.controller.ts   # Controller
│   │   ├── animes.service.ts      # Service
│   │   └── animes.module.ts       # Module
│   │
│   ├── auth/                      # Módulo de autenticação
│   │   ├── decorators/            # Decorators customizados
│   │   ├── guards/                # Guards de proteção
│   │   ├── strategies/            # Estratégias de autenticação
│   │   ├── auth.controller.ts     # Controller
│   │   ├── auth.service.ts        # Service
│   │   └── auth.module.ts         # Module
│   │
│   ├── users/                     # Módulo de usuários
│   │   ├── dto/                   # DTOs de usuários
│   │   ├── users.service.ts       # Service
│   │   └── users.module.ts        # Module
│   │
│   ├── prisma/                    # Módulo do Prisma
│   │   ├── prisma.service.ts      # Service do Prisma
│   │   └── prisma.module.ts       # Module do Prisma
│   │
│   ├── app.module.ts              # Módulo principal
│   └── main.ts                    # Entry point
│
├── .env                           # Variáveis de ambiente (não commitado)
├── .env.example                   # Template de variáveis
├── .gitignore                     # Arquivos ignorados pelo Git
├── package.json                   # Dependências e scripts
└── README.md                      # Este arquivo
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas:

1. **Registre-se** em `POST /auth/register`
2. **Faça login** em `POST /auth/login` para obter o token
3. **Use o token** no header `Authorization: Bearer {seu_token}`

### Roles Disponíveis

- **USER** - Usuário comum (pode visualizar animes)
- **ADMIN** - Administrador (pode criar, editar e deletar animes)

## 📚 Documentação da API

Após iniciar a aplicação, acesse a documentação interativa do Swagger:

```
http://localhost:3000/api
```

No Swagger você pode:

- ✅ Visualizar todos os endpoints
- ✅ Testar requisições diretamente
- ✅ Ver modelos de dados (schemas)
- ✅ Autenticar com JWT

## 🗃️ Banco de Dados

### Visualizar dados no navegador

```bash
npx prisma studio
```

Ao rodar o comando, automaticamente irá redirecionar para o navegador.

### Resetar banco de dados (desenvolvimento)

```bash
npx prisma migrate reset
```

⚠️ **Atenção:** Este comando apaga todos os dados!

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com watch mode
npm run test:watch

# Testes com coverage
npm run test:cov

# Testes E2E
npm run test:e2e
```

## 🐛 Troubleshooting

### Erro de conexão com o banco

Verifique se:

- PostgreSQL está rodando
- Credenciais no `.env` estão corretas
- Database existe

```bash
# Criar database manualmente
psql -U postgres -c "CREATE DATABASE anime_db;"
```

### Prisma Client não encontrado

```bash
# Gerar novamente
npx prisma generate
```

### Porta 3000 em uso

Altere a porta no `.env`:

```env
PORT=3001
```

## 📝 Notas Importantes

- ⚠️ **NUNCA** commite o arquivo `.env` (contém credenciais)
- ⚠️ **NUNCA** commite a pasta `src/generated/` (gerada automaticamente)
- ✅ **SEMPRE** commite `prisma/schema.prisma` e `prisma/migrations/`
- ✅ Execute `npx prisma generate` após `git pull` com mudanças no schema

## 📄 Licença

Este projeto está sob a licença MIT.
