export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "signals": [
    {
      "name": "Year",
      "value": "2030",
      "bind": {
        "input": "radio",
        "options": [
          "2030",
          "2050",
          "2080"
        ]
      }
    }
  ],
  "height": 200,
  "data": [
    {
      "name": "table",
      "values": [],
      "transform": [
        
        {"type": "formula", "as": "x", "expr": "(1/datum.x)*100"},
        {
  "type": "collect",
  "sort": { "field": ["c", "x"],
    "order": ["descending", "ascending"]}
},
        {"type": "filter", "expr": "datum.year === Year"}

      ]
    },{
      "name": "legend",
      "values":[
        {"c":"gf","label":"GFDL-ESM2M"},
        {"c":"ha","label":"HadGEM2-ES"},
        {"c":"ip","label":"IPSL-CM5A-LR"},
        {"c":"mi","label":"MIROC-ESM-CHEM"},
        {"c":"nr","label":"NorESM1-M"}
      ],
      "transform":[{
  "type": "collect",
  "sort": {"field": "c","order":"descending"}
}]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "padding": 20,
      "domain": {
        "data": "table",
        "field": "x"
      }
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      
      "zero": false,
      "domain": {
        "data": "table",
        "field": "y"
      }
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {
        "data": "legend",
        "field": "c"
      }
    },
    {
      "name": "label",
      "type": "ordinal",
      "range": {
        "data": "legend",
        "field": "label"
      },
      "domain": {
        "data": "legend",
        "field": "c"
      }
    }
  ],
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "domain": false,
      "ticks": true,
      "grid": false,
      "offset": 6,
      "tickCount": 4,
      "title": "Probability of event occurring",
      "titleFontSize":10
    },
    {
      "orient": "left",
      "scale": "y",
      "domain": false,
      "ticks": false,
      "format": "~s",
      "grid": true,
      "offset": 6,
      "tickCount": 6,
      "title": "Damage ($ millions)",
      "titleFontSize":10
    }
  ],
  "legends": [
    {
      "title": "Models",
      "titleFontSize":10,
      "fill": "color",
      "direction": "vertical",
      "orient": "right",
      "encode": {
        "labels": {
        "update": {
          "text":{
            "signal":"scale('label', datum.label)"
          }
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
          "name": "series",
          "data": "table",
          "groupby": "c"
        }
      },
      "marks": [
        {
          "type": "line",
          "from": {
            "data": "series"
          },
          "encode": {
            "enter": {
              "x": {
                "scale": "x",
                "field": "x"
              },
              "y": {
                "scale": "y",
                "field": "y"
              },
              "stroke": {
                "scale": "color",
                "field": "c"
              },
              "strokeWidth": {
                "value": 1
              }
            }
          }
        }
      ]
    },
    {
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
          "type": "symbol",
          "from": {
            "data": "series"
          },
          "encode": {
            "enter": {
              "x": {
                "scale": "x",
                "field": "x"
              },
              "y": {
                "scale": "y",
                "field": "y"
              },
              "fill": {
                "scale": "color",
                "field": "c"
              },
              "size": {
                "value": 20
              }
              
            },
            "update": {"opacity": {"value": 0.5}},
            "hover":{"opacity": {"value": 1}}
          }
        }
      ]
    }
  ]
};
