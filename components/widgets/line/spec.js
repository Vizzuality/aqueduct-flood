export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "pad",
    "resize": true,
    "contains": "padding"
  },
  "width": 400,
  "height": 200,
  "signals": [
    {
      "name": "hover",
      "value": null,
      "on": [
        {
          "events": "@cell:mouseover",
          "update": "datum"
        },
        {
          "events": "@cell:mouseout",
          "update": "null"
        }
      ]
    }
  ],
  "data": [
    { "name": "table" },
    {
      "name": "dots",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "hover && hover.datum.year === datum.year"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {
        "data": "table",
        "field": "year"
      },
      "range": "width",
      "zero": false,
      "nice": true
    },
    {
      "name": "y",
      "domain": {
        "data": "table",
        "field": "value"
      },
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
      "scale": "x"
    },
    {
      "orient": "left",
      "grid": true,
      "labelOverlap": "parity",
      "scale": "y"
    }
  ],
  "marks": [
    {
      "name": "lines",
      "type": "line",
      "interactive": false,
      "from": {
        "data": "table"
      },
      "encode": {
        "enter": {
          "x": {
            "scale": "x",
            "field": "year"
          },
          "width": {
            "scale": "x",
            "band": 1
          },
          "y": {
            "scale": "y",
            "field": "value"
          },
          "y2": {
            "scale": "y",
            "value": 0
          },
          "stroke": {
            "value": "grey"
          },
          "opacity": {
            "value": 1
          }
        }
      }
    },
    {
      "name": "points",
      "interactive": false,
      "type": "symbol",
      "from": {
        "data": "dots"
      },
      "encode": {
        "enter": {
          "x": {
            "scale": "x",
            "field": "year"
          },
          "y": {
            "scale": "y",
            "field": "value"
          },
          "fill": {
            "value": "red"
          }
        },
        "update": {
          "opacity": {
            "value": 1
          }
        }
      }
    },
    {
      "name": "cell",
      "type": "path",
      "from": {
        "data": "lines"
      },
      "transform": [
        {
          "type": "voronoi",
          "x": "datum.x",
          "y": "datum.y",
          "size": [
            {
              "signal": "width"
            },
            {
              "signal": "height"
            }
          ]
        }
      ],
      "encode": {
        "update": {
          "fill": {
            "value": "red"
          },
          "path": {
            "field": "path"
          },
          "opacity": {
            "value": 0
          }
        }
      }
    }
  ]
};
