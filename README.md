# Finanças Pessoais 📈

Sistema web de controle financeiro pessoal, desenvolvido com React e Firebase, que permite adicionar, visualizar, editar e categorizar entradas e saídas por mês. Ideal para manter um controle simples, organizado e responsivo do seu orçamento mensal.

---

## 🔧 Funcionalidades

* [x] Cadastro de transações (entradas e saídas)
* [x] Filtro por tipo (entrada/saída) e por mês
* [x] Gráfico de pizza por categoria
* [x] Gráfico de barras com entradas e saídas
* [x] Alternar entre meses (passado e futuro)
* [x] Login e autenticação com Firebase
* [x] Armazenamento de dados por usuário (uid) no Firestore
* [x] Interface responsiva e acessível
* [x] Totalizadores: entradas, saídas e saldo

---

## 🌐 Acesse o app publicado

> [https://financas-pessoais.vercel.app](https://financas-pessoais.vercel.app)

---

## 📃 Tecnologias utilizadas

* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Firebase Auth + Firestore](https://firebase.google.com/)
* [Recharts (gráficos)](https://recharts.org/en-US/)
* [Vite](https://vitejs.dev/)
* [Vercel](https://vercel.com/)

---

## ⚖️ Como funciona o sistema

### 1. Login

* O usuário precisa estar autenticado para acessar o sistema
* Cada usuário vê apenas suas próprias transações (segregação por `uid`)

### 2. Cadastro de transações

* Campos: data, tipo (entrada/saída), descrição, valor, categoria
* Os dados são salvos em um documento Firestore no formato:

  ```
  usuarios/{uid}/transacoes/{ano-mes} => { lista: [...] }
  ```

### 3. Visualização e edição

* Tabela responsiva com opções para:

  * Editar, Duplicar e Excluir uma transação
  * Valores positivos em verde (+) e negativos em vermelho (-)
  * Linhas coloridas com opacidade 50% conforme tipo

### 4. Gráficos

* **Pizza**: distribuição por categoria
* **Barras**: comparação entre entradas e saídas

### 5. Filtros e navegação por mês

* Seleção de mês no filtro
* Setas para alternar meses (retroceder ou avançar)
* As transações do mês correspondente são carregadas automaticamente do Firestore

---

## 🚀 Executar localmente

```bash
# Clone o repositório
$ git clone https://github.com/seu-usuario/financas-pessoais.git

# Instale as dependências
$ npm install

# Crie um arquivo .env.local com suas credenciais Firebase (exemplo abaixo)
```

### .env.local (exemplo)

```
VITE_API_KEY=xxx
VITE_AUTH_DOMAIN=xxx
VITE_PROJECT_ID=xxx
VITE_STORAGE_BUCKET=xxx
VITE_MESSAGING_SENDER_ID=xxx
VITE_APP_ID=xxx
```

```bash
# Inicie o projeto
$ npm run dev
```

---

## 🌟 Ideias futuras

* [ ] Exportar para Excel / PDF
* [ ] Dark mode
* [ ] Gráfico de evolução mensal
* [ ] Categorias customizáveis
* [ ] Notificações e lembretes

---

## 👥 Autor

Desenvolvido por **Khemraj Junior** ✨
[LinkedIn](https://www.linkedin.com/in/khemrajjunior) | [GitHub](https://github.com/khemrajuniordev)

---

## ⚡ Deploy Vercel

O projeto está hospedado na [Vercel](https://vercel.com/):

* Atualizações automáticas via GitHub push (CI/CD)
* Hospedagem gratuita com 100 GB de banda/mês

---

## 💡 Licença

Este projeto é de uso livre para fins de estudo e portfólio.
