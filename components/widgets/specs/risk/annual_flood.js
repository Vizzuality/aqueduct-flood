export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "signals": [
    {
      "name": "error", "value": false,
      "bind": {"name":"Error bars", "input": "checkbox"}
    }
  ],
  "height": 220,

  "data": [
    {
      "name": "table",
      "values": [
    
    ]
    },
    {
      "name": "info",
      "values": [
        {"text": "Annual Expected Urban Damage (US $)"}, 
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
      "paddingInner": 0.3,
      "paddingOuter": 0.1,
      "round": true
    },
    {
      "name": "yscale_amout",
      "type": "linear",
      "domain": {"data": "table", "field": "Annual_Damage_Avg"},
      "range": "height", "zero": true, "nice": true
    },
    {
      "name": "yscale_per",
      "type": "linear",
      "domain": {"fields":[{"data": "table", "field": "Percent_Damage_Avg"},{"data": "table", "field": "Percent_Damage_Max"}]},
      "range": "height", "zero": true, "nice": true
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
    { "orient": "bottom", "scale": "xscale"},
    { "orient": "left", "scale": "yscale_amout", "tickCount": 5,
      "title":"Annual Urban Damage",
      
      "encode":{
          "labels":{
            "update":{
              "text":{"signal": "'$ '+format(datum.value, '~s')"}
            }
          }
        }
    },
    { "orient": "right", "scale": "yscale_per", "tickCount": 5,
      "title":"% Annual Urban Damage",
      "encode":{
        "labels":{
          "update":{
            "text":{"signal": "format(datum.value, '.3f') + '%'"}
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
          "opacity": {"value": 1}
        },
        "hover": {
          "opacity": {"value": 0.5},
          "tooltip":{"signal": "{'Year': datum.index, 'Avg': '$'+format(datum.Annual_Damage_Avg, '~s')}"}
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
          "fill":{"value":"#ef8e3b"}
        },
        "update": {
          "opacity": {"value": 0.8},
          "size": {"value": 65}
          
        },
        "hover": {
          "opacity": {"value": 1},
          "size": {"value": 65, "mult":2},
          "tooltip":{"signal": "{'Year': datum.index, 'Max': format(datum.Percent_Damage_Max, '.3f')+'%' , 'Avg': format(datum.Percent_Damage_Avg, '.3f')+'%' , 'Min':format(datum.Percent_Damage_Min, '.3f')+'%' }"}
        }
      }
    },
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "index", "band":0.5},
          "fill":{"value":"#ef8e3b"},
          "width": {"value": 2},
          "y": {"scale": "yscale_per", "field": "Percent_Damage_Min"},
          "y2": {"scale": "yscale_per", "field": "Percent_Damage_Max"},
          "opacity": {"value": 0}
        },
        "update":{"opacity": {"signal": "error===true?1:0"}}
      }
    }
  ]
};
