# GoBarber App Mobile

![Badge](https://img.shields.io/badge/Bootcamp%20Rocketseat-React%20Native-blueviolet) ![Badge](https://img.shields.io/badge/types-Flow%20%7C%20TypeScript-blue)

> Status do Projeto: Em desenvolvimento :warning:

## Tópicos

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Linguagens, dependencias e libs utilizadas](#dependências)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Deploy da Aplicação](#deploy-da-aplicação-dash)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Iniciando banco de dados](#banco-de-dados)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Layout da Aplicação](#layout-da-aplicação)

## Descrição do projeto

Neste projeto desenvolvo a interface em App Mobile da aplicação GoBarber, onde será posível realizar login e cadastro na plataforma, agendamentos dos e para os clientes, pesquisar e exibir agendamentos e prestadores de serviço, tudo recebido através da API (back-end) própria.

## Linguagens, dependencias e libs utilizadas :books:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Funcionalidades

:heavy_check_mark: Cadastro

:heavy_check_mark: Login

:heavy_check_mark: Atualizar Avatar

:heavy_check_mark: Listar prestadores

:heavy_check_mark: Listar agendamentos

## Pré-requisitos

Será necessário o [back-end](https://github.com/MGustav0/gobarber2.0/tree/master/backend) rodando com o banco de dados ativo.

:warning: [Node](https://nodejs.org/en/download/)
:warning: [Yarn](https://yarnpkg.com/getting-started/install)
:warning: [Docker](https://www.docker.com/products/docker-desktop)
:warning: [PostgreSQL Docker](https://hub.docker.com/_/postgres)

## Iniciando banco de dados

Faça como explicado no [README.md do projeto back-end](https://github.com/MGustav0/gobarber2.0/blob/master/backend/README.md).

## Como rodar a aplicação :arrow_forward:

Para rodar o app:

1. No terminal, clone o projeto: `git@github.com:MGustav0/gobarber2.0.git`

2. Acesse a pasta via terminal: `cd ./mobile`.

3. Instale as dependencias: `yarn install`

4. No android habilite a depuração do sistema para instalar o app e tenha o Google ADB instalado para conseguir realizar a conexão via cabo. Caso seja um emulador, o Android Studio deve ser instalado (já contém o ADB).

5. Execute: `yarn start`

6. Execute: `yarn android` ou `yarn ios`

## Layout da Aplicação :dash:

### Criar usuário

<img width="270" heigth="480" halign="middle" src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/01_-_create_user.jpg">

### Logar Usuário

<img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/02_-_user_login.jpg" width="270" heigth="480" />

### Dashboard

<img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/03_-_dashboard.jpg" width="270" heigth="480" />

### Atualizar Avatar

<img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/04_-_profile.jpg" width="270" heigth="480" /> <img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/05_-_change_profile.jpg" width="270" heigth="480" />

### Criar agendamentos

<img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/07_-_appointments.jpg" width="270" heigth="480" /> <img src="https://github.com/MGustav0/gobarber2.0/blob/master/extras/screenshots/mobile/08_-_appointment_done.jpg" width="270" heigth="480" />

## Resolvendo Problemas :exclamation:

Me conte [aqui](https://github.com/MGustav0/desafio-gostack-fundamentos-reactjs/issues).

## Licença

Interface desenhada pela Rocketseat para o Bootcamp.

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
