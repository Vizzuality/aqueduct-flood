export default {
  autosize: {
    "type": "pad",
    "resize": true,
    "contains": "padding"
  },
  background: null,
  padding: 20,
  render: { retina: true },
  axis: {
    domain: false,
    labelOverlap: 'parity',
    titleFont: 'Roboto',
    labelPadding: 10,
    labelFont: 'Roboto',
    labelFontSize: 10,
    titleFontSize: 12,
    labelColor: '#495969',
    titleColor: '#495969',
    labelFontWeight: 300
  },
  axisLeft: {
    grid: true,
    ticks: false
  },
  axisRight: {
    grid: false,
    ticks: false
  },
  legend: {
    labelPadding: 10,
    titleFont: 'Roboto',
    labelFont: 'Roboto',
    labelColor: '#495969',
    titleColor: '#495969',
    labelFontSize: 10,
    titleFontSize: 12,
    labelFontWeight: 300
  },
  symbol: {
    fill: 'steelblue',
    size: 65
  },
  range: {
    "category": ["#5079a5", "#ef8e3b", "#dd565c", "#79b7b2", "#5da052", "#ecc853", "#ad7aa1", "#ef9ba7", "#9b7461", "#bab0ac"],
    "symbol": ["square", "circle"],
    "multi-line": [
      "#5079a5",
      "#ecc853"
    ]
  }
};
