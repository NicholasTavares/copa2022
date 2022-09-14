# Passo a passo para rodar projeto Copa 2022

## Dependências

- Necessário possuir node instalado
- Yarn

## Instalar dependências

- Navegue até a pasta do projeto e digite "yarn"

## Configurar banco de dados

- Crie um banco de dados MySQL
- Crie um arquivo .env no diretório raiz do projeto
- No arquivo .env coloque a variável DB_MAIN_HOST com seu host, normalmente é localhost
- No arquivo .env coloque a variável DB_MAIN_PORT com a porta que está rodando o banco de dados, o padrão do MySQL é 3306
- No arquivo .env coloque a variável DB_MAIN_USER com o usuário do banco de dados, o padrão do MySQL é root
- No arquivo .env coloque a variável DB_MAIN_PASSWORD com a senha criada para seu banco de dados
- No arquivo .env coloque a variável DB_MAIN_DATABASE com o nome do banco de dados criado

## Rodar projeto

- Após instalar as dependências, digite "yarn start:dev" para rodar projeto.
- O servidor irá rodar na porta 3002

## Insomnia Docs

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Copa%202022&uri=https%3A%2F%2Fraw.githubusercontent.com%2FNicholasTavares%2Fcopa2022%2Fmaster%2FInsomnia_2022-09-14.json)
