export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize": {
    "type": "fit",
    "resize": true,
    "contains": "padding"
  },
  "height": 200,
  "signals": [
    {
      "name": "Year",
      "value": "2010",
      "bind": {
        "name":"Year",
        "input": "radio",
        "options": [
          "2010",
          "2030",
          "2050",
          "2080"
        ]
      }
    },
    {
      "name": "calc",
      "value": "Total",
      "bind": {
        "name":"Calculation",
        "input": "radio",
        "options": [
          "Total",
          "Percentage"
        ]
      }
    },
    {
      "name": "margin",
      "value": 0
    },
    {
      "name": "hover",
      "on": [
        {"events": "*:mouseover", "encode": "hover"},
        {"events": "*:mouseout",  "encode": "leave"},
        {"events": "*:mousedown", "encode": "select"},
        {"events": "*:mouseup",   "encode": "release"}
      ]
    },
    { "name": "xrange", "update": "[0, width]" },
    { "name": "yrange", "update": "[height, 0]" },

    {
      "name": "down", "value": null,
      "on": [
        {"events": "touchend", "update": "null"},
        {"events": "mousedown, touchstart", "update": "xy()"}
      ]
    },
    {
      "name": "xcur", "value": null,
      "on": [
        {
          "events": "mousedown, touchstart, touchend",
          "update": "slice(xdom)"
        }
      ]
    },
    {
      "name": "ycur", "value": null,
      "on": [
        {
          "events": "mousedown, touchstart, touchend",
          "update": "slice(ydom)"
        }
      ]
    },
    {
      "name": "delta", "value": [0, 0],
      "on": [
        {
          "events": [
            {
              "source": "window", "type": "mousemove", "consume": true,
              "between": [{"type": "mousedown"}, {"source": "window", "type": "mouseup"}]
            },
            {
              "type": "touchmove", "consume": true,
              "filter": "event.touches.length === 1"
            }
          ],
          "update": "down ? [down[0]-x(), y()-down[1]] : [0,0]"
        }
      ]
    },

    {
      "name": "anchor", "value": [0, 0],
      "on": [
        {
          "events": "wheel",
          "update": "[invert('x', x()), invert('y', y())]"
        },
        {
          "events": {"type": "touchstart", "filter": "event.touches.length===2"},
          "update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"
        }
      ]
    },
    {
      "name": "zoom", "value": 1,
      "on": [
        {
          "events": "wheel!",
          "force": true,
          "update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"
        },
        {
          "events": {"signal": "dist2"},
          "force": true,
          "update": "dist1 / dist2"
        }
      ]
    },
    {
      "name": "dist1", "value": 0,
      "on": [
        {
          "events": {"type": "touchstart", "filter": "event.touches.length===2"},
          "update": "pinchDistance(event)"
        },
        {
          "events": {"signal": "dist2"},
          "update": "dist2"
        }
      ]
    },
    {
      "name": "dist2", "value": 0,
      "on": [{
        "events": {"type": "touchmove", "consume": true, "filter": "event.touches.length===2"},
        "update": "pinchDistance(event)"
      }]
    },

    {
      "name": "xdom", "update": "slice(xext)",
      "on": [
        {
          "events": {"signal": "delta"},
          "update": "[xcur[0] + span(xcur) * delta[0] / width, xcur[1] + span(xcur) * delta[0] / width]"
        },
        {
          "events": {"signal": "zoom"},
          "update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"
        }
      ]
    },
    {
      "name": "ydom", "update": "slice(yext)",
      "on": [
        {
          "events": {"signal": "delta"},
          "update": "[ycur[0] + span(ycur) * delta[1] / height, ycur[1] + span(ycur) * delta[1] / height]"
        },
        {
          "events": {"signal": "zoom"},
          "update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"
        }
      ]
    },
    {
      "name": "size",
      "update": "80"
    }
  ],
  "data": [
    {
      "name": "table",
      "values": [
    ],
      "transform": [
      {"type": "filter", "expr": "datum.year == Year"},
      {"type": "filter", "expr": "if(calc=='Percentage',datum.type =='per',datum.type =='tot')"},
      { "type": "extent", "field": "value", "signal": "xext" },
      { "type": "extent", "field": "prot", "signal": "yext" }
    ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "round": true,
      "clamp":true,
      "nice": true,
      "zero": true,
      "domain": {"signal": "xdom"},
      "range": {"signal": "xrange"}
    },
    {
      "name": "y",
      "type": "linear",
      "round": true,
      "nice": true,
      "clamp":true,
      "zero": true,
      "domain": {"signal": "ydom"},
      "range": {"signal": "yrange"}
    }
  ],

  "axes": [
    {
      "scale": "x",
      "orient": "top",
      "ticks": true,
      "tickCount": 10,
      "title": "Annual Expected Urban Damage (US $)",
      "encode": {
        "labels": {
          "update": {
            "text": {"signal": "if(calc=='Percentage', datum.value+'%', '$'+format(datum.value,'~s'))"}
          }
        },
        "title": {
          "update": {
            "text": {"signal": "if(calc=='Percentage', 'Annual Expected Urban Damage (%)', 'Annual Expected Urban Damage (US $)')"}
          }
        }
      }
    },
    {
      "scale": "y",
      "orient": "left",
      "ticks": true,
      "titlePadding": 5,
      "tickCount": 5,
      "title": "Protection standard"
    }
  ],

  "marks": [
    {
      "name": "points",
      "type": "symbol",
      "from": {"data": "table"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "value"},
          "y": {"scale": "y", "field": "prot"},
          "shape": {"value": "circle"},
          "size": {"signal": "size"},
          "opacity": [
              {
                "test": "datum.id !=='{{geogunit_name}}'",
                "value": 0.3
              },
              {"value": 0.8}
            ],
          "zindex":[
              {
                "test": "datum.id !=='{{geogunit_name}}'",
                "value": 1
              },
              {"value": 2}
            ],
          "fill": [
              {
                "test": "datum.id !=='{{geogunit_name}}'",
                "value": "#ef8e3b"
              },
              {"value": "#2955B3"}
            ]
        },
         "hover": {

            "opacity": {"value": 1},
            "size": {"signal": "size", "mult": 2},
               "tooltip":{"signal": "{'Country': datum.id, 'Protection standart': datum.prot +' years', 'Damage': if(calc=='Percentage', datum.value+'%', '$'+format(datum.value, '~s'))}"}
         }
      }
    }
  ]
};
