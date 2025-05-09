# 🛠️ Backend - Quaestum Challenge

Este é o backend do projeto Quaestum Challenge, desenvolvido com **AdonisJS**. Ele segue a arquitetura **MVC (Model-View-Controller)** e adota práticas de **Domain-Driven Design (DDD)** para organizar o código de forma modular e escalável.

## 📂 Estrutura do Projeto

- **Controllers:** Gerenciam as requisições HTTP e delegam a lógica para os serviços.
- **Services:** Contêm a lógica de negócios, como criação de usuários e gerenciamento de candidaturas.
- **Models:** Representam as tabelas do banco de dados e encapsulam a lógica relacionada aos dados.
- **Middlewares:** Interceptam requisições para autenticação, autorização e outras verificações.
- **Validators:** Garantem a integridade dos dados recebidos nas requisições.

## 🔧 Tecnologias Utilizadas

- **Framework:** AdonisJS
- **Banco de Dados:** MySQL
- **Autenticação:** JWT
- **ORM:** Lucid
- **Validação:** AdonisJS Validator
- **Envio de E-mails:** AWS Lambda

## 🚀 Como Executar

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Configure o arquivo `.env` com as variáveis de ambiente necessárias (veja o exemplo em `.env.example`).

3. Execute as migrações:
    ```bash
    node ace migration:run
    ```

4. Inicie o servidor:
    ```bash
    node ace serve
    ```