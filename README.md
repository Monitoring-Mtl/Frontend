# Frontend

Application web pour la visualisation des données. L'application affiche des données issues d'un API qui envoie des données brutes et transformées provenant de la STM.

# Instructions pour le projet Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install this node version manager app: https://github.com/coreybutler/nvm-windows
Example of useful nvm command:  
`nvm install <node_version>`
`nvm install 14.17.3`
`nvm use <node_version>`
`nvm use 14.17.3`
`nvm ls`

Install the node version the console tells you when `npm run dev` or Cypress fail for example. 

and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Documentation vers modules npm installés

- [mui](https://mui.com/material-ui/getting-started/)
- [yup](https://www.npmjs.com/package/yup)
- [formik](https://formik.org/docs/overview)

## Unit tests

npm run setup
npx jest or npm test
open coverage/index.html

## AWS amplify
npm update if getting : npm ERR! `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
2023-11-09T00:46:09.052Z [WARNING]: npm ERR!