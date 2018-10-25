export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize":{
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 250,
  "padding": 10,
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
          "expr": "hover && hover.datum.year === datum.year && hover.datum.value === datum.value"
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
      "type": "linear",
      "domain": {
        "data": "table",
        "field": "value"
      },
      "nice": true,
      "range": "height"
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "multi-line",
      "domain": {
        "data": "table",
        "field": "c"
      }
    }
  ],
  "axes": [
    {
      "orient": "bottom",
      "labelOverlap": "parity",
      "labelFlush": 5,
      "ticks": false,
      "domain": false,
      "labelBaseline": "top",
      "offset": 5,
      "tickCount": 10,
      "scale": "x",
      "title":"years"
    },
    {
      "orient": "left",
      "format": "~s",
      "grid": true,
      "labelOverlap": "parity",
      "scale": "y"
    }
  ],
  "marks": [
    {
      "name": "lines",
      "type": "group",
      "from": {
        "facet": {
          "name": "series",
          "data": "table",
          "groupby": "c"
        }
      },
      "marks": [
        {
          "type": "line",
          "interactive": false,
          "from": {
            "data": "series"
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
              "stroke": {
                "scale": "color",
                "field": "c"
              },
              "strokeWidth": {
                "value": 2
              }
            },
            "update":{
            "defined":{"signal": "datum.value !== null"}
        }
          }
        }
      ]
    },
    {
      "name": "pointss",
      "interactive": false,
      "type": "symbol",
      "from": {
        "data": "table"
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
          "opacity": {
            "value": 0
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
          }
        },
        "update": {
          "fill": {
            "scale": "color",
            "field": "c"
          },
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
        "data": "pointss"
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
            "value": "#A40004"
          },
          "path": {
            "field": "path"
          },
          "opacity": {
            "value": 0
          }
        },
        "hover":{"tooltip":{"signal": "{'Year': hover.datum.year, 'Value': '$'+format(hover.datum.value, 's')}"}}
      }
    }
  ],
  "legends": [
    {
      "fill": "color",
      "direction": "horizontal",
      "orient": "bottom"
    }
  ]
};
