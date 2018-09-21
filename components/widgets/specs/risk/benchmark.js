export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "height": 200,
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "signals": [
    {
      "name": "Year",
      "value": "2010",
      "bind": {
        "input": "radio",
        "options": [
          "2010",
          "2030",
          "2050",
          "2080"
        ]
      }
    },
    {
      "name": "calc",
      "value": "tot",
      "bind": {
        "input": "radio",
        "options": [
          "tot",
          "perc"
        ]
      }
    }
  ],
  "data": [
    {
      "name": "table",
      "values": [],
      "transform": [
      
      {"type": "filter", "expr": "datum.year == Year"},
      {"type": "filter", "expr": "datum.type == calc"}
    ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "table", "field": "value"},
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "table", "field": "prot"},
      "range": "height"
    }
  ],

  "axes": [
    {
      "scale": "x",
      "grid": true,
      "domain": false,
      "orient": "top",
      "ticks": false,
      "format":"s",
      "offset": 6,
      "tickCount": 10,
      "title": "Annual Expected Urban Damage ($ billions)"
    },
    {
      "scale": "y",
      "grid": true,
      "domain": false,
      "orient": "left",
      "ticks": false,
      "offset": 6,
      "titlePadding": 5,
      "tickCount": 5,
      "title": "protection level"
    }
  ],

  "marks": [
    {
      "name": "points",
      "type": "symbol",
      "from": {"data": "table"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "value"},
          "y": {"scale": "y", "field": "prot"},
          "shape": {"value": "circle"},
          "width": {"value": 2},
          "opacity": {"value": 1},
          "fill": [
  {
    "test": "datum.id !=='Bangladesh'",
    "value": "grey"
  },
  {"value": "red"}
]
        }
      }
    }
  ]
};
