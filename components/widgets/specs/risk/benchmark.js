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
      "value": "Total",
      "bind": {
        "input": "radio",
        "options": [
          "Total",
          "Percentage"
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
      {"type": "filter", "expr": "if(calc=='Percentage',datum.type =='per',datum.type =='tot')"}
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
      "orient": "top",
      "ticks": true,
      "format":"s",
      "tickCount": 10,
      "title": "Annual Expected Urban Damage ($ billions)"
    },
    {
      "scale": "y",
      "orient": "left",
      "ticks": false,
      "titlePadding": 5,
      "tickCount": 5,
      "title": "Protection standard"
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
          "size": {"value": 65},
          "opacity": [
              {
                "test": "datum.id !=='Bangladesh'",
                "value": 0.3
              },
              {"value": 0.8}
            ],
          "zindex":[
              {
                "test": "datum.id !=='Bangladesh'",
                "value": 1
              },
              {"value": 2}
            ],
          "fill": [
              {
                "test": "datum.id !=='Bangladesh'",
                "value": "grey"
              },
              {"value": "red"}
            ]
        },
         "hover": {
            "opacity": {"value": 1},
            "size": {"value": 85},
         }
      }
    }
  ]
};
