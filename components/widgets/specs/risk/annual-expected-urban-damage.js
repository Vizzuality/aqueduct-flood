export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 200,
  "padding": 10,
  "config": {
    "range": {
      "category": ["#5079a5", "#ef8e3b", "#dd565c", "#79b7b2", "#5da052", "#ecc853", "#ad7aa1", "#ef9ba7", "#9b7461", "#bab0ac"],
      "symbol": ["square", "circle"]
    }
  },

  "data": [
    {
      "name": "table",
      "values": [
        { "year": "2010", "amount": 311, "percentage": 10 },
        { "year": "2030", "amount": 550, "percentage": 11 },
        { "year": "2050", "amount": 690, "percentage": 15 },
        { "year": "2080", "amount": 1120, "percentage": 17.5 }
      ]
    },
    {
      "name": "info",
      "values": [
        { "text": "Annual Expected Urban Damage ($ million)" },
        { "text": "% Annual Expected Urban Damage" }
      ]
    }
  ],

  "signals": [
    {
      "name": "tooltip1",
      "value": {},
      "on": [
        { "events": "rect:mouseover", "update": "datum" },
        { "events": "rect:mouseout", "update": "{}" }
      ]
    },
    {
      "name": "tooltip2",
      "value": {},
      "on": [
        { "events": "symbol:mouseover", "update": "datum" },
        { "events": "symbol:mouseout", "update": "{}" }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": { "data": "table", "field": "year" },
      "range": { "step": 100 },
      "paddingInner": 0.7,
      "paddingOuter": 0.3,
      "round": true
    },
    {
      "name": "yscale_amout",
      "domain": { "data": "table", "field": "amount" },
      "nice": true,
      "range": "height"
    },
    {
      "name": "yscale_per",
      "domain": { "data": "table", "field": "percentage" },
      "nice": true,
      "zero": false,
      "range": "height"
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": { "data": "info", "field": "text" },
      "range": "category"
    },
    {
      "name": "typeSymbol",
      "type": "ordinal",
      "range": "symbol",
      "domain": { "data": "info", "field": "text" }
    }

  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale", "domain": false, "ticks": false, "offset": 6 },
    { "orient": "left", "scale": "yscale_amout", "domain": false, "ticks": false, "grid": true, "tickCount": 5, "offset": 6 },
    {
      "orient": "right", "scale": "yscale_per", "domain": false, "ticks": false, "tickCount": 8, "offset": 6,
      "encode": {
        "labels": {
          "update": {
            "text": { "signal": "format(datum.value, '.1f') + '%'" }
          }
        }
      }
    }
  ],

  "legends": [
    {
      "fill": "color",
      "shape": "typeSymbol",
      "direction": "horizontal",
      "orient": "bottom",
      "offset": 20,
      "columnPadding": 20,
      "labelLimit": 1000,
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": { "value": 0 },
            "opacity": { "value": 1 }
          }
        }
      }
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
          "y": { "scale": "yscale_amout", "field": "amount" },
          "y2": { "scale": "yscale_amout", "value": 0 }
        },
        "update": {
          "fill": { "value": "#5079a5" }
        },
        "hover": {
          "fill": { "value": "#79b7b2" }
        }
      }
    },
    {
      "type": "symbol",
      "from": { "data": "table" },
      "encode": {
        "enter": {
          "x": { "scale": "xscale", "field": "year", "band": 0.5 },
          "y": { "scale": "yscale_per", "field": "percentage" },
          "y2": { "scale": "yscale_per", "value": 0 },
          "size": { "scale": "yscale_per", "value": 10 }
        },
        "update": {
          "fill": { "value": "#ef8e3b" }
        },
        "hover": {
          "fill": { "value": "#dd565c" }
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": { "value": "center" },
          "baseline": { "value": "bottom" },
          "fill": { "value": "#333" }
        },
        "update": {
          "x": { "scale": "xscale", "signal": "tooltip1.year", "band": 0.5 },
          "y": { "scale": "yscale_amout", "signal": "tooltip1.amount", "offset": -2 },
          "text": { "signal": "tooltip1.amount" },
          "fillOpacity": [
            { "test": "datum === tooltip1", "value": 0 },
            { "value": 1 }
          ]
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": { "value": "center" },
          "baseline": { "value": "bottom" },
          "fill": { "value": "#333" }
        },
        "update": {
          "x": { "scale": "xscale", "signal": "tooltip2.year", "band": 0.5 },
          "y": { "scale": "yscale_per", "signal": "tooltip2.percentage", "offset": -10 },
          "text": { "signal": "tooltip2.percentage" },
          "fillOpacity": [
            { "test": "datum === tooltip2", "value": 0 },
            { "value": 1 }
          ]
        }
      }
    }
  ]
};
