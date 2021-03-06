export default {
	"autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 250,
  "data": [
    {
      "name": "table",
      "values": [

    ],
      "transform": [
{
  "type": "window",
  "ops": ["first_value"],
  "fields": ["Annual_Damage_Avg"],
  "as": ["baseline_value"]
},
{"type": "formula", "as": "Annual_Damage_Avg", "expr": "if(datum.index!='2010',datum.Annual_Damage_Avg-datum.baseline_value, datum.Annual_Damage_Avg)"},
        {"type": "fold", "fields": ["Annual_Damage_Avg", "CC_Driver_Avg", "Soc_Driver", "Sub_Driver"]},
        {"type": "formula", "as": "type", "expr": "if(datum.key=='Annual_Damage_Avg','Total change','Drivers')"},
        {"type": "filter", "expr": "datum.index!='2010'"},
        {
          "type": "stack",
          "groupby": ["index", "type"],
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
      "range": "category"
    }
  ],

  "axes": [
    {
      "orient": "top",
      "scale": "xscale",
      "ticks": false,
      "offset": 20,
      "labelFontWeight": "bold",
      "labelFontSize": 13
    },
    {
      "orient": "bottom",
      "scale": "xscale",
      "grid": false,
      "domain": false,
      "ticks": false,
      "labels":false,
      "titleLimit":350,
      "offset": 5,
      "title": "Annual Damage and Impact Drivers"
    },
    {
      "orient": "left",
      "scale": "yscale",
      "ticks": false,
      "grid":true,
      "format":"s",
      "tickCount": 5,
      "title": "Annual Urban Damage (US $)"}
  ],

  "legends": [
    {
      "fill": "color",
      "orient": "bottom",
      "direction":"horizontal",
      "encode": {
        "symbols": {
          "update": {
            "strokeWidth": {"value": 0},
            "opacity": {"value": 1},
            "shape": {"value": "square"}
          }
        },
        "labels":{
          "update": {
          "text": {"signal": "if(datum.label=='Annual_Damage_Avg', 'Total change', if(datum.label=='Soc_Driver', 'Socioeconomic', if(datum.label=='Sub_Driver','Subsidence', 'Climate')))"},
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
          "domain": {"data": "facet", "field": "type"},
          "range": "width",
          "padding": 0.1
        }
      ],

      "axes": [
        {"orient": "top", "scale": "pos", "domain": false,
        "labelOverlap":"parity", "ticks": true, "labelAlign":"center" }
      ],

      "marks": [
        {
          "name": "bars",
          "from": {"data": "facet"},
          "type": "rect",
          "encode": {
            "enter": {
              "x": {"scale": "pos", "field": "type"},
              "width": {"scale": "pos", "band": 1},
              "y": {"scale": "yscale", "field": "y0"},
              "y2": {"scale": "yscale", "field": "y1"},
              "fill": {"scale": "color", "field": "key"}
            },
            "update": {"opacity":{
              "value":1
            }},
            "hover": {"opacity":{
              "value":0.5
            },
            "tooltip":{"signal": "{'Year': datum.index, 'Value': format(datum.value, '.3s')}"}
          }
          }
        }
      ]
    },
    {
      "type": "rule",
      "encode": {
        "update": {
          "y": {"scale": "yscale", "value": 0},
          "x": {"value": 0},
          "x2": {"signal": "width"}
        }
      }
    }
  ]
};
