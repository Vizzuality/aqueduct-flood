
import { replace } from 'aqueduct-components';

export const updateSpec = (spec = {}, params = {}) => {
  console.log(params.type)
  let updatedSpec = Object.assign({}, spec);
  const {
    yAxisTitle,
    yAxisTitleRight,
    chartTitleTop,
    chartTitleBottom,
    legend,
    type
  } = params;

  if (type === 'lp_curve') {
    console.log(params)
    const legends = updatedSpec.legends;
    legends[0] = {
      ...legends[0],
      title: params.flood === 'coastal' ? 'Scenarios' : 'Models',
    };

    console.log(legends)

    return {
      ...updatedSpec,
      legends,
    }
  }

  if (yAxisTitle) {
    const yAxisIndexLeft = (updatedSpec.axes || []).findIndex(axis => axis.orient === 'left');

    if (yAxisIndexLeft === -1) return updatedSpec;

    const updatedAxes = updatedSpec.axes;
    let updatedYAxisLeft = updatedAxes[yAxisIndexLeft];

    // updates left y-axis
    if (updatedYAxisLeft) {
      updatedYAxisLeft = {
        ...updatedYAxisLeft,
        title: yAxisTitle
      };

      updatedAxes[yAxisIndexLeft] = updatedYAxisLeft;
    }

    updatedSpec = {
      ...updatedSpec,
      axes: updatedAxes
    }
  }

  if (yAxisTitleRight) {
    const yAxisIndexRight = (updatedSpec.axes || []).findIndex(axis => axis.orient === 'right');

    if (yAxisIndexRight === -1) return updatedSpec;

    const updatedAxes = updatedSpec.axes;
    let updatedYAxisRight = updatedAxes[yAxisIndexRight];

    // updates right y-axis
    if (updatedYAxisRight) {
      updatedYAxisRight = {
        ...updatedYAxisRight,
        title: yAxisTitleRight
      };

      updatedAxes[yAxisIndexRight] = updatedYAxisRight;
    }

    updatedSpec = {
      ...updatedSpec,
      axes: updatedAxes
    }
  }

  if (chartTitleTop) {
    const xAxisIndex = (updatedSpec.axes || []).findIndex(axis => axis.orient === 'top');

    if (xAxisIndex === -1) return updatedSpec;

    const updatedAxes = updatedSpec.axes;
    let updatedXTopAxis = updatedAxes[xAxisIndex];

    updatedXTopAxis = {
      ...updatedXTopAxis,
      title: chartTitleTop,
      // encode: {
      //   ...updatedXTopAxis.encode,
      //   title: {
      //     update: {
      //       ...updatedXTopAxis.title.update,
      //       text: {
      //         ...updatedXTopAxis.encode.title.update.text,
      //         ...type === 'benchmark' && { signal: `if(calc=='Percentage', 'Annual Expected ${chartTitleTop} (%)', 'Annual Expected ${chartTitleTop}')` }
      //       }
      //     }
      //   }
      // }
    };

    updatedAxes[xAxisIndex] = updatedXTopAxis;

    updatedSpec = {
      ...updatedSpec,
      axes: updatedAxes
    }
  }

  if (chartTitleBottom) {
    const xAxisIndex = (updatedSpec.axes || []).findIndex(axis => axis.orient === 'bottom');

    if (xAxisIndex === -1) return updatedSpec;

    const updatedAxes = updatedSpec.axes;
    let updatedXTopAxis = updatedAxes[xAxisIndex];

    updatedXTopAxis = {
      ...updatedXTopAxis,
      title: chartTitleBottom
    };

    updatedAxes[xAxisIndex] = updatedXTopAxis;

    updatedSpec = {
      ...updatedSpec,
      axes: updatedAxes
    }
  }

  if (legend) {
    const _data = updatedSpec.data;

    if (!_data) return updatedSpec;

    const legendIndex = _data.findIndex(_d => _d.name === 'info');

    if (legendIndex === -1) return updatedSpec;

    const newLegend = _data[legendIndex];

    newLegend.values = legend.map(_legendvalue => ({ text: _legendvalue }));

    updatedSpec = {
      ...updatedSpec,
      data: _data
    };
  }

  if (type === 'benchmark') {
    const { marks } = updatedSpec;
    const updatedMarks = [...marks];

    const updatedFill = {
      ...updatedMarks[0].encode.update.fill[0],
      test: replace(updatedMarks[0].encode.update.fill[0].test, params)
    };

    const updatedzIndex = {
      ...updatedMarks[0].encode.update.zindex[0],
      test: replace(updatedMarks[0].encode.update.zindex[0].test, params)
    };

    const updatedOpacity = {
      ...updatedMarks[0].encode.update.opacity[0],
      test: replace(updatedMarks[0].encode.update.opacity[0].test, params)
    };

    const f = [...updatedMarks[0].encode.update.fill];
    const z = [...updatedMarks[0].encode.update.zindex];
    const o = [...updatedMarks[0].encode.update.opacity];
    f[0] = updatedFill;
    z[0] = updatedzIndex;
    o[0] = updatedOpacity;

    updatedMarks[0] = {
      ...updatedMarks[0],
      encode: {
        ...updatedMarks[0].encode,
        update: {
          ...updatedMarks[0].encode.update,
          fill: f,
          zindex: z,
          opacity: o
        }
      }
    };

    updatedSpec = {
      ...updatedSpec,
      marks: updatedMarks
    };
  }

  return updatedSpec;
}

export default { updateSpec };
