<h1 align="center">

<h3 align="center">
  Aplicação base para backend com Javascript
</h3>
</h1>

---

## Descrição:

Esse repositório é referente a um template base de backend em nodejs com express.

---

## Ferramentas utilizadas:

- **Sequelize:** ORM usado para conversação com banco de dados.
- **Bcryptjs:** Usado para criptografia de senhas.
- **DotEnv:** Usado para lidar com variáveis de ambiente.
- **Date-fns:** Usado para manipulação de datas.
- **Yup:** Usado para validações de schemas.
- **JWT:** Usado para autenticação.
- **Multer:** Usado para auxiliar o upload de arquivos.
- **Sentry:** Usado para monitoramento da aplicação.



## Banco de dados da aplicação:

- Postgres

---

## Como executar o projeto:

1. Instale as dependências:
   > \$ yarn
2. Subir banco de dados com postgree no docker:
   > docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres --name postgresDB
3. Crie uma copia do arquivo .env.example, renomeie para .env e adicione os devidos valores.
4. Execute o script para executar as migrations:
   > \$ yarn sequelize db:migrate

- Para inicializar um perfil de admin execute:
  > \$ yarn sequelize db:seed:all

5. Execute a aplicação:
   > \$ yarn dev

---
