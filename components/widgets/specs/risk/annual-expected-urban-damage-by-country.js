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
        { "x": 11.419791263051216, "y": 4.465964521421658, "label": "Bangladesh" },
        { "x": 15.1938664582494, "y": 0.6522617325557017, "label": "country" },
        { "x": 12.109827430710999, "y": 3.933182156027579, "label": "country" },
        { "x": 12.150300078187009, "y": 3.8646624572981967, "label": "country" },
        { "x": 7.020171619478667, "y": 1.668577973782146, "label": "country" },
        { "x": 11.818590655888418, "y": 0.10687429209741861, "label": "country" },
        { "x": 5.206189614160598, "y": 3.5816806911651033, "label": "country" },
        { "x": 3.823492100452132, "y": 3.179226290036656, "label": "country" },
        { "x": 9.214108997081162, "y": 2.2763218007398662, "label": "country" },
        { "x": 5.600464024368147, "y": 4.870386316820838, "label": "country" },
        { "x": 13.190830762662795, "y": 2.2056711726340246, "label": "country" },
        { "x": 7.911708060970502, "y": 3.2649894458832396, "label": "country" },
        { "x": 2.543865751113218, "y": 2.1066990238014154, "label": "country" },
        { "x": 2.075837350021734, "y": 2.1151737518188134, "label": "country" },
        { "x": 13.353959988090274, "y": 2.251786436991718, "label": "country" },
        { "x": 3.6243373583560192, "y": 3.37746940121744, "label": "country" },
        { "x": 4.3824868675682715, "y": 3.45730118257003, "label": "country" },
        { "x": 10.78070244354892, "y": 1.3647826347873155, "label": "country" },
        { "x": 14.305352220886203, "y": 0.9069023565482465, "label": "country" },
        { "x": 3.9398833337960326, "y": 4.606521059769174, "label": "country" },
        { "x": 7.418680711658965, "y": 0.9508803479965833, "label": "country" },
        { "x": 0.779740719917319, "y": 2.8023452254936316, "label": "country" },
        { "x": 2.2562806262151245, "y": 0.7979303640714069, "label": "country" },
        { "x": 0.4481617274233418, "y": 1.2523387012877285, "label": "country" },
        { "x": 14.86867303154081, "y": 4.4048108181898336, "label": "country" },
        { "x": 9.271841389561791, "y": 2.232424838364866, "label": "country" },
        { "x": 0.6706090023088969, "y": 2.464746908252791, "label": "country" },
        { "x": 0.766632894753041, "y": 4.785966461672669, "label": "country" },
        { "x": 1.9878819666261478, "y": 1.6983769501096417, "label": "country" },
        { "x": 2.7788787096591303, "y": 4.9281828532378995, "label": "country" }
      ]
    },
    {
      "name": "country_all",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['label'] != 'Bangladesh'"
        }
      ]
    },
    {
      "name": "country",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['label'] == 'Bangladesh'"
        }
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
      "domain": { "data": "table", "field": "x" },
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": { "data": "table", "field": "y" },
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
      "title": "% Annual Expected Urban Damage over GDP",
      "encode": {
        "labels": {
          "update": {
            "text": { "signal": "format(datum.value, '.1f') + '%'" }
          }
        }
      }
    }
  ],

  "marks": [
    {
      "name": "points",
      "type": "symbol",
      "from": { "data": "country_all" },
      "encode": {
        "enter": {
          "x": { "scale": "x", "field": "x" },
          "y": { "scale": "y", "field": "y" },
          "shape": { "value": "circle" },
          "width": { "value": 2 },
          "opacity": { "value": 1 },
          "fill": { "value": "#ef8e3b" }
        }
      }
    },
    {
      "name": "point",
      "type": "symbol",
      "from": { "data": "country" },
      "encode": {
        "enter": {
          "x": { "scale": "x", "field": "x" },
          "y": { "scale": "y", "field": "y" },
          "shape": { "value": "circle" },
          "width": { "value": 2 },
          "opacity": { "value": 1 },
          "fill": { "value": "red" }
        }
      }
    },
    {
      "name": "labels",
      "type": "text",
      "from": { "data": "table" },
      "encode": {
        "enter": {
          "x": { "scale": "x", "field": "x", "offset": 25 },
          "y": { "scale": "y", "field": "y", "offset": 25 },
          "fill": { "value": "#000" },
          "text": { "field": "label" }
        }
      },
      "transform": [
        {
          "type": "force",
          "static": true,
          "forces": [
            { "force": "center", "x": { "signal": "width / 2" }, "y": { "signal": "height / 2" } },
            { "force": "collide", "radius": { "signal": 15 }, "strength": { "signal": 0.7 } },
            { "force": "nbody", "strength": { "signal": -2 } }
          ]
        }
      ]
    },
    {
      "name": "lines",
      "type": "path",
      "from": { "data": "labels" },
      "interactive": false,
      "encode": {
        "update": {
          "stroke": { "value": "#ccc" },
          "strokeWidth": { "value": 1 }
        }
      },
      "transform": [
        { "type": "formula", "as": "logx", "expr": "scale('x',datum.datum.datum.x)" },
        { "type": "formula", "as": "logy", "expr": "scale('y',datum.datum.datum.y)" },
        {
          "type": "linkpath",
          "sourceX": "logx",
          "sourceY": "logy",
          "targetX": "datum.x",
          "targetY": "datum.y",
          "shape": "orthogonal",
          "orient": "vertical"
        }
      ]
    }
  ]
};
