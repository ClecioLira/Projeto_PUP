# Projeto_PUP - Frontend

Este diretório (`frontend`) contém o frontend do Projeto_PUP, desenvolvido com [Next.js](https://nextjs.org) e inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sumário

- [Como iniciar o projeto](#como-iniciar-o-projeto)
- [Estrutura dos arquivos principais](#estrutura-dos-arquivos-principais)
- [Personalizações e configurações](#personalizações-e-configurações)
- [Fontes e estilos](#fontes-e-estilos)
- [Links úteis](#links-úteis)
- [Deploy](#deploy)

---

## Como iniciar o projeto

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse [Plante uma Planta](https://projeto-pup.vercel.app/) no navegador para visualizar.

Você pode editar a página principal no arquivo `app/page.tsx`. As alterações são atualizadas automaticamente.

---

## Estrutura dos arquivos principais

- **next.config.ts:** Configurações do Next.js para o projeto.
- **package.json:** Dependências e scripts do projeto.
- **postcss.config.mjs:** Configurações do PostCSS, comumente usado para TailwindCSS.
- **tailwind.config.ts:** Configuração do TailwindCSS.
- **tsconfig.json:** Configuração do TypeScript.
- **src/**: Diretório principal do código-fonte da aplicação (componentes, páginas, estilos etc).

## Personalizações e configurações

- O projeto utiliza **TypeScript**.
- Estilização baseada em **TailwindCSS**.
- Fonte principal otimizada usando [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) com [Geist](https://vercel.com/font).

---

## Fontes e estilos

A configuração de fontes e o uso do TailwindCSS garantem performance e flexibilidade para customização visual.

---

## Links úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Tutorial interativo Next.js](https://nextjs.org/learn)
- [Repositório Next.js no GitHub](https://github.com/vercel/next.js)
- [Documentação de deploy Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Deploy

A forma mais fácil de fazer deploy deste projeto é usando a [plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app).

Recomenda-se seguir a [documentação oficial de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

---

> **Nota:** Esta documentação é baseada na estrutura de arquivos do commit [`a82ae96`](https://github.com/ClecioLira/Projeto_PUP/tree/a82ae96491542acc570eef81b87b9c58e0e6d9b5/frontend). Para detalhes completos e atualizações, consulte o repositório no GitHub.
