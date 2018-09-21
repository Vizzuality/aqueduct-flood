export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 200,
  "padding": 10,
  "data": [
    {
      "name": "table",
      "values": [
        { "year": "2010", "variable": "Damage", "value": 0, "type": "Total", "percentage": [] },
        { "year": "2010", "variable": "Impact Driver", "value": 0, "type": "Socioeconomic", "percentage": [] },
        { "year": "2010", "variable": "Impact Driver", "value": 0, "type": "Climate", "percentage": [] },
        { "year": "2010", "variable": "Impact Driver", "value": 0, "type": "baseline", "percentage": [] },
        { "year": "2030", "variable": "Damage", "value": 8, "type": "Total", "percentage": [] },
        { "year": "2030", "variable": "Impact Driver", "value": 6, "type": "Socioeconomic", "percentage": 75 },
        { "year": "2030", "variable": "Impact Driver", "value": 2, "type": "Climate", "percentage": 25 },
        { "year": "2030", "variable": "Impact Driver", "value": 0, "type": "baseline", "percentage": [] },
        { "year": "2050", "variable": "Damage", "value": 35, "type": "Total", "percentage": [] },
        { "year": "2050", "variable": "Impact Driver", "value": 30, "type": "Socioeconomic", "percentage": 85.7 },
        { "year": "2050", "variable": "Impact Driver", "value": 5, "type": "Climate", "percentage": 14.3 },
        { "year": "2050", "variable": "Impact Driver", "value": 0, "type": "baseline", "percentage": [] },
        { "year": "2080", "variable": "Damage", "value": 60, "type": "Total", "percentage": [] },
        { "year": "2080", "variable": "Impact Driver", "value": 40, "type": "Socioeconomic", "percentage": 66.7 },
        { "year": "2080", "variable": "Impact Driver", "value": 20, "type": "Climate", "percentage": 33.3 },
        { "year": "2080", "variable": "Impact Driver", "value": 0, "type": "baseline", "percentage": [] }
      ],
      "transform": [
        {
          "type": "stack",
          "groupby": ["year", "variable"],
          "sort": { "field": "type" },
          "field": "value"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": { "data": "table", "field": "year" },
      "range": "width",
      "padding": 0.0,
      "paddingInner": 0.1
    },
    {
      "name": "yscale",
      "type": "linear",
      "domain": { "data": "table", "field": "y1" },
      "range": "height",
      "round": true,
      "zero": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": { "data": "table", "field": "type" },
      "range": { "scheme": "category10" }
    }
  ],

  "axes": [
    {
      "orient": "top",
      "scale": "xscale",
      "domain": false,
      "ticks": false,
      "offset": 20,
      "labelFontWeight": "bold",
      "labelFontSize": 13
    },
    {
      "orient": "bottom",
      "scale": "xscale",
      "domain": false,
      "ticks": false,
      "labels": false,
      "offset": 5,
      "title": "Annual Damage and Impact Drivers"
    },
    {
      "orient": "left",
      "scale": "yscale",
      "domain": false,
      "ticks": false,
      "grid": true,
      "offset": 10,
      "tickCount": 5,
      "title": "Expected Annual Urban Damage ($ million)"
    }
  ],

  "legends": [
    {
      "title": "Variable",
      "fill": "color",
      "orient": "right",
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": { "value": 0 },
            "opacity": { "value": 1 },
            "shape": { "value": "square" }
          }
        }
      }
    }
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "table",
          "name": "facet",
          "groupby": "year"
        }
      },

      "encode": {
        "enter": {
          "x": { "scale": "xscale", "field": "year" }
        }
      },

      "signals": [
        { "name": "width", "update": "bandwidth('xscale')" }
      ],

      "scales": [
        {
          "name": "pos",
          "type": "band",
          "domain": { "data": "facet", "field": "variable" },
          "range": "width",
          "padding": 0.1
        }
      ],

      "axes": [
        { "orient": "top", "scale": "pos", "domain": false, "ticks": false, "grid": true, "offset": 0 }
      ],

      "marks": [
        {
          "name": "bars",
          "from": { "data": "facet" },
          "type": "rect",
          "encode": {
            "enter": {
              "x": { "scale": "pos", "field": "variable" },
              "width": { "scale": "pos", "band": 1 },
              "y": { "scale": "yscale", "field": "y0" },
              "y2": { "scale": "yscale", "field": "y1" },
              "fill": { "scale": "color", "field": "type" }
            }
          }
        },
        {
          "type": "text",
          "from": { "data": "bars" },
          "encode": {
            "enter": {
              "y": { "field": "y", "offset": 8 },
              "x": { "field": "x", "offset": 5 },
              "fill": { "value": "#000" },
              "fontWeight": { "value": "bold" },
              "align": { "value": "top" },
              "baseline": { "value": "middle" },
              "text": { "field": "datum.percentage" }
            }
          }
        }
      ]
    }
  ]
};
