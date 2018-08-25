export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize":{
    "type": "fit",
    "contains": "padding",
    "resize": true
  },
  "height": 200,
  "padding": 10,
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
      "labelFlush": 5,
      "ticks": false,
      "domain": false,
      "labelBaseline": "top",
      "offset": 5,
      "scale": "xscale",
      "title":"years"
    },
    {
      "orient": "left",
      "format": "~s",
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
          "width": { "scale": "xscale", "band": 0.9 },
          "y": { "scale": "yscale", "field": "value" },
          "y2": { "scale": "yscale", "value": 0 },
          "fill": [
            {
              "test": "datum.value<0",
              "value": "#de2239"
            },
            { "value": "#1c801c" }
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
