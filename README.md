# 🎵 Sonarate API – Backend com Go + Fiber

Este repositório contém a API backend para o **Sonarate**, uma aplicação inspirada no Letterboxd, mas voltada para música. Usuários podem avaliar álbuns, seguir outros usuários, montar playlists, manter histórico de escuta, curtir músicas e muito mais.

A stack principal é **Go (Golang)** com o framework ultra-performático **Fiber**, organizado com base em Clean Architecture e princípios SOLID para máxima escalabilidade e manutenibilidade.

---

## 🧬 Estrutura de Diretórios

```
sonarate-api/
├── cmd/                      # Ponto de entrada da aplicação
│   └── main.go               # Arquivo principal, configuração e inicialização
│
├── internal/                 # Código privado da aplicação
│   ├── domain/               # 💠 Camada de Domínio - Regras de Negócio
│   │   ├── entities/         # Entidades principais do domínio (User, Album, etc)
│   │   └── value_objects/    # Objetos de valor imutáveis do domínio
│   │
│   ├── application/          # 🔄 Camada de Aplicação - Casos de Uso
│   │   ├── usecases/         # Implementação dos casos de uso da aplicação
│   │   └── interfaces/       # Interfaces (ports) para repositórios e serviços
│   │
│   ├── infrastructure/       # 🔧 Camada de Infraestrutura - Implementações
│   │   ├── persistence/      # Implementações de repositórios (PostgreSQL, etc)
│   │   ├── http/             # Controllers, Middlewares e Rotas HTTP
│   │   └── messaging/        # Implementações de mensageria (se necessário)
│   │
│   ├── dto/                  # 📦 Objetos de Transferência de Dados
│   │   ├── request/          # DTOs para dados de entrada
│   │   └── response/         # DTOs para dados de saída
│   │
│   ├── validation/           # ✅ Validação de Dados
│   │   └── validators/       # Validadores específicos por entidade/caso de uso
│   │
│   └── config/               # ⚙️ Configurações da Aplicação
│       └── config.go         # Carregamento de variáveis de ambiente, etc
│
├── pkg/                      # 📚 Pacotes Públicos Reutilizáveis
│   └── utils/                # Utilitários genéricos
│
├── go.mod                    # Gerenciamento de dependências Go
└── go.sum                    # Checksums das dependências
```

### 📚 Detalhamento das Camadas

#### 💠 Camada de Domínio (`domain/`)
- Contém as regras de negócio centrais
- Entidades principais como User, Album, Playlist
- Objetos de valor imutáveis
- Independente de frameworks e bibliotecas externas

#### 🔄 Camada de Aplicação (`application/`)
- Implementa os casos de uso da aplicação
- Orquestra o fluxo de dados entre as camadas
- Define interfaces para serviços externos
- Contém a lógica de negócio específica da aplicação

#### 🔧 Camada de Infraestrutura (`infrastructure/`)
- Implementações concretas de interfaces
- Adaptadores para frameworks e bibliotecas
- Gerenciamento de banco de dados
- Controllers HTTP e rotas da API
- Implementações de mensageria

#### 📦 DTOs (`dto/`)
- Objetos para transferência de dados entre camadas
- Previne exposição direta das entidades do domínio
- Versiona a API através de diferentes DTOs
- Separa preocupações de validação

#### ✅ Validação (`validation/`)
- Validadores específicos por entidade
- Regras de validação de dados
- Helpers para validação de entrada

#### ⚙️ Configuração (`config/`)
- Gerenciamento de variáveis de ambiente
- Configurações de banco de dados
- Configurações de serviços externos

<!-- ---

## 🎯 Funcionalidades da API

- 👤 **Usuários**
  - Registro, login e perfil
  - Seguir outros usuários
  - Histórico de escuta

- 🎶 **Músicas e Álbuns**
  - Cadastro de artistas, álbuns e faixas
  - Curtir músicas e marcar como favoritas

- 📝 **Reviews**
  - Avaliar e comentar álbuns
  - Curtir reviews de outros usuários

- 📚 **Playlists e Listas**
  - Criar e organizar listas personalizadas
  - Compartilhar playlists públicas ou privadas

- 🔍 **Descoberta**
  - Explorar o que amigos estão ouvindo
  - Recomendações baseadas no histórico

--- -->

## 🚀 Como Rodar o Projeto

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/sonarate-api.git
cd sonarate-api
```

2. **Configure as variáveis de ambiente (.env)**
```env
# Servidor
PORT=3000
ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sonarate
DB_USER=postgres
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=seu_secret_aqui
JWT_EXPIRATION=24h
```

3. **Instale as dependências:**
```bash
go mod tidy
```

4. **Execute a aplicação:**
```bash
go run cmd/main.go
```
A aplicação rodará por padrão em http://localhost:3000.

## 🛠 Tecnologias e Padrões

### 🔧 Tecnologias Base
- **Go (Golang)**: Linguagem principal
- **Fiber**: Framework web ultra-rápido
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache (opcional)
- **JWT**: Autenticação e autorização

### 📐 Arquitetura e Padrões
- **Clean Architecture**: Separação clara de responsabilidades
- **SOLID**: Princípios de design orientado a objetos
- **DDD**: Padrões do Domain-Driven Design
- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Inversão de controle

### 🧰 Ferramentas de Desenvolvimento
- **Air**: Live-reload para desenvolvimento
- **Swagger**: Documentação da API
- **Mockery**: Geração de mocks para testes
- **Migrate**: Migrations do banco de dados

## 🔐 Segurança e Autenticação

A API implementa várias camadas de segurança:

### 🔒 Autenticação
- JWT (JSON Web Tokens) para autenticação stateless
- Refresh tokens para melhor experiência do usuário
- Rate limiting para prevenção de ataques

### 📝 Headers de Autenticação
```http
Authorization: Bearer <seu-token-aqui>
```

### 🛡️ Middlewares de Segurança
- CORS configurável
- Proteção contra XSS
- Rate Limiting
- Validação de entrada

## 📄 Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.