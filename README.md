# GoBarber

![Badge](https://img.shields.io/badge/node-%3E%3D%2012.18.2-brightgreen) ![Badge](https://img.shields.io/badge/types-Flow%20%7C%20TypeScript-blue)

> Status do Projeto: Em desenvolvimento :warning:
<!-- > Status do Projeto: Em desenvolvimento :warning: -->

## Status do Projeto

> Concluido :heavy_check_mark:

## Descrição do projeto

Neste projeto desenvolvo a interface WEB da aplicação GoBarber. Onde será posível realizar login na plataforma, agendamentos dos e para os clientes, pesquisar e exibir agendamentos e prestadores de serviço, tudo recebido através da API (back-end) própria.

## Linguagens, dependencias e libs utilizadas :books:

- [TypeScript](https://www.typescriptlang.org/)

## Funcionalidades

:heavy_check_mark: Criar usuário.

:heavy_check_mark: logar usuário.

:heavy_check_mark: Atualizar avatar do usuário.

:heavy_check_mark: Criar agendamentos.

:heavy_check_mark: Listar agendamentos.

## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)
:warning: [Yarn](https://yarnpkg.com/getting-started/install)
:warning: [Docker](https://www.docker.com/products/docker-desktop)
:warning: [PostgreSQL Docker](https://hub.docker.com/_/postgres)

## Iniciando/Configurando banco de dados

Ter Docker/PostgreSQL instalados.

### Instalar PostgreSQL via Docker

*`docker run --name postgresGoBarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
*Verificar se a imagem está rodando: `docker ps`
*Usuário: postgres
*Senha: docker
*Acesso pelo terminal: `docker exec -it nome_do_container bash`

### Criar Banco de Dados

1. Instale o DBeaver, ou outro gerenciador de Banco de Dados, ou faça por linha de comando.
2. Acesse com o usuário e senha supracitados.
3. Crie um Banco de Dados com o nome __gobarber__.

## Como rodar a aplicação

1. No terminal, clone o projeto: `git@github.com:MGustav0/gobarber2.0.git`

2. Acesse a pasta backend via terminal `cd /backend`.

3. Instale as dependencias: `yarn instal`

4. Execute: `yarn dev:server`

Pronto! Agora basta acessar a aplicação à partir do link: http://localhost:3333/

## Layout da aplicação (back-end)

Resultados obtidos pelo [Insomnia](https://insomnia.rest/download/) um software para interação com o backend (API) via HTTP e JSON.

### Criar usuário
 
<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_create.png" max-width="800" max-heigth="600" />

### Logar Usuário
 
Lista as transações e informa o balanço:

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_list.png" max-width="800" max-heigth="600" />

### Atualizar Avatar

Importa arquivos do tipo CSV **[neste formato]**(https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/file.csv):

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_import.png" max-width="800" max-heigth="600" />

### Criar agendamentos

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_delete_error.png" max-width="800" max-heigth="600" />

### Listar agendamentos

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_delete_error.png" max-width="800" max-heigth="600" />

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Projeto proposto com 💜 by Rocketseat para o Bootcamp :wave:
