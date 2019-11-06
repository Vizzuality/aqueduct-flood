export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
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
      "name": "hide",
      "source": "table",
      "transform": [
        {
          "type": "window",
          "ops": ["lead", "lag"],
          "fields": ["value", "value"],
          "as": ["lead", "lag"]
        },
        {
          "type": "filter",
          "expr": "datum.value===null"
        },
        {
          "type":"formula",
          "expr": "datum.lag!==null? datum.lag : datum.lead",
          "as":"val"
        },
        {
          "type": "filter",
          "expr": "datum.val!==null"
        }
      ]
    },
    {
      "name": "dots",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "hover && hover.datum.year === datum.year && hover.datum.value!==null"
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
      "labelFlush": 5,
      "ticks": false,
      "domain": false,
      "labelBaseline": "top",
      "offset": 5,
      "scale": "x",
      "title":"Years"
    },
    {
      "orient": "left",
      "format": "~s",
      "grid": true,
      "labelOverlap": "parity",
      "scale": "y",
      "title":"bla bla bls"
    }
  ],
  "marks": [
    {
      "name": "lines",
      "type": "line",
      "interactive": false,
      "range": "multi-line",
      "from": {
        "data": "table"
      },
      "encode": {
        "update": {
          "x": {
            "scale": "x",
            "field": "year"
          },

          "y": {
            "scale": "y",
            "field": "value"
          },
          "strokeCap":{"value":"square"},
          "opacity": {
            "value": 1
          },
          "defined":{"signal": "datum.value !== null"}
        }
      }
    },{
      "name": "hides",
      "type": "line",
      "interactive": false,
      "range": "multi-line",
      "from": {
        "data": "hide"
      },
      "encode": {
        "update": {
          "x": {
            "scale": "x",
            "field": "year"
          },

          "y": {
            "scale": "y",
            "field": "val"
          },
          "strokeCap":{"value":"square"},
          "strokeDash":{
            "value":[2,5]
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
      "range": "multi-line",
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
          "opacity": {
            "value": 1
          }
        }
      }
    },
    {
      "name": "cell",
      "type": "path",
      "range": "multi-line",
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
          
        },
        "hover":{"tooltip":{"signal": "{'Year': hover.datum.year, 'Value': format(hover.datum.value, '.0f')}"}}
      }
    }
  ]
};
