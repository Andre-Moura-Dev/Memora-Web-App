# 💻 Memora Web App

Este projeto é uma **extensão do site institucional** da empresa **Memora Processos Inovadores**, com o objetivo de facilitar a **gestão de conteúdo** por meio de uma interface exclusiva para administradores.

## 🧩 Sobre o Projeto

Com este incremento, foi adicionada ao site uma **página protegida por autenticação**, acessível apenas por usuários com credenciais de administrador. Através dessa interface, os administradores podem gerenciar conteúdos do site de forma independente, sem a necessidade de envolver desenvolvedores.

### Funcionalidades disponíveis para administradores:

- 📢 Gerenciar **notícias** na seção _Na Mídia_
- ✍️ Criar, editar ou excluir **postagens no Blog**
- 💼 Adicionar e atualizar **vagas de emprego** na página _Trabalhe Conosco_
- 📄 Realizar outras **atualizações de conteúdo** conforme necessário

Essa solução garante **autonomia para o time administrativo**, otimizando a gestão do site e agilizando a publicação de informações.

## 🔒 Acesso Restrito

A página administrativa é protegida por **autenticação com JSON Web Tokens (JWT)**. Somente usuários autorizados, com login e senha válidos, têm acesso ao painel de administração.

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma stack moderna e robusta:

- **Node.js** + **Express** — API backend para gerenciamento de dados e autenticação
- **Next.js** — Frontend moderno com server-side rendering e rotas dinâmicas
- **MySQL** — Banco de dados relacional para armazenamento das informações
- **JWT (JSON Web Token)** — Autenticação segura baseada em tokens


## 💡 Benefícios

- ✅ Redução da dependência de desenvolvedores para atualizações simples
- ✅ Interface intuitiva e segura para administradores
- ✅ Centralização da gestão de conteúdo
- ✅ Atualizações em tempo real no site institucional

## 📄 Licença

Este projeto é de uso interno da empresa **Memora Processos Inovadores**.
