export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "width": 400,
  "height": 200,

  "data": [ { "name": "table" } ],
  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": { "data": "table", "field": "year" },
      "range": "width",
      "zero": false,
      "nice": true
    },
    {
      "name": "yscale",
      "domain": { "data": "table", "field": "value" },
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    {
      "orient": "bottom",
      "bandPosition": 0.5,
      "labelOverlap": "parity",
      "ticks": false,
      "domain": false,
      "labelBaseline": "top",
      "offset": 5,
      "scale": "xscale"
    },
    {
      "orient": "left",
      "grid": true,
      "labelOverlap": "parity",
      "scale": "yscale"
    }
  ],

  "marks": [
    {
      "type": "rect",
      "from": { "data": "table" },
      "encode": {
        "enter": {
          "x": { "scale": "xscale", "field": "year" },
          "width": { "scale": "xscale", "band": 1 },
          "y": { "scale": "yscale", "field": "value" },
          "y2": { "scale": "yscale", "value": 0 },
          "fill": [
            {
              "test": "datum.value<0",
              "value": "red"
            },
            { "value": "grey" }
          ]
        },
        "update": {

          "opacity": { "value": 1 }

        },
        "hover": {
          "opacity": { "value": 0.5 }
        }
      }
    }
  ]
};