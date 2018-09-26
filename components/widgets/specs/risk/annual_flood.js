export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 200,
  "data": [
    {
      "name": "table",
      "values": [
    ]
    },
    {
      "name": "info",
      "values": [
        {"text": "Annual Expected Urban Damage ($ million)"}, 
        {"text": "% Annual Expected Urban Damage"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "index"},
      "range": "width",
      "paddingInner": 0.7,
      "paddingOuter": 0.3,
      "round": true
    },
    {
      "name": "yscale_amout",
      "domain": {"data": "table", "field": "Annual_Damage_Avg"},
      "nice": true,
      "zero": true,
      "range": "height"
    },
    {
      "name": "yscale_per",
      "domain": {"data": "table", "field": "Percent_Damage_Avg"},
      "nice": true,
      "zero": true,
      "range": "height"
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "info","field": "text"},
      "range": "category"
    },
    {
      "name": "typeSymbol",
      "type": "ordinal",
      "range": "symbol",
      "domain": {"data": "info","field": "text"}
    }

  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale"},
    { "orient": "left", "scale": "yscale_amout", "format":"s", "tickCount": 5},
    { "orient": "right", "scale": "yscale_per", "tickCount": 5,
      "encode":{
        "labels":{
          "update":{
            "text":{"signal": "format(datum.value, '.2f') + '%'"}
          }
        }
      }
    }
  ],

  "legends": [
    {
      "fill":"color",
      "shape":"typeSymbol",
      "direction": "horizontal",
      "orient": "bottom",
      "columnPadding":20,
      "labelLimit": 1000,
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": {"value": 0},
            "opacity": {"value": 1}
          }
        }
      }
    }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "index"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale_amout", "field": "Annual_Damage_Avg"},
          "y2": {"scale": "yscale_amout", "value": 0}
        },
        "update": {
          "opacity": {"value": 1}
        },
        "hover": {
          "opacity": {"value": 0.5}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "index", "band":0.5},
          "y": {"scale": "yscale_per", "field": "Percent_Damage_Avg"},
          "fill":{"value":"#ef8e3b"}
        },
        "update": {
          "opacity": {"value": 0.8},
          "size": {"value": 65}
        },
        "hover": {
          "opacity": {"value": 1},
          "size": {"value": 85}
        }
      }
    }
  ]
};
