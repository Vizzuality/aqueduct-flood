# Aqueduct Flood

Aqueduct Flood is the third tool of the Aqueduct family. More info soon.

## Requirements 🛠️
```
  node 10.7.0
```

## Getting Started 👨‍💻
---

Once you have the project locally, run `nvm use` to detect the Node version used in the project. Install if needed.

Run `yarn` to install project's dependencies.

Clone `.env.default` to `.env` and fill it.

To start working run `yarn dev`.

## Working with AQ-components 🔗
--- 
[AQ-components](https://vizzuality.github.io/aqueduct-components/) provides a bunch of useful components to use in the different AQ apps.

To work with it, go to your AQ-components project, and run `yarn link`. This will generate a symlink to the project. Now, let's compile
the code and make it responsive to changes: run `yarn components:watch`.

Go to your application and link the components: `yarn link aqueduct-components`.

You should be ready to work!


## Deploy 🚀
---

[TO-DO]


## Recommendations 🐰
---

It's strongly recommended to use [nvm](https://github.com/creationix/nvm) for managing different Node versions easily.


