
export const updateSpec = (spec = {}, params = {}) => {
  let updatedSpec = { ...spec };
  const { yAxisTitle } = params;

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

  return updatedSpec;
}

export default { updateSpec };
