# **CSI606-2024-02 - Remoto - Proposta de Trabalho Final**

## 🧑‍🎓 *Discente: Bernardo Lucas de Araújo Dias*

---

## 🧵 StitchFlow

O **StitchFlow** é uma aplicação web desenvolvida para auxiliar costureiras faccionistas no gerenciamento de suas ordens de serviço. Inspirado na necessidade real de otimizar a organização dos pedidos da minha mãe (também costureira), o sistema busca facilitar o registro e controle de peças produzidas, clientes atendidos e valores recebidos.

Com um CRUD completo, é possível cadastrar, editar e visualizar ordens de serviço detalhadas, incluindo quantidade e tipos de peças, preços e informações dos clientes. O objetivo é proporcionar mais eficiência e profissionalismo ao dia a dia das costureiras, tornando a gestão do trabalho mais organizada.

---

## 📌 1. Tema

Desenvolvimento de um **Sistema de Gerenciamento de Ordens de Serviço para Costura Faccionista**, visando otimizar o controle de pedidos, clientes e produção. O sistema facilitará o registro e a gestão das ordens de serviço, proporcionando maior organização e eficiência no processo produtivo.

---

## 📦 2. Escopo

O sistema contará inicialmente com um CRUD para gerenciamento de:

- ✅ Ordens de serviço (criação, edição e exclusão de pedidos).
- ✅ Clientes (cadastro, atualização e remoção de clientes).
- ✅ Peças (registro e gerenciamento dos tipos de peças).

📈 *Funcionalidades futuras (se o tempo permitir):*

- Geração de relatórios, como:
    - Faturamento mensal;
    - Quantidade de pedidos por período.

---

## 🚫 3. Restrições

- Este trabalho **não contempla funcionalidades de autenticação/autorização** de usuários.
- O foco está no CRUD das entidades principais e usabilidade para costureiras autônomas.

---

## 🧪 4. Protótipo

As páginas previstas são:

- 📋 Cadastro de Ordens de Serviço;
- 👥 Cadastro de Clientes;
- 🧶 Cadastro de Peças;
- 🏠 Página principal com listagem das ordens de serviço (incluindo dados de clientes e peças).

Atualmente, o projeto se encontra em fase de desenvolvimento da **arquitetura do servidor**. Em breve, os protótipos visuais da interface serão disponibilizados via **Figma**.

---

## ▶️ 5. Como rodar o projeto

### ✅ Pré-requisitos:

- [Docker](https://www.docker.com/)
- [Node.js & NPM](https://nodejs.org/)

### 📁 Estrutura do projeto:
```
/
├── server                # Backend (NestJS)
└── sewing-management    # Frontend (provavelmente em Next.js ou similar)
```

### 🧩 Passo a passo:

1. **Subir o banco de dados (PostgreSQL via Docker Compose)**  
   No diretório `server`, execute:
   ```bash
   docker compose up -d
   ```

2. **Iniciar o servidor (backend)**  
   Ainda no diretório `server`, execute:
   ```bash
   npm install
   npm run start:dev
   ```

3. **Iniciar o frontend**  
   No diretório `sewing-management`, execute:
   ```bash
   npm install
   npm run dev
   ```

4. **Acessar a aplicação**  
   Abra o navegador e acesse o endereço indicado no terminal pelo frontend (geralmente `http://localhost:3000`).

---
