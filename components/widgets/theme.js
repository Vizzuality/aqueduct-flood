export default {
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
    fill: '#2955B3',
    size: 65
  },
  rect: {
    fill: '#2955B3'
  },
  line: {
    stroke: '#2955B3'
  },
  range: {
    "category": ["#2955B3", "#ef8e3b", "#dd565c", "#3A9FDD", "#5da052", "#000000", "#ad7aa1", "#ef9ba7", "#9b7461", "#bab0ac"],
    "symbol": ["square", "circle"],
    "multi-line": [
      "#2955B3",
      "#ef8e3b"
    ]
  }
};
