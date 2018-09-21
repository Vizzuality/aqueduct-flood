export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 200,

  "config": {
    "range": {
      "category": ["#5079a5","#ef8e3b","#dd565c","#79b7b2","#5da052","#ecc853","#ad7aa1","#ef9ba7","#9b7461","#bab0ac"],
      "symbol":["square","circle"]
      }
  },
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
      "range": "height"
    },
    {
      "name": "yscale_per",
      "domain": {"data": "table", "field": "Percent_Damage_Avg"},
      "nice": true,
      "zero": false,
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
    { "orient": "bottom", "scale": "xscale", "domain": false, "ticks": false, "offset": 6},
    { "orient": "left", "scale": "yscale_amout", "domain": false, "ticks": false,"format":"s", "grid": true, "tickCount": 5, "offset": 6},
    { "orient": "right", "scale": "yscale_per", "domain": false, "ticks": false, "tickCount": 8, "offset": 6,
      "encode":{
        "labels":{
          "update":{
            "text":{"signal": "format(datum.value, '.1f') + '%'"}
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
      "offset": 20,
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
          "fill": {"value": "#5079a5"}
        },
        "hover": {
          "fill": {"value": "#79b7b2"}
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
          "size": {"value": 40}
        },
        "update": {
          "fill": {"value": "#ef8e3b"}
        },
        "hover": {
          "fill": {"value": "#dd565c"}
        }
      }
    }
  ]
};
