export default {
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
        
    ],
      "transform": [
        {"type": "fold", "fields": ["Annual_Damage_Avg", "Sub_Driver", "Soc_Driver"]},
        {
          "type": "stack",
          "groupby": ["index", "key"],
          "sort": {"field": "key"},
          "field": "value"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "index"},
      "range": "width",
      "padding": 0.0,
      "paddingInner": 0.1
    },
    {
      "name": "yscale",
      "type": "linear",
      "domain": {"data": "table", "field": "y1"},
      "range": "height",
      "round": true,
      "zero": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "key"},
      "range": {"scheme": "category10"}
    }
  ],

  "axes": [
    {
      "orient": "top", 
      "scale": "xscale", 
      "domain": false, 
      "ticks": false, 
      "offset": 20, 
      "labelFontWeight": "bold", 
      "labelFontSize": 13
    },
    {
      "orient": "bottom", 
      "scale": "xscale", 
      "domain": false, 
      "ticks": false, 
      "labels":false, 
      "offset": 5, 
      "title": "Annual Damage and Impact Drivers"
    },
    {
      "orient": "left", 
      "scale": "yscale", 
      "domain": false, 
      "ticks": false, 
      "grid":true, 
      "format":"s",
      "offset": 10, 
      "tickCount": 5, 
      "title": "Annual Urban Damage ($)"}
  ],

  "legends": [
    {
      "title": "Variable",
      "fill": "color",
      "orient": "right",
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": {"value": 0},
            "opacity": {"value": 1},
            "shape": {"value": "square"}
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
          "data": "table",
          "name": "facet",
          "groupby": "index"
        }
      },

      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "index"}
        }
      },

      "signals": [
        {"name": "width", "update": "bandwidth('xscale')"}
      ],

      "scales": [
        {
          "name": "pos",
          "type": "band",
          "domain": {"data": "facet", "field": "key"},
          "range": "width",
          "padding": 0.1
        }
      ],

      "axes": [
        {"orient": "top", "scale": "pos", "domain": false, "ticks": false, "grid": true, "offset": 0}
      ],

      "marks": [
        {
          "name": "bars",
          "from": {"data": "facet"},
          "type": "rect",
          "encode": {
            "enter": {
              "x": {"scale": "pos", "field": "key"},
              "width": {"scale": "pos", "band": 1},
              "y": {"scale": "yscale", "field": "y0"},
              "y2": {"scale": "yscale", "field": "y1"},
              "fill": {"scale": "color", "field": "key"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "bars"},
          "encode": {
            "enter": {
              "y": {"field": "y", "offset": 8},
              "x": {"field": "x", "offset": 5},
              "fill": {"value": "#000"},
              "fontWeight": {"value": "bold"},
              "align": {"value": "top"},
              "baseline": {"value": "middle"},
              "text": {"field": "datum.percentage"}
            }
          }
        }
      ]
    }
  ]
};
