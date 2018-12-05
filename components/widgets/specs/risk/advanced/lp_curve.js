export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "signals": [
    {
      "name": "year_curve_signal",
      "value": "2030",
      "bind": {
        "input": "radio",
        "name":"Year",
        "options": [
          "2030",
          "2050",
          "2080"
        ]
      }
    },
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
  "height": 200,
  
  "data": [
    {
      "name": "table",
      "values": [
        ],
      "transform": [

        {"type": "formula", "as": "x", "expr": "(1/datum.x)*100"},
        {
  "type": "collect",
  "sort": { "field": ["c", "x"],
    "order": ["descending", "ascending"]}
},
        {"type": "filter", "expr": "datum.year === year_curve_signal"}

      ]
    },
    {
      "name": "legend",
      "values":[
        {"c":"gf","label":"GFDL-ESM2M"},
        {"c":"ha","label":"HadGEM2-ES"},
        {"c":"ip","label":"IPSL-CM5A-LR"},
        {"c":"mi","label":"MIROC-ESM-CHEM"},
        {"c":"nr","label":"NorESM1-M"},
         {"c":"avg","label":"Average"}
      ],
      "transform":[{
  "type": "collect",
  "sort": {"field": "c","order":"descending"}
}]
    },
    {"name":"avg",
     "source":"table",
     "transform":[{
      "type": "aggregate",
      "groupby": ["x"],
      "fields": ["y"],
      "ops": ["average"],
      "as": ["average"]
    }]

  },
  {"name":"tooltip",
  "source":"table",
  "transform":[
  {
  "type": "joinaggregate",
  "groupby": ["x"],
  "fields": ["y"],
  "ops": ["mean"]
},
{
  "type": "pivot",
  "groupby": ["x", "mean_y"],
  "field": "c",
  "value": "y"
},
{
  "type": "window",
  "ops": ["lag", "lead"],
  "fields": ["x","x"],
  "as": ["lagx", "leadx"]
},
{"type": "formula", "as": "x0", "expr": "if(datum.lagx===null,0,datum.lagx) + ((datum.x-datum.lagx)/2)"},
{"type": "formula", "as": "x1", "expr": "datum.x + ((if(datum.leadx===null,50,datum.leadx)-datum.x)/2)"}
]},
{"name":"tooltipP",
  "source":"tooltip",
  "transform":[
    {
"type": "filter",
"expr": "hover && hover.x == datum.x"
},
    {"type": "fold", "fields": ["gf","ha","ip","mi","nr","mean_y", "95","50","05"]
  }
]
}
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
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
      "ticks": true,
      "tickCount": 6,
      "title": "Probability of event occurring (%)"
    },
    {
      "orient": "left",
      "scale": "y",
      "ticks": false,
      "tickCount": 5,
      "title": "Damage ($)",
      "encode":{
          "labels":{
            "update":{
              "text":{"signal": "'$'+format(datum.value, '.0s')"}
            }
          }
        }
    }
  ],
  "legends": [
    {
      "title": "Models",
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
              }
            }
          }
        }
      ]
    },
    {
          "type": "line",
          "from": {
            "data": "avg"
          },
          "encode": {
            "enter": {
              "x": {
                "scale": "x",
                "field": "x"
              },
              "y": {
                "scale": "y",
                "field": "average"
              },
              "stroke": {
                "value":"black"
              },
              "strokeWidth": {"value": 1},
              "strokeDash":{"value":[2,1]}
            }
          }
        },
    {
      "type": "group",
      "from": {
        "facet": {
          "name": "series-p",
          "data": "tooltipP",
          "groupby": "c"
        }
      },
      "marks":[{ 
          "type": "symbol",
          "from": {
            "data": "series-p"
          },
          "encode": {
            "enter": {
              "fill": {
                "scale": "color",
                "field": "key"
              }

            },
            "update": {"x": 
                {"scale": "x", "field": "x"},
              "y": {
                "scale": "y",
                "field": "value"
              },
              "opacity": {"value": 1},
              "size": {
                "value": 80
              }}
          }
        }]
    },
    {     "name": "cell",
          "type": "rect",
          "from": {
            "data": "tooltip"
          },
          "encode": {
            "enter": {
              "x": {
                "scale": "x",
                "field": "x0"
              },
              "x2": {
                "scale": "x",
                "field": "x1"
              },
              "y": {"value": 0},

              "y2": {"field": {"group": "height"}},
              "fill": {
                "value":"black"
              }
            },
            "update":{
              "opacity":{
                "value":0
              }},
            "hover":{
              "tooltip":{"signal": "{'Probability %': datum.x, 'GFDL-ESM2M': '$'+format(datum.gf,'~s'),'HadGEM2-ES':'$'+format(datum.ha,'~s'),'IPSL-CM5A-LR':'$'+ format(datum.ip,'~s'),'MIROC-ESM-CHEM':format(datum.mi,'~s'),'NorESM1-M':'$'+format(datum.nr,'~s'),'Average': '$'+ format(datum.mean_y,'~s')}"},
              "opacity":{
                "value":0
              }
            }
          }
        }
  ]
};
