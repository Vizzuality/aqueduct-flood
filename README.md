# Aqueduct Floods

## Getting Started

1. Install Docker
2. Clone the repo: https://github.com/greenriver/aqueduct-flood
3. Run `docker-compose up` to build your image and fire up the container. Visit localhost:3030. Ctrl C to stop.

## Deployment

1. Run `docker-compose run web yarn build` to compile.
2. Copy the build to the wriorg repo aqueduct-gr branch build directory.
3. From the wriorg repo, commit and push changes to the aqueduct-gr branch. Enter your Pantheon password when prompted.

## Requirements
```
  node 10.20.1
```

May encounter problems upgrading because of component dependencies.

## Data and scripts

- Cost Benefit Analysis Python script: https://github.com/greenriver/aqueduct-analysis-microservice
- Floods widget data accessible through resourcewatch API
- Raster data in Google Earth Engine, accessible through resourcewatch API

## Working with AQ-components

---
[AQ-components](https://vizzuality.github.io/aqueduct-components/) provides a bunch of useful components to use in the different AQ apps.

To work with it, go to your AQ-components project, and run `yarn link`. This will generate a symlink to the project. Now, let's compile
the code and make it responsive to changes: run `yarn components:watch`.

Go to your application and link the components: `yarn link aqueduct-components`.

You should be ready to work!


