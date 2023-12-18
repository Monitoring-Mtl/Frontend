<!-- Entête basé sur le README.md du repo: https://github.com/Monitoring-Mtl/Serverless-API -->

<div align="center">

  <a href="">![GitHub contributors](https://img.shields.io/github/contributors/Monitoring-Mtl/Frontend?color=green)</a>
  <a href="">![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Monitoring-Mtl/Frontend/main)</a>
  <a href="">![GitHub issues](https://img.shields.io/github/issues/Monitoring-Mtl/Frontend)</a>
  <a href="">![GitHub top language](https://img.shields.io/github/languages/top/Monitoring-Mtl/Frontend)</a>

</div>

<div align="center">
  <a href="https://www.etsmtl.ca/">
    <img src="https://www.etsmtl.ca/getmedia/a38cc621-8248-453b-a24e-ff22bd68ada5/Logo_ETS_SansTypo_FR" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Monitoring Mtl - Frontend</h3>
</div>

# Le projet Frontend

Le projet Frontend de Monitoring MTL est une application web pour la visualisation des données. L'application affiche des données issues d'une [API](https://github.com/Monitoring-Mtl/Serverless-API) qui envoie des données brutes et transformées provenant de la STM.

# Exécuter l'application en mode développement

L'application utilise le cadriciel [Next.js](https://nextjs.org/) créer avec [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Pour installer les modules node:
```
npm i
```

Pour lancer l'application en mode développement:
```
npm run dev
```
Pour voir le site, visitez [http://localhost:3000](http://localhost:3000) avec un fureteur.

# Exécuter les tests

Pour exécuter les tests localement:
```
npm test
```

# Documentation

Voir le [Wiki](https://github.com/Monitoring-Mtl/Frontend/wiki). 

Plus spécifiquement:

- [Pour avoir une idée générale de la conception et comment ajouter une nouvelle visualisation d'analyse](https://github.com/Monitoring-Mtl/Frontend/wiki/Conception)
- [Pour de la documentation sur le pipeline CI/CD](https://github.com/Monitoring-Mtl/Frontend/wiki/Pipeline-CI-CD)
- [Pour voir quelques exemples de problèmes-solutions rencontrés par l'équipe](https://github.com/Monitoring-Mtl/Frontend/wiki/Troubleshooting)