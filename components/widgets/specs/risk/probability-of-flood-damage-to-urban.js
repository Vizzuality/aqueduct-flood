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
        { "x": 0.1, "y": 158.14655244999997, "c": "05" },
        { "x": 0.2, "y": 146.294477616, "c": "05" },
        { "x": 0.5, "y": 132.973092707, "c": "05" },
        { "x": 1.0, "y": 118.168053657, "c": "05" },
        { "x": 2.5, "y": 108.54401577899999, "c": "05" },
        { "x": 5.0, "y": 98.8484253729, "c": "05" },
        { "x": 10.0, "y": 88.34589741519999, "c": "05" },
        { "x": 25.0, "y": 80.0492638105, "c": "05" },
        { "x": 50.0, "y": 67.51822895849999, "c": "05" },
        { "x": 100.0, "y": 62.4263212814, "c": "05" },
        { "x": 0.1, "y": 169.84105801700002, "c": "50" },
        { "x": 0.2, "y": 158.484290937, "c": "50" },
        { "x": 0.5, "y": 146.66566623299997, "c": "50" },
        { "x": 1.0, "y": 129.02326864, "c": "50" },
        { "x": 2.5, "y": 118.321696977, "c": "50" },
        { "x": 5.0, "y": 108.62610657100001, "c": "50" },
        { "x": 10.0, "y": 95.5567393202, "c": "50" },
        { "x": 25.0, "y": 87.8992342836, "c": "50" },
        { "x": 50.0, "y": 75.3681994316, "c": "50" },
        { "x": 100.0, "y": 70.2762917546, "c": "50" },
        { "x": 0.1, "y": 186.49477245299997, "c": "95" },
        { "x": 0.2, "y": 175.138005373, "c": "95" },
        { "x": 0.5, "y": 163.773043097, "c": "95" },
        { "x": 1.0, "y": 148.52235802899997, "c": "95" },
        { "x": 2.5, "y": 135.122993721, "c": "95" },
        { "x": 5.0, "y": 122.550142057, "c": "95" },
        { "x": 10.0, "y": 109.480774807, "c": "95" },
        { "x": 25.0, "y": 99.13699789820001, "c": "95" },
        { "x": 50.0, "y": 86.54705311149999, "c": "95" },
        { "x": 100.0, "y": 81.45514543440001, "c": "95" }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "padding": 20,
      "domain": { "data": "table", "field": "x" }
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "zero": false,
      "domain": { "data": "table", "field": "y" }
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": { "data": "table", "field": "c" }
    }
  ],

  "title": "Probability of flood damage to Urban in The City of Buenos Aires, Argentina - 2030",

  "axes": [
    { "orient": "bottom", "scale": "x", "domain": false, "ticks": false, "grid": true, "offset": 6, "tickCount": 4, "title": "Probability of event occurring" },
    { "orient": "left", "scale": "y", "domain": false, "ticks": false, "grid": true, "offset": 6, "tickCount": 6, "title": "Estimated Damage ($ millions)" }
  ],

  "legends": [
    {
      "title": "Variable",
      "fill": "color",
      "orient": "right"
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
          "from": { "data": "series" },
          "encode": {
            "enter": {
              "x": { "scale": "x", "field": "x" },
              "y": { "scale": "y", "field": "y" },
              "stroke": { "scale": "color", "field": "c" },
              "strokeWidth": { "value": 2 }
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
          "from": { "data": "series" },
          "encode": {
            "enter": {
              "x": { "scale": "x", "field": "x" },
              "y": { "scale": "y", "field": "y" },
              "fill": { "scale": "color", "field": "c" },
              "size": { "value": 50 }
            }
          }
        }
      ]
    }
  ]
};
