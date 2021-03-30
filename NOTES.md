* Reference: https://www.wri.org/aqueduct

* Run app
  docker-compose up web
  visit http://localhost:3030

* Mapbox base layers here:
  "src/components/hazard/map/constants.js"

* Dataset ID hardcoded here?
  "src/constants/hazard.js"
  I think the problem is that this dataset isn't available/published.
  Couldn't immediately find it in carto

* Is this how we get data?
  "src/modules/layers/_.js"
  REACT_APP_WRI_API_URL env var seems critical
  REACT_APP_WRI_API_URL when set to //api.resourcewatch.org makes the local app fail like production I think.
