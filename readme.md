# 🧠 Quaestum Full-Stack Challenge

Este projeto full-stack foi desenvolvido como parte do desafio técnico da Quaestum. Ele integra um front-end em React com um back-end em AdonisJS, utilizando MySQL como banco de dados e AWS Lambda para envio de e-mails. Todo o ambiente é orquestrado com Docker para garantir facilidade na execução e portabilidade.

## ✨ Funcionalidades Principais

- **Cadastro de Usuários:**  
  Permite que gestores se cadastrem na plataforma com validação de dados e autenticação JWT.

- **Autenticação e Login:**  
  Login seguro com validação de credenciais e suporte a redirecionamento baseado no tipo de usuário (gestor ou candidato).

- **Cadastro de Candidatos:**  
  Candidatos podem se inscrever para vagas, fornecendo informações como habilidades, formações acadêmicas e dados pessoais.

- **Gerenciamento de Candidaturas:**  
  Gestores podem visualizar, aprovar ou recusar candidaturas diretamente no painel de controle.

- **Notificações por E-mail:**  
  Envio automatizado de e-mails para redefinição de senha, confirmação de candidatura e notificações de aprovação ou recusa.

- **Painel de Controle:**  
  - **Gestores:** Acompanham a lista de candidatos, filtram por nome ou habilidades e gerenciam o status das candidaturas.  
  - **Candidatos:** Visualizam o status de sua candidatura e recebem notificações de progresso.

- **Validação de Dados:**  
  Utiliza `zod` no front-end e AdonisJS Validator no back-end para garantir a integridade dos dados.

- **Integração com APIs Externas:**  
  - Busca de endereço via CEP utilizando a API do ViaCEP.  
  - Envio de e-mails via AWS Lambda.

---

## :telephone_receiver: Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-gabriel--rosaa-blue?logo=linkedin)](https://www.linkedin.com/in/gabriel-rosaa/)  
[![GitHub](https://img.shields.io/badge/GitHub-Gabriel--Pink-black?logo=github)](https://github.com/Gabriel-Pink)  
![Discord](https://img.shields.io/badge/Discord-gabriel.tec-%237289DA?logo=discord)  
[![Whatsapp](https://img.shields.io/badge/Whatsapp-(11)%2091356--4300-%237289DA?logo=whatsapp)](https://wa.me/+5511913564300)  
[![E-mail](https://img.shields.io/badge/E--email-contato@gabriel--rosa.com-%237289DA?logo=email)](mailto:contato@gabriel-rosa.com)

---

## 🔧 Tecnologias Utilizadas

- **Front-end:** React + Vite  
- **Back-end:** AdonisJS  
- **Banco de Dados:** MySQL  
- **Envio de E-mails:** AWS Lambda  
- **Containerização:** Docker & Docker Compose  

---

## 🚀 Executando Localmente

### Pré-requisitos

- Docker instalado em sua máquina.

### Instruções

1. Clone o repositório:
    ```bash
    git clone https://github.com/Gabriel-Pink/quaestum-challenge.git
    cd quaestum-challenge
    ```
2. Suba os containers:
    ```bash
    docker compose up --build
    ```
3. Acesse no navegador:
    `http://localhost:5173`

---

## 🎥 Demonstração em Vídeo

[Assista ao vídeo de demonstração](https://www.youtube.com/watch?v=MgcSGTt7XA0)

---

## 📂 Estrutura do Projeto

### Front-end
- **Tecnologias:** React, Vite, TailwindCSS.
- **Funcionalidades:** Formulários de cadastro e login, painel de controle, validação de dados com `zod`.

### Back-end
- **Tecnologias:** AdonisJS, MySQL.
- **Funcionalidades:** Autenticação JWT, gerenciamento de usuários e candidaturas, envio de e-mails.