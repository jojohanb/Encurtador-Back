# Trabalho Encurtador de Links DW3
**Objetivo** = Esse trabalho tem o objetivo de aplicar todo o conhecimento aprendido em sala de aula em prática, utilizando frameworks e outros métodos aprendidos, como, Backend[Node.js] e [Fastify], Bd[Supabase(postgreSQL)], e o Frontend[React].

## Tecnologias Utilizadas:

* **Node.js**: Ambiente de execução.
* **Fastify**: Framework web rápido e de baixo overhead.
* **Drizzle ORM**: ORM moderno para TypeScript/JavaScript.
* **PostgreSQL (Supabase(postgreSQL))**: Banco de dados relacional.
* **dotenv**: Para gerenciamento de variáveis de ambiente.

## Padrão:
O nosso projeto segue o padrão de arquitetura modular, separando as responsabilidades em camadas:

* **`infra/`**: Lógica de conexão com o banco de dados.
    * `connection.js`: Configuração do Drizzle ORM e conexão com o banco PostgreSQL.
    * `db/schema.js`: Definição da tabela `urls`.
* **`modules/`**: Lógica de negócio agrupada por funcionalidade.
    * `controllers/`: Manipula a requisição e a resposta (Fastify).
    * `repositories/`: Interage diretamente com o banco de dados (Drizzle ORM).
    * `services/`: Contêm a lógica de negócio e regras de validação.
    * `routes/`: Define os *endpoints* da API (Fastify).
* **`server.js`**: Inicialização do servidor Fastify.

## Como Rodar o Projeto
  ## 1. Criar o .env e adicionar a conexão(está no gitignore)
    Conexão: DATABASE_URL=postgresql://postgres:giovana215@db.kniunlstaibxiorvxumr.supabase.co:5432/postgres


  ### 2. Instalar as dependências(tanto no back quanto no no front)
    npm i

  ### 3. Rodar o drizzle
    Para sincronizar o bd com novas colunas 
    "npx drizzle-kit push"
    "npx drizzle-kit migrate"

  ### 4. Entrar na pasta src/Server.js usando o comando, e rodar o server
    cd src
    node Server.js
