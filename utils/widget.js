
import { replace } from 'aqueduct-components';

export const updateSpec = (spec = {}, params = {}) => {
  // let updatedSpec = { ...spec };
  let updatedSpec = Object.assign({}, spec);
  const { yAxisTitle, type } = params;

  if (yAxisTitle) {
    const yAxisIndex = (updatedSpec.axes || []).findIndex(axis => axis.orient === 'left');

    if (!yAxisIndex) return updatedSpec;

    const updatedAxes = updatedSpec.axes;
    let updatedYAxis = updatedAxes[yAxisIndex];

    updatedYAxis = {
      ...updatedYAxis,
      title: yAxisTitle
    };

    updatedAxes[yAxisIndex] = updatedYAxis;

    updatedSpec = {
      ...updatedSpec,
      axes: updatedAxes
    }
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
