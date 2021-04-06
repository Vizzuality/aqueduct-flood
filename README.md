# Aqueduct Floods

## Getting Started

1. Install Docker if you don't have it: https://hub.docker.com/editions/community/docker-ce-desktop-mac  Open it from Applications to get it to fire up.
2. Clone the repo: https://github.com/greenriver/aqueduct-flood Todd forked it from the Vizzuality repo. Use the gr-develop branch for now.
3. Cd into the repo and run docker compose up  to build your image and fire up the container. Visit localhost:3030. Ctrl C to stop.
4. The app hangs up on API calls to Carto currently. If you want it to load without trying to access Carto, comment out this line in docker-compose.yml: REACT_APP_WRI_API_URL: //api.resourcewatch.org


## Deployment

1. Run `docker-compose run web yarn build` to compile.
2. Copy the build to the wriorg aqueduct-gr branch build directory:
  - Make sure you are on the aqueduct-gr branch in the wriorg repo.
  - From aqueduct-flood root: `rsync -a --delete ~/Documents/aqueduct-flood/build/ ./floods/`. This will copy your build folder to the floods app in wriorg. The --delete flag is to make directories identical so that we don't keep old copies of the precache manifest around. As far as we know there is no reason to keep them.
  - From wriorg, commit and push changes to aqueduct-gr branch. Use your pantheon password when prompted.

  * Note that when we (Todd and Liela) tested this process it changed to relative file paths. It didn't seem to break anything, but if file paths become a problem, check the original build that we cloned from Vizzuality.

## Requirements 🛠️
```
  node 10.20.1
```

May encounter problems upgrading because of component dependencies. (From aqueduct-components repo? Not sure)

## Data and scripts

Python script Py3
Floods widget data stored in PostgreSQL database in AWS, accessible through resourcewatch API.
Raster data in Google Earth Engine, accessible through resourcewatch API.

## Other notes

Vizzuality to share dot files and id collection for Google Earth Engine.


## Working with AQ-components 🔗

These notes are from Vizzuality. They have not been tested or updated.
---
[AQ-components](https://vizzuality.github.io/aqueduct-components/) provides a bunch of useful components to use in the different AQ apps.

To work with it, go to your AQ-components project, and run `yarn link`. This will generate a symlink to the project. Now, let's compile
the code and make it responsive to changes: run `yarn components:watch`.

Go to your application and link the components: `yarn link aqueduct-components`.

You should be ready to work!


## Recommendations 🐰

These notes are from Vizzuality. They have not been tested or updated.
---

It's strongly recommended to use [nvm](https://github.com/creationix/nvm) for managing different Node versions easily.


